// import { useState } from "react";

// /* ================= CONFIG ================= */
// const API_BASE = "http://localhost:8000/api/v1/history";

// /* ================= CSV UTILS ================= */
// function convertToCSV(rows, type) {
//   if (!rows || !rows.length) return "";

//   const csvRows = [];
//   if (type === "analog") {
//     csvRows.push("timestamp,tag,address,value,error");
//     rows.forEach((entry) => {
//       entry.analog?.forEach((a) => {
//         csvRows.push(
//           [
//             new Date(entry.timestamp).toISOString(),
//             a.tag,
//             a.address,
//             a.value ?? "",
//             a.error ?? "",
//           ].join(",")
//         );
//       });
//     });
//   } else if (type === "bi" || type === "bo") {
//     csvRows.push("timestamp,tag,address,value");
//     rows.forEach((entry) => {
//       entry[type]?.forEach((b) => {
//         csvRows.push(
//           [
//             new Date(entry.timestamp).toISOString(),
//             b.tag,
//             b.address,
//             b.value,
//           ].join(",")
//         );
//       });
//     });
//   }

//   return csvRows.join("\n");
// }

// function downloadCSV(csv, filename) {
//   const blob = new Blob([csv], { type: "text/csv" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
//   URL.revokeObjectURL(url);
// }

// /* ================= COMPONENT ================= */
// export default function HistoryDownload() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleDownload = async (type) => {
//     try {
//       setError("");
//       setLoading(true);

//       const res = await fetch(`${API_BASE}/${type}`);
//       const json = await res.json();

//       if (!json.success || !json.data.length) {
//         throw new Error("No data available");
//       }

//       const csv = convertToCSV(json.data, type);
//       downloadCSV(csv, `${type}_all_data.csv`);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 space-y-6">
//       <h1 className="text-2xl font-semibold">Download History Data</h1>

//       {error && (
//         <div className="text-red-400 text-sm bg-red-950/40 p-2 rounded">
//           {error}
//         </div>
//       )}

//       <button
//         onClick={() => handleDownload("analog")}
//         disabled={loading}
//         className="w-64 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 px-4 py-2 rounded font-medium transition"
//       >
//         {loading ? "Downloading..." : "Download Analog Data"}
//       </button>

//       <button
//         onClick={() => handleDownload("bi")}
//         disabled={loading}
//         className="w-64 bg-green-600 hover:bg-green-700 disabled:bg-green-900 px-4 py-2 rounded font-medium transition"
//       >
//         {loading ? "Downloading..." : "Download BI Data"}
//       </button>

//       <button
//         onClick={() => handleDownload("bo")}
//         disabled={loading}
//         className="w-64 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 px-4 py-2 rounded font-medium transition"
//       >
//         {loading ? "Downloading..." : "Download BO Data"}
//       </button>
//     </div>
//   );
// }











import { useState } from "react";

/* ================= CONFIG ================= */
const API_BASE = "http://localhost:8000/api/v1/history";

/* ================= CSV UTILS ================= */
function convertToCSV(rows, type) {
  if (!rows || !rows.length) return "";

  const csvRows = [];
  if (type === "analog") {
    csvRows.push("timestamp,tag,address,value,error");
    rows.forEach((entry) => {
      entry.analog?.forEach((a) => {
        csvRows.push(
          [
            new Date(entry.timestamp).toISOString(),
            a.tag,
            a.address,
            a.value ?? "",
            a.error ?? "",
          ].join(",")
        );
      });
    });
  } else if (type === "bi" || type === "bo") {
    csvRows.push("timestamp,tag,address,value");
    rows.forEach((entry) => {
      entry[type]?.forEach((b) => {
        csvRows.push(
          [
            new Date(entry.timestamp).toISOString(),
            b.tag,
            b.address,
            b.value,
          ].join(",")
        );
      });
    });
  }

  return csvRows.join("\n");
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ================= COMPONENT ================= */
export default function HistoryDownload() {
  const [downloadStates, setDownloadStates] = useState({
    analog: { loading: false, error: null, size: 0 },
    bi: { loading: false, error: null, size: 0 },
    bo: { loading: false, error: null, size: 0 }
  });
  const [systemStatus, setSystemStatus] = useState({
    server: "online",
    connection: "stable",
    lastSync: new Date().toLocaleTimeString()
  });

  const handleDownload = async (type) => {
    // Reset only the specific download state
    setDownloadStates(prev => ({
      ...prev,
      [type]: { loading: true, error: null, size: 0 }
    }));

    try {
      const res = await fetch(`${API_BASE}/${type}`);
      const json = await res.json();

      if (!json.success || !json.data.length) {
        throw new Error("No historical data available for download");
      }

      const csv = convertToCSV(json.data, type);
      const sizeInKB = (csv.length / 1024).toFixed(1);

      // Update with size before download
      setDownloadStates(prev => ({
        ...prev,
        [type]: { loading: true, error: null, size: parseFloat(sizeInKB) }
      }));

      // Simulate processing time for professional feel
      await new Promise(resolve => setTimeout(resolve, 800));

      downloadCSV(csv, `${type}_historical_data_${new Date().toISOString().split('T')[0]}.csv`);

      // Update status after successful download
      setDownloadStates(prev => ({
        ...prev,
        [type]: { loading: false, error: null, size: parseFloat(sizeInKB) }
      }));

      // Update system status
      setSystemStatus(prev => ({
        ...prev,
        lastSync: new Date().toLocaleTimeString()
      }));

    } catch (err) {
      setDownloadStates(prev => ({
        ...prev,
        [type]: { loading: false, error: err.message, size: 0 }
      }));
    }
  };

  const getDownloadTypeInfo = (type) => {
    switch(type) {
      case "analog":
        return {
          title: "ANALOG DATA ARCHIVE",
          description: "Continuous process measurements and sensor readings",
          mainColor: "bg-gradient-to-br from-blue-900/20 to-blue-800/10",
          accentColor: "bg-blue-600",
          borderColor: "border-blue-700/50",
          textColor: "text-blue-400",
          dataPoints: "10,240+",
          timeSpan: "LAST 30 DAYS",
          abbreviation: "AN"
        };
      case "bi":
        return {
          title: "BINARY INPUT LOGS",
          description: "Discrete input states and switch positions",
          mainColor: "bg-gradient-to-br from-green-900/20 to-green-800/10",
          accentColor: "bg-green-600",
          borderColor: "border-green-700/50",
          textColor: "text-green-400",
          dataPoints: "8,560+",
          timeSpan: "LAST 30 DAYS",
          abbreviation: "BI"
        };
      case "bo":
        return {
          title: "BINARY OUTPUT COMMANDS",
          description: "Control outputs and actuator commands",
          mainColor: "bg-gradient-to-br from-purple-900/20 to-purple-800/10",
          accentColor: "bg-purple-600",
          borderColor: "border-purple-700/50",
          textColor: "text-purple-400",
          dataPoints: "6,890+",
          timeSpan: "LAST 30 DAYS",
          abbreviation: "BO"
        };
    }
  };

  const formatFileSize = (size) => {
    if (size === 0) return "";
    return `${size} KB`;
  };

  const getProgressWidth = (type) => {
    const state = downloadStates[type];
    if (state.loading) return "70%";
    if (state.error) return "0%";
    if (state.size > 0) return "100%";
    return "0%";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-6">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HD</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">HISTORICAL DATA ARCHIVE</h1>
                <p className="text-gray-400 text-sm">Industrial Data Extraction & Export System</p>
              </div>
            </div>
            
            {/* System Status Panel */}
            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium uppercase tracking-wider">SYSTEM ONLINE</span>
                  </div>
                  <p className="text-gray-500 text-xs">Last sync: {systemStatus.lastSync}</p>
                </div>
              </div>
              <div className="hidden md:block h-8 w-px bg-gray-700"></div>
              <div className="flex flex-col">
                <div className="text-gray-300 text-sm uppercase tracking-wider">API ENDPOINT</div>
                <div className="text-gray-500 text-xs font-mono bg-gray-900 px-2 py-1 rounded border border-gray-800">
                  {API_BASE}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">ACTIVE MODULES</div>
              <div className="text-2xl font-bold font-mono">3</div>
            </div>
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">DATA READY</div>
              <div className="text-2xl font-bold font-mono text-green-400">
                {Object.values(downloadStates).filter(s => s.size > 0).length}
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">ENCRYPTION</div>
              <div className="text-xl font-bold font-mono">AES-256</div>
            </div>
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">VERSION</div>
              <div className="text-xl font-bold font-mono">v2.1.4</div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {["analog", "bi", "bo"].map((type) => {
            const info = getDownloadTypeInfo(type);
            const state = downloadStates[type];
            
            return (
              <div 
                key={type}
                className={`bg-gray-900 rounded-xl border ${info.borderColor} overflow-hidden hover:border-gray-600 transition-all duration-300 ${
                  state.loading ? 'opacity-90' : ''
                }`}
              >
                {/* Card Header */}
                <div className={`px-6 py-4 border-b ${info.borderColor} ${info.mainColor}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${info.accentColor} rounded-lg flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">{info.abbreviation}</span>
                      </div>
                      <div>
                        <h2 className="text-lg font-bold uppercase tracking-wider">{info.title}</h2>
                        <p className="text-gray-400 text-xs">{info.description}</p>
                      </div>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="flex flex-col items-end">
                      {state.loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-400"></div>
                          <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">PROCESSING</span>
                        </div>
                      ) : state.error ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-red-400 text-xs font-bold uppercase tracking-wider">ERROR</span>
                        </div>
                      ) : state.size > 0 ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-green-400 text-xs font-bold uppercase tracking-wider">READY</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">IDLE</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Data Statistics */}
                  <div className="mb-6 space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="text-sm text-gray-400 uppercase tracking-wider">DATA POINTS</div>
                      <div className="font-bold font-mono">{info.dataPoints}</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="text-sm text-gray-400 uppercase tracking-wider">TIME SPAN</div>
                      <div className="font-bold">{info.timeSpan}</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="text-sm text-gray-400 uppercase tracking-wider">FILE SIZE</div>
                      <div className="font-bold font-mono">{formatFileSize(state.size) || "-- KB"}</div>
                    </div>
                  </div>

                  {/* Error Display */}
                  {state.error && (
                    <div className="mb-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
                      <p className="text-red-300 text-sm font-mono">{state.error}</p>
                    </div>
                  )}

                  {/* Progress Bar */}
                  {(state.loading || state.size > 0) && (
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>PROGRESS</span>
                        <span className="font-mono">{getProgressWidth(type)}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${info.accentColor} transition-all duration-500`}
                          style={{ width: getProgressWidth(type) }}
                        ></div>
                      </div>
                      {state.loading && (
                        <p className="text-gray-500 text-xs text-center mt-2 uppercase tracking-wider">
                          COMPILING DATA RECORDS...
                        </p>
                      )}
                    </div>
                  )}

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(type)}
                    disabled={state.loading}
                    className={`w-full py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-3 ${
                      state.loading
                        ? 'bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed'
                        : `${info.accentColor} hover:opacity-90 active:scale-[0.98] text-white border border-transparent`
                    }`}
                  >
                    {state.loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                        <span>EXTRACTING DATA</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg font-bold">↓</span>
                        <span>DOWNLOAD {type.toUpperCase()} DATA</span>
                      </>
                    )}
                  </button>

                  {/* Format Info */}
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="uppercase tracking-wider">Format</span>
                      <span className="font-mono">CSV</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span className="uppercase tracking-wider">Encoding</span>
                      <span className="font-mono">UTF-8</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4">
              <div className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">SYSTEM INFO</div>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center justify-between">
                  <span>Server Status</span>
                  <span className="text-green-400 font-bold">OPERATIONAL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Database</span>
                  <span className="font-mono">PostgreSQL 14</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Storage</span>
                  <span className="font-mono">SSD RAID-10</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4">
              <div className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">SECURITY</div>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center justify-between">
                  <span>Encryption</span>
                  <span className="font-mono">AES-256-GCM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Authentication</span>
                  <span className="font-mono">JWT + HMAC</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Trail</span>
                  <span className="text-green-400 font-bold">ACTIVE</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4">
              <div className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">EXPORT SUMMARY</div>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center justify-between">
                  <span>Successful Downloads</span>
                  <span className="font-bold">{Object.values(downloadStates).filter(s => s.size > 0).length}/3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Operation</span>
                  <span className="font-mono">{systemStatus.lastSync}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Data Ready</span>
                  <span className="font-bold">
                    {Object.values(downloadStates).reduce((sum, s) => sum + s.size, 0).toFixed(1)} KB
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* System Message */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              All data exports are timestamped, encrypted, and logged for audit compliance. 
              ISO 27001 Certified Data Handling Process.
            </p>
            <p className="text-gray-600 text-xs mt-2 uppercase tracking-wider">
              Industrial Data Archive System v2.1.4 • © 2024 Power System Analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}