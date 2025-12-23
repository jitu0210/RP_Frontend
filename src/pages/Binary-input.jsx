import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BinaryIO() {
  const [activeTab, setActiveTab] = useState("inputs");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  // Combined signal states
  const [signals, setSignals] = useState({
    // Input signals
    sourceFail1Status: { status: false, type: "input", category: "Status Monitoring" },
    sourceFail2Status: { status: false, type: "input", category: "Status Monitoring" },
    btsNotReadyStatus: { status: false, type: "input", category: "Status Monitoring" },
    ic1_Close_Ckt_Monitoring: { status: false, type: "input", category: "Status Monitoring" },
    ic1_Trip_Ckt_Monitoring: { status: false, type: "input", category: "Status Monitoring" },
    bcCloseCktMonitoring: { status: false, type: "input", category: "Status Monitoring" },
    bcTripCktMonitoring: { status: false, type: "input", category: "Status Monitoring" },
    ic2CloseCktMonitoring: { status: false, type: "input", category: "Status Monitoring" },
    ic2TripCktMonitoring: { status: false, type: "input", category: "Status Monitoring" },
    ic1BreakerReady: { status: false, type: "input", category: "Breaker Readiness" },
    bcBreakerReady: { status: false, type: "input", category: "Breaker Readiness" },
    ic2BreakerReady: { status: false, type: "input", category: "Breaker Readiness" },
    ic1PTReady: { status: false, type: "input", category: "PT Readiness" },
    ic2PTReady: { status: false, type: "input", category: "PT Readiness" },
    busAPTReady: { status: false, type: "input", category: "PT Readiness" },
    busBPTReady: { status: false, type: "input", category: "PT Readiness" },
    breakerConfigOk: { status: false, type: "input", category: "Configuration" },
    btsIN: { status: false, type: "input", category: "Configuration" },
    btsOUT: { status: false, type: "input", category: "Configuration" },
    btsReady: { status: false, type: "input", category: "Configuration" },
    premIlOK: { status: false, type: "input", category: "Configuration" },
    transferLockoutNotOperated: { status: false, type: "input", category: "Configuration" },
    testTransferExecutedLED: { status: false, type: "input", category: "Configuration" },
    previousTransferOK: { status: false, type: "input", category: "Configuration" },
    B1_S1selected: { status: false, type: "input", category: "Source Selection" },
    B1_S2selected: { status: false, type: "input", category: "Source Selection" },
    B2_S2selected: { status: false, type: "input", category: "Source Selection" },
    B2_S1selected: { status: false, type: "input", category: "Source Selection" },
    B1_2_to_S1selected: { status: false, type: "input", category: "Source Selection" },
    B1_2_S2selected: { status: false, type: "input", category: "Source Selection" },
    bkr1Closed: { status: false, type: "input", category: "Breaker Status" },
    bkr2Closed: { status: false, type: "input", category: "Breaker Status" },
    bkr3Closed: { status: false, type: "input", category: "Breaker Status" },
    bkr1Open: { status: false, type: "input", category: "Breaker Status" },
    bkr2Open: { status: false, type: "input", category: "Breaker Status" },
    bkr3Open: { status: false, type: "input", category: "Breaker Status" },
    ic1_trip_failure_occured: { status: false, type: "input", category: "Failure" },
    ic1_close_failure_occured: { status: false, type: "input", category: "Failure" },
    bc_trip_failure_occured: { status: false, type: "input", category: "Failure" },
    bc_close_failure_occured: { status: false, type: "input", category: "Failure" },
    ic2_trip_failure_occured: { status: false, type: "input", category: "Failure" },
    ic2_close_failure_occured: { status: false, type: "input", category: "Failure" },
    b1_s1_available: { status: false, type: "input", category: "Source Availability" },
    b1_s2_available: { status: false, type: "input", category: "Source Availability" },
    b2_s1_available: { status: false, type: "input", category: "Source Availability" },
    b2_s2_available: { status: false, type: "input", category: "Source Availability" },
    b1_2_to_s1_available: { status: false, type: "input", category: "Source Availability" },
    b1_2_to_s2_available: { status: false, type: "input", category: "Source Availability" },
    
    // Output signals
    ic1Trip: { status: false, type: "output", category: "Breaker Control" },
    ic1Close: { status: false, type: "output", category: "Breaker Control" },
    bcTrip: { status: false, type: "output", category: "Breaker Control" },
    bcClose: { status: false, type: "output", category: "Breaker Control" },
    ic2Trip: { status: false, type: "output", category: "Breaker Control" },
    ic2Close: { status: false, type: "output", category: "Breaker Control" },
    bus1MotorTrip: { status: false, type: "output", category: "Motor Control" },
    bus2MotorTrip: { status: false, type: "output", category: "Motor Control" },
    closingSupplyControl: { status: false, type: "output", category: "Control" },
    testModeSelectOutput: { status: false, type: "output", category: "Control" },
    autoProtectiveTransferSuccessful: { status: false, type: "output", category: "Control" },
    fastModeSelected: { status: false, type: "output", category: "Mode Selection" },
    fastSlowModeSelected: { status: false, type: "output", category: "Mode Selection" },
    fastInPhaseSlowModeSelected: { status: false, type: "output", category: "Mode Selection" },
    parallelModeSelected: { status: false, type: "output", category: "Mode Selection" },
    slowModeSelected: { status: false, type: "output", category: "Mode Selection" },
  });

  // Live monitoring with WebSocket-like polling (if WebSocket not available)
  useEffect(() => {
    // Function to fetch all signals
    const fetchAllSignals = async () => {
      try {
        const signalKeys = Object.keys(signals);
        
        // Fetch all signals in parallel
        const promises = signalKeys.map(key => 
          axios.get(`http://localhost:8000/api/v1/bts/${key}`, {
            timeout: 2000
          }).then(response => ({
            key,
            status: response.data?.status ?? response.data,
            success: true
          })).catch(() => ({
            key,
            status: false,
            success: false
          }))
        );

        const results = await Promise.all(promises);
        
        setSignals(prev => {
          const updated = { ...prev };
          results.forEach(result => {
            if (updated[result.key]) {
              updated[result.key] = {
                ...updated[result.key],
                status: result.status
              };
            }
          });
          return updated;
        });
      } catch (error) {
        // Silently handle errors for live updates
      }
    };

    // Initial fetch
    fetchAllSignals();

    // Set up live updates every 1 second
    const intervalId = setInterval(fetchAllSignals, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Individual signal monitoring for more granular updates (optional)
  useEffect(() => {
    const signalKeys = Object.keys(signals);
    
    // Setup monitoring for each signal
    const cleanupFunctions = signalKeys.map(key => {
      let mounted = true;
      
      const monitorSignal = async () => {
        while (mounted) {
          try {
            const response = await axios.get(`http://localhost:8000/api/v1/bts/${key}`, {
              timeout: 1000
            });
            
            if (mounted) {
              setSignals(prev => ({
                ...prev,
                [key]: {
                  ...prev[key],
                  status: response.data?.status ?? response.data
                }
              }));
            }
          } catch (error) {
            // Silently handle errors
          }
          
          // Wait before next update
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      };
      
      // Start monitoring this signal
      monitorSignal();
      
      // Return cleanup function
      return () => {
        mounted = false;
      };
    });
    
    // Clean up all monitoring on component unmount
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);

  const handleOutputCommand = async (command) => {
    try {
      await axios.get(`http://localhost:8000/api/v1/bts/${command}`);
      // Status will update automatically via the live monitoring
    } catch (err) {
      // Silently handle error
    }
  };

  const getSignalData = () => {
    const filteredByType = Object.entries(signals).filter(([_, value]) => 
      activeTab === "inputs" ? value.type === "input" : value.type === "output"
    );
    
    let filteredData = filteredByType.map(([key, value]) => ({
      key,
      name: formatSignalName(key),
      status: value.status,
      category: value.category,
      type: value.type
    }));
    
    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.key.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal === undefined || bVal === undefined) return 0;
        
        if (aVal < bVal) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  };

  const formatSignalName = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/(\d)([A-Z])/g, '$1 $2')
      .trim();
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusSummary = () => {
    const filteredData = Object.entries(signals).filter(([_, value]) => 
      activeTab === "inputs" ? value.type === "input" : value.type === "output"
    );
    
    const total = filteredData.length;
    const active = filteredData.filter(([_, value]) => value.status).length;
    const inactive = total - active;
    
    return { total, active, inactive };
  };

  const signalData = getSignalData();
  const summary = getStatusSummary();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Binary I/O Monitoring System
              </h1>
              <p className="text-gray-600">
                Live monitoring and control of binary signals
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Live Monitoring Active</span>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("inputs")}
                  className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "inputs" 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Input Signals ({Object.keys(signals).filter(k => signals[k].type === "input").length})
                </button>
                <button
                  onClick={() => setActiveTab("outputs")}
                  className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "outputs" 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Output Signals ({Object.keys(signals).filter(k => signals[k].type === "output").length})
                </button>
              </div>
            </div>
            
            {/* Search */}
            <div className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search signals by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Signals</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.total}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active</p>
                  <p className="text-2xl font-bold text-green-600">{summary.active}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-gray-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Inactive</p>
                  <p className="text-2xl font-bold text-gray-700">{summary.inactive}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('name')}
                  >
                    <div className="flex items-center">
                      Signal Name
                      {sortConfig.key === 'name' && (
                        <svg className={`w-4 h-4 ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('category')}
                  >
                    <div className="flex items-center">
                      Category
                      {sortConfig.key === 'category' && (
                        <svg className={`w-4 h-4 ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      {sortConfig.key === 'status' && (
                        <svg className={`w-4 h-4 ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </th>
                  {activeTab === "outputs" && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {signalData.map((signal) => (
                  <tr key={signal.key} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{signal.name}</div>
                        <div className="text-xs text-gray-500">{signal.key}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {signal.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${signal.status ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                        <span className={`text-sm font-medium ${signal.status ? 'text-green-700' : 'text-gray-700'}`}>
                          {signal.status ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                    </td>
                    {activeTab === "outputs" && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleOutputCommand(signal.key)}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Trigger
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            
            {signalData.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500">No signals found matching your search criteria.</p>
              </div>
            )}
          </div>
          
          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Live monitoring {summary.total} signals • Updates automatically
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>BTS 2000 Binary I/O Monitoring System • Version 2.4.1 • Live Monitoring Enabled</p>
          <p className="mt-1">© {new Date().getFullYear()} AARTECH SOLONICS LTD</p>
        </div>
      </div>
    </div>
  );
}