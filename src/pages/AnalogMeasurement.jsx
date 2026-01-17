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












import { useEffect, useState, useCallback, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const STREAM_URL = "http://localhost:8000/api/v1/bts/streamanalog";
const MAX_POINTS = 40;

export default function AnalogStream() {
  const [connected, setConnected] = useState(false);
  const [latest, setLatest] = useState([]);
  const [history, setHistory] = useState({});
  const [stats, setStats] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(true);
  const updateTimeoutRef = useRef(null);

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('analog-theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('analog-theme', newMode ? 'dark' : 'light');
  };

  // Industrial color scheme
  const signalColors = [
    '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b',
    '#ef4444', '#06b6d4', '#84cc16', '#ec4899'
  ];

  // Calculate statistics
  const calculateStats = (data) => {
    const validValues = data.map(d => d.value).filter(v => v !== null);
    if (validValues.length === 0) return null;
    
    const min = Math.min(...validValues);
    const max = Math.max(...validValues);
    const avg = validValues.reduce((a, b) => a + b, 0) / validValues.length;
    
    return { min, max, avg };
  };

  // Calculate percentage change
  const calculateChange = (current, avg, min, max) => {
    if (!current || !avg) return 0;
    const range = max - min;
    if (range === 0) return 0;
    return ((current - avg) / range * 100).toFixed(1);
  };

  // Process stream data
  const processStreamData = useCallback((data) => {
    if (!data.analog?.length) return;

    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);

    updateTimeoutRef.current = setTimeout(() => {
      const ts = data.timestamp || Date.now();
      
      setLatest(data.analog);
      
      setHistory(prev => {
        const updated = { ...prev };
        const newStats = {};

        data.analog.forEach(sig => {
          if (!updated[sig.tag]) updated[sig.tag] = [];
          const newData = [...updated[sig.tag], { time: ts, value: sig.value }].slice(-MAX_POINTS);
          updated[sig.tag] = newData;

          const signalStats = calculateStats(newData);
          if (signalStats) newStats[sig.tag] = signalStats;
        });

        setStats(prev => ({ ...prev, ...newStats }));
        return updated;
      });
    }, 100);
  }, []);

  // Connect to stream
  useEffect(() => {
    let eventSource = null;
    let isMounted = true;

    const connect = () => {
      try {
        eventSource = new EventSource(STREAM_URL);

        eventSource.onopen = () => {
          if (!isMounted) return;
          setConnected(true);
        };

        eventSource.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const data = JSON.parse(event.data);
            processStreamData(data);
          } catch (err) {
            console.error("Parse error:", err);
          }
        };

        eventSource.onerror = () => {
          if (!isMounted) return;
          setConnected(false);
          if (eventSource) eventSource.close();
          setTimeout(connect, 3000);
        };
      } catch (err) {
        console.error("Connection error:", err);
      }
    };

    connect();

    return () => {
      isMounted = false;
      if (eventSource) eventSource.close();
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    };
  }, [processStreamData]);

  // Format time
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Get color for signal
  const getSignalColor = (index) => signalColors[index % signalColors.length];

  // Theme-based classes
  const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-100";
  const textClass = isDarkMode ? "text-gray-200" : "text-gray-800";
  const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
  const cardBorderClass = isDarkMode ? "border-gray-700" : "border-gray-300";
  const statusBarBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const statusBarBorder = isDarkMode ? "border-gray-700" : "border-gray-300";
  const statusText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const valueCardBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const valueCardBorder = isDarkMode ? "border-gray-700" : "border-gray-300";
  const valueCardHoverBorder = isDarkMode ? "hover:border-blue-500" : "hover:border-blue-400";
  const valueCardTitle = isDarkMode ? "text-gray-300" : "text-gray-700";
  const valueCardAddress = isDarkMode ? "text-gray-500" : "text-gray-600";
  const valueCardValue = isDarkMode ? "text-white" : "text-gray-900";
  const changeBadgeClass = (change) => {
    const absChange = Math.abs(change);
    if (absChange > 10) {
      return isDarkMode 
        ? 'bg-red-900/50 text-red-300' 
        : 'bg-red-100 text-red-700 border border-red-200';
    } else if (change > 0) {
      return isDarkMode 
        ? 'bg-green-900/50 text-green-300' 
        : 'bg-green-100 text-green-700 border border-green-200';
    } else if (change < 0) {
      return isDarkMode 
        ? 'bg-yellow-900/50 text-yellow-300' 
        : 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    } else {
      return isDarkMode 
        ? 'bg-gray-700 text-gray-400' 
        : 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };
  const statsDivider = isDarkMode ? "border-gray-700" : "border-gray-300";
  const statsTitle = isDarkMode ? "text-gray-500" : "text-gray-600";
  const statsValue = isDarkMode ? "text-gray-300" : "text-gray-700";
  const chartBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const chartHeaderText = isDarkMode ? "text-gray-200" : "text-gray-800";
  const chartSubtext = isDarkMode ? "text-gray-400" : "text-gray-600";
  const chartCurrentValue = isDarkMode ? "text-gray-300" : "text-gray-800";
  const chartAvgText = isDarkMode ? "text-gray-500" : "text-gray-600";
  const chartTooltipBg = isDarkMode ? '#1f2937' : '#ffffff';
  const chartTooltipBorder = isDarkMode ? '#374151' : '#d1d5db';
  const chartTooltipText = isDarkMode ? '#fff' : '#374151';
  const chartGridColor = isDarkMode ? '#374151' : '#e5e7eb';
  const chartAxisText = isDarkMode ? '#9ca3af' : '#6b7280';
  const chartFooterBorder = isDarkMode ? "border-gray-700" : "border-gray-300";
  const sectionTitle = isDarkMode ? "text-gray-300" : "text-gray-700";
  const sectionSubtitle = isDarkMode ? "text-gray-500" : "text-gray-600";
  const footerBorder = isDarkMode ? "border-gray-800" : "border-gray-300";
  const footerText = isDarkMode ? "text-gray-500" : "text-gray-600";

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} p-3 md:p-4`}>
      {/* Status Bar - Compact */}
      <div className={`mb-4 p-3 rounded-lg border ${statusBarBg} ${statusBarBorder}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <h1 className="text-lg font-bold">ANALOG MONITOR</h1>
            <span className={`text-xs ${statusText} ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} px-2 py-1 rounded`}>
              {Object.keys(history).length} SIGNALS
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:bg-gray-100 border border-gray-300 shadow-sm'} transition-colors duration-300`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                // Sun icon for light mode
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <div className="text-xs">
              {MAX_POINTS} pts • <span className={connected ? 'text-green-600' : 'text-red-600'}>{connected ? 'LIVE' : 'OFFLINE'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Values - Industrial Grid */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className={`text-sm font-semibold uppercase tracking-wide ${sectionTitle}`}>LIVE VALUES</h2>
          <span className={`text-xs ${sectionSubtitle}`}>Updated in real-time</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
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
                key={item.tag}
                className={`${valueCardBg} p-3 rounded border ${valueCardBorder} ${valueCardHoverBorder} transition-colors`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${valueCardTitle}`}>{item.tag}</div>
                    <div className={`text-[10px] font-mono truncate ${valueCardAddress}`}>{item.address}</div>
                  </div>
                  <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${changeBadgeClass(change)}`}>
                    {change > 0 ? '▲' : change < 0 ? '▼' : '●'} {Math.abs(change)}%
                  </div>
                </div>
                
                <div className={`text-xl font-bold font-mono mb-2 ${valueCardValue}`}>
                  {item.value?.toFixed(2) ?? '--'}
                </div>

                {signalStats && (
                  <div className={`pt-2 border-t ${statsDivider}`}>
                    <div className="grid grid-cols-3 gap-1 text-[10px]">
                      <div className="text-center">
                        <div className={statsTitle}>MIN</div>
                        <div className={`font-medium ${statsValue}`}>{signalStats.min.toFixed(2)}</div>
                      </div>
                      <div className="text-center">
                        <div className={statsTitle}>AVG</div>
                        <div className={`font-medium ${statsValue}`}>{signalStats.avg.toFixed(2)}</div>
                      </div>
                      <div className="text-center">
                        <div className={statsTitle}>MAX</div>
                        <div className={`font-medium ${statsValue}`}>{signalStats.max.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Grid - Industrial Style */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className={`text-sm font-semibold uppercase tracking-wide ${sectionTitle}`}>TREND ANALYSIS</h2>
          <span className={`text-xs ${sectionSubtitle}`}>Last {MAX_POINTS} samples</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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

            return (
              <div
                key={tag}
                className={`${chartBg} p-3 rounded border ${cardBorderClass}`}
              >
                {/* Chart Header */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                      <div className={`text-sm font-medium truncate ${chartHeaderText}`}>{tag}</div>
                    </div>
                    <div className={`text-xs font-bold px-2 py-0.5 rounded ${changeBadgeClass(change)}`}>
                      {change > 0 ? '▲' : change < 0 ? '▼' : '●'} {Math.abs(change)}%
                    </div>
                  </div>
                  
                  <div className={`flex justify-between text-xs ${chartSubtext}`}>
                    <div>
                      <span className={`font-mono ${chartCurrentValue}`}>{currentValue?.toFixed(2) ?? '--'}</span>
                      <span className="ml-1">CURRENT</span>
                    </div>
                    <div>
                      <span>AVG </span>
                      <span className={`font-mono ${chartCurrentValue}`}>{signalStats?.avg?.toFixed(2) ?? '--'}</span>
                    </div>
                  </div>
                </div>

                {/* Compact Chart */}
                <div className="h-36 mb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="2 2" stroke={chartGridColor} />
                      <XAxis
                        dataKey="time"
                        tickFormatter={formatTime}
                        fontSize={9}
                        tick={{ fill: chartAxisText }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        fontSize={9}
                        tick={{ fill: chartAxisText }}
                        axisLine={false}
                        tickLine={false}
                        width={35}
                        tickFormatter={(v) => v?.toFixed(1)}
                      />
                      <Tooltip
                        labelFormatter={(v) => formatTime(v)}
                        formatter={(v) => [v?.toFixed(3) ?? '--', 'Value']}
                        contentStyle={{
                          backgroundColor: chartTooltipBg,
                          border: `1px solid ${chartTooltipBorder}`,
                          borderRadius: '4px',
                          fontSize: '11px',
                          color: chartTooltipText
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={1.5}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Stats Footer */}
                {signalStats && (
                  <div className={`pt-2 border-t ${chartFooterBorder}`}>
                    <div className="flex justify-between text-[10px]">
                      <div className="text-center flex-1">
                        <div className={statsTitle}>MIN</div>
                        <div className={`font-medium font-mono ${statsValue}`}>{signalStats.min.toFixed(2)}</div>
                      </div>
                      <div className={`text-center flex-1 border-x ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={statsTitle}>RANGE</div>
                        <div className={`font-medium font-mono ${statsValue}`}>{(signalStats.max - signalStats.min).toFixed(2)}</div>
                      </div>
                      <div className="text-center flex-1">
                        <div className={statsTitle}>MAX</div>
                        <div className={`font-medium font-mono ${statsValue}`}>{signalStats.max.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* System Status Footer */}
      <div className={`mt-4 pt-3 border-t ${footerBorder}`}>
        <div className={`flex justify-between items-center text-xs ${footerText}`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>NORMAL</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span>WARNING</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span>CRITICAL</span>
            </div>
          </div>
          <div className="text-right">
            <div>STREAM: {connected ? 'ACTIVE' : 'STANDBY'}</div>
            <div className={isDarkMode ? "text-gray-600" : "text-gray-500"}>v1.0 • INDUSTRIAL MONITOR</div>
          </div>
        </div>
      </div>
    </div>
  );
}










// light theme 


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

//   // Professional color scheme
//   const signalColors = [
//     '#3b82f6', // Blue
//     '#10b981', // Emerald
//     '#8b5cf6', // Violet
//     '#f59e0b', // Amber
//     '#ef4444', // Red
//     '#06b6d4', // Cyan
//     '#84cc16', // Lime
//     '#ec4899'  // Pink
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
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-white text-gray-800 p-3 md:p-4">
//       {/* Status Bar - Professional */}
//       <div className="mb-4 p-3 bg-white rounded-xl border border-gray-300 shadow-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-3">
//             <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 ring-2 ring-green-200 animate-pulse' : 'bg-red-500 ring-2 ring-red-200'}`}></div>
//             <h1 className="text-lg font-bold text-gray-800">ANALOG MONITOR</h1>
//             <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
//               {Object.keys(history).length} SIGNALS
//             </span>
//           </div>
//           <div className="text-xs text-gray-600">
//             {MAX_POINTS} pts • <span className={`font-medium ${connected ? 'text-green-600' : 'text-red-600'}`}>{connected ? 'LIVE' : 'OFFLINE'}</span>
//           </div>
//         </div>
//       </div>

//       {/* Current Values - Professional Grid */}
//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-2 px-1">
//           <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-l-4 border-blue-500 pl-2">LIVE VALUES</h2>
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
//                 className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm hover:border-blue-400 transition-all hover:shadow"
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <div className="flex-1 min-w-0">
//                     <div className="text-xs font-medium text-gray-700 truncate">{item.tag}</div>
//                     <div className="text-[10px] text-gray-500 truncate">{item.address}</div>
//                   </div>
//                   <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${Math.abs(change) > 10 ? 'bg-red-100 text-red-700 border border-red-200' : change > 0 ? 'bg-green-100 text-green-700 border border-green-200' : change < 0 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
//                     {change > 0 ? '▲' : change < 0 ? '▼' : '●'} {Math.abs(change)}%
//                   </div>
//                 </div>
                
//                 <div className="text-xl font-bold font-mono text-gray-900 mb-2">
//                   {item.value?.toFixed(2) ?? '--'}
//                 </div>

//                 {signalStats && (
//                   <div className="pt-2 border-t border-gray-200">
//                     <div className="grid grid-cols-3 gap-1 text-[10px]">
//                       <div className="text-center">
//                         <div className="text-gray-500">MIN</div>
//                         <div className="font-medium text-gray-700">{signalStats.min.toFixed(2)}</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-gray-500">AVG</div>
//                         <div className="font-medium text-gray-700">{signalStats.avg.toFixed(2)}</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-gray-500">MAX</div>
//                         <div className="font-medium text-gray-700">{signalStats.max.toFixed(2)}</div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Charts Grid - Professional Style */}
//       <div>
//         <div className="flex items-center justify-between mb-2 px-1">
//           <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-l-4 border-blue-500 pl-2">TREND ANALYSIS</h2>
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
//                 className="bg-white p-3 rounded-xl border border-gray-300 shadow-sm"
//               >
//                 {/* Chart Header */}
//                 <div className="mb-3">
//                   <div className="flex justify-between items-center mb-1">
//                     <div className="flex items-center space-x-2">
//                       <div
//                         className="w-2 h-2 rounded-full"
//                         style={{ backgroundColor: color }}
//                       ></div>
//                       <div className="text-sm font-medium text-gray-800 truncate">{tag}</div>
//                     </div>
//                     <div className={`text-xs font-bold px-2 py-0.5 rounded ${Math.abs(change) > 10 ? 'bg-red-100 text-red-700 border border-red-200' : change > 0 ? 'bg-green-100 text-green-700 border border-green-200' : change < 0 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
//                       {change > 0 ? '▲' : change < 0 ? '▼' : '●'} {Math.abs(change)}%
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between text-xs">
//                     <div className="text-gray-600">
//                       <span className="text-gray-800 font-mono">{currentValue?.toFixed(2) ?? '--'}</span>
//                       <span className="text-gray-500 ml-1">CURRENT</span>
//                     </div>
//                     <div className="text-gray-600">
//                       <span className="text-gray-500">AVG </span>
//                       <span className="text-gray-800 font-mono">{signalStats?.avg?.toFixed(2) ?? '--'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Compact Chart */}
//                 <div className="h-36 mb-2">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={data}>
//                       <CartesianGrid strokeDasharray="2 2" stroke="#e5e7eb" />
//                       <XAxis
//                         dataKey="time"
//                         tickFormatter={formatTime}
//                         fontSize={9}
//                         tick={{ fill: '#6b7280' }}
//                         axisLine={{ stroke: '#d1d5db' }}
//                         tickLine={{ stroke: '#d1d5db' }}
//                       />
//                       <YAxis
//                         fontSize={9}
//                         tick={{ fill: '#6b7280' }}
//                         axisLine={{ stroke: '#d1d5db' }}
//                         tickLine={{ stroke: '#d1d5db' }}
//                         width={35}
//                         tickFormatter={(v) => v?.toFixed(1)}
//                       />
//                       <Tooltip
//                         labelFormatter={(v) => formatTime(v)}
//                         formatter={(v) => [v?.toFixed(3) ?? '--', 'Value']}
//                         contentStyle={{
//                           backgroundColor: '#ffffff',
//                           border: '1px solid #d1d5db',
//                           borderRadius: '6px',
//                           fontSize: '11px',
//                           color: '#374151',
//                           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
//                   <div className="pt-2 border-t border-gray-200">
//                     <div className="flex justify-between text-[10px]">
//                       <div className="text-center flex-1">
//                         <div className="text-gray-500">MIN</div>
//                         <div className="font-medium text-gray-700 font-mono">{signalStats.min.toFixed(2)}</div>
//                       </div>
//                       <div className="text-center flex-1 border-x border-gray-200">
//                         <div className="text-gray-500">RANGE</div>
//                         <div className="font-medium text-gray-700 font-mono">{(signalStats.max - signalStats.min).toFixed(2)}</div>
//                       </div>
//                       <div className="text-center flex-1">
//                         <div className="text-gray-500">MAX</div>
//                         <div className="font-medium text-gray-700 font-mono">{signalStats.max.toFixed(2)}</div>
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
//       <div className="mt-4 pt-3 border-t border-gray-300">
//         <div className="flex justify-between items-center text-xs text-gray-600">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               <span>NORMAL</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-amber-500"></div>
//               <span>WARNING</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-red-500"></div>
//               <span>CRITICAL</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="font-medium text-gray-700">STREAM: <span className={connected ? 'text-green-600' : 'text-red-600'}>{connected ? 'ACTIVE' : 'STANDBY'}</span></div>
//             <div className="text-gray-500">v1.0 • INDUSTRIAL MONITOR</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







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
//     const source = new EventSource("http://localhost:8000/api/v1/bts/streamanalog");

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
