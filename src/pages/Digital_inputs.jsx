import React, { useState, useEffect } from "react";
import axios from "axios";

const DigitalInputsTable = () => {
  const [digitalInputs, setDigitalInputs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchDigitalInputs();
  }, []);

  // Fetch data from backend
  const fetchDigitalInputs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/di_bi");
      setDigitalInputs(response.data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("Error fetching digital inputs:", err);
      setError("Failed to fetch digital inputs data");
    } finally {
      setLoading(false);
    }
  };

  // Convert data to CSV and download
  const downloadCSV = () => {
    if (!digitalInputs?.data) return;

    const data = digitalInputs.data;
    const headers = ["Signal Name", "Status", "Value", "Timestamp"];
    const timestamp = new Date().toLocaleString();
    
    const rows = Object.entries(data).map(([key, value]) => [
      key,
      value === 1 ? "ACTIVE" : "INACTIVE",
      value,
      timestamp
    ]);

    // Build CSV string
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(field => `"${field}"`).join(","))
    ].join("\n");

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `DigitalInputs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Format key for better display
  const formatKey = (key) => {
    return key
      .replace(/_/g, " ")
      .replace(/\b(\w)/g, (char) => char.toUpperCase())
      .replace(/\b(I\/C)\b/gi, "Incomer")
      .replace(/\b(TIE)\b/gi, "Tie")
      .replace(/\b(STN)\b/gi, "Station")
      .replace(/\b(BTS)\b/gi, "Bypass Transfer")
      .replace(/\b(PREM)\b/gi, "Premium")
      .replace(/\b(IL)\b/gi, "Interlock");
  };

  // Group signals
  const groupSignals = (data) => {
    const groups = {
      "🔍 Circuit Monitoring": [],
      "❤️ System Health": [],
      "⚡ Breaker Status": [],
      "🎮 Control Operations": [],
      "🔄 Transfer Scheme": [],
    };

    Object.entries(data).forEach(([key, value]) => {
      const formattedKey = formatKey(key);
      const signalData = { key: formattedKey, value, originalKey: key };

      if (key.includes("TripCkt") || key.includes("CloseCkt") || key.includes("CKT MON")) {
        groups["🔍 Circuit Monitoring"].push(signalData);
      } else if (key.includes("FAIL") || key.includes("OK") || key.includes("PREM") || key.includes("Healthy")) {
        groups["❤️ System Health"].push(signalData);
      } else if (key.includes("NO") || key.includes("NC")) {
        groups["⚡ Breaker Status"].push(signalData);
      } else if (key.includes("KEY") || key.includes("Selected") || key.includes("MODE") || key.includes("Ready") || key.includes("Local")) {
        groups["🎮 Control Operations"].push(signalData);
      } else if (key.includes("TRANSFER") || key.includes("TO") || key.includes("BTS") || key.includes("BUS")) {
        groups["🔄 Transfer Scheme"].push(signalData);
      } else {
        groups["🔍 Circuit Monitoring"].push(signalData);
      }
    });

    // Sort each group alphabetically
    Object.keys(groups).forEach(group => {
      groups[group].sort((a, b) => a.key.localeCompare(b.key));
    });

    return groups;
  };

  // Get status display component
  const StatusBadge = ({ value }) => (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${value === 1 ? 'bg-green-500' : 'bg-red-500'} shadow-sm`}></div>
      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
        value === 1 
          ? "bg-green-50 text-green-700 border border-green-200" 
          : "bg-red-50 text-red-700 border border-red-200"
      }`}>
        {value === 1 ? "ACTIVE" : "INACTIVE"}
      </span>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Digital Inputs</h3>
          <p className="text-gray-600">Fetching real-time data from control system...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-100 max-w-md w-full">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Connection Error</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <button
            onClick={fetchDigitalInputs}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!digitalInputs) return null;

  const signalGroups = groupSignals(digitalInputs.data);
  const activeSignals = Object.values(digitalInputs.data).filter(val => val === 1).length;
  const totalSignals = Object.keys(digitalInputs.data).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Digital Inputs Monitor</h1>
                <p className="text-gray-600 mt-2 flex items-center space-x-2">
                  <span>Real-time system monitoring</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>Address: {digitalInputs.startAddress}</span>
                </p>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 min-w-[280px]">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalSignals}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{activeSignals}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Active</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-600">{totalSignals - activeSignals}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Inactive</div>
                </div>
              </div>
              {lastUpdated && (
                <div className="text-xs text-gray-500 text-center mt-3 font-medium">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
              <span className="text-sm font-semibold text-gray-700">Total Signals: </span>
              <span className="text-blue-600 font-bold">{digitalInputs.totalSignals}</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={downloadCSV}
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl transition-all duration-200 font-semibold border border-gray-300 shadow-sm hover:shadow-md flex items-center space-x-2 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export CSV</span>
            </button>

            <button
              onClick={fetchDigitalInputs}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Signal Groups */}
        {Object.entries(signalGroups).map(([groupName, signals]) => (
          signals.length > 0 && (
            <div
              key={groupName}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50/80 to-white/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{groupName.split(' ')[0]}</div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{groupName.replace(/^.[^\s]*\s/, '')}</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {signals.length} signal{signals.length !== 1 ? 's' : ''} • {signals.filter(s => s.value === 1).length} active
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-700">
                      {((signals.filter(s => s.value === 1).length / signals.length) * 100).toFixed(0)}% Active
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8">
                  {signals.map((signal, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                            {signal.key}
                          </h3>
                          <p className="text-xs text-gray-500 font-mono truncate bg-gray-100 px-2 py-1 rounded">
                            {signal.originalKey}
                          </p>
                        </div>
                        <StatusBadge value={signal.value} />
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs font-semibold text-gray-600">Digital Value</span>
                        <span className={`text-lg font-bold ${
                          signal.value === 1 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {signal.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        ))}

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12">
          <p>Digital Inputs Monitoring System • Auto-refresh available • Data export enabled</p>
        </div>
      </div>
    </div>
  );
};

export default DigitalInputsTable;