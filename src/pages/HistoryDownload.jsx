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








// components/DownloadPage.jsx
import React, { useState } from 'react';

const DownloadPage = () => {
  const [loading, setLoading] = useState({
    commandLog: false,
    bibo: false,
    analog: false
  });

  const [status, setStatus] = useState({
    commandLog: '',
    bibo: '',
    analog: ''
  });

  const apiEndpoints = [
    {
      id: 'commandLog',
      name: 'Command Log',
      endpoint: 'http://localhost:8000/api/v1/download/command/log'
    },
    {
      id: 'bibo',
      name: 'BIBO Data',
      endpoint: 'http://localhost:8000/api/v1/download/bibo'
    },
    {
      id: 'analog',
      name: 'Analog Data',
      endpoint: 'http://localhost:8000/api/v1/download/analog'
    }
  ];

  const downloadCSV = async (endpoint, dataType) => {
    try {
      setLoading(prev => ({ ...prev, [dataType]: true }));
      setStatus(prev => ({ ...prev, [dataType]: 'Downloading...' }));
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const csvData = await response.text();
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${dataType}_${new Date().getTime()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setStatus(prev => ({ ...prev, [dataType]: '✓ Downloaded' }));
      
      setTimeout(() => {
        setStatus(prev => ({ ...prev, [dataType]: '' }));
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setStatus(prev => ({ ...prev, [dataType]: '✗ Failed' }));
    } finally {
      setLoading(prev => ({ ...prev, [dataType]: false }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Download CSV Data</h1>
      
      <div className="grid gap-4">
        {apiEndpoints.map((data) => (
          <div key={data.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{data.name}</h3>
                <p className="text-sm text-gray-600 truncate">{data.endpoint}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  {status[data.id] || ''}
                </span>
                
                <button
                  onClick={() => downloadCSV(data.endpoint, data.id)}
                  disabled={loading[data.id]}
                  className={`px-4 py-2 rounded ${
                    loading[data.id] 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {loading[data.id] ? '...' : 'Download'}
                </button>
              </div>
            </div>
            
            {loading[data.id] && (
              <div className="mt-2">
                <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
                  <div className="h-full bg-blue-500 animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded">
        <p className="text-sm text-gray-600">
          Note: Downloads CSV files from localhost:8000. Check browser console for errors.
        </p>
      </div>
    </div>
  );
};

export default DownloadPage;