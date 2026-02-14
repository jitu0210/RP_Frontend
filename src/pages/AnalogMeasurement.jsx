
// import { useEffect, useState, useCallback, useRef } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const STREAM_URL = "https://mqtt-testing-2.onrender.com/api/v1/stream/analog";
// const MAX_POINTS = 40;
// const UPDATE_THROTTLE_MS = 500; // Match server's 200ms interval

// export default function AnalogStream() {
//   const [connected, setConnected] = useState(false);
//   const [latest, setLatest] = useState([]);
//   const [history, setHistory] = useState({});
//   const [stats, setStats] = useState({});
//   const lastUpdateRef = useRef(Date.now());
//   const updateTimeoutRef = useRef(null);
//   const eventSourceRef = useRef(null);

//   // Industrial color scheme
//   const signalColors = [
//     '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b',
//     '#ef4444', '#06b6d4', '#84cc16', '#ec4899'
//   ];

//   // Memoized statistics calculation
//   const calculateStats = useCallback((data) => {
//     const validValues = data.map(d => d.value).filter(v => v !== null && !isNaN(v));
//     if (validValues.length === 0) return null;
    
//     // Use reduce for better performance
//     const { min, max, sum } = validValues.reduce((acc, val) => {
//       if (val < acc.min) acc.min = val;
//       if (val > acc.max) acc.max = val;
//       acc.sum += val;
//       return acc;
//     }, { min: Infinity, max: -Infinity, sum: 0 });
    
//     return { 
//       min: Number(min.toFixed(2)), 
//       max: Number(max.toFixed(2)), 
//       avg: Number((sum / validValues.length).toFixed(2)),
//       count: validValues.length
//     };
//   }, []);

//   // Calculate percentage change
//   const calculateChange = useCallback((current, avg, min, max) => {
//     if (current === null || avg === null || avg === undefined) return 0;
//     const range = max - min;
//     if (range === 0) return 0;
//     return Number(((current - avg) / range * 100).toFixed(1));
//   }, []);

//   // Optimized stream data processing with throttling
//   const processStreamData = useCallback((data) => {
//     if (!data.analog?.length) return;

//     const now = Date.now();
    
//     // Throttle updates to match server interval
//     if (now - lastUpdateRef.current < UPDATE_THROTTLE_MS) {
//       return;
//     }
    
//     lastUpdateRef.current = now;

//     // Clear any pending update
//     if (updateTimeoutRef.current) {
//       clearTimeout(updateTimeoutRef.current);
//     }

//     // Process in the next frame for smooth UI
//     updateTimeoutRef.current = requestAnimationFrame(() => {
//       const ts = data.timestamp || now;
//       const newLatest = data.analog;
      
//       setLatest(newLatest);
      
//       setHistory(prev => {
//         const updated = { ...prev };
//         const newStats = {};

//         // Process all signals in one pass
//         newLatest.forEach((sig, index) => {
//           const tag = sig.tag;
//           if (!updated[tag]) {
//             updated[tag] = [];
//           }
          
//           // Add new data point
//           updated[tag] = [
//             ...updated[tag],
//             { 
//               time: ts, 
//               value: sig.value !== null ? Number(sig.value.toFixed(3)) : null 
//             }
//           ].slice(-MAX_POINTS);

//           // Calculate stats for this signal
//           const signalStats = calculateStats(updated[tag]);
//           if (signalStats) {
//             newStats[tag] = signalStats;
//           }
//         });

//         // Batch stats update
//         setStats(prev => ({ ...prev, ...newStats }));
//         return updated;
//       });
//     });
//   }, [calculateStats]);

//   // Format time with memoization
//   const formatTime = useCallback((timestamp) => {
//     const date = new Date(timestamp);
//     return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
//   }, []);

//   // Get color for signal
//   const getSignalColor = useCallback((index) => 
//     signalColors[index % signalColors.length], 
//     []
//   );

//   // Optimized SSE connection with reconnection logic
//   useEffect(() => {
//     let reconnectTimeout;
//     let isMounted = true;

//     const connect = () => {
//       try {
//         if (eventSourceRef.current) {
//           eventSourceRef.current.close();
//         }

//         eventSourceRef.current = new EventSource(STREAM_URL);

//         eventSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setConnected(true);
//           console.log('SSE Connected');
//         };

//         eventSourceRef.current.onmessage = (event) => {
//           if (!isMounted) return;
//           try {
//             const data = JSON.parse(event.data);
//             processStreamData(data);
//           } catch (err) {
//             console.error("Parse error:", err);
//           }
//         };

//         eventSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           console.error('SSE Error:', error);
//           setConnected(false);
          
//           if (eventSourceRef.current) {
//             eventSourceRef.current.close();
//             eventSourceRef.current = null;
//           }
          
//           // Exponential backoff for reconnection
//           if (isMounted) {
//             reconnectTimeout = setTimeout(() => {
//               if (isMounted) connect();
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("Connection error:", err);
//         setConnected(false);
//       }
//     };

//     connect();

//     return () => {
//       isMounted = false;
      
//       if (reconnectTimeout) {
//         clearTimeout(reconnectTimeout);
//       }
      
//       if (eventSourceRef.current) {
//         eventSourceRef.current.close();
//         eventSourceRef.current = null;
//       }
      
//       if (updateTimeoutRef.current) {
//         cancelAnimationFrame(updateTimeoutRef.current);
//       }
//     };
//   }, [processStreamData]);

//   // Custom tooltip component for better performance
//   const CustomTooltip = useCallback(({ active, payload, label }) => {
//     if (!active || !payload || !payload.length) return null;
    
//     return (
//       <div className="bg-gray-800 border border-gray-700 rounded p-2 shadow-lg">
//         <p className="text-xs text-gray-400 mb-1">{formatTime(label)}</p>
//         {payload.map((pld, index) => (
//           <p key={index} className="text-xs font-medium" style={{ color: pld.color }}>
//             {pld.dataKey}: <span className="text-white font-bold">{pld.value?.toFixed(3) ?? '--'}</span>
//           </p>
//         ))}
//       </div>
//     );
//   }, [formatTime]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 p-3 md:p-4">
//       {/* Status Bar */}
//       <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//           <div className="flex items-center space-x-3">
//             <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//             <h1 className="text-lg font-bold">ANALOG SIGNAL MONITOR</h1>
//             <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
//               {Object.keys(history).length} ACTIVE SIGNALS
//             </span>
//           </div>
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs text-gray-400">
//             <div className="flex items-center gap-3">
//               <span>{MAX_POINTS} SAMPLES</span>
//               <span className={`px-2 py-1 rounded ${connected ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
//                 {connected ? 'LIVE STREAM' : 'OFFLINE'}
//               </span>
//             </div>
//             <span className="text-gray-500">200ms INTERVAL</span>
//           </div>
//         </div>
//       </div>

//       {/* Current Values - Compact Overview */}
//       {latest.length > 0 && (
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">LIVE SIGNAL VALUES</h2>
//             <span className="text-xs text-gray-500">Updated every 200ms</span>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
//             {latest.map((item, index) => {
//               const signalStats = stats[item.tag];
//               const change = signalStats ? calculateChange(
//                 item.value, 
//                 signalStats.avg, 
//                 signalStats.min, 
//                 signalStats.max
//               ) : 0;

//               {/* const getChangeClass = () => {
//                 const absChange = Math.abs(change);
//                 if (absChange > 15) return 'bg-red-900/60 text-red-300';
//                 if (absChange > 5) return 'bg-yellow-900/60 text-yellow-300';
//                 if (change > 0) return 'bg-green-900/60 text-green-300';
//                 if (change < 0) return 'bg-blue-900/60 text-blue-300';
//                 return 'bg-gray-800 text-gray-400';
//               }; */}

//               return (
//                 <div
//                   key={`live-${item.tag}`}
//                   className="bg-gray-800 p-3 rounded border border-gray-700 hover:border-blue-500 transition-colors"
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex-1 min-w-0">
//                       <div className="text-xs font-medium text-gray-300 truncate" title={item.tag}>
//                         {item.tag}
//                       </div>
//                       <div className="text-[10px] text-gray-500 font-mono truncate">
//                         {item.address}
//                       </div>
//                     </div>
//                     {/* <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getChangeClass()}`}>
//                       {change > 0 ? '▲' : change < 0 ? '▼' : '●'} {Math.abs(change)}%
//                     </div> */}
//                   </div>
                  
//                   <div className="text-lg font-bold font-mono text-white mb-1">
//                     {item.value !== null ? item.value.toFixed(2) : '--'}
//                   </div>

//                   {signalStats && (
//                     <div className="pt-2 border-t border-gray-700">
//                       <div className="grid grid-cols-3 gap-1 text-[10px]">
//                         <div className="text-center">
//                           <div className="text-gray-500">MIN</div>
//                           <div className="font-medium text-gray-300" title={signalStats.min}>
//                             {signalStats.min}
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-gray-500">AVG</div>
//                           <div className="font-medium text-gray-300" title={signalStats.avg}>
//                             {signalStats.avg}
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-gray-500">MAX</div>
//                           <div className="font-medium text-gray-300" title={signalStats.max}>
//                             {signalStats.max}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Full-Width Charts - One after another */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between mb-2">
//           <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">SIGNAL TRENDS</h2>
//           <span className="text-xs text-gray-500">{Object.keys(history).length} charts • {MAX_POINTS} samples each</span>
//         </div>

//         {Object.entries(history).map(([tag, data], index) => {
//           const signalStats = stats[tag];
//           const currentValue = latest.find(sig => sig.tag === tag)?.value;
//           const color = getSignalColor(index);
//           const change = signalStats ? calculateChange(
//             currentValue, 
//             signalStats.avg, 
//             signalStats.min, 
//             signalStats.max
//           ) : 0;

//           const getTrendStatus = () => {
//             const absChange = Math.abs(change);
//             {/* if (absChange > 15) return { text: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-700' };
//             if (absChange > 5) return { text: 'WARNING', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-700' };
//             if (change > 0) return { text: 'RISING', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700' };
//             if (change < 0) return { text: 'FALLING', color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-700' }; */}
//             return { text: 'STABLE', color: 'text-gray-400', bg: 'bg-gray-800', border: 'border-gray-700' };
//           };

//           const trendStatus = getTrendStatus();

//           return (
//             <div
//               key={`chart-${tag}`}
//               className={`bg-gray-800 rounded-lg border ${trendStatus.border} transition-all duration-300 hover:border-opacity-100`}
//             >
//               {/* Chart Header */}
//               <div className="p-4 border-b border-gray-700">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//                   <div className="flex items-center space-x-3">
//                     <div
//                       className="w-3 h-3 rounded-full"
//                       style={{ backgroundColor: color }}
//                     ></div>
//                     <div>
//                       <div className="text-lg font-bold text-white truncate max-w-md" title={tag}>
//                         {tag}
//                       </div>
//                       <div className="text-xs text-gray-500 font-mono mt-1">
//                         Address: {data[0]?.address || 'N/A'}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-3">
//                     <div className={`px-3 py-1 rounded-full text-xs font-bold ${trendStatus.bg} ${trendStatus.color} border ${trendStatus.border}`}>
//                       {trendStatus.text}
//                     </div>
//                     <div className="text-right">
//                       <div className="text-xs text-gray-500">CURRENT VALUE</div>
//                       <div className="text-xl font-bold font-mono text-white">
//                         {currentValue !== null ? currentValue.toFixed(3) : '--'}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Stats Row */}
//                 {signalStats && (
//                   <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="text-center">
//                       <div className="text-xs text-gray-500 mb-1">MINIMUM</div>
//                       <div className="text-sm font-bold font-mono text-gray-300">
//                         {signalStats.min}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-xs text-gray-500 mb-1">AVERAGE</div>
//                       <div className="text-sm font-bold font-mono text-gray-300">
//                         {signalStats.avg}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-xs text-gray-500 mb-1">MAXIMUM</div>
//                       <div className="text-sm font-bold font-mono text-gray-300">
//                         {signalStats.max}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-xs text-gray-500 mb-1">DEVIATION</div>
//                       <div className={`text-sm font-bold font-mono ${trendStatus.color}`}>
//                         {change}%
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Full-Width Chart */}
//               <div className="p-4">
//                 <div className="h-72">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                       data={[...data].reverse()}
//                       margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
//                     >
//                       <CartesianGrid 
//                         strokeDasharray="3 3" 
//                         stroke="#374151" 
//                         strokeOpacity={0.5}
//                       />
//                       <XAxis
//                         dataKey="time"
//                         tickFormatter={formatTime}
//                         fontSize={10}
//                         tick={{ fill: '#9ca3af' }}
//                         axisLine={{ stroke: '#4b5563' }}
//                         tickLine={{ stroke: '#4b5563' }}
//                         minTickGap={20}
//                       />
//                       <YAxis
//                         fontSize={10}
//                         tick={{ fill: '#9ca3af' }}
//                         axisLine={{ stroke: '#4b5563' }}
//                         tickLine={{ stroke: '#4b5563' }}
//                         width={50}
//                         tickFormatter={(v) => v?.toFixed(2)}
//                       />
//                       <Tooltip
//                         content={<CustomTooltip />}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="value"
//                         stroke={color}
//                         strokeWidth={2}
//                         dot={false}
//                         activeDot={{
//                           r: 4,
//                           fill: color,
//                           stroke: '#ffffff',
//                           strokeWidth: 2
//                         }}
//                         isAnimationActive={false}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Chart Footer */}
//               <div className="p-4 border-t border-gray-700 bg-gray-900/50 rounded-b-lg">
//                 <div className="text-xs text-gray-500 flex justify-between items-center">
//                   <span>Samples: {data.length} / {MAX_POINTS}</span>
//                   <span>Range: {signalStats ? (signalStats.max - signalStats.min).toFixed(3) : '--'}</span>
//                   <span>Updated: {data.length > 0 ? formatTime(data[data.length - 1].time) : '--'}</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {Object.keys(history).length === 0 && (
//           <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
//             <div className="text-lg text-gray-400 mb-2">No signal data available</div>
//             <div className="text-sm text-gray-500">
//               {connected ? 'Waiting for data stream...' : 'Connecting to data source...'}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* System Status Footer */}
//       <div className="mt-6 pt-4 border-t border-gray-800">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               <span>STABLE (±5%)</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
//               <span>WARNING (±5-15%)</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-red-500"></div>
//               <span>CRITICAL (&gt;±15%)</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center gap-2">
//               <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//               <span>STREAM: {connected ? 'ACTIVE' : 'DISCONNECTED'}</span>
//             </div>
//             <div className="text-gray-600 mt-1">INDUSTRIAL ANALYTICS v1.0</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
















import { useEffect, useState, useCallback, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const STREAM_URL = "https://mqtt-testing-2.onrender.com/api/v1/stream/analog";
const MAX_POINTS = 40;
const UPDATE_THROTTLE_MS = 200;

export default function AnalogStream() {
  const [connected, setConnected] = useState(false);
  const [latest, setLatest] = useState([]);
  const [history, setHistory] = useState({});
  const [stats, setStats] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(true); // Added theme state
  const lastUpdateRef = useRef(Date.now());
  const updateTimeoutRef = useRef(null);
  const eventSourceRef = useRef(null);

  // Professional color schemes for both themes
  const darkThemeColors = {
    primary: '#3b82f6',     // Blue
    secondary: '#10b981',   // Green
    tertiary: '#8b5cf6',    // Purple
    warning: '#f59e0b',     // Amber
    danger: '#ef4444',      // Red
    success: '#06b6d4',     // Cyan
    accent: '#84cc16',      // Lime
    highlight: '#ec4899'    // Pink
  };

  const lightThemeColors = {
    primary: '#2563eb',     // Deeper Blue
    secondary: '#059669',   // Deeper Green
    tertiary: '#7c3aed',    // Deeper Purple
    warning: '#d97706',     // Deeper Amber
    danger: '#dc2626',      // Deeper Red
    success: '#0891b2',     // Deeper Cyan
    accent: '#65a30d',      // Deeper Lime
    highlight: '#db2777'    // Deeper Pink
  };

  // Theme-based signal colors
  const signalColors = Object.values(isDarkMode ? darkThemeColors : lightThemeColors);

  // Theme-based styling
  const themeStyles = {
    // Backgrounds
    bg: {
      primary: isDarkMode ? 'bg-gray-900' : 'bg-gray-300',
      secondary: isDarkMode ? 'bg-gray-800' : 'bg-white',
      card: isDarkMode ? 'bg-gray-800/90' : 'bg-white/90',
      hover: isDarkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-600',
    },
    
    // Text
    text: {
      primary: isDarkMode ? 'text-gray-200' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
      tertiary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
      muted: isDarkMode ? 'text-gray-500' : 'text-gray-500',
      accent: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      success: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
      warning: isDarkMode ? 'text-amber-400' : 'text-amber-600',
      danger: isDarkMode ? 'text-red-400' : 'text-red-600',
    },
    
    // Borders
    border: {
      primary: isDarkMode ? 'border-gray-700' : 'border-gray-300',
      secondary: isDarkMode ? 'border-gray-600' : 'border-gray-400',
      accent: isDarkMode ? 'border-blue-500' : 'border-blue-400',
      success: isDarkMode ? 'border-emerald-500' : 'border-emerald-400',
      warning: isDarkMode ? 'border-amber-500' : 'border-amber-400',
      danger: isDarkMode ? 'border-red-500' : 'border-red-400',
    },
    
    // Status Indicators
    status: {
      connected: isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400',
      disconnected: isDarkMode ? 'bg-red-500' : 'bg-red-400',
      stable: isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400',
      warning: isDarkMode ? 'bg-amber-500' : 'bg-amber-400',
      critical: isDarkMode ? 'bg-red-500' : 'bg-red-400',
    },
    
    // Cards and Panels
    card: {
      bg: isDarkMode ? 'bg-gray-800/80' : 'bg-white/80 backdrop-blur-sm',
      border: isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50',
      // shadow: isDarkMode ? 'shadow-lg shadow-black/20' : 'shadow-lg shadow-gray-200/50',
    },
  };

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Memoized statistics calculation
  const calculateStats = useCallback((data) => {
    const validValues = data.map(d => d.value).filter(v => v !== null && !isNaN(v));
    if (validValues.length === 0) return null;
    
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
    
    if (now - lastUpdateRef.current < UPDATE_THROTTLE_MS) {
      return;
    }
    
    lastUpdateRef.current = now;

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = requestAnimationFrame(() => {
      const ts = data.timestamp || now;
      const newLatest = data.analog;
      
      setLatest(newLatest);
      
      setHistory(prev => {
        const updated = { ...prev };
        const newStats = {};

        newLatest.forEach((sig, index) => {
          const tag = sig.tag;
          if (!updated[tag]) {
            updated[tag] = [];
          }
          
          updated[tag] = [
            ...updated[tag],
            { 
              time: ts, 
              value: sig.value !== null ? Number(sig.value.toFixed(3)) : null 
            }
          ].slice(-MAX_POINTS);

          const signalStats = calculateStats(updated[tag]);
          if (signalStats) {
            newStats[tag] = signalStats;
          }
        });

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
    [signalColors]
  );

  // Custom tooltip component
  const CustomTooltip = useCallback(({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    
    const tooltipBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const tooltipBorder = isDarkMode ? 'border-gray-700' : 'border-gray-300';
    const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
    
    return (
      <div className={`${tooltipBg} border ${tooltipBorder} rounded-lg p-3 shadow-xl backdrop-blur-sm`}>
        <p className={`text-xs ${textMuted} mb-2 font-medium`}>{formatTime(label)}</p>
        {payload.map((pld, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: pld.color }}>
            {pld.dataKey}: <span className={`font-bold ${textPrimary}`}>{pld.value?.toFixed(3) ?? '--'}</span>
          </p>
        ))}
      </div>
    );
  }, [formatTime, isDarkMode]);

  // Optimized SSE connection
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
          
          if (isMounted) {
            reconnectTimeout = setTimeout(() => {
              if (isMounted) connect();
            }, 1000);
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

  return (
    <div className={`min-h-screen ${themeStyles.bg.primary} ${themeStyles.text.primary} transition-colors duration-300 p-3 md:p-4`}>
      
      {/* Status Bar with Theme Toggle */}
      <div className={`mb-4 p-4 rounded-xl ${themeStyles.card.bg} ${themeStyles.card.border} ${themeStyles.card.shadow} backdrop-blur-sm`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${connected ? themeStyles.status.connected : themeStyles.status.disconnected} ${connected ? 'animate-pulse' : ''}`}></div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              ANALOG SIGNAL MONITOR
            </h1>
            <span className={`text-xs ${themeStyles.text.tertiary} ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} px-2 py-1 rounded`}>
              {Object.keys(history).length} ACTIVE SIGNALS
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' 
                  : 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
              }`}
              aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDarkMode ? (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {/* <span className="text-xs text-gray-300 hidden sm:inline">Light Mode</span> */}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  {/* <span className="text-xs text-blue-700 hidden sm:inline">Dark Mode</span> */}
                </div>
              )}
            </button>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className={themeStyles.text.muted}>{MAX_POINTS} SAMPLES</span>
                <span className={`px-2.5 py-1 rounded-full font-medium ${
                  connected 
                    ? (isDarkMode ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-300') 
                    : (isDarkMode ? 'bg-red-900/30 text-red-300 border border-red-700/30' : 'bg-red-100 text-red-700 border border-red-300')
                }`}>
                  {connected ? 'LIVE STREAM' : 'OFFLINE'}
                </span>
              </div>
              <span className={`${themeStyles.text.muted} hidden sm:block`}>200ms INTERVAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Values - Compact Overview */}
      {latest.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-sm font-semibold ${themeStyles.text.secondary} uppercase tracking-wide`}>
              LIVE SIGNAL VALUES
            </h2>
            <span className={`text-xs ${themeStyles.text.muted}`}>Updated every 200ms</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {latest.map((item, index) => {
              const signalStats = stats[item.tag];
              const change = signalStats ? calculateChange(
                item.value, 
                signalStats.avg, 
                signalStats.min, 
                signalStats.max
              ) : 0;

              return (
                <div
                  key={`live-${item.tag}`}
                  className={`p-3.5 rounded-xl border transition-all duration-300 ${themeStyles.card.shadow} ${
                    isDarkMode 
                      ? 'bg-gray-800/80 border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800' 
                      : 'bg-gray-50 border-gray-300/50 hover:border-blue-400/50 hover:bg-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold ${themeStyles.text.secondary} truncate`} title={item.tag}>
                        {item.tag}
                      </div>
                      <div className={`text-[10px] ${themeStyles.text.muted} font-mono truncate mt-0.5`}>
                        {item.address}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`text-lg font-bold font-mono ${themeStyles.text.primary} mb-2`}>
                    {item.value !== null ? item.value.toFixed(2) : '--'}
                  </div>

                  {signalStats && (
                    <div className="pt-2.5 border-t border-gray-700/30">
                      <div className="grid grid-cols-3 gap-2 text-[10px]">
                        <div className="text-center">
                          <div className={`${themeStyles.text.muted} mb-1`}>MIN</div>
                          <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.min}>
                            {signalStats.min}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`${themeStyles.text.muted} mb-1`}>AVG</div>
                          <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.avg}>
                            {signalStats.avg}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`${themeStyles.text.muted} mb-1`}>MAX</div>
                          <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.max}>
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

      {/* Full-Width Charts */}
      <div className="space-y-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-sm font-semibold ${themeStyles.text.secondary} uppercase tracking-wide`}>
            SIGNAL TRENDS
          </h2>
          <span className={`text-xs ${themeStyles.text.muted}`}>
            {Object.keys(history).length} charts • {MAX_POINTS} samples each
          </span>
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
            if (absChange > 15) return { 
              text: 'CRITICAL', 
              color: isDarkMode ? 'text-red-300' : 'text-red-600', 
              bg: isDarkMode ? 'bg-red-900/20' : 'bg-red-100', 
              border: isDarkMode ? 'border-red-700/50' : 'border-red-300' 
            };
            if (absChange > 5) return { 
              text: 'WARNING', 
              color: isDarkMode ? 'text-amber-300' : 'text-amber-600', 
              bg: isDarkMode ? 'bg-amber-900/20' : 'bg-amber-100', 
              border: isDarkMode ? 'border-amber-700/50' : 'border-amber-300' 
            };
            if (change > 0) return { 
              text: 'RISING', 
              color: isDarkMode ? 'text-emerald-300' : 'text-emerald-600', 
              bg: isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-100', 
              border: isDarkMode ? 'border-emerald-700/50' : 'border-emerald-300' 
            };
            if (change < 0) return { 
              text: 'FALLING', 
              color: isDarkMode ? 'text-blue-300' : 'text-blue-600', 
              bg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100', 
              border: isDarkMode ? 'border-blue-700/50' : 'border-blue-300' 
            };
            return { 
              text: 'STABLE', 
              color: isDarkMode ? 'text-gray-400' : 'text-gray-600', 
              bg: isDarkMode ? 'bg-gray-800' : 'bg-gray-200', 
              border: isDarkMode ? 'border-gray-700' : 'border-gray-400' 
            };
          };

          const trendStatus = getTrendStatus();

          return (
            <div
              key={`chart-${tag}`}
              className={`rounded-xl border ${trendStatus.border} transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/80 backdrop-blur-sm' 
                  : 'bg-white/90 backdrop-blur-sm'
              } ${themeStyles.card.shadow}`}
            >
              {/* Chart Header */}
              <div className="p-5 border-b border-gray-700/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-4 h-4 rounded-full shadow-lg"
                      style={{ backgroundColor: color }}
                    ></div>
                    <div>
                      <div className={`text-lg font-bold ${themeStyles.text.primary} truncate max-w-md`} title={tag}>
                        {tag}
                      </div>
                      <div className={`text-xs ${themeStyles.text.muted} font-mono mt-1`}>
                        Address: {latest.find(sig => sig.tag === tag)?.address || 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${trendStatus.bg} ${trendStatus.color} border ${trendStatus.border} backdrop-blur-sm`}>
                      {trendStatus.text}
                    </div>
                    <div className="text-right">
                      <div className={`text-xs ${themeStyles.text.muted}`}>CURRENT VALUE</div>
                      <div className={`text-xl font-bold font-mono ${themeStyles.text.primary}`}>
                        {currentValue !== null ? currentValue.toFixed(3) : '--'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Row */}
                {signalStats && (
                  <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className={`text-xs ${themeStyles.text.muted} mb-1.5`}>MINIMUM</div>
                      <div className={`text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
                        {signalStats.min}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-xs ${themeStyles.text.muted} mb-1.5`}>AVERAGE</div>
                      <div className={`text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
                        {signalStats.avg}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-xs ${themeStyles.text.muted} mb-1.5`}>MAXIMUM</div>
                      <div className={`text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
                        {signalStats.max}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-xs ${themeStyles.text.muted} mb-1.5`}>DEVIATION</div>
                      <div className={`text-sm font-bold font-mono ${trendStatus.color}`}>
                        {change}%
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Full-Width Chart */}
              <div className="p-5">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[...data].reverse()}
                      margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={isDarkMode ? '#374151' : '#e5e7eb'} 
                        strokeOpacity={isDarkMode ? 0.5 : 0.3}
                      />
                      <XAxis
                        dataKey="time"
                        tickFormatter={formatTime}
                        fontSize={10}
                        tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                        axisLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
                        tickLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
                        minTickGap={20}
                      />
                      <YAxis
                        fontSize={10}
                        tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                        axisLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
                        tickLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
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
                          r: 5,
                          fill: color,
                          stroke: isDarkMode ? '#ffffff' : '#1f2937',
                          strokeWidth: 2
                        }}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart Footer */}
              <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700/50 bg-gray-900/50' : 'border-gray-300/50 bg-gray-50/50'} rounded-b-xl`}>
                <div className={`text-xs ${themeStyles.text.muted} flex flex-col sm:flex-row justify-between items-center gap-2`}>
                  <span>Samples: {data.length} / {MAX_POINTS}</span>
                  <span>Range: {signalStats ? (signalStats.max - signalStats.min).toFixed(3) : '--'}</span>
                  <span>Updated: {data.length > 0 ? formatTime(data[data.length - 1].time) : '--'}</span>
                </div>
              </div>
            </div>
          );
        })}

        {Object.keys(history).length === 0 && (
          <div className={`rounded-xl border ${themeStyles.border.primary} p-10 text-center backdrop-blur-sm ${
            isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
          }`}>
            <div className={`text-lg ${themeStyles.text.secondary} mb-3`}>No signal data available</div>
            <div className={`text-sm ${themeStyles.text.muted}`}>
              {connected ? 'Waiting for data stream...' : 'Connecting to data source...'}
            </div>
          </div>
        )}
      </div>

      {/* System Status Footer */}
      <div className={`mt-7 pt-5 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2.5 h-2.5 rounded-full ${themeStyles.status.stable}`}></div>
              <span className={themeStyles.text.tertiary}>STABLE (±5%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2.5 h-2.5 rounded-full ${themeStyles.status.warning}`}></div>
              <span className={themeStyles.text.tertiary}>WARNING (±5-15%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2.5 h-2.5 rounded-full ${themeStyles.status.critical}`}></div>
              <span className={themeStyles.text.tertiary}>CRITICAL (&gt;±15%)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2.5 h-2.5 rounded-full ${connected ? themeStyles.status.connected : themeStyles.status.disconnected} ${connected ? 'animate-pulse' : ''}`}></div>
              <span className={themeStyles.text.tertiary}>
                STREAM: {connected ? 'ACTIVE' : 'DISCONNECTED'}
              </span>
            </div>
            <div className={`${themeStyles.text.muted} flex items-center gap-2`}>
              <span>INDUSTRIAL ANALYTICS v1.0</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'}`}></span>
                {isDarkMode ? 'Dark' : 'Light'} Theme
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}









// /////////////////////graph change from right-left to left-
// import { useEffect, useState, useCallback, useRef } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const STREAM_URL = "https://mqtt-testing-2.onrender.com/api/v1/stream/analog";
// const MAX_POINTS = 40;
// const UPDATE_THROTTLE_MS = 200; // Match server's 200ms interval

// export default function AnalogStream() {
//   const [connected, setConnected] = useState(false);
//   const [latest, setLatest] = useState([]);
//   const [history, setHistory] = useState({});
//   const [stats, setStats] = useState({});
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const lastUpdateRef = useRef(Date.now());
//   const updateTimeoutRef = useRef(null);
//   const eventSourceRef = useRef(null);

//   // Load theme preference
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('analog-theme');
//     if (savedTheme === 'light') {
//       setIsDarkMode(false);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem('analog-theme', newMode ? 'dark' : 'light');
//   };

//   // Professional color schemes for both themes
//   const signalColors = isDarkMode 
//     ? [
//         '#3b82f6', 
//         '#10b981', 
//         '#8b5cf6', // Violet
//         '#f59e0b', // Amber
//         '#ef4444', // Red
//         '#06b6d4', // Cyan
//         '#84cc16', // Lime
//         '#ec4899'  // Pink
//       ]
//     : [
//         '#2563eb',
//         '#059669', // Professional Green
//         '#7c3aed', // Professional Purple
//         '#d97706', // Professional Orange
//         '#dc2626', // Professional Red
//         '#0891b2', // Professional Teal
//         '#65a30d', // Professional Olive
//         '#c026d3'  // Professional Magenta
//       ];

//   // Theme-based styling
//   const theme = {
//     dark: {
//       bg: 'bg-gray-900',
//       bgSecondary: 'bg-gray-800',
//       bgTertiary: 'bg-gray-700',
//       border: 'border-gray-700',
//       borderLight: 'border-gray-600',
//       text: 'text-gray-200',
//       textSecondary: 'text-gray-400',
//       textTertiary: 'text-gray-500',
//       chartGrid: '#374151',
//       cardBg: 'bg-gray-800',
//       hover: 'hover:border-blue-500'
//     },
//     light: {
//       bg: 'bg-gray-50',
//       bgSecondary: 'bg-white',
//       bgTertiary: 'bg-gray-100',
//       border: 'border-gray-300',
//       borderLight: 'border-gray-200',
//       text: 'text-gray-800',
//       textSecondary: 'text-gray-600',
//       textTertiary: 'text-gray-500',
//       chartGrid: '#e5e7eb',
//       cardBg: 'bg-white',
//       hover: 'hover:border-blue-400 hover:shadow-sm'
//     }
//   };

//   const currentTheme = isDarkMode ? theme.dark : theme.light;

//   // Memoized statistics calculation
//   const calculateStats = useCallback((data) => {
//     const validValues = data.map(d => d.value).filter(v => v !== null && !isNaN(v));
//     if (validValues.length === 0) return null;
    
//     const { min, max, sum } = validValues.reduce((acc, val) => {
//       if (val < acc.min) acc.min = val;
//       if (val > acc.max) acc.max = val;
//       acc.sum += val;
//       return acc;
//     }, { min: Infinity, max: -Infinity, sum: 0 });
    
//     return { 
//       min: Number(min.toFixed(2)), 
//       max: Number(max.toFixed(2)), 
//       avg: Number((sum / validValues.length).toFixed(2)),
//       count: validValues.length
//     };
//   }, []);

//   // Calculate percentage change
//   const calculateChange = useCallback((current, avg, min, max) => {
//     if (current === null || avg === null || avg === undefined) return 0;
//     const range = max - min;
//     if (range === 0) return 0;
//     return Number(((current - avg) / range * 100).toFixed(1));
//   }, []);

//   // Optimized stream data processing with left-to-right flow
//   const processStreamData = useCallback((data) => {
//     if (!data.analog?.length) return;

//     const now = Date.now();
    
//     if (now - lastUpdateRef.current < UPDATE_THROTTLE_MS) {
//       return;
//     }
    
//     lastUpdateRef.current = now;

//     if (updateTimeoutRef.current) {
//       clearTimeout(updateTimeoutRef.current);
//     }

//     updateTimeoutRef.current = requestAnimationFrame(() => {
//       const ts = now; // Use current time for consistency
//       const newLatest = data.analog;
      
//       setLatest(newLatest);
      
//       setHistory(prev => {
//         const updated = { ...prev };
//         const newStats = {};

//         newLatest.forEach((sig, index) => {
//           const tag = sig.tag;
          
//           if (!updated[tag]) {
//             updated[tag] = [];
//           }
          
//           // Create new data point with unique time
//           const newDataPoint = { 
//             time: ts + index, // Add index to ensure unique timestamps
//             value: sig.value !== null ? Number(sig.value.toFixed(3)) : null,
//             displayTime: formatTime(ts) // Store formatted time for display
//           };
          
//           // Add to end for left-to-right flow
//           updated[tag] = [...updated[tag], newDataPoint];
          
//           // Keep only latest MAX_POINTS (remove from beginning)
//           if (updated[tag].length > MAX_POINTS) {
//             updated[tag] = updated[tag].slice(-MAX_POINTS);
//           }

//           // Calculate stats
//           const signalStats = calculateStats(updated[tag]);
//           if (signalStats) {
//             newStats[tag] = signalStats;
//           }
//         });

//         setStats(prev => ({ ...prev, ...newStats }));
//         return updated;
//       });
//     });
//   }, [calculateStats]);

//   // Format time with memoization - FIXED for left-to-right
//   const formatTime = useCallback((timestamp) => {
//     const date = new Date(timestamp);
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const seconds = date.getSeconds().toString().padStart(2, '0');
//     const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
//     return `${hours}:${minutes}:${seconds}.${milliseconds}`;
//   }, []);

//   // Get color for signal
//   const getSignalColor = useCallback((index) => 
//     signalColors[index % signalColors.length], 
//     [signalColors]
//   );

//   // Custom tooltip component
//   const CustomTooltip = useCallback(({ active, payload, label }) => {
//     if (!active || !payload || !payload.length) return null;
    
//     const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
//     const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';
//     const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-600';
//     const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
    
//     return (
//       <div className={`${bgColor} border ${borderColor} rounded-lg p-3 shadow-xl`}>
//         <p className={`text-xs ${textSecondary} mb-2 font-medium`}>{formatTime(label)}</p>
//         {payload.map((pld, index) => (
//           <div key={index} className="flex items-center justify-between mb-1 last:mb-0">
//             <span className="text-xs font-medium" style={{ color: pld.color }}>
//               {pld.dataKey}
//             </span>
//             <span className={`text-xs font-bold ${textPrimary} ml-3`}>
//               {pld.value?.toFixed(3) ?? '--'}
//             </span>
//           </div>
//         ))}
//       </div>
//     );
//   }, [formatTime, isDarkMode]);

//   // Optimized SSE connection
//   useEffect(() => {
//     let reconnectTimeout;
//     let isMounted = true;

//     const connect = () => {
//       try {
//         if (eventSourceRef.current) {
//           eventSourceRef.current.close();
//         }

//         eventSourceRef.current = new EventSource(STREAM_URL);

//         eventSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setConnected(true);
//         };

//         eventSourceRef.current.onmessage = (event) => {
//           if (!isMounted) return;
//           try {
//             const data = JSON.parse(event.data);
//             processStreamData(data);
//           } catch (err) {
//             console.error("Parse error:", err);
//           }
//         };

//         eventSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           console.error('SSE Error:', error);
//           setConnected(false);
          
//           if (eventSourceRef.current) {
//             eventSourceRef.current.close();
//             eventSourceRef.current = null;
//           }
          
//           if (isMounted) {
//             reconnectTimeout = setTimeout(() => {
//               if (isMounted) connect();
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("Connection error:", err);
//         setConnected(false);
//       }
//     };

//     connect();

//     return () => {
//       isMounted = false;
      
//       if (reconnectTimeout) {
//         clearTimeout(reconnectTimeout);
//       }
      
//       if (eventSourceRef.current) {
//         eventSourceRef.current.close();
//         eventSourceRef.current = null;
//       }
      
//       if (updateTimeoutRef.current) {
//         cancelAnimationFrame(updateTimeoutRef.current);
//       }
//     };
//   }, [processStreamData]);

//   return (
//     <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} p-3 md:p-4 transition-colors duration-300`}>
//       {/* Status Bar with Theme Toggle */}
//       <div className={`mb-4 p-4 rounded-xl border ${currentTheme.border} ${currentTheme.cardBg} shadow-sm`}>
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//           <div className="flex items-center space-x-3">
//             <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//             <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               ANALOG SIGNAL MONITOR
//             </h1>
//             <span className={`text-xs ${currentTheme.textSecondary} ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} px-3 py-1.5 rounded-full font-medium`}>
//               {Object.keys(history).length} ACTIVE SIGNALS
//             </span>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs">
//               <span className={currentTheme.textTertiary}>{MAX_POINTS} SAMPLES</span>
//               <span className={`px-3 py-1.5 rounded-full font-medium ${
//                 connected 
//                   ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700 border border-green-200')
//                   : (isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700 border border-red-200')
//               }`}>
//                 {connected ? 'LIVE STREAM' : 'OFFLINE'}
//               </span>
//             </div>
            
//             {/* Theme Toggle Button */}
//             <button
//               onClick={toggleTheme}
//               className={`p-2.5 rounded-full transition-all duration-300 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                   : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
//               } shadow-sm hover:shadow-md`}
//               aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//             >
//               {isDarkMode ? (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Current Values - Compact Overview */}
//       {latest.length > 0 && (
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-sm font-semibold uppercase tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               LIVE SIGNAL VALUES
//             </h2>
//             <span className={`text-xs ${currentTheme.textTertiary}`}>Updated every 200ms</span>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//             {latest.map((item, index) => {
//               const signalStats = stats[item.tag];
//               const change = signalStats ? calculateChange(
//                 item.value, 
//                 signalStats.avg, 
//                 signalStats.min, 
//                 signalStats.max
//               ) : 0;

//               return (
//                 <div
//                   key={`live-${item.tag}`}
//                   className={`${currentTheme.cardBg} p-4 rounded-xl border ${currentTheme.border} transition-all duration-300 ${currentTheme.hover}`}
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex-1 min-w-0">
//                       <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} truncate`} title={item.tag}>
//                         {item.tag}
//                       </div>
//                       <div className={`text-[10px] ${currentTheme.textTertiary} font-mono truncate mt-1`}>
//                         {item.address}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className={`text-xl font-bold font-mono mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     {item.value !== null ? item.value.toFixed(2) : '--'}
//                   </div>

//                   {signalStats && (
//                     <div className={`pt-3 border-t ${currentTheme.borderLight}`}>
//                       <div className="grid grid-cols-3 gap-1.5 text-[10px]">
//                         <div className="text-center">
//                           <div className={`${currentTheme.textTertiary} font-medium`}>MIN</div>
//                           <div className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`} title={signalStats.min}>
//                             {signalStats.min}
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <div className={`${currentTheme.textTertiary} font-medium`}>AVG</div>
//                           <div className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`} title={signalStats.avg}>
//                             {signalStats.avg}
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <div className={`${currentTheme.textTertiary} font-medium`}>MAX</div>
//                           <div className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`} title={signalStats.max}>
//                             {signalStats.max}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Full-Width Charts - Left to Right */}
//       <div className="space-y-6">
//         <div className="flex items-center justify-between mb-2">
//           <h2 className="text-sm font-semibold uppercase tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//             SIGNAL TRENDS
//           </h2>
//           <span className={`text-xs ${currentTheme.textTertiary}`}>
//             {Object.keys(history).length} charts • {MAX_POINTS} samples each
//           </span>
//         </div>

//         {Object.entries(history).map(([tag, data], index) => {
//           const signalStats = stats[tag];
//           const currentValue = latest.find(sig => sig.tag === tag)?.value;
//           const color = getSignalColor(index);
          
//           return (
//             <div
//               key={`chart-${tag}`}
//               className={`${currentTheme.cardBg} rounded-2xl border ${currentTheme.border} transition-all duration-300 ${isDarkMode ? '' : 'shadow-sm hover:shadow-md'}`}
//             >
//               {/* Chart Header */}
//               <div className={`p-5 border-b ${currentTheme.border}`}>
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                   <div className="flex items-center space-x-4">
//                     <div
//                       className="w-4 h-4 rounded-full shadow-lg"
//                       style={{ backgroundColor: color }}
//                     ></div>
//                     <div>
//                       <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate max-w-md`} title={tag}>
//                         {tag}
//                       </div>
//                       <div className={`text-xs ${currentTheme.textTertiary} font-mono mt-1`}>
//                         Address: {data[0]?.address || 'N/A'}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                     <div className={`px-4 py-2 rounded-full text-xs font-bold ${
//                       isDarkMode ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-700 border border-gray-300'
//                     }`}>
//                       STABLE
//                     </div>
//                     <div className="text-right">
//                       <div className={`text-xs ${currentTheme.textTertiary}`}>CURRENT VALUE</div>
//                       <div className={`text-2xl font-bold font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                         {currentValue !== null ? currentValue.toFixed(3) : '--'}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Stats Row */}
//                 {signalStats && (
//                   <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="text-center">
//                       <div className={`text-xs ${currentTheme.textTertiary} mb-2 font-medium`}>MINIMUM</div>
//                       <div className={`text-lg font-bold font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
//                         {signalStats.min}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className={`text-xs ${currentTheme.textTertiary} mb-2 font-medium`}>AVERAGE</div>
//                       <div className={`text-lg font-bold font-mono ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
//                         {signalStats.avg}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className={`text-xs ${currentTheme.textTertiary} mb-2 font-medium`}>MAXIMUM</div>
//                       <div className={`text-lg font-bold font-mono ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
//                         {signalStats.max}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className={`text-xs ${currentTheme.textTertiary} mb-2 font-medium`}>SAMPLES</div>
//                       <div className={`text-lg font-bold font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
//                         {signalStats.count}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Full-Width Chart - Left to Right */}
//               <div className="p-5">
//                 <div className="h-80">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                       data={[...data].reverse()}
//                       margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
//                     >
//                       <CartesianGrid 
//                         strokeDasharray="3 3" 
//                         stroke={currentTheme.chartGrid} 
//                         strokeOpacity={0.5}
//                       />
//                       <XAxis
//                         dataKey="time"
//                         tickFormatter={formatTime}
//                         fontSize={10}
//                         tick={{ fill: currentTheme.textSecondary }}
//                         axisLine={{ stroke: currentTheme.borderLight }}
//                         tickLine={{ stroke: currentTheme.borderLight }}
//                         minTickGap={30}
//                         // Ensure left-to-right flow
//                         domain={['dataMin', 'dataMax']}
//                         type="number"
//                         scale="time"
//                       />
//                       <YAxis
//                         fontSize={10}
//                         tick={{ fill: currentTheme.textSecondary }}
//                         axisLine={{ stroke: currentTheme.borderLight }}
//                         tickLine={{ stroke: currentTheme.borderLight }}
//                         width={50}
//                         tickFormatter={(v) => v?.toFixed(2)}
//                         domain={['auto', 'auto']}
//                       />
//                       <Tooltip
//                         content={<CustomTooltip />}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="value"
//                         stroke={color}
//                         strokeWidth={2.5}
//                         dot={false}
//                         activeDot={{
//                           r: 5,
//                           fill: color,
//                           stroke: isDarkMode ? '#ffffff' : '#1e293b',
//                           strokeWidth: 2
//                         }}
//                         isAnimationActive={true}
//                         animationDuration={300}
//                         animationEasing="ease-in-out"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Chart Footer */}
//               <div className={`p-4 border-t rounded-b-2xl ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
//                 <div className={`text-xs ${currentTheme.textTertiary} flex flex-col sm:flex-row justify-between items-center gap-2`}>
//                   <span className="font-medium">Samples: <span className="font-bold">{data.length}</span> / {MAX_POINTS}</span>
//                   <span className="font-medium">Range: <span className="font-bold">{signalStats ? (signalStats.max - signalStats.min).toFixed(3) : '--'}</span></span>
//                   <span className="font-medium">Last Update: <span className="font-bold">{data.length > 0 ? formatTime(data[data.length - 1].time) : '--'}</span></span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {Object.keys(history).length === 0 && (
//           <div className={`${currentTheme.cardBg} rounded-2xl border ${currentTheme.border} p-12 text-center shadow-sm`}>
//             <div className={`text-lg ${currentTheme.textSecondary} mb-3 font-medium`}>
//               No signal data available
//             </div>
//             <div className={`text-sm ${currentTheme.textTertiary}`}>
//               {connected ? 'Waiting for data stream...' : 'Connecting to data source...'}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* System Status Footer */}
//       <div className={`mt-8 pt-6 border-t ${currentTheme.border}`}>
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
//           <div className="flex flex-wrap items-center gap-4">
//             {[
//               { color: 'bg-green-500', label: 'STABLE (±5%)' },
//               { color: 'bg-yellow-500', label: 'WARNING (±5-15%)' },
//               { color: 'bg-red-500', label: 'CRITICAL (>±15%)' },
//               { color: 'bg-blue-500', label: 'CONNECTED' },
//               { color: 'bg-indigo-500', label: 'STREAMING' }
//             ].map((item, idx) => (
//               <div key={idx} className="flex items-center space-x-2">
//                 <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
//                 <span className={currentTheme.textTertiary}>{item.label}</span>
//               </div>
//             ))}
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className={`flex items-center gap-2 ${currentTheme.textTertiary}`}>
//               <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//               <span>STREAM: {connected ? 'ACTIVE' : 'DISCONNECTED'}</span>
//             </div>
            
//             <button
//               onClick={toggleTheme}
//               className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                   : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
//               } shadow-sm hover:shadow-md`}
//             >
//               {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
//             </button>
//           </div>
//         </div>
        
//         <div className={`text-center text-xs ${currentTheme.textTertiary} mt-4 pt-3 border-t ${currentTheme.borderLight}`}>
//           INDUSTRIAL ANALYTICS v1.0 • THEME: {isDarkMode ? 'DARK' : 'LIGHT'} • 200ms INTERVAL
//         </div>
//       </div>
//     </div>
//   );
// }
