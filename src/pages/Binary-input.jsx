// import React, { useState, useEffect } from "react";

// const API_BASE = "http://localhost:8000/api/v1";

// export default function BinaryIO() {
//   const [activeTab, setActiveTab] = useState("inputs");
//   const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
//   const [searchTerm, setSearchTerm] = useState("");
//   const [connected, setConnected] = useState(false);
//   const [biSignals, setBiSignals] = useState([]);
//   const [boSignals, setBoSignals] = useState([]);

//   // SSE Streams
//   useEffect(() => {
//     const biSource = new EventSource(`${API_BASE}/bts/streambi`);
//     const boSource = new EventSource(`${API_BASE}/bts/streambo`);

//     biSource.onopen = () => setConnected(true);
//     biSource.onerror = () => setConnected(false);

//     biSource.onmessage = (e) => {
//       const data = JSON.parse(e.data);
//       if (data.bi) setBiSignals(data.bi);
//     };

//     boSource.onmessage = (e) => {
//       const data = JSON.parse(e.data);
//       if (data.bo) setBoSignals(data.bo);
//     };

//     return () => {
//       biSource.close();
//       boSource.close();
//     };
//   }, []);

//   // Helper functions
//   const formatName = (tag) => {
//     return tag
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, l => l.toUpperCase());
//   };

//   const getSignalType = (address) => {
//     if (address.includes('I')) return 'INPUT';
//     if (address.includes('O')) return 'OUTPUT';
//     if (address.includes('M')) return 'MEMORY';
//     return 'INTERNAL';
//   };

//   const getStatusColor = (value, type) => {
//     if (type === 'INPUT') {
//       return value ? 'bg-green-900 border-green-500' : 'bg-gray-800 border-gray-600';
//     }
//     if (type === 'OUTPUT') {
//       return value ? 'bg-blue-900 border-blue-500' : 'bg-gray-800 border-gray-600';
//     }
//     return value ? 'bg-purple-900 border-purple-500' : 'bg-gray-800 border-gray-600';
//   };

//   const getStatusText = (value, type) => {
//     if (type === 'INPUT') {
//       return value ? 'ACTIVE' : 'INACTIVE';
//     }
//     if (type === 'OUTPUT') {
//       return value ? 'ON' : 'OFF';
//     }
//     return value ? 'TRUE' : 'FALSE';
//   };

//   // Data filtering
//   const data = activeTab === "inputs" ? biSignals : boSignals;
//   const filtered = data.filter(
//     (s) =>
//       s.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.address.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Statistics
//   const activeCount = filtered.filter((s) => s.value).length;
//   const inactiveCount = filtered.length - activeCount;
//   const inputCount = biSignals.length;
//   const outputCount = boSignals.length;

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 p-3">
//       {/* Header */}
//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center space-x-3">
//             <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//             <h1 className="text-lg font-bold tracking-wide">BINARY I/O MONITOR</h1>
//           </div>
//           <div className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded">
//             {connected ? 'LIVE STREAM' : 'OFFLINE'}
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
//           <div className="bg-gray-800 p-3 rounded border border-gray-700">
//             <div className="text-xs text-gray-400">INPUTS</div>
//             <div className="text-lg font-bold">{inputCount}</div>
//           </div>
//           <div className="bg-gray-800 p-3 rounded border border-gray-700">
//             <div className="text-xs text-gray-400">OUTPUTS</div>
//             <div className="text-lg font-bold">{outputCount}</div>
//           </div>
//           <div className="bg-gray-800 p-3 rounded border border-gray-700">
//             <div className="text-xs text-gray-400">ACTIVE</div>
//             <div className="text-lg font-bold text-green-400">{activeCount}</div>
//           </div>
//           <div className="bg-gray-800 p-3 rounded border border-gray-700">
//             <div className="text-xs text-gray-400">INACTIVE</div>
//             <div className="text-lg font-bold text-gray-400">{inactiveCount}</div>
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 mb-4">
//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* Tab Selection */}
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setActiveTab("inputs")}
//               className={`px-4 py-2 text-sm font-bold rounded transition-all ${
//                 activeTab === "inputs"
//                   ? "bg-blue-900 text-blue-100 border border-blue-700"
//                   : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//               }`}
//             >
//               INPUTS
//             </button>
//             <button
//               onClick={() => setActiveTab("outputs")}
//               className={`px-4 py-2 text-sm font-bold rounded transition-all ${
//                 activeTab === "outputs"
//                   ? "bg-blue-900 text-blue-100 border border-blue-700"
//                   : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//               }`}
//             >
//               OUTPUTS
//             </button>
//           </div>

//           {/* View Mode Toggle */}
//           <div className="flex space-x-2 ml-0 sm:ml-auto">
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`px-3 py-2 text-sm rounded transition-all ${
//                 viewMode === "grid"
//                   ? "bg-gray-700 text-white border border-gray-600"
//                   : "bg-gray-800 text-gray-400 hover:bg-gray-700"
//               }`}
//             >
//               GRID
//             </button>
//             <button
//               onClick={() => setViewMode("table")}
//               className={`px-3 py-2 text-sm rounded transition-all ${
//                 viewMode === "table"
//                   ? "bg-gray-700 text-white border border-gray-600"
//                   : "bg-gray-800 text-gray-400 hover:bg-gray-700"
//               }`}
//             >
//               TABLE
//             </button>
//           </div>

//           {/* Search */}
//           <div className="flex-1 min-w-[200px]">
//             <input
//               type="text"
//               placeholder="Search by tag or address..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:border-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       {viewMode === "grid" ? (
//         /* ========== GRID VIEW ========== */
//         <div className="mb-4">
//           <div className="flex items-center justify-between mb-2 px-1">
//             <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
//               {activeTab === "inputs" ? "DIGITAL INPUTS" : "DIGITAL OUTPUTS"}
//             </h2>
//             <span className="text-xs text-gray-500">{filtered.length} SIGNALS</span>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
//             {filtered.map((s) => {
//               const type = getSignalType(s.address);
//               const statusColor = getStatusColor(s.value, type);
//               const statusText = getStatusText(s.value, type);
              
//               return (
//                 <div
//                   key={s.address}
//                   className={`p-3 rounded border transition-all ${statusColor} hover:brightness-110`}
//                 >
//                   <div className="mb-2">
//                     <div className="text-xs font-medium text-gray-300 truncate mb-1">
//                       {formatName(s.tag)}
//                     </div>
//                     <div className="text-[10px] font-mono text-gray-500 bg-gray-900/50 px-1.5 py-0.5 rounded">
//                       {s.address}
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div className={`text-xs font-bold px-2 py-1 rounded ${s.value ? 'bg-green-900/30 text-green-300' : 'bg-gray-700 text-gray-400'}`}>
//                       {s.value ? '1' : '0'}
//                     </div>
//                     <div className="text-[10px] font-medium text-gray-400">
//                       {statusText}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ) : (
//         /* ========== TABLE VIEW ========== */
//         <div className="mb-4">
//           <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-gray-900">
//                 <tr className="text-xs uppercase tracking-wide">
//                   <th className="p-3 text-left font-medium text-gray-300 border-b border-gray-700">SIGNAL</th>
//                   <th className="p-3 text-left font-medium text-gray-300 border-b border-gray-700">ADDRESS</th>
//                   <th className="p-3 text-left font-medium text-gray-300 border-b border-gray-700">TYPE</th>
//                   <th className="p-3 text-left font-medium text-gray-300 border-b border-gray-700">STATUS</th>
//                   <th className="p-3 text-left font-medium text-gray-300 border-b border-gray-700">VALUE</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((s) => {
//                   const type = getSignalType(s.address);
//                   const statusText = getStatusText(s.value, type);
                  
//                   return (
//                     <tr
//                       key={s.address}
//                       className={`border-b border-gray-700 hover:bg-gray-750 ${s.value ? 'bg-gray-800/50' : ''}`}
//                     >
//                       <td className="p-3">
//                         <div className="font-medium text-sm">{formatName(s.tag)}</div>
//                       </td>
//                       <td className="p-3">
//                         <div className="font-mono text-xs text-gray-400">{s.address}</div>
//                       </td>
//                       <td className="p-3">
//                         <div className={`text-xs font-bold px-2 py-1 rounded inline-block ${
//                           type === 'INPUT' ? 'bg-blue-900/30 text-blue-300' :
//                           type === 'OUTPUT' ? 'bg-purple-900/30 text-purple-300' :
//                           'bg-gray-700 text-gray-400'
//                         }`}>
//                           {type}
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <div className="flex items-center">
//                           <div className={`w-2 h-2 rounded-full mr-2 ${s.value ? 'bg-green-500' : 'bg-gray-500'}`}></div>
//                           <span className={`text-sm font-medium ${s.value ? 'text-green-400' : 'text-gray-400'}`}>
//                             {statusText}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <div className={`text-lg font-bold font-mono ${s.value ? 'text-green-400' : 'text-gray-500'}`}>
//                           {s.value ? '1' : '0'}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
            
//             {filtered.length === 0 && (
//               <div className="p-8 text-center text-gray-500">
//                 <div className="text-lg mb-2">No signals found</div>
//                 <div className="text-sm">Try a different search term or check connection</div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <div className="mt-4 pt-3 border-t border-gray-800">
//         <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
//           <div className="flex items-center space-x-4 mb-2 sm:mb-0">
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               <span>ACTIVE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-gray-500"></div>
//               <span>INACTIVE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//               <span>INPUT</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-purple-500"></div>
//               <span>OUTPUT</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div>MODE: {viewMode.toUpperCase()} • {activeTab.toUpperCase()}</div>
//             <div className="text-gray-600">BINARY I/O v1.0</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








// ///////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";

const API_BASE = "https://mqtt-testing-2.onrender.com";

export default function BinaryIO() {
  const [activeTab, setActiveTab] = useState("inputs");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
  const [searchTerm, setSearchTerm] = useState("");
  const [connected, setConnected] = useState(false);
  const [biSignals, setBiSignals] = useState([]);
  const [boSignals, setBoSignals] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('binaryio-theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('binaryio-theme', newMode ? 'dark' : 'light');
  };

  // Single SSE Stream for both BI and BO
  useEffect(() => {
    const source = new EventSource(`${API_BASE}/api/v1/stream/bi-bo`);

    source.onopen = () => setConnected(true);
    source.onerror = () => setConnected(false);

    source.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        
        // Handle both BI and BO data from single stream
        if (data.bi && Array.isArray(data.bi)) {
          setBiSignals(data.bi);
        }
        
        if (data.bo && Array.isArray(data.bo)) {
          setBoSignals(data.bo);
        }
        
        // Handle combined format if both are in one array
        if (data.signals && Array.isArray(data.signals)) {
          // Separate BI and BO signals
          const bi = data.signals.filter(s => 
            s.address && s.address.includes('I') || 
            s.type === 'INPUT' || 
            s.tag.toLowerCase().includes('input')
          );
          const bo = data.signals.filter(s => 
            s.address && s.address.includes('O') || 
            s.type === 'OUTPUT' || 
            s.tag.toLowerCase().includes('output')
          );
          
          if (bi.length > 0) setBiSignals(bi);
          if (bo.length > 0) setBoSignals(bo);
        }
        
        // Handle alternative format
        if (data.data && Array.isArray(data.data)) {
          const bi = [];
          const bo = [];
          
          data.data.forEach(item => {
            if (item.address && item.address.includes('I')) {
              bi.push(item);
            } else if (item.address && item.address.includes('O')) {
              bo.push(item);
            }
          });
          
          if (bi.length > 0) setBiSignals(bi);
          if (bo.length > 0) setBoSignals(bo);
        }
        
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    return () => {
      source.close();
    };
  }, []);

  // Helper functions
  const formatName = (tag) => {
    return tag
      .replace(/_/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const getSignalType = (address) => {
    if (!address) return 'UNKNOWN';
    if (address.includes('I')) return 'INPUT';
    if (address.includes('O')) return 'OUTPUT';
    if (address.includes('M')) return 'MEMORY';
    return 'INTERNAL';
  };

  const getStatusColor = (value, type) => {
    if (type === 'INPUT') {
      return value ? 
        (isDarkMode ? 'bg-green-900 border-green-500' : 'bg-green-100 border-green-400') : 
        (isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300');
    }
    if (type === 'OUTPUT') {
      return value ? 
        (isDarkMode ? 'bg-blue-900 border-blue-500' : 'bg-blue-100 border-blue-400') : 
        (isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300');
    }
    return value ? 
      // (isDarkMode ? 'bg-purple-900 border-purple-500' : 'bg-purple-100 border-purple-400') : 
      // (isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300');
      (isDarkMode ? 'bg-blue-900 border-blue-500' : 'bg-green-300 border-blue-400') : 
      (isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300');
  };

  const getStatusText = (value, type) => {
    if (type === 'INPUT') {
      return value ? 'ACTIVE' : 'INACTIVE';
    }
    if (type === 'OUTPUT') {
      return value ? 'ON' : 'OFF';
    }
    return value ? 'TRUE' : 'FALSE';
  };

  // Theme-based classes
  const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-300";
  const textClass = isDarkMode ? "text-gray-200" : "text-gray-800";
  const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
  const cardBorderClass = isDarkMode ? "border-gray-700" : "border-gray-300";
  const cardText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const cardTitle = isDarkMode ? "text-gray-300" : "text-gray-700";
  const statCardBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const statCardBorder = isDarkMode ? "border-gray-700" : "border-gray-300";
  const statCardText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const statCardValue = (color) => isDarkMode ? `text-${color}-400` : `text-${color}-600`;
  const controlBarBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const controlBarBorder = isDarkMode ? "border-gray-700" : "border-gray-300";
  const tabButtonActive = isDarkMode 
    ? "bg-blue-900 text-blue-100 border border-blue-700" 
    : "bg-blue-600 text-white border border-blue-500";
  const tabButtonInactive = isDarkMode 
    ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
    : "bg-gray-200 text-gray-700 hover:bg-gray-300";
  const viewButtonActive = isDarkMode 
    ? "bg-gray-700 text-white border border-gray-600" 
    : "bg-gray-300 text-gray-800 border border-gray-400";
  const viewButtonInactive = isDarkMode 
    ? "bg-gray-800 text-gray-400 hover:bg-gray-700" 
    : "bg-gray-100 text-gray-600 hover:bg-gray-200";
  const searchInputBg = isDarkMode ? "bg-gray-700" : "bg-gray-100";
  const searchInputBorder = isDarkMode ? "border-gray-600" : "border-gray-300";
  const sectionTitle = isDarkMode ? "text-gray-300" : "text-gray-700";
  const sectionSubtitle = isDarkMode ? "text-gray-500" : "text-gray-600";
  const gridCardText = isDarkMode ? "text-gray-300" : "text-gray-700";
  const gridCardAddressBg = isDarkMode ? "bg-gray-900/50" : "bg-gray-100";
  const gridCardAddressText = isDarkMode ? "text-gray-500" : "text-gray-600";
  const gridCardValueBg = (value) => value 
    ? (isDarkMode ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700 border border-green-200") 
    : (isDarkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600 border border-gray-300");
  const tableHeaderBg = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const tableHeaderText = isDarkMode ? "text-gray-300" : "text-gray-700";
  const tableBorder = isDarkMode ? "border-gray-700" : "border-gray-300";
  const tableRowBg = (value) => value ? (isDarkMode ? "bg-gray-800/50" : "bg-gray-50") : "";
  const tableRowHover = isDarkMode ? "hover:bg-gray-750" : "hover:bg-gray-100";
  const typeBadge = (type) => {
    if (type === 'INPUT') {
      return isDarkMode 
        ? 'bg-blue-900/30 text-blue-300' 
        : 'bg-blue-100 text-blue-700 border border-blue-200';
    }
    if (type === 'OUTPUT') {
      return isDarkMode 
        ? 'bg-purple-900/30 text-purple-300' 
        : 'bg-purple-100 text-purple-700 border border-purple-200';
    }
    return isDarkMode 
      ? 'bg-gray-700 text-gray-400' 
      : 'bg-gray-200 text-gray-600 border border-gray-300';
  };
  const statusTextColor = (value) => value 
    ? (isDarkMode ? 'text-green-400' : 'text-green-600') 
    : (isDarkMode ? 'text-gray-400' : 'text-gray-600');
  const tableValueColor = (value) => value 
    ? (isDarkMode ? 'text-green-400' : 'text-green-600') 
    : (isDarkMode ? 'text-gray-500' : 'text-gray-600');
  const footerBorder = isDarkMode ? "border-gray-800" : "border-gray-300";
  const footerText = isDarkMode ? "text-gray-500" : "text-gray-600";
  const statusBarBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const statusBarText = isDarkMode ? "text-gray-400" : "text-gray-600";

  // Data filtering
  const data = activeTab === "inputs" ? biSignals : boSignals;
  const filtered = data.filter(
    (s) =>
      (s.tag && s.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.address && s.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Statistics
  const activeCount = filtered.filter((s) => s.value).length;
  const inactiveCount = filtered.length - activeCount;
  const inputCount = biSignals.length;
  const outputCount = boSignals.length;

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} p-3`}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <h1 className="text-lg font-bold tracking-wide">BINARY I/O MONITOR</h1>
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
            <div className={`text-xs ${statusBarText} ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} px-3 py-1 rounded border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              {connected ? 'LIVE STREAM' : 'OFFLINE'}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <div className={`${statCardBg} p-3 rounded border ${statCardBorder}`}>
            <div className={`text-xs ${statCardText}`}>INPUTS</div>
            <div className="text-lg font-bold">{inputCount}</div>
          </div>
          <div className={`${statCardBg} p-3 rounded border ${statCardBorder}`}>
            <div className={`text-xs ${statCardText}`}>OUTPUTS</div>
            <div className="text-lg font-bold">{outputCount}</div>
          </div>
          <div className={`${statCardBg} p-3 rounded border ${statCardBorder}`}>
            <div className={`text-xs ${statCardText}`}>ACTIVE</div>
            <div className={`text-lg font-bold ${statCardValue('green')}`}>{activeCount}</div>
          </div>
          <div className={`${statCardBg} p-3 rounded border ${statCardBorder}`}>
            <div className={`text-xs ${statCardText}`}>INACTIVE</div>
            <div className={`text-lg font-bold ${statCardValue('gray')}`}>{inactiveCount}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`${controlBarBg} p-3 rounded-lg border ${controlBarBorder} mb-4`}>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Tab Selection */}
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("inputs")}
              className={`px-4 py-2 text-sm font-bold rounded transition-all ${
                activeTab === "inputs" ? tabButtonActive : tabButtonInactive
              }`}
            >
              INPUTS
            </button>
            <button
              onClick={() => setActiveTab("outputs")}
              className={`px-4 py-2 text-sm font-bold rounded transition-all ${
                activeTab === "outputs" ? tabButtonActive : tabButtonInactive
              }`}
            >
              OUTPUTS
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex space-x-2 ml-0 sm:ml-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm rounded transition-all ${
                viewMode === "grid" ? viewButtonActive : viewButtonInactive
              }`}
            >
              GRID
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 text-sm rounded transition-all ${
                viewMode === "table" ? viewButtonActive : viewButtonInactive
              }`}
            >
              TABLE
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by tag or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-3 py-2 ${searchInputBg} border ${searchInputBorder} rounded text-sm focus:outline-none focus:border-blue-500`}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        /* ========== GRID VIEW ========== */
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className={`text-sm font-semibold uppercase tracking-wide ${sectionTitle}`}>
              {activeTab === "inputs" ? "DIGITAL INPUTS" : "DIGITAL OUTPUTS"}
            </h2>
            <span className={`text-xs ${sectionSubtitle}`}>{filtered.length} SIGNALS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {filtered.map((s) => {
              const type = getSignalType(s.address);
              const statusColor = getStatusColor(s.value, type);
              const statusText = getStatusText(s.value, type);
              
              return (
                <div
                  key={s.address || s.tag}
                  className={`p-3 rounded border transition-all ${statusColor} ${isDarkMode ? 'hover:brightness-110' : 'hover:shadow-md'}`}
                >
                  <div className="mb-2">
                    <div className={`text-xs font-medium truncate mb-1 ${gridCardText}`}>
                      {formatName(s.tag || 'Untagged')}
                    </div>
                    <div className={`text-[10px] font-mono ${gridCardAddressText} ${gridCardAddressBg} px-1.5 py-0.5 rounded`}>
                      {s.address || 'No Address'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className={`text-xs font-bold px-2 py-1 rounded ${gridCardValueBg(s.value)}`}>
                      {s.value ? '1' : '0'}
                    </div>
                    <div className={`text-[10px] font-medium ${cardText}`}>
                      {statusText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========== TABLE VIEW ========== */
        <div className="mb-4">
          <div className={`${cardBgClass} rounded-lg border ${cardBorderClass} overflow-hidden`}>
            <table className="w-full">
              <thead className={tableHeaderBg}>
                <tr className="text-xs uppercase tracking-wide">
                  <th className={`p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>SIGNAL</th>
                  <th className={`p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>ADDRESS</th>
                  <th className={`p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>TYPE</th>
                  <th className={`p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>STATUS</th>
                  <th className={`p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>VALUE</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const type = getSignalType(s.address);
                  const statusText = getStatusText(s.value, type);
                  
                  return (
                    <tr
                      key={s.address || s.tag}
                      className={`border-b ${tableBorder} ${tableRowHover} ${tableRowBg(s.value)}`}
                    >
                      <td className="p-3">
                        <div className="font-medium text-sm">{formatName(s.tag || 'Untagged')}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-mono text-xs text-gray-400">{s.address || 'No Address'}</div>
                      </td>
                      <td className="p-3">
                        <div className={`text-xs font-bold px-2 py-1 rounded inline-block ${typeBadge(type)}`}>
                          {type}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${s.value ? 'bg-green-500' : isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
                          <span className={`text-sm font-medium ${statusTextColor(s.value)}`}>
                            {statusText}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className={`text-lg font-bold font-mono ${tableValueColor(s.value)}`}>
                          {s.value ? '1' : '0'}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filtered.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <div className="text-lg mb-2">No signals found</div>
                <div className="text-sm">Try a different search term or check connection</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className={`mt-4 pt-3 border-t ${footerBorder}`}>
        <div className={`flex flex-col sm:flex-row justify-between items-center text-xs ${footerText}`}>
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>ACTIVE</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span>INACTIVE</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>INPUT</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>OUTPUT</span>
            </div>
          </div>
          <div className="text-right">
            <div>MODE: {viewMode.toUpperCase()} • {activeTab.toUpperCase()}</div>
            <div className={isDarkMode ? "text-gray-600" : "text-gray-500"}>BINARY I/O v1.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}









// import React, { useState, useEffect } from "react";

// const API_BASE = "https://mqtt-testing-2.onrender.com";

// export default function BinaryIO() {
//   const [activeTab, setActiveTab] = useState("inputs");
//   const [viewMode, setViewMode] = useState("grid");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [connected, setConnected] = useState(false);
//   const [biSignals, setBiSignals] = useState([]);
//   const [boSignals, setBoSignals] = useState([]);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [lastUpdate, setLastUpdate] = useState(new Date());
//   const [selectedSignal, setSelectedSignal] = useState(null);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('binaryio-theme');
//     if (savedTheme === 'light') {
//       setIsDarkMode(false);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem('binaryio-theme', newMode ? 'dark' : 'light');
//   };

//   // Single SSE Stream for both BI and BO
//   useEffect(() => {
//     const source = new EventSource(`${API_BASE}/api/v1/stream/bi-bo`);

//     source.onopen = () => {
//       setConnected(true);
//       setLastUpdate(new Date());
//     };
    
//     source.onerror = () => setConnected(false);

//     source.onmessage = (e) => {
//       try {
//         const data = JSON.parse(e.data);
//         setLastUpdate(new Date());
        
//         if (data.bi && Array.isArray(data.bi)) {
//           setBiSignals(data.bi);
//         }
        
//         if (data.bo && Array.isArray(data.bo)) {
//           setBoSignals(data.bo);
//         }
        
//         if (data.signals && Array.isArray(data.signals)) {
//           const bi = data.signals.filter(s => 
//             s.address && s.address.includes('I') || 
//             s.type === 'INPUT' || 
//             s.tag.toLowerCase().includes('input')
//           );
//           const bo = data.signals.filter(s => 
//             s.address && s.address.includes('O') || 
//             s.type === 'OUTPUT' || 
//             s.tag.toLowerCase().includes('output')
//           );
          
//           if (bi.length > 0) setBiSignals(bi);
//           if (bo.length > 0) setBoSignals(bo);
//         }
        
//         if (data.data && Array.isArray(data.data)) {
//           const bi = [];
//           const bo = [];
          
//           data.data.forEach(item => {
//             if (item.address && item.address.includes('I')) {
//               bi.push(item);
//             } else if (item.address && item.address.includes('O')) {
//               bo.push(item);
//             }
//           });
          
//           if (bi.length > 0) setBiSignals(bi);
//           if (bo.length > 0) setBoSignals(bo);
//         }
        
//       } catch (err) {
//         console.error("SSE parse error:", err);
//       }
//     };

//     return () => {
//       source.close();
//     };
//   }, []);

//   // Helper functions
//   const formatName = (tag) => {
//     if (!tag) return 'Untagged Signal';
//     return tag
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, l => l.toUpperCase())
//       .replace(/DI\s*/i, 'Digital Input ')
//       .replace(/DO\s*/i, 'Digital Output ');
//   };

//   const getSignalType = (address, tag) => {
//     if (!address && !tag) return 'UNKNOWN';
//     if (address && address.includes('I')) return 'INPUT';
//     if (address && address.includes('O')) return 'OUTPUT';
//     if (tag && tag.toLowerCase().includes('input')) return 'INPUT';
//     if (tag && tag.toLowerCase().includes('output')) return 'OUTPUT';
//     return 'INTERNAL';
//   };

//   const formatAddress = (address) => {
//     if (!address) return 'N/A';
//     // Format as %IX0.0 or %QX0.0 style
//     if (address.includes('I')) return `%IX${address.replace('I', '')}`;
//     if (address.includes('O')) return `%QX${address.replace('O', '')}`;
//     return address;
//   };

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', { 
//       hour12: true, 
//       hour: '2-digit', 
//       minute: '2-digit',
//       second: '2-digit'
//     });
//   };

//   // Statistics
//   const data = activeTab === "inputs" ? biSignals : boSignals;
//   const filtered = data.filter(
//     (s) =>
//       (s.tag && s.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (s.address && s.address.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const activeCount = filtered.filter((s) => s.value).length;
//   const inactiveCount = filtered.length - activeCount;
//   const inputCount = biSignals.length;
//   const outputCount = boSignals.length;
//   const totalSignals = inputCount + outputCount;

//   // Signal Details Modal
//   const SignalDetailsModal = () => {
//     if (!selectedSignal) return null;
    
//     const type = getSignalType(selectedSignal.address, selectedSignal.tag);
//     const status = selectedSignal.value ? 'ACTIVE' : 'INACTIVE';
//     const value = selectedSignal.value ? '1 (TRUE)' : '0 (FALSE)';
    
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//         <div className={`w-full max-w-md rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} shadow-2xl`}>
//           {/* Header */}
//           <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
//             <div className="flex items-center justify-between">
//               <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                 Signal Details
//               </h3>
//               <button
//                 onClick={() => setSelectedSignal(null)}
//                 className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </div>
          
//           {/* Content */}
//           <div className="p-6 space-y-6">
//             {/* Signal Status */}
//             <div className="flex items-center justify-center">
//               <div className={`w-32 h-32 rounded-full flex items-center justify-center ${selectedSignal.value 
//                 ? (isDarkMode ? 'bg-green-900/30 border-4 border-green-500' : 'bg-green-100 border-4 border-green-400')
//                 : (isDarkMode ? 'bg-gray-800 border-4 border-gray-600' : 'bg-gray-100 border-4 border-gray-300')
//               }`}>
//                 <div className="text-center">
//                   <div className={`text-3xl font-bold font-mono ${selectedSignal.value 
//                     ? (isDarkMode ? 'text-green-400' : 'text-green-600')
//                     : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
//                   }`}>
//                     {selectedSignal.value ? '1' : '0'}
//                   </div>
//                   <div className={`text-sm font-medium mt-2 ${selectedSignal.value 
//                     ? (isDarkMode ? 'text-green-400' : 'text-green-600')
//                     : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
//                   }`}>
//                     {status}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Signal Information */}
//             <div className="space-y-4">
//               <div>
//                 <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
//                   SIGNAL NAME
//                 </div>
//                 <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   {formatName(selectedSignal.tag || 'Untagged')}
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
//                     ADDRESS
//                   </div>
//                   <div className={`font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
//                     {formatAddress(selectedSignal.address)}
//                   </div>
//                 </div>
                
//                 <div>
//                   <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
//                     TYPE
//                   </div>
//                   <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
//                     type === 'INPUT' 
//                       ? (isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700')
//                       : (isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700')
//                   }`}>
//                     {type}
//                   </div>
//                 </div>
//               </div>
              
//               <div>
//                 <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
//                   DESCRIPTION
//                 </div>
//                 <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                   {selectedSignal.description || 'No description available'}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Footer */}
//           <div className={`p-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setSelectedSignal(null)}
//                 className={`px-6 py-2 rounded-lg font-medium ${isDarkMode 
//                   ? 'bg-gray-700 hover:bg-gray-600 text-white' 
//                   : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//                 }`}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
//       {/* Main Container */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
        
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             {/* Title and Status */}
//             <div className="flex items-start space-x-4">
//               <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-lg`}>
//                 <div className="flex items-center space-x-4">
//                   <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//                   <div>
//                     <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                       Digital I/O Monitor
//                     </h1>
//                     <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       Real-time binary signals monitoring
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Connection Status */}
//               <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-lg`}>
//                 <div className="text-center">
//                   <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     Connection
//                   </div>
//                   <div className={`text-lg font-bold ${connected ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-red-400' : 'text-red-600')}`}>
//                     {connected ? 'LIVE' : 'OFFLINE'}
//                   </div>
//                   <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                     Last update: {formatTime(lastUpdate)}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Theme Toggle and Controls */}
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={toggleTheme}
//                 className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-lg transition-all duration-300`}
//                 aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//               >
//                 {isDarkMode ? (
//                   <div className="w-5 h-5">
//                     <div className="relative w-full h-full">
//                       <div className="absolute inset-0 bg-yellow-300 rounded-full"></div>
//                       <div className="absolute top-1 left-1 w-3 h-3 bg-gray-900 rounded-full"></div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="w-5 h-5">
//                     <div className="relative w-full h-full">
//                       <div className="absolute inset-0 bg-gray-700 rounded-full"></div>
//                       <div className="absolute top-1 left-1 w-3 h-3 bg-gray-900 rounded-full"></div>
//                     </div>
//                   </div>
//                 )}
//               </button>
              
//               <div className={`px-4 py-3 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-lg`}>
//                 <div className="text-center">
//                   <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     Total Signals
//                   </div>
//                   <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
//                     {totalSignals}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Statistics Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//             {[
//               { label: "Digital Inputs", value: inputCount, color: "blue", icon: "I" },
//               { label: "Digital Outputs", value: outputCount, color: "purple", icon: "O" },
//               { label: "Active Signals", value: activeCount, color: "green", icon: "✓" },
//               { label: "Inactive Signals", value: inactiveCount, color: "gray", icon: "○" },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className={`p-5 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-lg hover:shadow-xl transition-shadow duration-300`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {stat.label}
//                     </div>
//                     <div className={`text-2xl font-bold ${isDarkMode ? `text-${stat.color}-400` : `text-${stat.color}-600`}`}>
//                       {stat.value}
//                     </div>
//                   </div>
//                   <div className={`text-2xl font-bold ${isDarkMode ? `text-${stat.color}-400` : `text-${stat.color}-600`}`}>
//                     {stat.icon}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className={`mb-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-lg`}>
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Tab Selection */}
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setActiveTab("inputs")}
//                 className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
//                   activeTab === "inputs"
//                     ? isDarkMode
//                       ? "bg-blue-600 text-white border border-blue-500 shadow-lg"
//                       : "bg-blue-600 text-white border border-blue-500 shadow-lg"
//                     : isDarkMode
//                       ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 DIGITAL INPUTS
//               </button>
//               <button
//                 onClick={() => setActiveTab("outputs")}
//                 className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
//                   activeTab === "outputs"
//                     ? isDarkMode
//                       ? "bg-purple-600 text-white border border-purple-500 shadow-lg"
//                       : "bg-purple-600 text-white border border-purple-500 shadow-lg"
//                     : isDarkMode
//                       ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 DIGITAL OUTPUTS
//               </button>
//             </div>

//             {/* View Mode Toggle */}
//             <div className="flex space-x-2 lg:ml-auto">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
//                   viewMode === "grid"
//                     ? isDarkMode
//                       ? "bg-gray-700 text-white border border-gray-600"
//                       : "bg-gray-300 text-gray-800 border border-gray-400"
//                     : isDarkMode
//                       ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 <div className="flex items-center space-x-2">
//                   <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
//                     <div className={`${viewMode === 'grid' ? (isDarkMode ? 'bg-gray-300' : 'bg-gray-700') : (isDarkMode ? 'bg-gray-600' : 'bg-gray-400')}`}></div>
//                     <div className={`${viewMode === 'grid' ? (isDarkMode ? 'bg-gray-300' : 'bg-gray-700') : (isDarkMode ? 'bg-gray-600' : 'bg-gray-400')}`}></div>
//                     <div className={`${viewMode === 'grid' ? (isDarkMode ? 'bg-gray-300' : 'bg-gray-700') : (isDarkMode ? 'bg-gray-600' : 'bg-gray-400')}`}></div>
//                     <div className={`${viewMode === 'grid' ? (isDarkMode ? 'bg-gray-300' : 'bg-gray-700') : (isDarkMode ? 'bg-gray-600' : 'bg-gray-400')}`}></div>
//                   </div>
//                   <span>Grid</span>
//                 </div>
//               </button>
//               <button
//                 onClick={() => setViewMode("table")}
//                 className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
//                   viewMode === "table"
//                     ? isDarkMode
//                       ? "bg-gray-700 text-white border border-gray-600"
//                       : "bg-gray-300 text-gray-800 border border-gray-400"
//                     : isDarkMode
//                       ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 <div className="flex items-center space-x-2">
//                   <div className="w-4 h-4">
//                     <div className={`border ${viewMode === 'table' ? (isDarkMode ? 'border-gray-300' : 'border-gray-700') : (isDarkMode ? 'border-gray-600' : 'border-gray-400')} h-full`}>
//                       <div className={`${viewMode === 'table' ? (isDarkMode ? 'bg-gray-300' : 'bg-gray-700') : (isDarkMode ? 'bg-gray-600' : 'bg-gray-400')} h-1`}></div>
//                     </div>
//                   </div>
//                   <span>Table</span>
//                 </div>
//               </button>
//             </div>

//             {/* Search */}
//             <div className="flex-1 min-w-[300px]">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search signals by tag or address..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className={`w-full pl-10 pr-4 py-3 rounded-xl ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
//                 {activeTab === "inputs" ? "Digital Input Signals" : "Digital Output Signals"}
//               </h2>
//               <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 {filtered.length} signals found • {activeCount} active • {inactiveCount} inactive
//               </p>
//             </div>
//             <div className={`px-4 py-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
//               <div className="text-sm font-medium">
//                 View: <span className="font-bold">{viewMode.toUpperCase()}</span>
//               </div>
//             </div>
//           </div>

//           {viewMode === "grid" ? (
//             /* ========== GRID VIEW ========== */
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {filtered.map((s) => {
//                 const type = getSignalType(s.address, s.tag);
//                 const isActive = s.value;
                
//                 return (
//                   <div
//                     key={s.address || s.tag}
//                     onClick={() => setSelectedSignal(s)}
//                     className={`p-5 rounded-2xl border cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
//                       isActive
//                         ? isDarkMode
//                           ? "bg-gradient-to-br from-green-900/20 to-green-900/5 border-green-700/50 hover:border-green-600"
//                           : "bg-gradient-to-br from-green-50 to-white border-green-300 hover:border-green-400"
//                         : isDarkMode
//                           ? "bg-gray-800 border-gray-700 hover:border-gray-600"
//                           : "bg-white border-gray-300 hover:border-gray-400"
//                     }`}
//                   >
//                     {/* Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
//                           type === 'INPUT'
//                             ? isDarkMode ? "text-blue-400" : "text-blue-600"
//                             : isDarkMode ? "text-purple-400" : "text-purple-600"
//                         }`}>
//                           {type}
//                         </div>
//                         <div className={`text-lg font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                           {formatName(s.tag || 'Untagged')}
//                         </div>
//                       </div>
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                         isActive
//                           ? isDarkMode ? "bg-green-900/30 border border-green-700" : "bg-green-100 border border-green-300"
//                           : isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-gray-200 border border-gray-300"
//                       }`}>
//                         <span className={`text-sm font-bold ${isActive ? (isDarkMode ? "text-green-400" : "text-green-600") : (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
//                           {s.value ? '1' : '0'}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Address */}
//                     <div className={`text-sm font-mono mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                       {formatAddress(s.address)}
//                     </div>

//                     {/* Status Bar */}
//                     <div className="flex items-center justify-between">
//                       <div className={`px-3 py-1 rounded-full text-xs font-bold ${
//                         isActive
//                           ? isDarkMode ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"
//                           : isDarkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"
//                       }`}>
//                         {isActive ? 'ACTIVE' : 'INACTIVE'}
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
//                         <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                           {isActive ? 'Live' : 'Idle'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             /* ========== TABLE VIEW ========== */
//             <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} shadow-lg`}>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className={isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}>
//                     <tr>
//                       <th className={`p-4 text-left font-semibold text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         Signal
//                       </th>
//                       <th className={`p-4 text-left font-semibold text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         Address
//                       </th>
//                       <th className={`p-4 text-left font-semibold text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         Type
//                       </th>
//                       <th className={`p-4 text-left font-semibold text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         Status
//                       </th>
//                       <th className={`p-4 text-left font-semibold text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         Value
//                       </th>
//                       <th className={`p-4 text-left font-semibold text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filtered.map((s) => {
//                       const type = getSignalType(s.address, s.tag);
//                       const isActive = s.value;
                      
//                       return (
//                         <tr
//                           key={s.address || s.tag}
//                           className={`border-t ${isDarkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}
//                         >
//                           <td className="p-4">
//                             <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                               {formatName(s.tag || 'Untagged')}
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <div className={`font-mono text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
//                               {formatAddress(s.address)}
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
//                               type === 'INPUT'
//                                 ? isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
//                                 : isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
//                             }`}>
//                               {type}
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <div className="flex items-center space-x-2">
//                               <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
//                               <span className={`font-medium ${isActive ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
//                                 {isActive ? 'ACTIVE' : 'INACTIVE'}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <div className={`text-xl font-bold font-mono ${isActive ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-gray-500' : 'text-gray-600')}`}>
//                               {s.value ? '1' : '0'}
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <button
//                               onClick={() => setSelectedSignal(s)}
//                               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                                 isDarkMode
//                                   ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
//                                   : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//                               }`}
//                             >
//                               Details
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
              
//               {filtered.length === 0 && (
//                 <div className="p-12 text-center">
//                   <div className={`text-2xl mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>🔍</div>
//                   <div className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     No signals found
//                   </div>
//                   <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
//                     Try adjusting your search or check the connection
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-lg`}>
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             {/* Legend */}
//             <div className="flex flex-wrap gap-4">
//               {[
//                 { label: "Active Signal", color: "green" },
//                 { label: "Inactive Signal", color: "gray" },
//                 { label: "Digital Input", color: "blue" },
//                 { label: "Digital Output", color: "purple" },
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center space-x-2">
//                   <div className={`w-3 h-3 rounded-full ${item.color === 'green' ? 'bg-green-500' : item.color === 'blue' ? 'bg-blue-500' : item.color === 'purple' ? 'bg-purple-500' : 'bg-gray-500'}`}></div>
//                   <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</span>
//                 </div>
//               ))}
//             </div>

//             {/* System Info */}
//             <div className={`text-sm text-center md:text-right ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//               <div className="font-medium mb-1">Binary I/O Monitoring System</div>
//               <div>v1.0 • Connected: {connected ? 'Yes' : 'No'} • Last Update: {formatTime(lastUpdate)}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Signal Details Modal */}
//       <SignalDetailsModal />
//     </div>
//   );
// }


