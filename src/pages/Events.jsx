// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// export default function EventsLiveMonitoring() {
//   const [eventsData, setEventsData] = useState({ live: [], errors: [] });
//   const [isLoading, setIsLoading] = useState(true);
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const liveTableRef = useRef(null);
//   const errorTableRef = useRef(null);

//   // Function to fetch data from the API
//   const fetchEventsData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/events');
      
//       // Limit to 100 most recent events for each category
//       const limitedData = {
//         live: response.data.live.slice(-100),
//         errors: response.data.errors.slice(-100)
//       };
      
//       setEventsData(limitedData);
//       setLastUpdated(new Date());
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching events data:', error);
//       setIsLoading(false);
//     }
//   };

//   // Fetch data on component mount and set up interval
//   useEffect(() => {
//     fetchEventsData();
    
//     const intervalId = setInterval(() => {
//       fetchEventsData();
//     }, 100);
    
//     return () => clearInterval(intervalId);
//   }, []);

//   // Auto-scroll to bottom when new data arrives
//   useEffect(() => {
//     if (liveTableRef.current) {
//       liveTableRef.current.scrollTop = liveTableRef.current.scrollHeight;
//     }
//     if (errorTableRef.current) {
//       errorTableRef.current.scrollTop = errorTableRef.current.scrollHeight;
//     }
//   }, [eventsData]);

//   // Format the last updated time
//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit', 
//       second: '2-digit',
//       hour12: true 
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8 p-6 bg-white rounded-lg shadow border border-gray-300">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Events Live Monitoring</h1>
//               <p className="text-gray-600 mt-2">
//                 Real-time monitoring of system events and errors (showing last 100 events)
//               </p>
//             </div>
//             <div className="flex items-center mt-4 md:mt-0">
//               <div className={`h-3 w-3 rounded-full mr-2 ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
//               <span className="text-sm text-gray-500">
//                 Last updated: {formatTime(lastUpdated)}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Two Column Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Live Events Table */}
//           <div className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
//             <div className="p-4 border-b border-gray-300 bg-blue-50">
//               <div className="flex items-center">
//                 <div className="h-4 w-4 bg-blue-500 rounded-full mr-3"></div>
//                 <h2 className="text-xl font-semibold text-gray-800">Live Signals</h2>
//                 <span className="ml-3 bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
//                   {eventsData.live.length} signals
//                 </span>
//               </div>
//             </div>
            
//             <div 
//               ref={liveTableRef}
//               className="overflow-y-auto max-h-96"
//             >
//               <table className="w-full table-fixed border-collapse">
//                 <thead className="sticky top-0 bg-gray-100">
//                   <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-300">
//                     <th className="w-1/4 p-3 border-r border-gray-300">Date</th>
//                     <th className="w-1/4 p-3 border-r border-gray-300">Time</th>
//                     <th className="w-1/4 p-3 border-r border-gray-300">Signal Name</th>
//                     <th className="w-1/4 p-3 text-right">Value</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-300">
//                   {eventsData.live.map((event, index) => (
//                     <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
//                       <td className="p-3 text-sm font-medium text-gray-900 border-r border-gray-300">
//                         {event.date}
//                       </td>
//                       <td className="p-3 text-sm text-gray-700 border-r border-gray-300">
//                         {event.time}
//                       </td>
//                       <td className="p-3 text-sm text-gray-900 border-r border-gray-300">
//                         {event.signalName}
//                       </td>
//                       <td className="p-3 text-sm text-right">
//                         <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${event.value === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
//                           {event.value}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Error Events Table */}
//           <div className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
//             <div className="p-4 border-b border-gray-300 bg-red-50">
//               <div className="flex items-center">
//                 <div className="h-4 w-4 bg-red-500 rounded-full mr-3"></div>
//                 <h2 className="text-xl font-semibold text-gray-800">Error Logs</h2>
//                 <span className="ml-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
//                   {eventsData.errors.length} errors
//                 </span>
//               </div>
//             </div>
            
//             <div 
//               ref={errorTableRef}
//               className="overflow-y-auto max-h-96"
//             >
//               <table className="w-full table-fixed border-collapse">
//                 <thead className="sticky top-0 bg-gray-100">
//                   <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-300">
//                     <th className="w-1/4 p-3 border-r border-gray-300">Date</th>
//                     <th className="w-1/4 p-3 border-r border-gray-300">Time</th>
//                     <th className="w-1/4 p-3 border-r border-gray-300">Signal Name</th>
//                     <th className="w-1/4 p-3 text-right">Value</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-300">
//                   {eventsData.errors.map((error, index) => (
//                     <tr key={index} className="bg-red-50 hover:bg-red-100 transition-colors duration-150">
//                       <td className="p-3 text-sm font-medium text-red-900 border-r border-gray-300">
//                         {error.date}
//                       </td>
//                       <td className="p-3 text-sm text-red-900 border-r border-gray-300">
//                         {error.time}
//                       </td>
//                       <td className="p-3 text-sm font-medium text-red-900 border-r border-gray-300">
//                         {error.signalName}
//                       </td>
//                       <td className="p-3 text-sm text-right">
//                         <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-200 text-red-900">
//                           {error.value}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
//             <div className="text-center p-8 bg-white rounded-lg shadow border border-gray-300">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600 font-medium">Loading events data...</p>
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {!isLoading && eventsData.live.length === 0 && eventsData.errors.length === 0 && (
//           <div className="bg-white rounded-lg shadow border border-gray-300 p-12 text-center mt-8">
//             <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
//               <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No events data available</h3>
//             <p className="text-gray-500">Events will appear here once they are detected by the system.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







import React, { useState, useEffect, useRef } from 'react';

const EventsMonitoring = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'timeline'
  const [eventsPerPage, setEventsPerPage] = useState(20);
  const [acknowledgedEvents, setAcknowledgedEvents] = useState(new Set());
  const eventsContainerRef = useRef(null);

  // Mock event data for industrial systems
  const mockEvents = [
    {
      id: 'EV-2024-001',
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
      source: 'Protection Relay',
      equipment: 'Transformer T-104',
      location: 'Substation S-5',
      type: 'PROTECTION_TRIP',
      severity: 'CRITICAL',
      status: 'ACTIVE',
      description: 'Differential protection trip - Phase A to ground fault detected',
      details: 'Phase current imbalance detected with 85% differential current. Relay operated in 32ms.',
      value: '2850A',
      normalRange: '0-1500A',
      duration: '32ms',
      alarmGroup: 'PROTECTION',
      priority: 1,
      tags: ['differential', 'phase-fault', 'auto-reclose'],
      actions: ['Breaker trip', 'Alarm raised', 'Auto-reclose initiated'],
      acknowledged: false
    },
    {
      id: 'EV-2024-002',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      source: 'Voltage Monitor',
      equipment: 'Bus A-2',
      location: 'Substation S-5',
      type: 'VOLTAGE_SAG',
      severity: 'HIGH',
      status: 'ACTIVE',
      description: 'Voltage sag detected on all three phases',
      details: 'Voltage dropped to 75% of nominal value for 120ms duration.',
      value: '311V',
      normalRange: '380-420V',
      duration: '120ms',
      alarmGroup: 'POWER_QUALITY',
      priority: 2,
      tags: ['voltage', 'sag', 'three-phase'],
      actions: ['Voltage dip logged', 'Quality report generated'],
      acknowledged: false
    },
    {
      id: 'EV-2024-003',
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 minutes ago
      source: 'Frequency Relay',
      equipment: 'Generator G-3',
      location: 'Power Plant PP-1',
      type: 'FREQUENCY_DEVIATION',
      severity: 'MEDIUM',
      status: 'CLEARED',
      description: 'System frequency deviation beyond limits',
      details: 'Frequency dropped to 49.5Hz for 45 seconds before stabilization.',
      value: '49.5Hz',
      normalRange: '49.8-50.2Hz',
      duration: '45s',
      alarmGroup: 'SYSTEM_STABILITY',
      priority: 3,
      tags: ['frequency', 'stability', 'generator'],
      actions: ['Load shedding activated', 'Frequency control engaged'],
      acknowledged: true
    },
    {
      id: 'EV-2024-004',
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutes ago
      source: 'Temperature Sensor',
      equipment: 'Transformer T-104',
      location: 'Substation S-5',
      type: 'OVER_TEMPERATURE',
      severity: 'HIGH',
      status: 'ACTIVE',
      description: 'Transformer winding temperature exceeded threshold',
      details: 'Winding temperature reached 95°C, 15°C above normal operating range.',
      value: '95°C',
      normalRange: '75-80°C',
      duration: '15m',
      alarmGroup: 'EQUIPMENT_HEALTH',
      priority: 2,
      tags: ['temperature', 'transformer', 'cooling'],
      actions: ['Cooling fans activated', 'Load reduction recommended'],
      acknowledged: false
    },
    {
      id: 'EV-2024-005',
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(), // 40 minutes ago
      source: 'Communication Module',
      equipment: 'RTU-12',
      location: 'Feeder F-18',
      type: 'COMMUNICATION_FAILURE',
      severity: 'MEDIUM',
      status: 'ACTIVE',
      description: 'Remote terminal unit communication lost',
      details: 'No response from RTU-12 for 3 consecutive polling cycles.',
      value: 'N/A',
      normalRange: 'Normal',
      duration: '3m',
      alarmGroup: 'COMMUNICATION',
      priority: 3,
      tags: ['communication', 'rtu', 'network'],
      actions: ['Auto-retry initiated', 'Maintenance notified'],
      acknowledged: false
    },
    {
      id: 'EV-2024-006',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      source: 'Circuit Breaker',
      equipment: 'Breaker CB-205',
      location: 'Feeder F-12',
      type: 'BREAKER_OPERATION',
      severity: 'LOW',
      status: 'CLEARED',
      description: 'Circuit breaker operated successfully',
      details: 'Breaker opened on protection command and closed after fault clearance.',
      value: 'Operation',
      normalRange: 'Closed',
      duration: '85ms',
      alarmGroup: 'PROTECTION',
      priority: 4,
      tags: ['breaker', 'operation', 'normal'],
      actions: ['Operation logged', 'Sequence of events recorded'],
      acknowledged: true
    },
    {
      id: 'EV-2024-007',
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
      source: 'Power Quality Analyzer',
      equipment: 'Main Incomer',
      location: 'Substation S-5',
      type: 'HARMONIC_DISTORTION',
      severity: 'MEDIUM',
      status: 'ACTIVE',
      description: 'Harmonic distortion exceeded limits',
      details: 'Total harmonic distortion reached 8.5% on 5th harmonic.',
      value: '8.5% THD',
      normalRange: '0-5% THD',
      duration: 'Ongoing',
      alarmGroup: 'POWER_QUALITY',
      priority: 3,
      tags: ['harmonics', 'quality', 'filter'],
      actions: ['Harmonic analysis started', 'Filter maintenance scheduled'],
      acknowledged: false
    },
    {
      id: 'EV-2024-008',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      source: 'Gas Detector',
      equipment: 'Transformer T-104',
      location: 'Substation S-5',
      type: 'GAS_ANALYSIS',
      severity: 'HIGH',
      status: 'CLEARED',
      description: 'Dissolved gas analysis indicated abnormality',
      details: 'Hydrogen gas concentration increased to 150ppm in transformer oil.',
      value: '150ppm H2',
      normalRange: '0-100ppm',
      duration: '2h',
      alarmGroup: 'EQUIPMENT_HEALTH',
      priority: 2,
      tags: ['gas', 'transformer', 'diagnostics'],
      actions: ['Oil sample taken', 'Expert analysis requested'],
      acknowledged: true
    },
    {
      id: 'EV-2024-009',
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
      source: 'Earth Fault Relay',
      equipment: 'Cable C-48',
      location: 'Underground Network',
      type: 'EARTH_FAULT',
      severity: 'CRITICAL',
      status: 'ACTIVE',
      description: 'Earth fault detected on cable section',
      details: 'Zero-sequence current detected indicating phase-to-ground fault.',
      value: '850A',
      normalRange: '0-50A',
      duration: '45ms',
      alarmGroup: 'PROTECTION',
      priority: 1,
      tags: ['earth-fault', 'cable', 'underground'],
      actions: ['Fault location initiated', 'Isolation switch operated'],
      acknowledged: false
    },
    {
      id: 'EV-2024-010',
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
      source: 'Load Monitor',
      equipment: 'Feeder F-18',
      location: 'Distribution Panel',
      type: 'OVERLOAD',
      severity: 'MEDIUM',
      status: 'CLEARED',
      description: 'Feeder loading exceeded rated capacity',
      details: 'Current reached 125% of rated capacity for 10 minutes.',
      value: '1250A',
      normalRange: '0-1000A',
      duration: '10m',
      alarmGroup: 'LOAD_MANAGEMENT',
      priority: 3,
      tags: ['overload', 'feeder', 'load-shedding'],
      actions: ['Load transfer initiated', 'Peak shaving activated'],
      acknowledged: true
    }
  ];

  // Update current time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setEvents(mockEvents);
      setSelectedEvent(mockEvents[0]);
      setLoading(false);
      setLastUpdateTime(new Date());
    };

    loadData();
  }, []);

  // Auto-refresh simulation
  useEffect(() => {
    let updateInterval;
    
    if (autoRefresh) {
      updateInterval = setInterval(() => {
        const now = new Date();
        setLastUpdateTime(now);
        
        // Simulate new events (5% chance every 30 seconds)
        if (Math.random() > 0.95) {
          const eventTypes = [
            'PROTECTION_TRIP', 'VOLTAGE_SAG', 'FREQUENCY_DEVIATION', 
            'OVER_TEMPERATURE', 'COMMUNICATION_FAILURE', 'BREAKER_OPERATION'
          ];
          const severities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
          const equipment = ['Transformer T-104', 'Breaker CB-205', 'Generator G-3', 'Bus A-2'];
          const locations = ['Substation S-5', 'Power Plant PP-1', 'Feeder F-12'];
          
          const newEvent = {
            id: `EV-2024-0${events.length + 11}`,
            timestamp: now.toISOString(),
            source: ['Protection Relay', 'Voltage Monitor', 'Frequency Relay', 'Temperature Sensor'][Math.floor(Math.random() * 4)],
            equipment: equipment[Math.floor(Math.random() * equipment.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            status: 'ACTIVE',
            description: `New event detected from monitoring system`,
            details: 'Automatically generated event for system monitoring demonstration.',
            value: `${Math.floor(Math.random() * 1000)}A`,
            normalRange: '0-800A',
            duration: `${Math.floor(Math.random() * 100)}ms`,
            alarmGroup: ['PROTECTION', 'POWER_QUALITY', 'SYSTEM_STABILITY'][Math.floor(Math.random() * 3)],
            priority: Math.floor(Math.random() * 4) + 1,
            tags: ['auto-generated', 'monitoring'],
            actions: ['Event logged', 'Notification sent'],
            acknowledged: false
          };
          
          setEvents(prev => [newEvent, ...prev]);
          
          // Auto-scroll to top for new events
          if (eventsContainerRef.current) {
            eventsContainerRef.current.scrollTop = 0;
          }
        }
        
        // Simulate status changes for existing events
        setEvents(prev => prev.map(event => {
          if (event.status === 'ACTIVE' && Math.random() > 0.97) {
            return {
              ...event,
              status: 'CLEARED',
              acknowledged: true
            };
          }
          return event;
        }));
        
      }, 30000); // Update every 30 seconds
    }
    
    return () => {
      if (updateInterval) clearInterval(updateInterval);
    };
  }, [autoRefresh, events.length]);

  // Helper functions
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-600';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-400';
      case 'HIGH': return 'text-orange-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'text-red-400 bg-red-900/20';
      case 'CLEARED': return 'text-green-400 bg-green-900/20';
      case 'ACKNOWLEDGED': return 'text-blue-400 bg-blue-900/20';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  const getAlarmGroupColor = (group) => {
    switch (group) {
      case 'PROTECTION': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'POWER_QUALITY': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'SYSTEM_STABILITY': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'EQUIPMENT_HEALTH': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'COMMUNICATION': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'LOAD_MANAGEMENT': return 'bg-green-500/10 text-green-400 border-green-500/30';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const getPriorityIcon = (priority) => {
    return '•'.repeat(priority);
  };

  const acknowledgeEvent = (eventId) => {
    setAcknowledgedEvents(prev => new Set(prev).add(eventId));
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, acknowledged: true } : event
    ));
  };

  const acknowledgeAllEvents = () => {
    const allEventIds = events.filter(e => !e.acknowledged).map(e => e.id);
    setAcknowledgedEvents(prev => new Set([...prev, ...allEventIds]));
    setEvents(prev => prev.map(event => ({ ...event, acknowledged: true })));
  };

  const getFilteredEvents = () => {
    return events.filter(event => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!(
          event.id.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.equipment.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.source.toLowerCase().includes(query)
        )) return false;
      }

      // Type filter
      if (filterType !== 'all' && event.type !== filterType) return false;

      // Severity filter
      if (filterSeverity !== 'all' && event.severity !== filterSeverity) return false;

      // Status filter
      if (filterStatus === 'active' && event.status !== 'ACTIVE') return false;
      if (filterStatus === 'cleared' && event.status !== 'CLEARED') return false;
      if (filterStatus === 'unacknowledged' && event.acknowledged) return false;
      if (filterStatus === 'acknowledged' && !event.acknowledged) return false;

      return true;
    });
  };

  const getStatistics = () => {
    const total = events.length;
    const active = events.filter(e => e.status === 'ACTIVE').length;
    const critical = events.filter(e => e.severity === 'CRITICAL').length;
    const unacknowledged = events.filter(e => !e.acknowledged).length;
    const protection = events.filter(e => e.alarmGroup === 'PROTECTION').length;
    const quality = events.filter(e => e.alarmGroup === 'POWER_QUALITY').length;
    
    return { total, active, critical, unacknowledged, protection, quality };
  };

  const statistics = getStatistics();
  const filteredEvents = getFilteredEvents();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">EV</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold tracking-tight">EVENTS MONITORING SYSTEM</h1>
                <p className="text-sm text-gray-400">Real-time Industrial Event Tracking & Management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
              <span className="text-sm text-gray-400 mr-2">TIME:</span>
              <span className="text-sm font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>
            <button 
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium ${autoRefresh ? 'bg-green-900/30 border-green-700 text-green-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
            >
              {autoRefresh ? 'AUTO REFRESH ON' : 'AUTO REFRESH OFF'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Filters and Controls */}
        <aside className="w-80 border-r border-gray-800 bg-gray-900/50 h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-bold mb-4">EVENTS CONTROL PANEL</h2>
            
            {/* Quick Actions */}
            <div className="mb-6">
              <div className="flex space-x-2 mb-4">
                <button 
                  onClick={acknowledgeAllEvents}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold uppercase tracking-wider"
                >
                  ACK ALL
                </button>
                <button className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-sm font-medium uppercase tracking-wider">
                  CLEAR ALL
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 mb-6">
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wider">EVENTS STATISTICS</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900/50 rounded p-3">
                  <div className="text-2xl font-bold font-mono">{statistics.total}</div>
                  <div className="text-xs text-gray-400 mt-1">TOTAL EVENTS</div>
                </div>
                <div className="bg-gray-900/50 rounded p-3">
                  <div className="text-2xl font-bold font-mono text-red-400">{statistics.active}</div>
                  <div className="text-xs text-red-400 mt-1">ACTIVE EVENTS</div>
                </div>
                <div className="bg-gray-900/50 rounded p-3">
                  <div className="text-2xl font-bold font-mono text-orange-400">{statistics.critical}</div>
                  <div className="text-xs text-orange-400 mt-1">CRITICAL</div>
                </div>
                <div className="bg-gray-900/50 rounded p-3">
                  <div className="text-2xl font-bold font-mono text-yellow-400">{statistics.unacknowledged}</div>
                  <div className="text-xs text-yellow-400 mt-1">UNACKNOWLEDGED</div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="SEARCH EVENTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase tracking-wider"
              />
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">SEVERITY FILTER</h3>
                <div className="flex flex-wrap gap-2">
                  {['all', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((severity) => (
                    <button
                      key={severity}
                      onClick={() => setFilterSeverity(severity === filterSeverity ? 'all' : severity)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider ${filterSeverity === severity ? 'bg-gray-800 text-white' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'}`}
                    >
                      {severity === 'all' ? 'ALL' : severity}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">STATUS FILTER</h3>
                <div className="flex flex-wrap gap-2">
                  {['all', 'active', 'cleared', 'unacknowledged', 'acknowledged'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status === filterStatus ? 'all' : status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider ${filterStatus === status ? 'bg-gray-800 text-white' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'}`}
                    >
                      {status === 'all' ? 'ALL' : status.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">VIEW MODE</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  >
                    GRID
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  >
                    LIST
                  </button>
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider ${viewMode === 'timeline' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  >
                    TIMELINE
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">EVENTS PER PAGE</h3>
                <div className="flex gap-2">
                  {[10, 20, 50, 100].map((count) => (
                    <button
                      key={count}
                      onClick={() => setEventsPerPage(count)}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider ${eventsPerPage === count ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Event Details */}
          {selectedEvent && (
            <div className="p-4">
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wider">SELECTED EVENT DETAILS</h3>
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 space-y-3">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">EVENT ID</div>
                  <div className="font-bold text-sm font-mono">{selectedEvent.id}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">DESCRIPTION</div>
                  <div className="font-medium text-sm">{selectedEvent.description}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">SEVERITY</div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${getSeverityColor(selectedEvent.severity)}`}></div>
                      <span className="text-sm font-bold">{selectedEvent.severity}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">STATUS</div>
                    <div className={`text-sm font-bold ${selectedEvent.status === 'ACTIVE' ? 'text-red-400' : 'text-green-400'}`}>
                      {selectedEvent.status}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">EQUIPMENT</div>
                  <div className="text-sm font-medium">{selectedEvent.equipment}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">TIME</div>
                  <div className="text-xs font-mono">{formatDateTime(selectedEvent.timestamp)}</div>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content - Events Display */}
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-73px)]" ref={eventsContainerRef}>
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">INDUSTRIAL EVENTS MONITOR</h2>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-sm text-gray-400">
                    Showing {filteredEvents.length} of {events.length} events
                    {searchQuery && ` • Searching: "${searchQuery}"`}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                    <span className="text-xs text-gray-500">
                      {autoRefresh ? 'AUTO-UPDATING' : 'MANUAL'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-sm font-medium uppercase tracking-wider">
                  EXPORT LOGS
                </button>
                <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold uppercase tracking-wider">
                  GENERATE REPORT
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">ACTIVE EVENTS</div>
                <div className="text-2xl font-bold font-mono text-red-400">{statistics.active}</div>
                <div className="text-xs text-gray-500 mt-1">REQUIRE ATTENTION</div>
              </div>
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">CRITICAL EVENTS</div>
                <div className="text-2xl font-bold font-mono text-orange-400">{statistics.critical}</div>
                <div className="text-xs text-gray-500 mt-1">IMMEDIATE ACTION</div>
              </div>
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">UNACKNOWLEDGED</div>
                <div className="text-2xl font-bold font-mono text-yellow-400">{statistics.unacknowledged}</div>
                <div className="text-xs text-gray-500 mt-1">PENDING REVIEW</div>
              </div>
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">LAST UPDATE</div>
                <div className="text-xl font-bold font-mono">{lastUpdateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                <div className="text-xs text-gray-500 mt-1">{autoRefresh ? 'AUTO REFRESH ON' : 'MANUAL MODE'}</div>
              </div>
            </div>

            {/* Events Display */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="animate-pulse bg-gray-800 rounded-lg p-6">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                {filteredEvents.slice(0, eventsPerPage).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`bg-gray-900 rounded-xl border ${selectedEvent?.id === event.id ? 'border-blue-500 border-2' : 'border-gray-800'} p-4 cursor-pointer transition-all hover:bg-gray-800/50 ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}
                  >
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      {/* Event Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-mono text-sm font-bold">{event.id}</span>
                            <div className={`px-2 py-1 rounded text-xs font-bold ${getAlarmGroupColor(event.alarmGroup)} border`}>
                              {event.alarmGroup.replace('_', ' ')}
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex items-center">
                              <span className={`text-xs font-bold ${getSeverityTextColor(event.severity)} mr-2`}>
                                {event.severity}
                              </span>
                              <div className={`w-3 h-3 rounded-full ${getSeverityColor(event.severity)}`}></div>
                            </div>
                          </div>
                          <h3 className="font-bold text-sm truncate">{event.description}</h3>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <div className="text-gray-500 uppercase tracking-wider">EQUIPMENT</div>
                            <div className="font-medium truncate">{event.equipment}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 uppercase tracking-wider">LOCATION</div>
                            <div className="font-medium truncate">{event.location}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 uppercase tracking-wider">SOURCE</div>
                            <div className="font-medium">{event.source}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 uppercase tracking-wider">DURATION</div>
                            <div className="font-medium font-mono">{event.duration}</div>
                          </div>
                        </div>

                        {/* Value and Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <div className="text-xs text-gray-500 uppercase tracking-wider">VALUE</div>
                              <div className="text-sm font-bold font-mono">{event.value}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 uppercase tracking-wider">NORMAL RANGE</div>
                              <div className="text-sm text-gray-400 font-mono">{event.normalRange}</div>
                            </div>
                          </div>
                          <div className={`px-3 py-1.5 rounded text-xs font-bold ${getStatusColor(event.status)}`}>
                            {event.status}
                          </div>
                        </div>

                        {/* Tags and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1 flex-1">
                            {event.tags.map((tag, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-gray-800 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="ml-4 flex items-center">
                            <span className="text-xs text-gray-500 mr-2">
                              {getPriorityIcon(event.priority)}
                            </span>
                            <span className="text-xs text-gray-400">P{event.priority}</span>
                          </div>
                        </div>

                        {/* Time and Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                          <div className="text-xs text-gray-500">
                            <span className="font-mono">{formatTime(event.timestamp)}</span>
                            <span className="mx-2">•</span>
                            <span>{formatRelativeTime(event.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!event.acknowledged && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  acknowledgeEvent(event.id);
                                }}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-medium uppercase tracking-wider"
                              >
                                ACK
                              </button>
                            )}
                            {event.acknowledged && (
                              <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded text-xs font-medium uppercase tracking-wider">
                                ACKED
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action List */}
                        {event.actions && event.actions.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-800">
                            <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">ACTIONS TAKEN</div>
                            <div className="flex flex-wrap gap-1">
                              {event.actions.map((action, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-gray-800/50 rounded">
                                  {action}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* List View Additional Info */}
                    {viewMode === 'list' && (
                      <div className="ml-6 flex flex-col items-end">
                        <div className="text-right">
                          <div className="text-xs text-gray-500 uppercase tracking-wider">TIME</div>
                          <div className="text-sm font-bold font-mono">{formatTime(event.timestamp)}</div>
                        </div>
                        <div className="mt-4">
                          <div className="text-xs text-gray-500 uppercase tracking-wider">PRIORITY</div>
                          <div className="text-lg font-bold text-right">{getPriorityIcon(event.priority)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredEvents.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-gray-700">
                  <span className="text-gray-600 text-2xl font-bold">✓</span>
                </div>
                <h3 className="text-xl font-bold mb-2">NO EVENTS FOUND</h3>
                <p className="text-gray-400 text-center max-w-md">
                  No events match your current filters. All systems are operating normally.
                </p>
              </div>
            )}

            {/* Pagination Info */}
            {filteredEvents.length > eventsPerPage && (
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Showing {Math.min(eventsPerPage, filteredEvents.length)} of {filteredEvents.length} events
                  </span>
                  <button
                    onClick={() => setEventsPerPage(prev => prev + 20)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-sm font-medium"
                  >
                    LOAD MORE EVENTS
                  </button>
                </div>
              </div>
            )}

            {/* Auto-refresh Status */}
            <div className="mt-6 bg-gray-900/50 rounded-lg border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                  <div>
                    <div className="text-sm font-medium">SYSTEM STATUS</div>
                    <div className="text-xs text-gray-400">
                      {autoRefresh ? 'Auto-refresh enabled • Next update in 30s' : 'Manual mode • Click refresh to update'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">LAST SYSTEM UPDATE</div>
                  <div className="text-sm font-mono">{lastUpdateTime.toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
              <span className="uppercase tracking-wider">
                {autoRefresh ? 'REAL-TIME MONITORING ACTIVE' : 'MANUAL MONITORING'}
              </span>
            </div>
            <div className="uppercase tracking-wider">
              TOTAL EVENTS: {events.length} • ACTIVE: {statistics.active}
            </div>
          </div>
          <div className="flex items-center space-x-4 uppercase tracking-wider">
            <span>EVENTS MONITOR v3.2.1</span>
            <span>© 2024 INDUSTRIAL CONTROL SYSTEMS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventsMonitoring;