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

const API_BASE = "https://mqtt-testing-1.onrender.com";

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
      (isDarkMode ? 'bg-purple-900 border-purple-500' : 'bg-purple-100 border-purple-400') : 
      (isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300');
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
  const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-100";
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













// this is for mqtt live 
// import React, { useEffect, useState } from "react";

// /* ===== TAG LISTS (MATCH BACKEND EXACTLY) ===== */

// const BI_TAGS = [
//   "SOURCE_FAIL_1","SOURCE_FAIL_2","BTS_NOT_READY",
//   "IC1_CLOSE_CKT","IC1_TRIP_CKT","BC_CLOSE_CKT","BC_TRIP_CKT",
//   "IC2_CLOSE_CKT","IC2_TRIP_CKT",
//   "IC1_BREAKER_READY","BC_BREAKER_READY","IC2_BREAKER_READY",
//   "IC1_PT_READY","IC2_PT_READY","BUS_A_PT_READY","BUS_B_PT_READY",
//   "BREAKER_CONFIG_OK","BTS_IN","BTS_OUT","BTS_READY",
//   "PREM_IL_OK","TRANSFER_LOCKOUT_OK","TEST_TRANSFER_EXECUTED","PREVIOUS_TRANSFER_OK",
//   "B1_S1_SELECTED","B1_S2_SELECTED","B2_S2_SELECTED","B2_S1_SELECTED",
//   "B1_2_TO_S1_SELECTED","B1_2_S2_SELECTED",
//   "BKR1_CLOSED","BKR2_CLOSED","BKR3_CLOSED",
//   "BKR1_OPEN","BKR2_OPEN","BKR3_OPEN",
//   "IC1_TRIP_FAIL","IC1_CLOSE_FAIL","BC_TRIP_FAIL","BC_CLOSE_FAIL",
//   "IC2_TRIP_FAIL","IC2_CLOSE_FAIL",
//   "B1_S1_AVAILABLE","B1_S2_AVAILABLE","B2_S2_AVAILABLE","B2_S1_AVAILABLE",
//   "B1_2_TO_S1_AVAILABLE","B1_2_TO_S2_AVAILABLE",
// ];

// const BO_TAGS = [
//   "IC1_TRIP","IC1_CLOSE","BC_TRIP","BC_CLOSE",
//   "IC2_TRIP","IC2_CLOSE",
//   "BUS1_MOTOR_TRIP","BUS2_MOTOR_TRIP",
//   "CLOSING_SUPPLY_CONTROL","TEST_MODE_SELECT",
//   "AUTO_PROTECTIVE_TRANSFER_SUCCESS",
//   "FAST_MODE_SELECTED","FAST_SLOW_MODE_SELECTED",
//   "FAST_IN_PHASE_SLOW_MODE_SELECTED",
//   "SLOW_MODE_SELECTED","PARALLEL_MODE_SELECTED",
// ];

// /* ===== UTILITY ===== */
// function arrayToMap(arr = []) {
//   const map = {};
//   for (const item of arr) {
//     map[item.tag] = item.value; // boolean
//   }
//   return map;
// }

// /* ===== MAIN COMPONENT ===== */
// export default function BIBOStreamUI() {
//   const [bi, setBi] = useState({});
//   const [bo, setBo] = useState({});
//   const [lastUpdate, setLastUpdate] = useState(null);

//   useEffect(() => {
//     const source = new EventSource("https://mqtt-testing-x4ct.onrender.com/stream/bi-bo");

//     source.onmessage = (event) => {
//       const payload = JSON.parse(event.data);

//       setBi(arrayToMap(payload.bi));
//       setBo(arrayToMap(payload.bo));
//       setLastUpdate(payload.timestamp);
//     };

//     source.onerror = (err) => {
//       console.error("SSE error", err);
//       source.close();
//     };

//     return () => source.close();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>BTS Binary I/O Status</h2>
//       <p>
//         Last update:{" "}
//         {lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : "—"}
//       </p>

//       <div style={{ display: "flex", gap: 30 }}>
//         <StatusPanel title="Binary Inputs (BI)" tags={BI_TAGS} data={bi} />
//         <StatusPanel title="Binary Outputs (BO)" tags={BO_TAGS} data={bo} />
//       </div>
//     </div>
//   );
// }

// /* ===== STATUS PANEL ===== */
// function StatusPanel({ title, tags, data }) {
//   return (
//     <div style={{ flex: 1 }}>
//       <h3>{title}</h3>

//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th style={th}>Tag</th>
//             <th style={th}>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {tags.map((tag) => {
//             const value = data[tag];
//             const isOn = value === true;

//             return (
//               <tr key={tag}>
//                 <td style={td}>{tag}</td>
//                 <td
//                   style={{
//                     ...td,
//                     backgroundColor: isOn ? "#1f7a1f" : "#7a1f1f",
//                     color: "#fff",
//                     fontWeight: "bold",
//                     textAlign: "center",
//                   }}
//                 >
//                   {isOn ? "ON" : "OFF"}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// /* ===== STYLES ===== */
// const th = {
//   border: "1px solid #444",
//   padding: "8px",
//   textAlign: "left",
// };

// const td = {
//   border: "1px solid #444",
//   padding: "8px",
// };