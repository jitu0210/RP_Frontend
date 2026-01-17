// // import { useState, useEffect } from 'react';

// // const DR = () => {
// //   const [disturbances, setDisturbances] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchDisturbances = async () => {
// //       try {
// //         // Replace with your actual backend endpoint
// //         const response = await fetch('https://api.example.com/disturbances');
        
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
        
// //         const data = await response.json();
// //         setDisturbances(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDisturbances();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //         <span className="ml-3">Loading disturbance records...</span>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
// //         <strong className="font-bold">Error: </strong>
// //         <span className="block sm:inline">{error}</span>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="text-3xl font-bold text-gray-800 mb-6">Disturbance Records</h1>
      
// //       {disturbances.length === 0 ? (
// //         <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
// //           No disturbance records found.
// //         </div>
// //       ) : (
// //         <div className="overflow-x-auto shadow-md rounded-lg">
// //           <table className="min-w-full bg-white border border-gray-200">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   ID
// //                 </th>
// //                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Type
// //                 </th>
// //                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Location
// //                 </th>
// //                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Timestamp
// //                 </th>
// //                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Status
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {disturbances.map((disturbance) => (
// //                 <tr key={disturbance.id} className="hover:bg-gray-50">
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {disturbance.id}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
// //                     {disturbance.type}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {disturbance.location}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {new Date(disturbance.timestamp).toLocaleString()}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
// //                       ${disturbance.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
// //                         disturbance.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
// //                         'bg-red-100 text-red-800'}`}>
// //                       {disturbance.status}
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DR;



// import { useState, useEffect } from 'react';

// const DR = () => {
//   const [disturbances, setDisturbances] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Simulate API fetch with dummy data
//     const fetchDisturbances = async () => {
//       try {
//         // Simulate network delay
//         await new Promise(resolve => setTimeout(resolve, 1500));
        
//         // Dummy disturbance data
//         const dummyData = [
//           {
//             id: 1,
//             type: "Power Outage",
//             location: "Building A, Floor 3",
//             timestamp: "2023-05-15T14:30:00Z",
//             status: "Resolved"
//           },
//           {
//             id: 2,
//             type: "Network Disruption",
//             location: "Server Room 2",
//             timestamp: "2023-05-16T09:15:00Z",
//             status: "In Progress"
//           },
//           {
//             id: 3,
//             type: "Equipment Failure",
//             location: "Lab 4B",
//             timestamp: "2023-05-17T16:45:00Z",
//             status: "Pending"
//           },
//           {
//             id: 4,
//             type: "Environmental Alert",
//             location: "Data Center",
//             timestamp: "2023-05-18T11:20:00Z",
//             status: "Resolved"
//           },
//           {
//             id: 5,
//             type: "Security Breach",
//             location: "Main Entrance",
//             timestamp: "2023-05-19T08:05:00Z",
//             status: "In Progress"
//           }
//         ];
        
//         setDisturbances(dummyData);
//       } catch (err) {
//         setError("Failed to load disturbance records");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDisturbances();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-3">Loading disturbance records...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">Error: </strong>
//         <span className="block sm:inline">{error}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Disturbance Records</h1>
      
//       {disturbances.length === 0 ? (
//         <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
//           No disturbance records found.
//         </div>
//       ) : (
//         <div className="overflow-x-auto shadow-md rounded-lg">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   ID
//                 </th>
//                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Type
//                 </th>
//                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Location
//                 </th>
//                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Timestamp
//                 </th>
//                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {disturbances.map((disturbance) => (
//                 <tr key={disturbance.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {disturbance.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {disturbance.type}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {disturbance.location}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(disturbance.timestamp).toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${disturbance.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
//                         disturbance.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
//                         'bg-red-100 text-red-800'}`}>
//                       {disturbance.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DR;




import React, { useState, useEffect, useRef } from 'react';

const DRDisturbanceRecord = () => {
  const [disturbances, setDisturbances] = useState([]);
  const [selectedDisturbance, setSelectedDisturbance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const playbackRef = useRef(null);

  // Mock data
  const mockDisturbances = [
    {
      id: 'DR-2024-001',
      timestamp: '2024-03-15T14:23:45.123Z',
      duration: 124,
      type: 'voltage_sag',
      severity: 'high',
      voltageDrop: 0.35,
      frequencyDeviation: 0.2,
      location: 'Bus A-2',
      equipment: 'Transformer T-104',
      phase: 'ABC',
      triggeredBy: 'Lightning Strike',
      status: 'analyzed',
      waveform: 'sag_wave_001.png',
      summary: 'Voltage sag detected on all three phases due to external fault',
      actions: ['Protection trip', 'Auto-reclose'],
      tags: ['critical', 'external', 'auto-reclosed'],
      preEventVoltage: 415.2,
      duringEventVoltage: 269.8,
      postEventVoltage: 414.8,
      preEventFrequency: 50.02,
      duringEventFrequency: 49.82,
      postEventFrequency: 50.01,
      faultDistance: '2.4 km',
      protectionZone: 'Zone 2'
    },
    {
      id: 'DR-2024-002',
      timestamp: '2024-03-15T10:15:22.456Z',
      duration: 89,
      type: 'overcurrent',
      severity: 'medium',
      voltageDrop: 0.15,
      frequencyDeviation: 0.1,
      location: 'Feeder F-12',
      equipment: 'Breaker CB-205',
      phase: 'A',
      triggeredBy: 'Equipment Failure',
      status: 'under_review',
      waveform: 'oc_wave_002.png',
      summary: 'Phase A overcurrent protection triggered',
      actions: ['Breaker trip', 'Alarm raised'],
      tags: ['internal', 'phase-specific'],
      preEventVoltage: 415.0,
      duringEventVoltage: 352.7,
      postEventVoltage: 414.9,
      preEventFrequency: 50.01,
      duringEventFrequency: 49.95,
      postEventFrequency: 50.00,
      faultDistance: '1.8 km',
      protectionZone: 'Zone 1'
    },
    {
      id: 'DR-2024-003',
      timestamp: '2024-03-14T22:45:18.789Z',
      duration: 210,
      type: 'frequency_swing',
      severity: 'high',
      voltageDrop: 0.25,
      frequencyDeviation: 0.8,
      location: 'Generator G-3',
      equipment: 'Exciter System',
      phase: 'ABC',
      triggeredBy: 'Generator Loss',
      status: 'resolved',
      waveform: 'freq_wave_003.png',
      summary: 'Frequency instability following generator trip',
      actions: ['Load shedding', 'Frequency control'],
      tags: ['system', 'stability', 'recovered'],
      preEventVoltage: 415.1,
      duringEventVoltage: 311.3,
      postEventVoltage: 414.7,
      preEventFrequency: 50.03,
      duringEventFrequency: 49.22,
      postEventFrequency: 50.02,
      faultDistance: '0.0 km',
      protectionZone: 'Generator'
    },
    {
      id: 'DR-2024-004',
      timestamp: '2024-03-14T18:30:55.321Z',
      duration: 45,
      type: 'earth_fault',
      severity: 'low',
      voltageDrop: 0.05,
      frequencyDeviation: 0.05,
      location: 'Cable C-48',
      equipment: 'Cable Termination',
      phase: 'C',
      triggeredBy: 'Insulation Failure',
      status: 'pending',
      waveform: 'ef_wave_004.png',
      summary: 'Single phase earth fault detected',
      actions: ['Fault isolation', 'Maintenance scheduled'],
      tags: ['cable', 'insulation'],
      preEventVoltage: 414.9,
      duringEventVoltage: 394.1,
      postEventVoltage: 414.8,
      preEventFrequency: 50.00,
      duringEventFrequency: 49.95,
      postEventFrequency: 49.99,
      faultDistance: '3.2 km',
      protectionZone: 'Zone 3'
    },
    {
      id: 'DR-2024-005',
      timestamp: '2024-03-14T12:10:33.654Z',
      duration: 310,
      type: 'blackout',
      severity: 'critical',
      voltageDrop: 1.0,
      frequencyDeviation: 1.5,
      location: 'Substation S-5',
      equipment: 'Main Bus',
      phase: 'ABC',
      triggeredBy: 'Grid Collapse',
      status: 'analyzed',
      waveform: 'blackout_wave_005.png',
      summary: 'Complete system blackout - grid disturbance',
      actions: ['Black start', 'System restoration'],
      tags: ['grid', 'critical', 'restored'],
      preEventVoltage: 415.3,
      duringEventVoltage: 0.0,
      postEventVoltage: 414.5,
      preEventFrequency: 50.04,
      duringEventFrequency: 48.54,
      postEventFrequency: 49.98,
      faultDistance: 'N/A',
      protectionZone: 'System'
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDisturbances(mockDisturbances);
      setSelectedDisturbance(mockDisturbances[0]);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        console.log('Auto-refreshing disturbance records...');
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'analyzed': return 'text-green-400 bg-green-900/20';
      case 'resolved': return 'text-blue-400 bg-blue-900/20';
      case 'under_review': return 'text-yellow-400 bg-yellow-900/20';
      case 'pending': return 'text-orange-400 bg-orange-900/20';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'voltage_sag': return 'VOLTAGE SAG';
      case 'overcurrent': return 'OVERCURRENT';
      case 'frequency_swing': return 'FREQUENCY SWING';
      case 'earth_fault': return 'EARTH FAULT';
      case 'blackout': return 'BLACKOUT';
      default: return 'DISTURBANCE';
    }
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filteredDisturbances = disturbances.filter(dist => {
    if (filter !== 'all' && dist.severity !== filter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        dist.id.toLowerCase().includes(query) ||
        dist.location.toLowerCase().includes(query) ||
        dist.equipment.toLowerCase().includes(query) ||
        dist.type.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const renderWaveform = () => {
    return (
      <div className="relative h-64 bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          {/* Vertical Grid Lines */}
          {Array.from({ length: 11 }).map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="absolute top-0 bottom-0 border-l border-gray-600" 
              style={{ left: `${i * 10}%` }}
            ></div>
          ))}
          {/* Horizontal Grid Lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="absolute left-0 right-0 border-t border-gray-600" 
              style={{ top: `${i * 12.5}%` }}
            ></div>
          ))}
        </div>

        {/* Y-axis Labels */}
        <div className="absolute left-2 top-2 text-xs text-gray-500">500V</div>
        <div className="absolute left-2 bottom-2 text-xs text-gray-500">0V</div>
        
        {/* X-axis Labels */}
        <div className="absolute bottom-2 left-1/4 text-xs text-gray-500">-100ms</div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">0ms</div>
        <div className="absolute bottom-2 right-1/4 text-xs text-gray-500">+100ms</div>

        {/* Phase Labels */}
        <div className="absolute top-3 left-3 flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-blue-500 mr-1"></div>
            <span className="text-xs text-gray-400">PHASE A</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-green-500 mr-1"></div>
            <span className="text-xs text-gray-400">PHASE B</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-red-500 mr-1"></div>
            <span className="text-xs text-gray-400">PHASE C</span>
          </div>
        </div>

        {/* Disturbance Zone Indicator */}
        <div className="absolute top-0 bottom-0 bg-red-500/5 border-l border-r border-red-500/30" style={{ left: '40%', right: '60%' }}>
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <div className="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold">
              DISTURBANCE ZONE
            </div>
          </div>
        </div>

        {/* Simulated Waveform Lines */}
        <div className="absolute inset-0">
          {/* Phase A Waveform */}
          <div className="absolute top-1/4 left-0 right-0 h-0.5">
            <div className="absolute w-full h-0.5 bg-blue-500/80">
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full -top-1" style={{ left: '20%' }}></div>
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full -top-1" style={{ left: '40%' }}></div>
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full -top-1" style={{ left: '50%' }}></div>
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full -top-1" style={{ left: '60%' }}></div>
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full -top-1" style={{ left: '80%' }}></div>
            </div>
          </div>
          
          {/* Phase B Waveform */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5">
            <div className="absolute w-full h-0.5 bg-green-500/80">
              <div className="absolute w-2 h-2 bg-green-500 rounded-full -top-1" style={{ left: '20%' }}></div>
              <div className="absolute w-2 h-2 bg-green-500 rounded-full -top-1" style={{ left: '40%' }}></div>
              <div className="absolute w-2 h-2 bg-green-500 rounded-full -top-1" style={{ left: '50%' }}></div>
              <div className="absolute w-2 h-2 bg-green-500 rounded-full -top-1" style={{ left: '60%' }}></div>
              <div className="absolute w-2 h-2 bg-green-500 rounded-full -top-1" style={{ left: '80%' }}></div>
            </div>
          </div>
          
          {/* Phase C Waveform */}
          <div className="absolute top-3/4 left-0 right-0 h-0.5">
            <div className="absolute w-full h-0.5 bg-red-500/80">
              <div className="absolute w-2 h-2 bg-red-500 rounded-full -top-1" style={{ left: '20%' }}></div>
              <div className="absolute w-2 h-2 bg-red-500 rounded-full -top-1" style={{ left: '40%' }}></div>
              <div className="absolute w-2 h-2 bg-red-500 rounded-full -top-1" style={{ left: '50%' }}></div>
              <div className="absolute w-2 h-2 bg-red-500 rounded-full -top-1" style={{ left: '60%' }}></div>
              <div className="absolute w-2 h-2 bg-red-500 rounded-full -top-1" style={{ left: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DR</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold tracking-tight">DISTURBANCE RECORD SYSTEM</h1>
                <p className="text-sm text-gray-400">Power System Event Analysis & Monitoring</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-400 mr-2">TIME:</span>
                <span className="text-sm font-mono">{new Date().toLocaleTimeString()}</span>
              </div>
              <button 
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 py-2 rounded-lg border ${autoRefresh ? 'bg-green-900/30 border-green-700 text-green-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
              >
                <span className="text-sm">{autoRefresh ? 'AUTO REFRESH ON' : 'AUTO REFRESH OFF'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Disturbance List */}
        <aside className="w-96 border-r border-gray-800 bg-gray-900/50 h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Disturbance Records</h2>
              <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                {filteredDisturbances.length} RECORDS
              </span>
            </div>

            {/* Filters */}
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="SEARCH DISTURBANCES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-4 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase tracking-wider"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {['all', 'critical', 'high', 'medium', 'low'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setFilter(sev === filter ? 'all' : sev)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider ${filter === sev 
                      ? sev === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100' 
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'}`}
                  >
                    {sev === 'all' ? 'ALL SEVERITY' : sev}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 uppercase tracking-wider">Time Range:</span>
                </div>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm uppercase tracking-wider"
                >
                  <option value="1h">LAST HOUR</option>
                  <option value="24h">LAST 24 HOURS</option>
                  <option value="7d">LAST 7 DAYS</option>
                  <option value="30d">LAST 30 DAYS</option>
                </select>
              </div>
            </div>
          </div>

          {/* Disturbance List */}
          <div className="p-2">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse bg-gray-800 rounded-lg p-4">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              filteredDisturbances.map((dist) => (
                <div
                  key={dist.id}
                  onClick={() => setSelectedDisturbance(dist)}
                  className={`p-4 border-b border-gray-800 cursor-pointer transition-colors hover:bg-gray-800/50 ${selectedDisturbance?.id === dist.id ? 'bg-gray-800 border-l-4 border-l-blue-500' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(dist.severity)}`}></div>
                      <span className="font-mono text-sm font-semibold">{dist.id}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDuration(dist.duration * 1000)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-bold uppercase tracking-wider ${getSeverityTextColor(dist.severity)}`}>
                        {dist.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(dist.status)}`}>
                      {dist.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-gray-400 space-y-1">
                    <div className="flex items-center">
                      <div className="w-20 text-gray-500 uppercase">Location:</div>
                      <div className="font-medium">{dist.location}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 text-gray-500 uppercase">Time:</div>
                      <div>{new Date(dist.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {dist.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-800 rounded uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Main Content - Disturbance Detail */}
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-73px)]">
          {selectedDisturbance ? (
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold font-mono">{selectedDisturbance.id}</h2>
                    <div className="flex items-center space-x-2">
                      <div className={`px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${getSeverityColor(selectedDisturbance.severity)}`}>
                        {selectedDisturbance.severity.toUpperCase()}
                      </div>
                      <div className="px-3 py-1.5 rounded-full bg-gray-800 text-sm font-bold uppercase tracking-wider border border-gray-700">
                        {getTypeText(selectedDisturbance.type)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 font-mono">{formatDate(selectedDisturbance.timestamp)}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-sm font-medium uppercase tracking-wider">
                    PRINT REPORT
                  </button>
                  <button className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-sm font-medium uppercase tracking-wider">
                    EXPORT DATA
                  </button>
                  <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold uppercase tracking-wider">
                    SHARE ANALYSIS
                  </button>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold uppercase tracking-wider">EVENT SUMMARY</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wider">Status:</span>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${getStatusColor(selectedDisturbance.status)}`}>
                      {selectedDisturbance.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">{selectedDisturbance.summary}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">DURATION</div>
                    <div className="text-2xl font-bold font-mono">{formatDuration(selectedDisturbance.duration * 1000)}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">VOLTAGE DROP</div>
                    <div className="text-2xl font-bold font-mono">{(selectedDisturbance.voltageDrop * 100).toFixed(1)}%</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">FREQUENCY DEV</div>
                    <div className="text-2xl font-bold font-mono">{selectedDisturbance.frequencyDeviation} Hz</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">PHASE</div>
                    <div className="text-2xl font-bold font-mono">{selectedDisturbance.phase}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Waveform Display */}
                  <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold uppercase tracking-wider">WAVEFORM ANALYSIS</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-gray-800 rounded-lg border border-gray-700">
                          <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="px-4 py-2 hover:bg-gray-700 rounded-l-lg text-sm font-medium uppercase tracking-wider"
                          >
                            {isPlaying ? 'PAUSE' : 'PLAY'}
                          </button>
                          <select 
                            value={playbackSpeed}
                            onChange={(e) => setPlaybackSpeed(e.target.value)}
                            className="bg-gray-800 border-l border-gray-700 px-3 py-2 text-sm focus:outline-none uppercase tracking-wider"
                          >
                            <option value="0.5">0.5X</option>
                            <option value="1">1X</option>
                            <option value="2">2X</option>
                            <option value="5">5X</option>
                          </select>
                        </div>
                        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-sm font-medium uppercase tracking-wider">
                          FULLSCREEN
                        </button>
                      </div>
                    </div>

                    {renderWaveform()}
                  </div>

                  {/* Detailed Parameters */}
                  <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-4">DETAILED PARAMETERS</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                          <span className="text-gray-400 uppercase tracking-wider text-sm">RMS VOLTAGE (PRE-EVENT)</span>
                          <span className="font-mono font-bold">{selectedDisturbance.preEventVoltage} V</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                          <span className="text-gray-400 uppercase tracking-wider text-sm">RMS VOLTAGE (DURING)</span>
                          <span className="font-mono font-bold text-red-400">{selectedDisturbance.duringEventVoltage} V</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                          <span className="text-gray-400 uppercase tracking-wider text-sm">RMS VOLTAGE (POST-EVENT)</span>
                          <span className="font-mono font-bold">{selectedDisturbance.postEventVoltage} V</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                          <span className="text-gray-400 uppercase tracking-wider text-sm">FREQUENCY (PRE-EVENT)</span>
                          <span className="font-mono font-bold">{selectedDisturbance.preEventFrequency} Hz</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                          <span className="text-gray-400 uppercase tracking-wider text-sm">FREQUENCY (DURING)</span>
                          <span className="font-mono font-bold text-red-400">{selectedDisturbance.duringEventFrequency} Hz</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                          <span className="text-gray-400 uppercase tracking-wider text-sm">FREQUENCY (POST-EVENT)</span>
                          <span className="font-mono font-bold">{selectedDisturbance.postEventFrequency} Hz</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* System Information */}
                  <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-4">SYSTEM INFORMATION</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 border-b border-gray-800">
                        <span className="text-gray-400 uppercase tracking-wider text-sm">LOCATION</span>
                        <span className="font-medium font-mono">{selectedDisturbance.location}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-800">
                        <span className="text-gray-400 uppercase tracking-wider text-sm">EQUIPMENT</span>
                        <span className="font-medium font-mono">{selectedDisturbance.equipment}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-800">
                        <span className="text-gray-400 uppercase tracking-wider text-sm">TRIGGERED BY</span>
                        <span className="font-medium">{selectedDisturbance.triggeredBy}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-800">
                        <span className="text-gray-400 uppercase tracking-wider text-sm">PROTECTION ZONE</span>
                        <span className="font-medium font-mono">{selectedDisturbance.protectionZone}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-400 uppercase tracking-wider text-sm">FAULT DISTANCE</span>
                        <span className="font-medium font-mono">{selectedDisturbance.faultDistance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Taken */}
                  <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-4">ACTIONS TAKEN</h3>
                    <div className="space-y-2">
                      {selectedDisturbance.actions.map((action, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">{action}</span>
                          </div>
                          <span className="text-xs text-gray-500 font-mono">+{(i * 20)}ms</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-4">EVENT TAGS</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDisturbance.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm font-medium uppercase tracking-wider border border-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-4">QUICK ANALYSIS</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-400 uppercase tracking-wider text-sm">FAULT TYPE</span>
                        <span className="font-medium">THREE PHASE SAG</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-400 uppercase tracking-wider text-sm">CLEARING TIME</span>
                        <span className="font-medium font-mono">85ms</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-400 uppercase tracking-wider text-sm">RECOVERY TIME</span>
                        <span className="font-medium font-mono">210ms</span>
                      </div>
                      <div className="pt-4 border-t border-gray-800">
                        <div className="text-sm text-gray-400 mb-3 uppercase tracking-wider">RECOMMENDATIONS</div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                            <span>Review relay settings for Zone 2</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                            <span>Schedule maintenance for {selectedDisturbance.equipment}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-gray-700">
                  <span className="text-gray-600 text-2xl font-bold">!</span>
                </div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-wider">NO DISTURBANCE SELECTED</h3>
                <p className="text-gray-400 uppercase tracking-wider">SELECT A DISTURBANCE RECORD FROM THE LEFT PANEL</p>
              </div>
            </div>
          )}
        </main>
      </div>

      
    </div>
  );
};

export default DRDisturbanceRecord;