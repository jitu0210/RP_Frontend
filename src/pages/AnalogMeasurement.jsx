// import { useEffect, useState, useCallback, useRef } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const STREAM_URL = "http://localhost:8000/api/v1/bts/streamanalog";
// const MAX_POINTS = 40;

// export default function AnalogStream() {
//   const [connected, setConnected] = useState(false);
//   const [latest, setLatest] = useState([]);
//   const [history, setHistory] = useState({});
//   const [stats, setStats] = useState({});
//   const updateTimeoutRef = useRef(null);

//   // Industrial color scheme
//   const signalColors = [
//     '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b',
//     '#ef4444', '#06b6d4', '#84cc16', '#ec4899'
//   ];

//   // Calculate statistics
//   const calculateStats = (data) => {
//     const validValues = data.map(d => d.value).filter(v => v !== null);
//     if (validValues.length === 0) return null;
    
//     const min = Math.min(...validValues);
//     const max = Math.max(...validValues);
//     const avg = validValues.reduce((a, b) => a + b, 0) / validValues.length;
    
//     return { min, max, avg };
//   };

//   // Calculate percentage change
//   const calculateChange = (current, avg, min, max) => {
//     if (!current || !avg) return 0;
//     const range = max - min;
//     if (range === 0) return 0;
//     return ((current - avg) / range * 100).toFixed(1);
//   };

//   // Process stream data
//   const processStreamData = useCallback((data) => {
//     if (!data.analog?.length) return;

//     if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);

//     updateTimeoutRef.current = setTimeout(() => {
//       const ts = data.timestamp || Date.now();
      
//       setLatest(data.analog);
      
//       setHistory(prev => {
//         const updated = { ...prev };
//         const newStats = {};

//         data.analog.forEach(sig => {
//           if (!updated[sig.tag]) updated[sig.tag] = [];
//           const newData = [...updated[sig.tag], { time: ts, value: sig.value }].slice(-MAX_POINTS);
//           updated[sig.tag] = newData;

//           const signalStats = calculateStats(newData);
//           if (signalStats) newStats[sig.tag] = signalStats;
//         });

//         setStats(prev => ({ ...prev, ...newStats }));
//         return updated;
//       });
//     }, 100);
//   }, []);

//   // Connect to stream
//   useEffect(() => {
//     let eventSource = null;
//     let isMounted = true;

//     const connect = () => {
//       try {
//         eventSource = new EventSource(STREAM_URL);

//         eventSource.onopen = () => {
//           if (!isMounted) return;
//           setConnected(true);
//         };

//         eventSource.onmessage = (event) => {
//           if (!isMounted) return;
//           try {
//             const data = JSON.parse(event.data);
//             processStreamData(data);
//           } catch (err) {
//             console.error("Parse error:", err);
//           }
//         };

//         eventSource.onerror = () => {
//           if (!isMounted) return;
//           setConnected(false);
//           if (eventSource) eventSource.close();
//           setTimeout(connect, 3000);
//         };
//       } catch (err) {
//         console.error("Connection error:", err);
//       }
//     };

//     connect();

//     return () => {
//       isMounted = false;
//       if (eventSource) eventSource.close();
//       if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
//     };
//   }, [processStreamData]);

//   // Format time
//   const formatTime = (timestamp) => {
//     return new Date(timestamp).toLocaleTimeString([], {
//       minute: '2-digit',
//       second: '2-digit'
//     });
//   };

//   // Get color for signal
//   const getSignalColor = (index) => signalColors[index % signalColors.length];

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 p-3 md:p-4">
//       {/* Status Bar - Compact */}
//       <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-3">
//             <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//             <h1 className="text-lg font-bold">ANALOG MONITOR</h1>
//             <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
//               {Object.keys(history).length} SIGNALS
//             </span>
//           </div>
//           <div className="text-xs text-gray-400">
//             {MAX_POINTS} pts • {connected ? 'LIVE' : 'OFFLINE'}
//           </div>
//         </div>
//       </div>

//       {/* Current Values - Industrial Grid */}
//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-2 px-1">
//           <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">LIVE VALUES</h2>
//           <span className="text-xs text-gray-500">Updated in real-time</span>
//         </div>
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
//           {latest.map((item, index) => {
//             const signalStats = stats[item.tag];
//             const change = signalStats ? calculateChange(
//               item.value, 
//               signalStats.avg, 
//               signalStats.min, 
//               signalStats.max
//             ) : 0;

//             return (
//               <div
//                 key={item.tag}
//                 className="bg-gray-800 p-3 rounded border border-gray-700 hover:border-blue-500 transition-colors"
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <div className="flex-1 min-w-0">
//                     <div className="text-xs font-medium text-gray-300 truncate">{item.tag}</div>
//                     <div className="text-[10px] text-gray-500 font-mono truncate">{item.address}</div>
//                   </div>
//                   <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${Math.abs(change) > 10 ? 'bg-red-900/50 text-red-300' : change > 0 ? 'bg-green-900/50 text-green-300' : change < 0 ? 'bg-yellow-900/50 text-yellow-300' : 'bg-gray-700 text-gray-400'}`}>
//                     {change > 0 ? '▲' : change < 0 ? '▼' : '●'} {Math.abs(change)}%
//                   </div>
//                 </div>
                
//                 <div className="text-xl font-bold font-mono text-white mb-2">
//                   {item.value?.toFixed(2) ?? '--'}
//                 </div>

//                 {signalStats && (
//                   <div className="pt-2 border-t border-gray-700">
//                     <div className="grid grid-cols-3 gap-1 text-[10px]">
//                       <div className="text-center">
//                         <div className="text-gray-500">MIN</div>
//                         <div className="font-medium text-gray-300">{signalStats.min.toFixed(2)}</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-gray-500">AVG</div>
//                         <div className="font-medium text-gray-300">{signalStats.avg.toFixed(2)}</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-gray-500">MAX</div>
//                         <div className="font-medium text-gray-300">{signalStats.max.toFixed(2)}</div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Charts Grid - Industrial Style */}
//       <div>
//         <div className="flex items-center justify-between mb-2 px-1">
//           <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">TREND ANALYSIS</h2>
//           <span className="text-xs text-gray-500">Last {MAX_POINTS} samples</span>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
//           {Object.entries(history).map(([tag, data], index) => {
//             const signalStats = stats[tag];
//             const currentValue = latest.find(sig => sig.tag === tag)?.value;
//             const color = getSignalColor(index);
//             const change = signalStats ? calculateChange(
//               currentValue, 
//               signalStats.avg, 
//               signalStats.min, 
//               signalStats.max
//             ) : 0;

//             return (
//               <div
//                 key={tag}
//                 className="bg-gray-800 p-3 rounded border border-gray-700"
//               >
//                 {/* Chart Header */}
//                 <div className="mb-3">
//                   <div className="flex justify-between items-center mb-1">
//                     <div className="flex items-center space-x-2">
//                       <div
//                         className="w-2 h-2 rounded-full"
//                         style={{ backgroundColor: color }}
//                       ></div>
//                       <div className="text-sm font-medium text-gray-200 truncate">{tag}</div>
//                     </div>
//                     <div className={`text-xs font-bold px-2 py-0.5 rounded ${Math.abs(change) > 10 ? 'bg-red-900/50 text-red-300' : change > 0 ? 'bg-green-900/50 text-green-300' : change < 0 ? 'bg-yellow-900/50 text-yellow-300' : 'bg-gray-700 text-gray-400'}`}>
//                       {change > 0 ? '▲' : change < 0 ? '▼' : '●'} {Math.abs(change)}%
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between text-xs">
//                     <div className="text-gray-400">
//                       <span className="text-gray-300 font-mono">{currentValue?.toFixed(2) ?? '--'}</span>
//                       <span className="text-gray-500 ml-1">CURRENT</span>
//                     </div>
//                     <div className="text-gray-400">
//                       <span className="text-gray-500">AVG </span>
//                       <span className="text-gray-300 font-mono">{signalStats?.avg?.toFixed(2) ?? '--'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Compact Chart */}
//                 <div className="h-36 mb-2">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={data}>
//                       <CartesianGrid strokeDasharray="2 2" stroke="#374151" />
//                       <XAxis
//                         dataKey="time"
//                         tickFormatter={formatTime}
//                         fontSize={9}
//                         tick={{ fill: '#9ca3af' }}
//                         axisLine={false}
//                         tickLine={false}
//                       />
//                       <YAxis
//                         fontSize={9}
//                         tick={{ fill: '#9ca3af' }}
//                         axisLine={false}
//                         tickLine={false}
//                         width={35}
//                         tickFormatter={(v) => v?.toFixed(1)}
//                       />
//                       <Tooltip
//                         labelFormatter={(v) => formatTime(v)}
//                         formatter={(v) => [v?.toFixed(3) ?? '--', 'Value']}
//                         contentStyle={{
//                           backgroundColor: '#1f2937',
//                           border: '1px solid #374151',
//                           borderRadius: '4px',
//                           fontSize: '11px',
//                           color: '#fff'
//                         }}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="value"
//                         stroke={color}
//                         strokeWidth={1.5}
//                         dot={false}
//                         isAnimationActive={false}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Stats Footer */}
//                 {signalStats && (
//                   <div className="pt-2 border-t border-gray-700">
//                     <div className="flex justify-between text-[10px]">
//                       <div className="text-center flex-1">
//                         <div className="text-gray-500">MIN</div>
//                         <div className="font-medium text-gray-300 font-mono">{signalStats.min.toFixed(2)}</div>
//                       </div>
//                       <div className="text-center flex-1 border-x border-gray-700">
//                         <div className="text-gray-500">RANGE</div>
//                         <div className="font-medium text-gray-300 font-mono">{(signalStats.max - signalStats.min).toFixed(2)}</div>
//                       </div>
//                       <div className="text-center flex-1">
//                         <div className="text-gray-500">MAX</div>
//                         <div className="font-medium text-gray-300 font-mono">{signalStats.max.toFixed(2)}</div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* System Status Footer */}
//       <div className="mt-4 pt-3 border-t border-gray-800">
//         <div className="flex justify-between items-center text-xs text-gray-500">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               <span>NORMAL</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
//               <span>WARNING</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-red-500"></div>
//               <span>CRITICAL</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div>STREAM: {connected ? 'ACTIVE' : 'STANDBY'}</div>
//             <div className="text-gray-600">v1.0 • INDUSTRIAL MONITOR</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








// ///////////////////////////////////////

import { useEffect, useState, useCallback, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const STREAM_URL = "https://mqtt-testing-1.onrender.com/api/v1/stream/analog";
const MAX_POINTS = 40;
const UPDATE_THROTTLE_MS = 200; // Match server's 200ms interval

export default function AnalogStream() {
  const [connected, setConnected] = useState(false);
  const [latest, setLatest] = useState([]);
  const [history, setHistory] = useState({});
  const [stats, setStats] = useState({});
  const lastUpdateRef = useRef(Date.now());
  const updateTimeoutRef = useRef(null);
  const eventSourceRef = useRef(null);

  // Industrial color scheme
  const signalColors = [
    '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b',
    '#ef4444', '#06b6d4', '#84cc16', '#ec4899'
  ];

  // Memoized statistics calculation
  const calculateStats = useCallback((data) => {
    const validValues = data.map(d => d.value).filter(v => v !== null && !isNaN(v));
    if (validValues.length === 0) return null;
    
    // Use reduce for better performance
    const { min, max, sum } = validValues.reduce((acc, val) => {
      if (val < acc.min) acc.min = val;
      if (val > acc.max) acc.max = val;
      acc.sum += val;
      return acc;
    }, { min: Infinity, max: -Infinity, sum: 0 });
    
    return { 
      min: Number(min.toFixed(2)), 
      max: Number(max.toFixed(2)), 
      avg: Number((sum / validValues.length).toFixed(2)),
      count: validValues.length
    };
  }, []);

  // Calculate percentage change
  const calculateChange = useCallback((current, avg, min, max) => {
    if (current === null || avg === null || avg === undefined) return 0;
    const range = max - min;
    if (range === 0) return 0;
    return Number(((current - avg) / range * 100).toFixed(1));
  }, []);

  // Optimized stream data processing with throttling
  const processStreamData = useCallback((data) => {
    if (!data.analog?.length) return;

    const now = Date.now();
    
    // Throttle updates to match server interval
    if (now - lastUpdateRef.current < UPDATE_THROTTLE_MS) {
      return;
    }
    
    lastUpdateRef.current = now;

    // Clear any pending update
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Process in the next frame for smooth UI
    updateTimeoutRef.current = requestAnimationFrame(() => {
      const ts = data.timestamp || now;
      const newLatest = data.analog;
      
      setLatest(newLatest);
      
      setHistory(prev => {
        const updated = { ...prev };
        const newStats = {};

        // Process all signals in one pass
        newLatest.forEach((sig, index) => {
          const tag = sig.tag;
          if (!updated[tag]) {
            updated[tag] = [];
          }
          
          // Add new data point
          updated[tag] = [
            ...updated[tag],
            { 
              time: ts, 
              value: sig.value !== null ? Number(sig.value.toFixed(3)) : null 
            }
          ].slice(-MAX_POINTS);

          // Calculate stats for this signal
          const signalStats = calculateStats(updated[tag]);
          if (signalStats) {
            newStats[tag] = signalStats;
          }
        });

        // Batch stats update
        setStats(prev => ({ ...prev, ...newStats }));
        return updated;
      });
    });
  }, [calculateStats]);

  // Format time with memoization
  const formatTime = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  }, []);

  // Get color for signal
  const getSignalColor = useCallback((index) => 
    signalColors[index % signalColors.length], 
    []
  );

  // Optimized SSE connection with reconnection logic
  useEffect(() => {
    let reconnectTimeout;
    let isMounted = true;

    const connect = () => {
      try {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }

        eventSourceRef.current = new EventSource(STREAM_URL);

        eventSourceRef.current.onopen = () => {
          if (!isMounted) return;
          setConnected(true);
          console.log('SSE Connected');
        };

        eventSourceRef.current.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const data = JSON.parse(event.data);
            processStreamData(data);
          } catch (err) {
            console.error("Parse error:", err);
          }
        };

        eventSourceRef.current.onerror = (error) => {
          if (!isMounted) return;
          console.error('SSE Error:', error);
          setConnected(false);
          
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }
          
          // Exponential backoff for reconnection
          if (isMounted) {
            reconnectTimeout = setTimeout(() => {
              if (isMounted) connect();
            }, 3000);
          }
        };
      } catch (err) {
        console.error("Connection error:", err);
        setConnected(false);
      }
    };

    connect();

    return () => {
      isMounted = false;
      
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      
      if (updateTimeoutRef.current) {
        cancelAnimationFrame(updateTimeoutRef.current);
      }
    };
  }, [processStreamData]);

  // Custom tooltip component for better performance
  const CustomTooltip = useCallback(({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    
    return (
      <div className="bg-gray-800 border border-gray-700 rounded p-2 shadow-lg">
        <p className="text-xs text-gray-400 mb-1">{formatTime(label)}</p>
        {payload.map((pld, index) => (
          <p key={index} className="text-xs font-medium" style={{ color: pld.color }}>
            {pld.dataKey}: <span className="text-white font-bold">{pld.value?.toFixed(3) ?? '--'}</span>
          </p>
        ))}
      </div>
    );
  }, [formatTime]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-3 md:p-4">
      {/* Status Bar */}
      <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <h1 className="text-lg font-bold">ANALOG SIGNAL MONITOR</h1>
            <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
              {Object.keys(history).length} ACTIVE SIGNALS
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <span>{MAX_POINTS} SAMPLES</span>
              <span className={`px-2 py-1 rounded ${connected ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {connected ? 'LIVE STREAM' : 'OFFLINE'}
              </span>
            </div>
            <span className="text-gray-500">200ms INTERVAL</span>
          </div>
        </div>
      </div>

      {/* Current Values - Compact Overview */}
      {latest.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">LIVE SIGNAL VALUES</h2>
            <span className="text-xs text-gray-500">Updated every 200ms</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {latest.map((item, index) => {
              const signalStats = stats[item.tag];
              const change = signalStats ? calculateChange(
                item.value, 
                signalStats.avg, 
                signalStats.min, 
                signalStats.max
              ) : 0;

              const getChangeClass = () => {
                const absChange = Math.abs(change);
                if (absChange > 15) return 'bg-red-900/60 text-red-300';
                if (absChange > 5) return 'bg-yellow-900/60 text-yellow-300';
                if (change > 0) return 'bg-green-900/60 text-green-300';
                if (change < 0) return 'bg-blue-900/60 text-blue-300';
                return 'bg-gray-800 text-gray-400';
              };

              return (
                <div
                  key={`live-${item.tag}`}
                  className="bg-gray-800 p-3 rounded border border-gray-700 hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-300 truncate" title={item.tag}>
                        {item.tag}
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono truncate">
                        {item.address}
                      </div>
                    </div>
                    <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getChangeClass()}`}>
                      {change > 0 ? '▲' : change < 0 ? '▼' : '●'} {Math.abs(change)}%
                    </div>
                  </div>
                  
                  <div className="text-lg font-bold font-mono text-white mb-1">
                    {item.value !== null ? item.value.toFixed(2) : '--'}
                  </div>

                  {signalStats && (
                    <div className="pt-2 border-t border-gray-700">
                      <div className="grid grid-cols-3 gap-1 text-[10px]">
                        <div className="text-center">
                          <div className="text-gray-500">MIN</div>
                          <div className="font-medium text-gray-300" title={signalStats.min}>
                            {signalStats.min}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500">AVG</div>
                          <div className="font-medium text-gray-300" title={signalStats.avg}>
                            {signalStats.avg}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500">MAX</div>
                          <div className="font-medium text-gray-300" title={signalStats.max}>
                            {signalStats.max}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full-Width Charts - One after another */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">SIGNAL TRENDS</h2>
          <span className="text-xs text-gray-500">{Object.keys(history).length} charts • {MAX_POINTS} samples each</span>
        </div>

        {Object.entries(history).map(([tag, data], index) => {
          const signalStats = stats[tag];
          const currentValue = latest.find(sig => sig.tag === tag)?.value;
          const color = getSignalColor(index);
          const change = signalStats ? calculateChange(
            currentValue, 
            signalStats.avg, 
            signalStats.min, 
            signalStats.max
          ) : 0;

          const getTrendStatus = () => {
            const absChange = Math.abs(change);
            if (absChange > 15) return { text: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-700' };
            if (absChange > 5) return { text: 'WARNING', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-700' };
            if (change > 0) return { text: 'RISING', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700' };
            if (change < 0) return { text: 'FALLING', color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-700' };
            return { text: 'STABLE', color: 'text-gray-400', bg: 'bg-gray-800', border: 'border-gray-700' };
          };

          const trendStatus = getTrendStatus();

          return (
            <div
              key={`chart-${tag}`}
              className={`bg-gray-800 rounded-lg border ${trendStatus.border} transition-all duration-300 hover:border-opacity-100`}
            >
              {/* Chart Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <div>
                      <div className="text-lg font-bold text-white truncate max-w-md" title={tag}>
                        {tag}
                      </div>
                      <div className="text-xs text-gray-500 font-mono mt-1">
                        Address: {data[0]?.address || 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${trendStatus.bg} ${trendStatus.color} border ${trendStatus.border}`}>
                      {trendStatus.text}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">CURRENT VALUE</div>
                      <div className="text-xl font-bold font-mono text-white">
                        {currentValue !== null ? currentValue.toFixed(3) : '--'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Row */}
                {signalStats && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">MINIMUM</div>
                      <div className="text-sm font-bold font-mono text-gray-300">
                        {signalStats.min}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">AVERAGE</div>
                      <div className="text-sm font-bold font-mono text-gray-300">
                        {signalStats.avg}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">MAXIMUM</div>
                      <div className="text-sm font-bold font-mono text-gray-300">
                        {signalStats.max}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">DEVIATION</div>
                      <div className={`text-sm font-bold font-mono ${trendStatus.color}`}>
                        {change}%
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Full-Width Chart */}
              <div className="p-4">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="#374151" 
                        strokeOpacity={0.5}
                      />
                      <XAxis
                        dataKey="time"
                        tickFormatter={formatTime}
                        fontSize={10}
                        tick={{ fill: '#9ca3af' }}
                        axisLine={{ stroke: '#4b5563' }}
                        tickLine={{ stroke: '#4b5563' }}
                        minTickGap={20}
                      />
                      <YAxis
                        fontSize={10}
                        tick={{ fill: '#9ca3af' }}
                        axisLine={{ stroke: '#4b5563' }}
                        tickLine={{ stroke: '#4b5563' }}
                        width={50}
                        tickFormatter={(v) => v?.toFixed(2)}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                          r: 4,
                          fill: color,
                          stroke: '#ffffff',
                          strokeWidth: 2
                        }}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart Footer */}
              <div className="p-4 border-t border-gray-700 bg-gray-900/50 rounded-b-lg">
                <div className="text-xs text-gray-500 flex justify-between items-center">
                  <span>Samples: {data.length} / {MAX_POINTS}</span>
                  <span>Range: {signalStats ? (signalStats.max - signalStats.min).toFixed(3) : '--'}</span>
                  <span>Updated: {data.length > 0 ? formatTime(data[data.length - 1].time) : '--'}</span>
                </div>
              </div>
            </div>
          );
        })}

        {Object.keys(history).length === 0 && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
            <div className="text-lg text-gray-400 mb-2">No signal data available</div>
            <div className="text-sm text-gray-500">
              {connected ? 'Waiting for data stream...' : 'Connecting to data source...'}
            </div>
          </div>
        )}
      </div>

      {/* System Status Footer */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>STABLE (±5%)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span>WARNING (±5-15%)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span>CRITICAL (&gt;±15%)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span>STREAM: {connected ? 'ACTIVE' : 'DISCONNECTED'}</span>
            </div>
            <div className="text-gray-600 mt-1">INDUSTRIAL ANALYTICS v1.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}


// /////////////////////////////












// import React, { useEffect, useState } from "react";

// const ANALOG_TAGS = [
//   "ic1_LN_PT_V",
//   "BUS1_PT_V",
//   "BUS2_LN_PT",
//   "ic2_LN_PT_V",
//   "ic1_LN_Freq",
//   "BUS1_Freq",
//   "ic2_LN_Freq",
//   "BUS_2_Freq",
//   "ic1_Ph_diff",
//   "BC_Ph_diff",
//   "ic2_Ph_diff",
// ];

// export default function AnalogStreamUI() {
//   const [analogData, setAnalogData] = useState({});
//   const [lastUpdate, setLastUpdate] = useState(null);

//   useEffect(() => {
//     const source = new EventSource("https://mqtt-testing-x4ct.onrender.com/api/analog/stream");

//     source.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       const mapped = {};
//       data.analog.forEach((item) => {
//         mapped[item.tag] = item.value;
//       });

//       setAnalogData(mapped);
//       setLastUpdate(data.timestamp);
//     };

//     source.onerror = (err) => {
//       console.error("SSE error", err);
//       source.close();
//     };

//     return () => source.close();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>BTS Analog Live Stream</h2>
//       <p>Last update: {lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : "—"}</p>

//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th style={th}>Tag</th>
//             <th style={th}>Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ANALOG_TAGS.map((tag) => (
//             <tr key={tag}>
//               <td style={td}>{tag}</td>
//               <td style={td}>
//                 {analogData[tag] !== null && analogData[tag] !== undefined
//                   ? analogData[tag]
//                   : "—"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const th = {
//   border: "1px solid #444",
//   padding: "8px",
//   textAlign: "left",
// };

// const td = {
//   border: "1px solid #444",
//   padding: "8px",
// };
