// ////////////////////////////////////////////////////////////////////////////////
// main light and dark theme both with mqtt api

// import { useEffect, useState } from "react";

// const API_BASE = "https://mqtt-testing-x4ct.onrender.com";

// /* ---------------- DATA STRUCTURES ---------------- */
// const actions = [
//   {
//     title: "BTS Control",
//     buttons: [
//       { label: "BTS IN", endpoint: "/api/bts/in", color: "green" },
//       { label: "BTS OUT", endpoint: "/api/bts/out", color: "red" },
//       { label: "BTS RESET", endpoint: "/api/reset-bts", color: "yellow" },
//     ],
//   },
//   {
//     title: "Remote Test",
//     buttons: [
//       { label: "Remote Test IN", endpoint: "/api/remote-test/in", color: "blue" },
//       { label: "Remote Test OUT", endpoint: "/api/remote-test/out", color: "blue" },
//       { label: "Remote Test Transfer", endpoint: "/api/remote-test/transfer", color: "purple" },
//     ],
//   },
//   {
//     title: "Bus to Source",
//     buttons: [
//       { label: "BusA to Src1", endpoint: "/bus1/source1", color: "gray" },
//       { label: "BusA to Src2", endpoint: "/bus1/source2", color: "gray" },
//       { label: "BusB to Src1", endpoint: "/bus2/source1", color: "gray" },
//       { label: "BusB to Src2", endpoint: "/bus2/source2", color: "gray" },
//       { label: "BusA & B to Src1", endpoint: "/bus12/source1", color: "gray" },
//       { label: "BusA & B to Src2", endpoint: "/bus12/source2", color: "gray" },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       { label: "Operate Breaker", endpoint: "/breaker/operate", color: "orange" },
//     ],
//   },

// ];

// export default function ModbusControlPanel() {
//   const [loading, setLoading] = useState(false);
//   const [logs, setLogs] = useState([]);
//   const [biData, setBiData] = useState([]);
//   const [modeData, setModeData] = useState([]);
//   const [sseStatus, setSseStatus] = useState("CONNECTING");
//   const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
//   const [armedDirection, setArmedDirection] = useState(null);
//   const [activeCommand, setActiveCommand] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(true);

//   useEffect(() => {
//     // Check if user has a theme preference
//     const savedTheme = localStorage.getItem('modbus-theme');
//     if (savedTheme === 'light') {
//       setIsDarkMode(false);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem('modbus-theme', newMode ? 'dark' : 'light');
//   };

//   /* ---------------- LOGGING ---------------- */
//   const addLog = (msg, type = "INFO") => {
//     const timestamp = new Date().toLocaleTimeString();
//     setLogs(prev => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONTROL CALL (RELAY-SAFE) ---------------- */
//   const callApi = async (label, endpoint) => {
//     try {
//       setLoading(true);
//       setActiveCommand(label);
//       addLog(`CMD: ${label}`, "CMD");

//       /* 1️⃣ BUS DIRECTION = ARM ONLY */
//       if (endpoint.startsWith("/bus")) {
//         await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         });

//         setArmedDirection(label);
//         addLog(`DIRECTION ARMED: ${label}`, "ARMED");
//         return;
//       }

//       /* 2️⃣ BREAKER = EXPLICIT EXECUTION */
//       if (endpoint === "/breaker/operate") {
//         if (!armedDirection) {
//           addLog("BREAKER BLOCKED: No direction armed", "ERROR");
//           return;
//         }

//         addLog(`EXECUTING BREAKER: ${armedDirection}`, "EXECUTE");

//         const res = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Breaker operation failed");

//         addLog(`TRANSFER COMPLETE: ${armedDirection}`, "SUCCESS");
//         setArmedDirection(null);
//         return;
//       }

//       /* 3️⃣ OTHER COMMANDS (BTS, REMOTE TEST, ETC.) */
//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`SUCCESS: ${label}`, "SUCCESS");

//     } catch (err) {
//       addLog(`FAILED: ${label} → ${err.message}`, "ERROR");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setActiveCommand(null), 1000);
//     }
//   };

//   /* ---------------- SSE LIVE DATA ---------------- */
//   useEffect(() => {
//     // Original SSE for binary inputs
//     const evtSource = new EventSource(`${API_BASE}/stream/bi-available`);

//     evtSource.onopen = () => setSseStatus("CONNECTED");

//     evtSource.onmessage = (e) => {
//       try {
//         const parsed = JSON.parse(e.data);
//         setBiData(parsed.bi || []);
//       } catch (err) {
//         console.error("SSE parse error", err);
//       }
//     };

//     evtSource.onerror = () => {
//       setSseStatus("DISCONNECTED");
//       evtSource.close();
//     };

//     return () => evtSource.close();
//   }, []);

//   /* ---------------- NEW SSE FOR MODE SELECTION DATA ---------------- */
//   useEffect(() => {
//     const modeEvtSource = new EventSource(`${API_BASE}/stream/mode-selected`);

//     modeEvtSource.onopen = () => {
//       setModeSseStatus("CONNECTED");
//       addLog("Mode selection stream connected", "INFO");
//     };

//     modeEvtSource.onmessage = (e) => {
//       try {
//         const parsed = JSON.parse(e.data);

//         // Transform the mode data to match our display format
//         if (parsed.bo && Array.isArray(parsed.bo)) {
//           const transformedData = parsed.bo.map(item => ({
//             tag: item.tag,
//             value: item.value,
//             address: item.address,
//             description: getModeDescription(item.tag)
//           }));
//           setModeData(transformedData);
//         }
//       } catch (err) {
//         console.error("Mode SSE parse error", err);
//         addLog(`Mode data parse error: ${err.message}`, "ERROR");
//       }
//     };

//     modeEvtSource.onerror = (err) => {
//       setModeSseStatus("DISCONNECTED");
//       addLog("Mode selection stream disconnected", "WARN");
//       modeEvtSource.close();
//     };

//     return () => modeEvtSource.close();
//   }, []);

//   /* ---------------- HELPER FUNCTIONS ---------------- */
//   const getModeDescription = (tag) => {
//     const descriptions = {
//       "fastModeSelected": "Fast Mode",
//       "fastSlowModeSelected": "Fast-Slow Mode",
//       "fastInPhaseSlowModeSelected": "Fast In-Phase Slow Mode",
//       "parallelModeSelected": "Parallel Mode",
//       "slowModeSelected": "Slow Mode"
//     };
//     return descriptions[tag] || tag;
//   };

//   const getActiveMode = () => {
//     const activeMode = modeData.find(item => item.value === true);
//     return activeMode ? activeMode.description : "No Mode Selected";
//   };

//   // Theme-based color classes
//   const colorClasses = {
//     green: isDarkMode
//       ? "bg-green-900 border-green-600 hover:bg-green-800 hover:border-green-500 text-white"
//       : "bg-green-600 border-green-700 hover:bg-green-700 hover:border-green-800 text-white",
//     red: isDarkMode
//       ? "bg-red-900 border-red-600 hover:bg-red-800 hover:border-red-500 text-white"
//       : "bg-red-600 border-red-700 hover:bg-red-700 hover:border-red-800 text-white",
//     yellow: isDarkMode
//       ? "bg-yellow-900 border-yellow-600 hover:bg-yellow-800 hover:border-yellow-500 text-white"
//       : "bg-yellow-500 border-yellow-600 hover:bg-yellow-600 hover:border-yellow-700 text-white",
//     blue: isDarkMode
//       ? "bg-blue-900 border-blue-600 hover:bg-blue-800 hover:border-blue-500 text-white"
//       : "bg-blue-600 border-blue-700 hover:bg-blue-700 hover:border-blue-800 text-white",
//     purple: isDarkMode
//       ? "bg-purple-900 border-purple-600 hover:bg-purple-800 hover:border-purple-500 text-white"
//       : "bg-purple-600 border-purple-700 hover:bg-purple-700 hover:border-purple-800 text-white",
//     gray: isDarkMode
//       ? "bg-gray-900 border-gray-600 hover:bg-gray-800 hover:border-gray-500 text-white"
//       : "bg-gray-700 border-gray-800 hover:bg-gray-800 hover:border-gray-900 text-white",
//     orange: isDarkMode
//       ? "bg-orange-900 border-orange-600 hover:bg-orange-800 hover:border-orange-500 text-white"
//       : "bg-orange-500 border-orange-600 hover:bg-orange-600 hover:border-orange-700 text-white",
//   };

//   // Theme-based background classes
//   const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-100";
//   const textClass = isDarkMode ? "text-gray-200" : "text-gray-800";
//   const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
//   const cardBorderClass = isDarkMode ? "border-gray-700" : "border-gray-300";
//   const statusCardBg = isDarkMode ? "bg-gray-800" : "bg-white";
//   const statusCardText = isDarkMode ? "text-gray-400" : "text-gray-600";
//   const statusValueText = (condition, darkColor, lightColor) =>
//     isDarkMode ? (condition ? darkColor : "text-gray-500") : (condition ? lightColor : "text-gray-500");
//   const systemStatusBg = (value) => isDarkMode
//     ? (value ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700')
//     : (value ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200');
//   const systemStatusText = (value) => isDarkMode
//     ? (value ? 'text-green-400' : 'text-red-400')
//     : (value ? 'text-green-600' : 'text-red-600');
//   const modeStatusBg = (value) => isDarkMode
//     ? (value ? 'bg-purple-900/30 border-purple-700' : 'bg-gray-800/50 border-gray-700')
//     : (value ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200');
//   const modeStatusText = (value) => isDarkMode
//     ? (value ? 'text-purple-400' : 'text-gray-400')
//     : (value ? 'text-purple-600' : 'text-gray-600');
//   const logBgClass = (type) => isDarkMode
//     ? (type === 'ERROR' ? 'bg-red-900/10 border-red-800/50' :
//        type === 'SUCCESS' ? 'bg-green-900/10 border-green-800/50' :
//        type === 'CMD' ? 'bg-blue-900/10 border-blue-800/50' :
//        type === 'ARMED' ? 'bg-orange-900/10 border-orange-800/50' :
//        'bg-gray-800 border-gray-700')
//     : (type === 'ERROR' ? 'bg-red-50 border-red-200' :
//        type === 'SUCCESS' ? 'bg-green-50 border-green-200' :
//        type === 'CMD' ? 'bg-blue-50 border-blue-200' :
//        type === 'ARMED' ? 'bg-orange-50 border-orange-200' :
//        'bg-white border-gray-200');
//   const logTextClass = (type) => isDarkMode
//     ? (type === 'ERROR' ? 'text-red-400' :
//        type === 'SUCCESS' ? 'text-green-400' :
//        type === 'CMD' ? 'text-blue-400' :
//        type === 'ARMED' ? 'text-orange-400' :
//        'text-gray-300')
//     : (type === 'ERROR' ? 'text-red-600' :
//        type === 'SUCCESS' ? 'text-green-600' :
//        type === 'CMD' ? 'text-blue-600' :
//        type === 'ARMED' ? 'text-orange-600' :
//        'text-gray-700');

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-3`}>
//       {/* Header with Theme Toggle */}
//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center space-x-3">
//             <div className={`w-2 h-2 rounded-full ${sseStatus === "CONNECTED" ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//             <h1 className="text-lg font-bold tracking-wide">RELAY CONTROL PANEL</h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Theme Toggle Button */}
//             <button
//               onClick={toggleTheme}
//               className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:bg-gray-100 border border-gray-300 shadow-sm'} transition-colors duration-300`}
//               aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//             >
//               {isDarkMode ? (
//                 // Sun icon for light mode
//                 <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//               ) : (
//                 // Moon icon for dark mode
//                 <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//                 </svg>
//               )}
//             </button>

//             <div className={`text-xs font-mono px-3 py-1 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300 shadow-sm'}`}>
//               STATUS: {modeSseStatus}
//             </div>
//           </div>
//         </div>

//         {/* Status Indicators */}
//         <div className="grid grid-cols-4 gap-2 mb-4">
//           <div className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}>
//             <div className={`text-xs ${statusCardText}`}>ARMED DIRECTION</div>
//             <div className={`text-sm font-bold truncate ${statusValueText(armedDirection, 'text-orange-400', 'text-orange-600')}`}>
//               {armedDirection || "NONE"}
//             </div>
//           </div>
//           <div className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}>
//             <div className={`text-xs ${statusCardText}`}>ACTIVE COMMAND</div>
//             <div className={`text-sm font-bold truncate ${statusValueText(activeCommand, 'text-blue-400', 'text-blue-600')}`}>
//               {activeCommand || "IDLE"}
//             </div>
//           </div>
//           <div className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}>
//             <div className={`text-xs ${statusCardText}`}>ACTIVE MODE</div>
//             <div className={`text-sm font-bold truncate ${statusValueText(getActiveMode() !== "No Mode Selected", 'text-purple-400', 'text-purple-600')}`}>
//               {getActiveMode()}
//             </div>
//           </div>
//           <div className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}>
//             <div className={`text-xs ${statusCardText}`}>LOG ENTRIES</div>
//             <div className="text-sm font-bold">{logs.length}</div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {/* LEFT: CONTROL PANELS */}
//         <div className="space-y-4">
//           {actions.map((section, idx) => (
//             <div key={idx} className={`${cardBgClass} p-4 rounded-lg border ${cardBorderClass}`}>
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                   {section.title}
//                 </h3>
//                 <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                   {section.buttons.length} CMDs
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-2">
//                 {section.buttons.map((btn, i) => {
//                   const isBreaker = btn.endpoint === "/breaker/operate";
//                   const disabled = loading || (isBreaker && !armedDirection);
//                   const isActive = activeCommand === btn.label;

//                   return (
//                     <button
//                       key={i}
//                       disabled={disabled}
//                       onClick={() => callApi(btn.label, btn.endpoint)}
//                       className={`relative p-3 rounded border text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed ${colorClasses[btn.color]} ${isActive ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-blue-500' : ''}`}
//                     >
//                       {btn.label}
//                       {isActive && (
//                         <div className="absolute -top-1 -right-1">
//                           <div className="animate-ping absolute w-3 h-3 rounded-full bg-blue-500"></div>
//                           <div className="relative w-2 h-2 rounded-full bg-blue-400"></div>
//                         </div>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>

//               {section.title === "Live Transfer" && armedDirection && (
//                 <div className={`mt-3 p-2 rounded border ${isDarkMode ? 'bg-orange-900/30 border-orange-700' : 'bg-orange-50 border-orange-200'}`}>
//                   <div className="flex items-center justify-between text-xs">
//                     <span className={`font-medium ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>ARMED:</span>
//                     <span className={`font-bold ${isDarkMode ? 'text-orange-200' : 'text-orange-800'}`}>{armedDirection}</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* RIGHT: MONITORING */}
//         <div className="space-y-4">
//           {/* System Status */}
//           <div className={`${cardBgClass} p-4 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>SYSTEM STATUS</h2>
//               <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>LIVE FEED</div>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {biData.map((item, index) => (
//                 <div
//                   key={item.tag}
//                   className={`p-3 rounded border flex items-center justify-between ${systemStatusBg(item.value)}`}
//                 >
//                   <div className="flex-1 min-w-0">
//                     <div className={`text-xs font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.tag}</div>
//                     <div className={`text-[10px] font-mono truncate ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>BINARY INPUT</div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className={`w-2 h-2 rounded-full ${item.value ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//                     <div className={`text-sm font-bold font-mono ${systemStatusText(item.value)}`}>
//                       {item.value ? '1' : '0'}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {biData.length === 0 && (
//               <div className={`text-center py-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                 Waiting for system data...
//               </div>
//             )}
//           </div>

//           {/* Mode Selection Status - NEW SECTION */}
//           <div className={`${cardBgClass} p-4 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>MODE SELECTION</h2>
//               <div className="flex items-center space-x-2">
//                 <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>LIVE FEED</div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {modeData.map((item, index) => (
//                 <div
//                   key={item.tag}
//                   className={`p-3 rounded border flex items-center justify-between ${modeStatusBg(item.value)}`}
//                 >
//                   <div className="flex-1 min-w-0">
//                     <div className={`text-xs font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.description}</div>
//                     <div className={`text-[10px] font-mono truncate ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{item.address}</div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className={`w-3 h-3 rounded-full ${item.value ? 'bg-purple-500 animate-pulse' : isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
//                     <div className={`text-sm font-bold font-mono ${modeStatusText(item.value)}`}>
//                       {item.value ? 'ACTIVE' : 'INACTIVE'}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {modeData.length === 0 && (
//               <div className={`text-center py-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                 Waiting for mode selection data...
//               </div>
//             )}
//           </div>

//           {/* Event Log */}
//           <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 rounded-lg border ${cardBorderClass} flex-1`}>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>EVENT LOG</h2>
//               <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>LAST 50 ENTRIES</div>
//             </div>

//             <div className="h-64 overflow-y-auto font-mono text-xs">
//               {logs.length === 0 ? (
//                 <div className={`text-center py-8 ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>No events recorded</div>
//               ) : (
//                 <div className="space-y-1 pr-2">
//                   {logs.map((log, i) => (
//                     <div
//                       key={i}
//                       className={`p-2 rounded border ${logBgClass(log.type)}`}
//                     >
//                       <div className="flex items-center">
//                         <div className={`w-20 flex-shrink-0 text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>[{log.timestamp}]</div>
//                         <div className={`text-[11px] font-medium ml-2 ${logTextClass(log.type)}`}>
//                           [{log.type}] {log.msg}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Log Legend */}
//             <div className="mt-4 pt-3 border-t border-gray-800">
//               <div className="flex flex-wrap gap-3 text-[10px]">
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//                   <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>COMMAND</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-orange-500"></div>
//                   <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>ARMED</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                   <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>SUCCESS</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
//                   <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>ERROR</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-purple-500"></div>
//                   <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>MODE</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-4 pt-3 border-t border-gray-800">
//         <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
//           <div className="flex items-center space-x-4 mb-2 sm:mb-0">
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               <span>ACTIVE INPUT</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-red-500"></div>
//               <span>INACTIVE INPUT</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-orange-500"></div>
//               <span>ARMED</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-purple-500"></div>
//               <span>ACTIVE MODE</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div>STATUS: {loading ? 'EXECUTING' : 'STANDBY'} • BI: {sseStatus} • MODE: {modeSseStatus}</div>
//             <div className="text-gray-600">MODBUS CONTROL v1.0</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// correct and final code

// import { useEffect, useState } from "react";

// const API_BASE = "https://mqtt-testing-1.onrender.com";

// /* ---------------- DATA STRUCTURES ---------------- */
// const actions = [
//   {
//     title: "BTS Control",
//     buttons: [
//       { label: "BTS IN", endpoint: "/api/bts/in", color: "green" },
//       { label: "BTS OUT", endpoint: "/api/bts/out", color: "red" },
//       { label: "BTS RESET", endpoint: "/api/reset-bts", color: "yellow" },
//     ],
//   },
//   {
//     title: "Remote Test",
//     buttons: [
//       { label: "Remote Test IN", endpoint: "/api/remote-test/in", color: "blue" },
//       { label: "Remote Test OUT", endpoint: "/api/remote-test/out", color: "blue" },
//       { label: "Remote Test Transfer", endpoint: "/api/remote-test/transfer", color: "purple" },
//     ],
//   },
//   {
//     title: "Bus to Source",
//     buttons: [
//       { label: "BusA to Src1", endpoint: "/bus1/source1", color: "gray" },
//       { label: "BusA to Src2", endpoint: "/bus1/source2", color: "gray" },
//       { label: "BusB to Src1", endpoint: "/bus2/source1", color: "gray" },
//       { label: "BusB to Src2", endpoint: "/bus2/source2", color: "gray" },
//       { label: "BusA & B to Src1", endpoint: "/bus12/source1", color: "gray" },
//       { label: "BusA & B to Src2", endpoint: "/bus12/source2", color: "gray" },
//     ],
//   },
//   {
//     title: "Remote Mode",
//     buttons: [
//       { label: "FAST", endpoint: "/api/mode/fast", color: "blue" },
//       { label: "FAST-SLOW", endpoint: "/api/mode/fasl", color: "blue" },
//       { label: "FAST-INPHASE-SLOW", endpoint: "/api/mode/fainsl", color: "blue" },
//       { label: "PARALLEL", endpoint: "/api/mode/parallel", color: "blue" },
//       { label: "SLOW", endpoint: "/api/mode/slow", color: "blue" },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       { label: "Operate Breaker", endpoint: "/breaker/operate", color: "orange" },
//     ],
//   },
// ];

// export default function ModbusControlPanel() {
//   const [loading, setLoading] = useState(false);
//   const [logs, setLogs] = useState([]);
//   const [biData, setBiData] = useState([]);
//   const [modeData, setModeData] = useState([]);
//   const [sseStatus, setSseStatus] = useState("CONNECTING");
//   const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
//   const [armedDirection, setArmedDirection] = useState(null);
//   const [activeCommand, setActiveCommand] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(true);

//   useEffect(() => {
//     // Check if user has a theme preference
//     const savedTheme = localStorage.getItem('modbus-theme');
//     if (savedTheme === 'light') {
//       setIsDarkMode(false);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem('modbus-theme', newMode ? 'dark' : 'light');
//   };

//   /* ---------------- LOGGING ---------------- */
//   const addLog = (msg, type = "INFO") => {
//     const timestamp = new Date().toLocaleTimeString();
//     setLogs(prev => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONTROL CALL (RELAY-SAFE) ---------------- */
//   const callApi = async (label, endpoint) => {
//     try {
//       setLoading(true);
//       setActiveCommand(label);
//       addLog(`CMD: ${label}`, "CMD");

//       /* 1️⃣ BUS DIRECTION = ARM ONLY */
//       if (endpoint.startsWith("/bus")) {
//         await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         });

//         setArmedDirection(label);
//         addLog(`DIRECTION ARMED: ${label}`, "ARMED");
//         return;
//       }

//       /* 2️⃣ BREAKER = EXPLICIT EXECUTION */
//       if (endpoint === "/breaker/operate") {
//         if (!armedDirection) {
//           addLog("BREAKER BLOCKED: No direction armed", "ERROR");
//           return;
//         }

//         addLog(`EXECUTING BREAKER: ${armedDirection}`, "EXECUTE");

//         const res = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Breaker operation failed");

//         addLog(`TRANSFER COMPLETE: ${armedDirection}`, "SUCCESS");
//         setArmedDirection(null);
//         return;
//       }

//       /* 3️⃣ OTHER COMMANDS (BTS, REMOTE TEST, ETC.) */
//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`SUCCESS: ${label}`, "SUCCESS");

//     } catch (err) {
//       addLog(`FAILED: ${label} → ${err.message}`, "ERROR");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setActiveCommand(null), 200);
//     }
//   };

//   /* ---------------- SSE LIVE DATA ---------------- */
//   useEffect(() => {
//     // Original SSE for binary inputs
//     const evtSource = new EventSource(`${API_BASE}/stream/bi-available`);

//     evtSource.onopen = () => setSseStatus("CONNECTED");

//     evtSource.onmessage = (e) => {
//       try {
//         const parsed = JSON.parse(e.data);
//         setBiData(parsed.bi || []);
//       } catch (err) {
//         console.error("SSE parse error", err);
//       }
//     };

//     evtSource.onerror = () => {
//       setSseStatus("DISCONNECTED");
//       evtSource.close();
//     };

//     return () => evtSource.close();
//   }, []);

//   /* ---------------- NEW SSE FOR MODE SELECTION DATA ---------------- */
//   useEffect(() => {
//     const modeEvtSource = new EventSource(`${API_BASE}/stream/mode-selected`);

//     modeEvtSource.onopen = () => {
//       setModeSseStatus("CONNECTED");
//       addLog("Mode selection stream connected", "INFO");
//     };

//     modeEvtSource.onmessage = (e) => {
//       try {
//         const parsed = JSON.parse(e.data);

//         // Transform the mode data to match our display format
//         if (parsed.bo && Array.isArray(parsed.bo)) {
//           const transformedData = parsed.bo.map(item => ({
//             tag: item.tag,
//             value: item.value,
//             address: item.address,
//             description: getModeDescription(item.tag)
//           }));
//           setModeData(transformedData);
//         }
//       } catch (err) {
//         console.error("Mode SSE parse error", err);
//         addLog(`Mode data parse error: ${err.message}`, "ERROR");
//       }
//     };

//     modeEvtSource.onerror = (err) => {
//       setModeSseStatus("DISCONNECTED");
//       addLog("Mode selection stream disconnected", "WARN");
//       modeEvtSource.close();
//     };

//     return () => modeEvtSource.close();
//   }, []);

//   /* ---------------- HELPER FUNCTIONS ---------------- */
//   const getModeDescription = (tag) => {
//     const descriptions = {
//       "fastModeSelected": "Fast Mode",
//       "fastSlowModeSelected": "Fast-Slow Mode",
//       "fastInPhaseSlowModeSelected": "Fast In-Phase Slow Mode",
//       "parallelModeSelected": "Parallel Mode",
//       "slowModeSelected": "Slow Mode"
//     };
//     return descriptions[tag] || tag;
//   };

//   const getActiveMode = () => {
//     const activeMode = modeData.find(item => item.value === true);
//     return activeMode ? activeMode.description : "No Mode Selected";
//   };

//   // Theme-based color classes
//   const colorClasses = {
//     green: isDarkMode
//       ? "bg-green-900 border-green-600 hover:bg-green-800 hover:border-green-500 text-white"
//       : "bg-green-600 border-green-700 hover:bg-green-700 hover:border-green-800 text-white",
//     red: isDarkMode
//       ? "bg-red-900 border-red-600 hover:bg-red-800 hover:border-red-500 text-white"
//       : "bg-red-600 border-red-700 hover:bg-red-700 hover:border-red-800 text-white",
//     yellow: isDarkMode
//       ? "bg-yellow-900 border-yellow-600 hover:bg-yellow-800 hover:border-yellow-500 text-white"
//       : "bg-yellow-500 border-yellow-600 hover:bg-yellow-600 hover:border-yellow-700 text-white",
//     blue: isDarkMode
//       ? "bg-blue-900 border-blue-600 hover:bg-blue-800 hover:border-blue-500 text-white"
//       : "bg-blue-600 border-blue-700 hover:bg-blue-700 hover:border-blue-800 text-white",
//     purple: isDarkMode
//       ? "bg-purple-900 border-purple-600 hover:bg-purple-800 hover:border-purple-500 text-white"
//       : "bg-purple-600 border-purple-700 hover:bg-purple-700 hover:border-purple-800 text-white",
//     gray: isDarkMode
//       ? "bg-gray-900 border-gray-600 hover:bg-gray-800 hover:border-gray-500 text-white"
//       : "bg-gray-700 border-gray-800 hover:bg-gray-800 hover:border-gray-900 text-white",
//     orange: isDarkMode
//       ? "bg-orange-900 border-orange-600 hover:bg-orange-800 hover:border-orange-500 text-white"
//       : "bg-orange-500 border-orange-600 hover:bg-orange-600 hover:border-orange-700 text-white",
//   };

//   // Theme-based background classes
//   const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-100";
//   const textClass = isDarkMode ? "text-gray-200" : "text-gray-800";
//   const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
//   const cardBorderClass = isDarkMode ? "border-gray-700" : "border-gray-300";
//   const statusCardBg = isDarkMode ? "bg-gray-800" : "bg-white";
//   const statusCardText = isDarkMode ? "text-gray-400" : "text-gray-600";
//   const statusValueText = (condition, darkColor, lightColor) =>
//     isDarkMode ? (condition ? darkColor : "text-gray-500") : (condition ? lightColor : "text-gray-500");
//   const systemStatusBg = (value) => isDarkMode
//     ? (value ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700')
//     : (value ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200');
//   const systemStatusText = (value) => isDarkMode
//     ? (value ? 'text-green-400' : 'text-red-400')
//     : (value ? 'text-green-600' : 'text-red-600');
//   const modeStatusBg = (value) => isDarkMode
//     ? (value ? 'bg-purple-900/30 border-purple-700' : 'bg-gray-800/50 border-gray-700')
//     : (value ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200');
//   const modeStatusText = (value) => isDarkMode
//     ? (value ? 'text-purple-400' : 'text-gray-400')
//     : (value ? 'text-purple-600' : 'text-gray-600');
//   const logBgClass = (type) => isDarkMode
//     ? (type === 'ERROR' ? 'bg-red-900/10 border-red-800/50' :
//        type === 'SUCCESS' ? 'bg-green-900/10 border-green-800/50' :
//        type === 'CMD' ? 'bg-blue-900/10 border-blue-800/50' :
//        type === 'ARMED' ? 'bg-orange-900/10 border-orange-800/50' :
//        'bg-gray-800 border-gray-700')
//     : (type === 'ERROR' ? 'bg-red-50 border-red-200' :
//        type === 'SUCCESS' ? 'bg-green-50 border-green-200' :
//        type === 'CMD' ? 'bg-blue-50 border-blue-200' :
//        type === 'ARMED' ? 'bg-orange-50 border-orange-200' :
//        'bg-white border-gray-200');
//   const logTextClass = (type) => isDarkMode
//     ? (type === 'ERROR' ? 'text-red-400' :
//        type === 'SUCCESS' ? 'text-green-400' :
//        type === 'CMD' ? 'text-blue-400' :
//        type === 'ARMED' ? 'text-orange-400' :
//        'text-gray-300')
//     : (type === 'ERROR' ? 'text-red-600' :
//        type === 'SUCCESS' ? 'text-green-600' :
//        type === 'CMD' ? 'text-blue-600' :
//        type === 'ARMED' ? 'text-orange-600' :
//        'text-gray-700');

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-3`}>
//       {/* Header with Theme Toggle */}
//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center space-x-3">
//             <div className={`w-2 h-2 rounded-full ${sseStatus === "CONNECTED" ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//             <h1 className="text-lg font-bold tracking-wide">RELAY CONTROL PANEL</h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Theme Toggle Button */}
//             <button
//               onClick={toggleTheme}
//               className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:bg-gray-100 border border-gray-300 shadow-sm'} transition-colors duration-300`}
//               aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//             >
//               {isDarkMode ? (
//                 // Sun icon for light mode
//                 <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//               ) : (
//                 // Moon icon for dark mode
//                 <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//                 </svg>
//               )}
//             </button>

//             <div className={`text-xs font-mono px-3 py-1 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300 shadow-sm'}`}>
//               STATUS: {modeSseStatus}
//             </div>
//           </div>
//         </div>

//         {/* Status Indicators */}
//         <div className="grid grid-cols-4 gap-2 mb-4">
//           <div className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}>
//             <div className={`text-xs ${statusCardText}`}>ARMED DIRECTION</div>
//             <div className={`text-sm font-bold truncate ${statusValueText(armedDirection, 'text-orange-400', 'text-orange-600')}`}>
//               {armedDirection || "NONE"}
//             </div>
//           </div>
//           <div className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}>
//             <div className={`text-xs ${statusCardText}`}>ACTIVE COMMAND</div>
//             <div className={`text-sm font-bold truncate ${statusValueText(activeCommand, 'text-blue-400', 'text-blue-600')}`}>
//               {activeCommand || "IDLE"}
//             </div>
//           </div>
//           <div className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}>
//             <div className={`text-xs ${statusCardText}`}>ACTIVE MODE</div>
//             <div className={`text-sm font-bold truncate ${statusValueText(getActiveMode() !== "No Mode Selected", 'text-purple-400', 'text-purple-600')}`}>
//               {getActiveMode()}
//             </div>
//           </div>
//           <div className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}>
//             <div className={`text-xs ${statusCardText}`}>LOG ENTRIES</div>
//             <div className="text-sm font-bold">{logs.length}</div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {/* LEFT: CONTROL PANELS */}
//         <div className="space-y-4">
//           {actions.map((section, idx) => (
//             <div key={idx} className={`${cardBgClass} p-4 rounded-lg border ${cardBorderClass}`}>
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                   {section.title}
//                 </h3>
//                 <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                   {section.buttons.length} CMDs
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-2">
//                 {section.buttons.map((btn, i) => {
//                   const isBreaker = btn.endpoint === "/breaker/operate";
//                   const disabled = loading || (isBreaker && !armedDirection);
//                   const isActive = activeCommand === btn.label;

//                   return (
//                     <button
//                       key={i}
//                       disabled={disabled}
//                       onClick={() => callApi(btn.label, btn.endpoint)}
//                       className={`relative p-3 rounded border text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed ${colorClasses[btn.color]} ${isActive ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-blue-500' : ''}`}
//                     >
//                       {btn.label}
//                       {isActive && (
//                         <div className="absolute -top-1 -right-1">
//                           <div className="animate-ping absolute w-3 h-3 rounded-full bg-blue-500"></div>
//                           <div className="relative w-2 h-2 rounded-full bg-blue-400"></div>
//                         </div>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>

//               {section.title === "Live Transfer" && armedDirection && (
//                 <div className={`mt-3 p-2 rounded border ${isDarkMode ? 'bg-orange-900/30 border-orange-700' : 'bg-orange-50 border-orange-200'}`}>
//                   <div className="flex items-center justify-between text-xs">
//                     <span className={`font-medium ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>ARMED:</span>
//                     <span className={`font-bold ${isDarkMode ? 'text-orange-200' : 'text-orange-800'}`}>{armedDirection}</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* RIGHT: MONITORING */}
//         <div className="space-y-4">
//           {/* System Status */}
//           <div className={`${cardBgClass} p-4 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>SYSTEM STATUS</h2>
//               <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>LIVE FEED</div>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {biData.map((item, index) => (
//                 <div
//                   key={item.tag}
//                   className={`p-3 rounded border flex items-center justify-between ${systemStatusBg(item.value)}`}
//                 >
//                   <div className="flex-1 min-w-0">
//                     <div className={`text-xs font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.tag}</div>
//                     <div className={`text-[10px] font-mono truncate ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>BINARY INPUT</div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className={`w-2 h-2 rounded-full ${item.value ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//                     <div className={`text-sm font-bold font-mono ${systemStatusText(item.value)}`}>
//                       {item.value ? '1' : '0'}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {biData.length === 0 && (
//               <div className={`text-center py-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                 Waiting for system data...
//               </div>
//             )}
//           </div>

//           {/* Mode Selection Status - NEW SECTION */}
//           <div className={`${cardBgClass} p-4 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>MODE SELECTION</h2>
//               <div className="flex items-center space-x-2">
//                 <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>LIVE FEED</div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {modeData.map((item, index) => (
//                 <div
//                   key={item.tag}
//                   className={`p-3 rounded border flex items-center justify-between ${modeStatusBg(item.value)}`}
//                 >
//                   <div className="flex-1 min-w-0">
//                     <div className={`text-xs font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.description}</div>
//                     <div className={`text-[10px] font-mono truncate ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{item.address}</div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className={`w-3 h-3 rounded-full ${item.value ? 'bg-purple-500 animate-pulse' : isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
//                     <div className={`text-sm font-bold font-mono ${modeStatusText(item.value)}`}>
//                       {item.value ? 'ACTIVE' : 'INACTIVE'}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {modeData.length === 0 && (
//               <div className={`text-center py-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                 Waiting for mode selection data...
//               </div>
//             )}
//           </div>

//           {/* Event Log */}
//           <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 rounded-lg border ${cardBorderClass} flex-1`}>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>EVENT LOG</h2>
//               <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>LAST 50 ENTRIES</div>
//             </div>

//             <div className="h-64 overflow-y-auto font-mono text-xs">
//               {logs.length === 0 ? (
//                 <div className={`text-center py-8 ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>No events recorded</div>
//               ) : (
//                 <div className="space-y-1 pr-2">
//                   {logs.map((log, i) => (
//                     <div
//                       key={i}
//                       className={`p-2 rounded border ${logBgClass(log.type)}`}
//                     >
//                       <div className="flex items-center">
//                         <div className={`w-20 flex-shrink-0 text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>[{log.timestamp}]</div>
//                         <div className={`text-[11px] font-medium ml-2 ${logTextClass(log.type)}`}>
//                           [{log.type}] {log.msg}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Log Legend */}
//             <div className="mt-4 pt-3 border-t border-gray-800">
//               <div className="flex flex-wrap gap-3 text-[10px]">
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//                   <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>COMMAND</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-orange-500"></div>
//                   <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>ARMED</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                   <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>SUCCESS</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
//                   <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>ERROR</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-purple-500"></div>
//                   <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>MODE</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-4 pt-3 border-t border-gray-800">
//         <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
//           <div className="flex items-center space-x-4 mb-2 sm:mb-0">
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               <span>ACTIVE INPUT</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-red-500"></div>
//               <span>INACTIVE INPUT</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-orange-500"></div>
//               <span>ARMED</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-purple-500"></div>
//               <span>ACTIVE MODE</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div>STATUS: {loading ? 'EXECUTING' : 'STANDBY'} • BI: {sseStatus} • MODE: {modeSseStatus}</div>
//             <div className="text-gray-600">MODBUS CONTROL v1.0</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState, useRef } from "react";

const API_BASE = "https://mqtt-testing-2.onrender.com";

/* ---------------- DATA STRUCTURES ---------------- */
const actions = [
  {
    title: "BTS Control",
    buttons: [
      {
        label: "BTS IN",
        endpoint: "/api/v1/bts/in",
        color: "green",
        type: "immediate",
      },
      {
        label: "BTS OUT",
        endpoint: "/api/v1/bts/out",
        color: "red",
        type: "immediate",
      },
      {
        label: "BTS RESET",
        endpoint: "/api/v1/reset-bts",
        color: "yellow",
        type: "immediate",
      },
    ],
  },
  {
    title: "Remote Test",
    buttons: [
      {
        label: "Remote Test IN",
        endpoint: "/api/v1/remote-test/in",
        color: "blue",
        type: "immediate",
      },
      {
        label: "Remote Test OUT",
        endpoint: "/api/v1/remote-test/out",
        color: "blue",
        type: "immediate",
      },
      {
        label: "Remote Test Transfer",
        endpoint: "/api/v1/remote-test/transfer",
        color: "purple",
        type: "immediate",
      },
    ],
  },
  {
    title: "Bus to Source",
    buttons: [
      {
        label: "BusA to Src1",
        endpoint: "/api/v1/bus1/source1",
        color: "gray",
        directionTag: "b1_s1_available",
        type: "arm",
      },
      {
        label: "BusA to Src2",
        endpoint: "/api/v1/bus1/source2",
        color: "gray",
        directionTag: "b1_s2_available",
        type: "arm",
      },
      {
        label: "BusB to Src1",
        endpoint: "/api/v1/bus2/source1",
        color: "gray",
        directionTag: "b2_s1_available",
        type: "arm",
      },
      {
        label: "BusB to Src2",
        endpoint: "/api/v1/bus2/source2",
        color: "gray",
        directionTag: "b2_s2_available",
        type: "arm",
      },
      {
        label: "BusA & B to Src1",
        endpoint: "/api/v1/bus12/source1",
        color: "gray",
        directionTag: "b1_2_to_s1_available",
        type: "arm",
      },
      {
        label: "BusA & B to Src2",
        endpoint: "/api/v1/bus12/source2",
        color: "gray",
        directionTag: "b1_2_to_s2_available",
        type: "arm",
      },
    ],
  },
  {
    title: "Remote Mode",
    buttons: [
      {
        label: "FAST",
        endpoint: "/api/v1/mode/fast",
        color: "blue",
        modeTag: "fastModeSelected",
        type: "immediate",
      },
      {
        label: "FAST-SLOW",
        endpoint: "/api/v1/mode/fasl",
        color: "blue",
        modeTag: "fastSlowModeSelected",
        type: "immediate",
      },
      {
        label: "FAST-INPHASE-SLOW",
        endpoint: "/api/v1/mode/fainsl",
        color: "blue",
        modeTag: "fastInPhaseSlowModeSelected",
        type: "immediate",
      },
      {
        label: "PARALLEL",
        endpoint: "/api/v1/mode/parallel",
        color: "blue",
        modeTag: "parallelModeSelected",
        type: "immediate",
      },
      {
        label: "SLOW",
        endpoint: "/api/v1/mode/slow",
        color: "blue",
        modeTag: "slowModeSelected",
        type: "immediate",
      },
    ],
  },
  {
    title: "Live Transfer",
    buttons: [
      {
        label: "Operate Breaker",
        endpoint: "/api/v1/breaker/operate",
        color: "orange",
        type: "execute",
      },
    ],
  },
];

export default function ModbusControlPanel() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [biData, setBiData] = useState([]);
  const [modeData, setModeData] = useState([]);
  const [sseStatus, setSseStatus] = useState("CONNECTING");
  const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
  const [armedDirection, setArmedDirection] = useState(null);
  const [activeCommand, setActiveCommand] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const biDataRef = useRef([]);
  const modeDataRef = useRef([]);
  const evtSourceRef = useRef(null);
  const modeEvtSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const modeReconnectTimeoutRef = useRef(null);

  // Track previous states to detect changes
  const prevBiDataRef = useRef([]);
  const prevModeDataRef = useRef([]);

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem("modbus-theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("modbus-theme", newMode ? "dark" : "light");
  };

  /* ---------------- LOGGING ---------------- */
  const addLog = (msg, type = "INFO") => {
    const allowedTypes = [
      "CMD",
      "ARMED",
      "EXECUTE",
      "SUCCESS",
      "ERROR",
      "MODE_CHANGE",
      "STATUS_CHANGE",
      "CONNECTION",
    ];

    if (!allowedTypes.includes(type)) {
      return;
    }

    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
  };

  /* ---------------- CONTROL CALL (RELAY-SAFE) ---------------- */
  const callApi = async (label, endpoint, buttonType = "immediate") => {
    try {
      setLoading(true);
      setActiveCommand(label);
      addLog(`${label}`, "CMD");

      /* 1️⃣ BUS DIRECTION = ARM ONLY (NO API CALL) */
      if (buttonType === "arm") {
        // Just arm the direction, don't make API call
        addLog(`Direction armed: ${label}`, "ARMED");
        setArmedDirection(label);
        setLoading(false);
        setTimeout(() => setActiveCommand(null), 200);
        return;
      }

      /* 2️⃣ BREAKER = EXPLICIT EXECUTION */
      if (buttonType === "execute") {
        if (!armedDirection) {
          addLog("Breaker blocked: No direction armed", "ERROR");
          setLoading(false);
          setTimeout(() => setActiveCommand(null), 200);
          return;
        }

        addLog(`Executing breaker: ${armedDirection}`, "EXECUTE");

        // Find the actual endpoint for the armed direction
        const directionAction = actions.find(
          (section) => section.title === "Bus to Source",
        );
        const armedButton = directionAction?.buttons.find(
          (btn) => btn.label === armedDirection,
        );

        if (!armedButton) {
          addLog(`Error: Could not find armed direction endpoint`, "ERROR");
          setLoading(false);
          setTimeout(() => setActiveCommand(null), 200);
          return;
        }

        // First send the direction command
        const directionResponse = await fetch(
          `${API_BASE}${armedButton.endpoint}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!directionResponse.ok) {
          throw new Error(
            `Direction setup failed: ${directionResponse.statusText}`,
          );
        }

        // Then execute the breaker
        const breakerResponse = await fetch(`${API_BASE}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await breakerResponse.json();
        if (!breakerResponse.ok)
          throw new Error(data.error || "Breaker operation failed");

        addLog(`Transfer complete: ${armedDirection}`, "SUCCESS");
        setArmedDirection(null);
        setLoading(false);
        setTimeout(() => setActiveCommand(null), 200);
        return;
      }

      /* 3️⃣ OTHER COMMANDS (BTS, REMOTE TEST, MODES) */
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");

      addLog(`${label} successful`, "SUCCESS");
    } catch (err) {
      addLog(`${label} failed: ${err.message}`, "ERROR");
    } finally {
      setLoading(false);
      setTimeout(() => setActiveCommand(null), 200);
    }
  };

  /* ---------------- SSE LIVE DATA ---------------- */
  useEffect(() => {
    let isMounted = true;

    const connectSSE = () => {
      try {
        if (evtSourceRef.current) {
          evtSourceRef.current.close();
          evtSourceRef.current = null;
        }

        evtSourceRef.current = new EventSource(
          `${API_BASE}/api/v1/stream/bi-available`,
        );

        evtSourceRef.current.onopen = () => {
          if (!isMounted) return;
          setSseStatus("CONNECTED");
          addLog("Direction stream connected", "CONNECTION");
        };

        evtSourceRef.current.onmessage = (e) => {
          if (!isMounted) return;
          try {
            const parsed = JSON.parse(e.data);

            if (parsed.bi && Array.isArray(parsed.bi)) {
              const transformedData = parsed.bi.map((item) => ({
                tag: item.tag,
                value: item.value,
                description: getDirectionDescription(item.tag),
              }));

              // Check for changes in system status
              if (prevBiDataRef.current.length > 0) {
                const changedItems = [];
                transformedData.forEach((item, index) => {
                  if (index < prevBiDataRef.current.length) {
                    const prevItem = prevBiDataRef.current[index];
                    if (prevItem && prevItem.value !== item.value) {
                      changedItems.push(item);
                    }
                  }
                });

                // Log any status changes
                if (changedItems.length > 0) {
                  changedItems.forEach((item) => {
                    const statusText =
                      item.tag === "btsNotReadyStatus"
                        ? item.value
                          ? "NOT READY"
                          : "READY"
                        : item.value
                          ? "AVAILABLE"
                          : "UNAVAILABLE";
                    addLog(
                      `${getDirectionDescription(item.tag)}: ${statusText}`,
                      "STATUS_CHANGE",
                    );
                  });
                }
              }

              // Update data immediately
              biDataRef.current = transformedData;
              setBiData(transformedData);
              prevBiDataRef.current = transformedData;
            }
          } catch (err) {
            console.error("SSE parse error:", err);
          }
        };

        evtSourceRef.current.onerror = (error) => {
          if (!isMounted) return;
          setSseStatus("DISCONNECTED");

          if (evtSourceRef.current) {
            evtSourceRef.current.close();
            evtSourceRef.current = null;
          }

          if (isMounted) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = setTimeout(() => {
              if (isMounted) {
                setSseStatus("RECONNECTING");
                connectSSE();
              }
            }, 2000);
          }
        };
      } catch (err) {
        console.error("SSE connection error:", err);
        if (isMounted) {
          setSseStatus("ERROR");

          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = setTimeout(() => {
            if (isMounted) {
              setSseStatus("RECONNECTING");
              connectSSE();
            }
          }, 3000);
        }
      }
    };

    connectSSE();

    // Cleanup function
    return () => {
      isMounted = false;

      if (evtSourceRef.current) {
        evtSourceRef.current.close();
        evtSourceRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  /* ---------------- MODE SELECTION SSE ---------------- */
  useEffect(() => {
    let isMounted = true;

    const connectModeSSE = () => {
      try {
        if (modeEvtSourceRef.current) {
          modeEvtSourceRef.current.close();
          modeEvtSourceRef.current = null;
        }

        modeEvtSourceRef.current = new EventSource(
          `${API_BASE}/api/v1/stream/mode-selected`,
        );

        modeEvtSourceRef.current.onopen = () => {
          if (!isMounted) return;
          setModeSseStatus("CONNECTED");
          addLog("Mode selection stream connected", "CONNECTION");
        };

        modeEvtSourceRef.current.onmessage = (e) => {
          if (!isMounted) return;
          try {
            const parsed = JSON.parse(e.data);

            let modeArray = [];

            if (parsed.bo && Array.isArray(parsed.bo)) {
              modeArray = parsed.bo;
            } else if (parsed.data && Array.isArray(parsed.data)) {
              modeArray = parsed.data;
            } else if (Array.isArray(parsed)) {
              modeArray = parsed;
            }

            if (modeArray.length > 0) {
              const transformedData = modeArray.map((item) => ({
                tag: item.tag || item.name || item.address,
                value: item.value,
                address: item.address || item.tag || "N/A",
                description: getModeDescription(
                  item.tag || item.name || item.address,
                ),
              }));

              // Check for mode changes
              if (prevModeDataRef.current.length > 0) {
                const prevActiveMode = prevModeDataRef.current.find(
                  (item) => item.value === true,
                );
                const currentActiveMode = transformedData.find(
                  (item) => item.value === true,
                );

                if (
                  prevActiveMode &&
                  currentActiveMode &&
                  prevActiveMode.tag !== currentActiveMode.tag
                ) {
                  addLog(
                    `Mode changed from ${prevActiveMode.description} to ${currentActiveMode.description}`,
                    "MODE_CHANGE",
                  );
                } else if (!prevActiveMode && currentActiveMode) {
                  addLog(
                    `Mode selected: ${currentActiveMode.description}`,
                    "MODE_CHANGE",
                  );
                } else if (prevActiveMode && !currentActiveMode) {
                  addLog(
                    `Mode deselected: ${prevActiveMode.description}`,
                    "MODE_CHANGE",
                  );
                }
              }

              // Update data immediately
              modeDataRef.current = transformedData;
              setModeData(transformedData);
              prevModeDataRef.current = transformedData;
            }
          } catch (err) {
            console.error("Mode SSE parse error:", err);
          }
        };

        modeEvtSourceRef.current.onerror = (error) => {
          if (!isMounted) return;
          setModeSseStatus("DISCONNECTED");

          if (modeEvtSourceRef.current) {
            modeEvtSourceRef.current.close();
            modeEvtSourceRef.current = null;
          }

          if (isMounted) {
            clearTimeout(modeReconnectTimeoutRef.current);
            modeReconnectTimeoutRef.current = setTimeout(() => {
              if (isMounted) {
                setModeSseStatus("RECONNECTING");
                connectModeSSE();
              }
            }, 2000);/////////////////////////////////////
          }
        };
      } catch (err) {
        console.error("Mode SSE connection error:", err);
        if (isMounted) {
          setModeSseStatus("ERROR");

          clearTimeout(modeReconnectTimeoutRef.current);
          modeReconnectTimeoutRef.current = setTimeout(() => {
            if (isMounted) {
              setModeSseStatus("RECONNECTING");
              connectModeSSE();
            }
          }, 3000);////////////////////////////////////////////
        }
      }
    };

    connectModeSSE();

    // Cleanup function
    return () => {
      isMounted = false;

      if (modeEvtSourceRef.current) {
        modeEvtSourceRef.current.close();
        modeEvtSourceRef.current = null;
      }

      if (modeReconnectTimeoutRef.current) {
        clearTimeout(modeReconnectTimeoutRef.current);
      }
    };
  }, []);

  /* ---------------- HELPER FUNCTIONS ---------------- */
  const getModeDescription = (tag) => {
    const descriptions = {
      fastModeSelected: "Fast Mode",
      fastSlowModeSelected: "Fast-Slow Mode",
      fastInPhaseSlowModeSelected: "Fast In-Phase Slow Mode",
      parallelModeSelected: "Parallel Mode",
      slowModeSelected: "Slow Mode",
    };
    return descriptions[tag] || tag;
  };

  const getDirectionDescription = (tag) => {
    const descriptions = {
      b1_s1_available: "BusA to Src1",
      b1_s2_available: "BusA to Src2",
      b2_s1_available: "BusB to Src1",
      b2_s2_available: "BusB to Src2",
      b1_2_to_s1_available: "BusA&B to Src1",
      b1_2_to_s2_available: "BusA&B to Src2",
      btsNotReadyStatus: "BTS Ready Status",
    };
    return descriptions[tag] || tag;
  };

  const getActiveMode = () => {
    const activeMode = modeData.find((item) => item.value === true);
    return activeMode ? activeMode.description : "No Mode Selected";
  };

  // Get BTS Ready Status
  const getBTSReadyStatus = () => {
    const btsNotReady = biData.find((item) => item.tag === "btsNotReadyStatus");
    return btsNotReady ? !btsNotReady.value : false;
  };

  // Get direction availability
  const getDirectionAvailability = (directionTag) => {
    if (!directionTag) return false;
    const direction = biData.find((item) => item.tag === directionTag);
    return direction ? direction.value : false;
  };

  // Get mode active status
  const getModeActiveStatus = (modeTag) => {
    if (!modeTag) return false;
    const mode = modeData.find((item) => item.tag === modeTag);
    return mode ? mode.value : false;
  };

  // Force refresh data function
  const forceRefreshData = async () => {
    try {
      addLog("Manual data refresh", "CMD");

      // Try to fetch direction data via API if SSE is not working
      const directionRes = await fetch(
        `${API_BASE}/api/v1/stream/bi-available`,
      );
      if (directionRes.ok) {
        const directionData = await directionRes.json();
        if (directionData.bi) {
          setBiData(directionData.bi);
        }
      }

      // Try to fetch mode data via API if SSE is not working
      const modeRes = await fetch(`${API_BASE}/api/v1/modes`);
      if (modeRes.ok) {
        const modeData = await modeRes.json();
        if (modeData.bo) {
          setModeData(modeData.bo);
        }
      }

      addLog("Manual refresh completed", "SUCCESS");
    } catch (err) {
      addLog(`Manual refresh failed: ${err.message}`, "ERROR");
    }
  };

  // Clear event log
  const clearLogs = () => {
    setLogs([]);
  };

  // Theme-based color classes
  const colorClasses = {
    green: isDarkMode
      ? "bg-green-900 border-green-600 hover:bg-green-800 hover:border-green-500 text-white"
      : "bg-green-600 border-green-700 hover:bg-green-700 hover:border-green-800 text-white",
    red: isDarkMode
      ? "bg-red-900 border-red-600 hover:bg-red-800 hover:border-red-500 text-white"
      : "bg-red-600 border-red-700 hover:bg-red-700 hover:border-red-800 text-white",
    yellow: isDarkMode
      ? "bg-yellow-900 border-yellow-600 hover:bg-yellow-800 hover:border-yellow-500 text-white"
      : "bg-yellow-500 border-yellow-600 hover:bg-yellow-600 hover:border-yellow-700 text-white",
    blue: isDarkMode
      ? "bg-blue-900 border-blue-600 hover:bg-blue-800 hover:border-blue-500 text-white"
      : "bg-blue-600 border-blue-700 hover:bg-blue-700 hover:border-blue-800 text-white",
    purple: isDarkMode
      ? "bg-purple-900 border-purple-600 hover:bg-purple-800 hover:border-purple-500 text-white"
      : "bg-purple-600 border-purple-700 hover:bg-purple-700 hover:border-purple-800 text-white",
    gray: isDarkMode
      ? "bg-gray-900 border-gray-600 hover:bg-gray-800 hover:border-gray-500 text-white"
      : "bg-gray-700 border-gray-800 hover:bg-gray-800 hover:border-gray-900 text-white",
    orange: isDarkMode
      ? "bg-orange-900 border-orange-600 hover:bg-orange-800 hover:border-orange-500 text-white"
      : "bg-orange-500 border-orange-600 hover:bg-orange-600 hover:border-orange-700 text-white",
  };

  // Get direction availability class
  const getDirectionClass = (available) => {
    if (available) {
      return isDarkMode
        ? "bg-green-900/50 border-green-500 hover:bg-green-800"
        : "bg-green-100 border-green-400 hover:bg-green-200";
    }
    return isDarkMode
      ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
      : "bg-gray-100 border-gray-300 hover:bg-gray-200";
  };

  // Get mode active class
  const getModeActiveClass = (active) => {
    if (active) {
      return isDarkMode
        ? "bg-purple-900/50 border-purple-500 hover:bg-purple-800"
        : "bg-purple-100 border-purple-400 hover:bg-purple-200";
    }
    return isDarkMode
      ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
      : "bg-gray-100 border-gray-300 hover:bg-gray-200";
  };

  // Theme-based background classes
  const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-100";
  const textClass = isDarkMode ? "text-gray-200" : "text-gray-800";
  const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
  const cardBorderClass = isDarkMode ? "border-gray-700" : "border-gray-300";
  const statusCardBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const statusCardText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const statusValueText = (condition, darkColor, lightColor) =>
    isDarkMode
      ? condition
        ? darkColor
        : "text-gray-500"
      : condition
        ? lightColor
        : "text-gray-500";
  const systemStatusBg = (value, isBTS = false) => {
    if (isBTS) {
      return value
        ? isDarkMode
          ? "bg-red-900/30 border-red-700"
          : "bg-red-100 border-red-300"
        : isDarkMode
          ? "bg-green-900/30 border-green-700"
          : "bg-green-100 border-green-300";
    }
    return value
      ? isDarkMode
        ? "bg-green-900/30 border-green-700"
        : "bg-green-100 border-green-300"
      : isDarkMode
        ? "bg-gray-800/50 border-gray-600"
        : "bg-gray-100 border-gray-300";
  };
  const systemStatusText = (value, isBTS = false) => {
    if (isBTS) {
      return value
        ? isDarkMode
          ? "text-red-400"
          : "text-red-600"
        : isDarkMode
          ? "text-green-400"
          : "text-green-600";
    }
    return value
      ? isDarkMode
        ? "text-green-400"
        : "text-green-600"
      : isDarkMode
        ? "text-gray-400"
        : "text-gray-600";
  };
  const modeStatusBg = (value) =>
    isDarkMode
      ? value
        ? "bg-purple-900/40 border-purple-600"
        : "bg-gray-800/50 border-gray-600"
      : value
        ? "bg-purple-100 border-purple-300"
        : "bg-gray-100 border-gray-300";
  const modeStatusText = (value) =>
    isDarkMode
      ? value
        ? "text-purple-300"
        : "text-gray-400"
      : value
        ? "text-purple-600"
        : "text-gray-600";
  const logBgClass = (type) =>
    isDarkMode
      ? type === "ERROR"
        ? "bg-red-900/20 border-red-800/50"
        : type === "SUCCESS"
          ? "bg-green-900/20 border-green-800/50"
          : type === "CMD"
            ? "bg-blue-900/20 border-blue-800/50"
            : type === "ARMED"
              ? "bg-orange-900/20 border-orange-800/50"
              : type === "EXECUTE"
                ? "bg-yellow-900/20 border-yellow-800/50"
                : type === "MODE_CHANGE"
                  ? "bg-purple-900/20 border-purple-800/50"
                  : type === "STATUS_CHANGE"
                    ? "bg-indigo-900/20 border-indigo-800/50"
                    : type === "CONNECTION"
                      ? "bg-gray-800/50 border-gray-700"
                      : "bg-gray-800 border-gray-700"
      : type === "ERROR"
        ? "bg-red-50 border-red-200"
        : type === "SUCCESS"
          ? "bg-green-50 border-green-200"
          : type === "CMD"
            ? "bg-blue-50 border-blue-200"
            : type === "ARMED"
              ? "bg-orange-50 border-orange-200"
              : type === "EXECUTE"
                ? "bg-yellow-50 border-yellow-200"
                : type === "MODE_CHANGE"
                  ? "bg-purple-50 border-purple-200"
                  : type === "STATUS_CHANGE"
                    ? "bg-indigo-50 border-indigo-200"
                    : type === "CONNECTION"
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-gray-200";
  const logTextClass = (type) =>
    isDarkMode
      ? type === "ERROR"
        ? "text-red-300"
        : type === "SUCCESS"
          ? "text-green-300"
          : type === "CMD"
            ? "text-blue-300"
            : type === "ARMED"
              ? "text-orange-300"
              : type === "EXECUTE"
                ? "text-yellow-300"
                : type === "MODE_CHANGE"
                  ? "text-purple-300"
                  : type === "STATUS_CHANGE"
                    ? "text-indigo-300"
                    : type === "CONNECTION"
                      ? "text-gray-400"
                      : "text-gray-300"
      : type === "ERROR"
        ? "text-red-600"
        : type === "SUCCESS"
          ? "text-green-600"
          : type === "CMD"
            ? "text-blue-600"
            : type === "ARMED"
              ? "text-orange-600"
              : type === "EXECUTE"
                ? "text-yellow-600"
                : type === "MODE_CHANGE"
                  ? "text-purple-600"
                  : type === "STATUS_CHANGE"
                    ? "text-indigo-600"
                    : type === "CONNECTION"
                      ? "text-gray-600"
                      : "text-gray-700";

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} p-3`}>
      {/* Header with Theme Toggle */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`w-2 h-2 rounded-full ${sseStatus === "CONNECTED" ? "bg-green-500 animate-pulse" : sseStatus === "RECONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
            ></div>
            <h1 className="text-lg font-bold tracking-wide">
              RELAY CONTROL PANEL
            </h1>
            <button
              onClick={forceRefreshData}
              className={`ml-2 px-2 py-1 text-xs ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"} rounded border ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
            >
              ⟳ Refresh
            </button>
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" : "bg-white hover:bg-gray-100 border border-gray-300 shadow-sm"} transition-colors duration-300`}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <div
              className={`text-xs font-mono px-3 py-1 rounded border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300 shadow-sm"}`}
            >
              BI: {sseStatus} | MODE: {modeSseStatus}
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div
            className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}
          >
            <div className={`text-xs ${statusCardText}`}>ARMED DIRECTION</div>
            <div
              className={`text-sm font-bold truncate ${statusValueText(armedDirection, "text-orange-400", "text-orange-600")}`}
            >
              {armedDirection || "NONE"}
            </div>
          </div>
          <div
            className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}
          >
            <div className={`text-xs ${statusCardText}`}>ACTIVE COMMAND</div>
            <div
              className={`text-sm font-bold truncate ${statusValueText(activeCommand, "text-blue-400", "text-blue-600")}`}
            >
              {activeCommand || "IDLE"}
            </div>
          </div>
          <div
            className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}
          >
            <div className={`text-xs ${statusCardText}`}>ACTIVE MODE</div>
            <div
              className={`text-sm font-bold truncate ${statusValueText(getActiveMode() !== "No Mode Selected", "text-purple-400", "text-purple-600")}`}
            >
              {getActiveMode()}
            </div>
          </div>
          <div
            className={`${statusCardBg} p-3 rounded border ${cardBorderClass}`}
          >
            <div className={`text-xs ${statusCardText}`}>BTS STATUS</div>
            <div
              className={`text-sm font-bold ${getBTSReadyStatus() ? "text-green-500" : "text-red-500"}`}
            >
              {getBTSReadyStatus() ? "READY" : "NOT READY"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT: CONTROL PANELS */}
        <div className="space-y-4">
          {actions.map((section, idx) => (
            <div
              key={idx}
              className={`${cardBgClass} p-4 rounded-lg border ${cardBorderClass}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {section.title}
                </h3>
                <div
                  className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
                >
                  {section.buttons.length} CMDs
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {section.buttons.map((btn, i) => {
                  const isBreaker = btn.type === "execute";
                  const isDirection = btn.type === "arm";
                  const disabled = loading || (isBreaker && !armedDirection);
                  const isActive = activeCommand === btn.label;
                  const directionAvailable = isDirection
                    ? getDirectionAvailability(btn.directionTag)
                    : false;
                  const modeActive =
                    section.title === "Remote Mode"
                      ? getModeActiveStatus(btn.modeTag)
                      : false;

                  return (
                    <div key={i} className="relative">
                      <button
                        disabled={disabled}
                        onClick={() =>
                          callApi(btn.label, btn.endpoint, btn.type)
                        }
                        className={`relative w-full p-3 rounded border text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isDirection ? getDirectionClass(directionAvailable) : section.title === "Remote Mode" ? getModeActiveClass(modeActive) : colorClasses[btn.color]} ${isActive ? "ring-2 ring-offset-2 ring-offset-gray-900 ring-blue-500" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{btn.label}</span>

                          {/* Visual indicators */}
                          {isDirection && (
                            <div className="flex items-center space-x-1">
                              <div
                                className={`w-3 h-3 rounded-full ${directionAvailable ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
                              ></div>
                            </div>
                          )}

                          {section.title === "Remote Mode" && (
                            <div className="flex items-center space-x-1">
                              <div
                                className={`w-3 h-3 rounded-full ${modeActive ? "bg-purple-500 animate-pulse" : "bg-gray-500"}`}
                              ></div>
                            </div>
                          )}
                        </div>

                        {isActive && (
                          <div className="absolute -top-1 -right-1">
                            <div className="animate-ping absolute w-3 h-3 rounded-full bg-blue-500"></div>
                            <div className="relative w-2 h-2 rounded-full bg-blue-400"></div>
                          </div>
                        )}
                      </button>

                      {/* Status indicator */}
                      {(isDirection || section.title === "Remote Mode") && (
                        <div className="absolute -top-1 -right-1">
                          {isDirection && directionAvailable && (
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                          )}
                          {section.title === "Remote Mode" && modeActive && (
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-lg shadow-purple-500/50"></div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {section.title === "Live Transfer" && armedDirection && (
                <div
                  className={`mt-3 p-2 rounded border ${isDarkMode ? "bg-orange-900/30 border-orange-700" : "bg-orange-50 border-orange-200"}`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-medium ${isDarkMode ? "text-orange-300" : "text-orange-700"}`}
                    >
                      ARMED:
                    </span>
                    <span
                      className={`font-bold ${isDarkMode ? "text-orange-200" : "text-orange-800"}`}
                    >
                      {armedDirection}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT: MONITORING */}
        <div className="space-y-4">
          {/* System Status */}
          <div
            className={`${cardBgClass} p-4 rounded-lg border ${cardBorderClass}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h2
                className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                SYSTEM STATUS
              </h2>
              <div className="flex items-center space-x-2">
                <div
                  className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
                >
                  LIVE FEED
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${sseStatus === "CONNECTED" ? "bg-green-500 animate-pulse" : sseStatus === "RECONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {biData.map((item, index) => (
                <div
                  key={item.tag || index}
                  className={`p-3 rounded border flex items-center justify-between ${systemStatusBg(item.value, item.tag === "btsNotReadyStatus")}`}
                >
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-xs font-medium truncate ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {getDirectionDescription(item.tag)}
                    </div>
                    <div
                      className={`text-[10px] font-mono truncate ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
                    >
                      {item.tag === "btsNotReadyStatus"
                        ? "BTS STATUS"
                        : "DIRECTION STATUS"}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.tag === "btsNotReadyStatus"
                          ? item.value
                            ? "bg-red-500 animate-pulse"
                            : "bg-green-500 animate-pulse"
                          : item.value
                            ? "bg-green-500 animate-pulse"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <div
                      className={`text-sm font-bold font-mono ${systemStatusText(item.value, item.tag === "btsNotReadyStatus")}`}
                    >
                      {item.tag === "btsNotReadyStatus"
                        ? item.value
                          ? "NOT READY"
                          : "READY"
                        : item.value
                          ? "AVAILABLE"
                          : "UNAVAILABLE"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {biData.length === 0 && (
              <div
                className={`text-center py-4 text-sm ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${sseStatus === "CONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
                  ></div>
                  <span>
                    {sseStatus === "CONNECTING"
                      ? "Connecting to data stream..."
                      : sseStatus === "RECONNECTING"
                        ? "Reconnecting..."
                        : "No data received"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Mode Selection Status */}
          <div
            className={`${cardBgClass} p-4 rounded-lg border ${cardBorderClass}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h2
                className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                MODE SELECTION
              </h2>
              <div className="flex items-center space-x-2">
                <div
                  className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
                >
                  LIVE FEED
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${modeSseStatus === "CONNECTED" ? "bg-green-500 animate-pulse" : modeSseStatus === "RECONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {modeData.map((item, index) => (
                <div
                  key={item.tag || index}
                  className={`p-3 rounded border flex items-center justify-between ${modeStatusBg(item.value)}`}
                >
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-xs font-medium truncate ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {item.description}
                    </div>
                    <div
                      className={`text-[10px] font-mono truncate ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
                    >
                      {item.address}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${item.value ? "bg-purple-500 animate-pulse" : isDarkMode ? "bg-gray-600" : "bg-gray-400"}`}
                    ></div>
                    <div
                      className={`text-sm font-bold font-mono ${modeStatusText(item.value)}`}
                    >
                      {item.value ? "ACTIVE" : "INACTIVE"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {modeData.length === 0 && (
              <div
                className={`text-center py-4 text-sm ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${modeSseStatus === "CONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
                  ></div>
                  <span>
                    {modeSseStatus === "CONNECTING"
                      ? "Connecting to mode stream..."
                      : modeSseStatus === "RECONNECTING"
                        ? "Reconnecting..."
                        : "No mode data received"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Event Log */}
          <div
            className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} p-4 rounded-lg border ${cardBorderClass} flex-1`}
          >
            <div className="flex items-center justify-between mb-3">
              <h2
                className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                EVENT LOG
              </h2>
              <div className="flex items-center space-x-2">
                <div
                  className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
                >
                  IMPORTANT EVENTS ONLY
                </div>
                <button
                  onClick={clearLogs}
                  className={`text-xs px-2 py-1 ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"} rounded border ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="h-64 overflow-y-auto font-mono text-xs">
              {logs.length === 0 ? (
                <div
                  className={`text-center py-8 ${isDarkMode ? "text-gray-600" : "text-gray-500"}`}
                >
                  <div className="mb-2">No important events recorded</div>
                  <div className="text-xs">
                    Events will appear when commands are executed or system
                    status changes
                  </div>
                </div>
              ) : (
                <div className="space-y-1 pr-2">
                  {logs.map((log, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded border ${logBgClass(log.type)}`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-16 flex-shrink-0 text-[10px] ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
                        >
                          [{log.timestamp}]
                        </div>
                        <div
                          className={`text-[11px] font-medium ml-2 ${logTextClass(log.type)} truncate`}
                        >
                          {log.msg}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Log Legend */}
            <div className="mt-4 pt-3 border-t border-gray-800">
              <div className="flex flex-wrap gap-3 text-[10px]">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    COMMAND
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    ARMED
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    SUCCESS
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    ERROR
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    EXECUTE
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    MODE CHANGE
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    STATUS CHANGE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-4 mb-2 sm:mb-0">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>AVAILABLE/READY</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span>UNAVAILABLE/NOT READY</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span>ARMED</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>ACTIVE MODE</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
              <span>RECONNECTING</span>
            </div>
          </div>
          <div className="text-right">
            <div>
              STATUS: {loading ? "EXECUTING" : "STANDBY"} • BI: {sseStatus} •
              MODE: {modeSseStatus} • UPDATE: 200ms
            </div>
            <div className="text-gray-600">
              MODBUS CONTROL v2.0 • EVENT LOG FILTERED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
