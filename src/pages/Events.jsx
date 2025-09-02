import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function EventsLiveMonitoring() {
  const [eventsData, setEventsData] = useState({ live: [], errors: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const liveTableRef = useRef(null);
  const errorTableRef = useRef(null);

  // Function to fetch data from the API
  const fetchEventsData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/events');
      
      // Limit to 100 most recent events for each category
      const limitedData = {
        live: response.data.live.slice(-100),
        errors: response.data.errors.slice(-100)
      };
      
      setEventsData(limitedData);
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching events data:', error);
      setIsLoading(false);
    }
  };

  // Fetch data on component mount and set up interval
  useEffect(() => {
    fetchEventsData();
    
    const intervalId = setInterval(() => {
      fetchEventsData();
    }, 100);
    
    return () => clearInterval(intervalId);
  }, []);

  // Auto-scroll to bottom when new data arrives
  useEffect(() => {
    if (liveTableRef.current) {
      liveTableRef.current.scrollTop = liveTableRef.current.scrollHeight;
    }
    if (errorTableRef.current) {
      errorTableRef.current.scrollTop = errorTableRef.current.scrollHeight;
    }
  }, [eventsData]);

  // Format the last updated time
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow border border-gray-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Events Live Monitoring</h1>
              <p className="text-gray-600 mt-2">
                Real-time monitoring of system events and errors (showing last 100 events)
              </p>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <div className={`h-3 w-3 rounded-full mr-2 ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-500">
                Last updated: {formatTime(lastUpdated)}
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Events Table */}
          <div className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
            <div className="p-4 border-b border-gray-300 bg-blue-50">
              <div className="flex items-center">
                <div className="h-4 w-4 bg-blue-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-800">Live Signals</h2>
                <span className="ml-3 bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {eventsData.live.length} signals
                </span>
              </div>
            </div>
            
            <div 
              ref={liveTableRef}
              className="overflow-y-auto max-h-96"
            >
              <table className="w-full table-fixed border-collapse">
                <thead className="sticky top-0 bg-gray-100">
                  <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-300">
                    <th className="w-1/4 p-3 border-r border-gray-300">Date</th>
                    <th className="w-1/4 p-3 border-r border-gray-300">Time</th>
                    <th className="w-1/4 p-3 border-r border-gray-300">Signal Name</th>
                    <th className="w-1/4 p-3 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {eventsData.live.map((event, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="p-3 text-sm font-medium text-gray-900 border-r border-gray-300">
                        {event.date}
                      </td>
                      <td className="p-3 text-sm text-gray-700 border-r border-gray-300">
                        {event.time}
                      </td>
                      <td className="p-3 text-sm text-gray-900 border-r border-gray-300">
                        {event.signalName}
                      </td>
                      <td className="p-3 text-sm text-right">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${event.value === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {event.value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Error Events Table */}
          <div className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
            <div className="p-4 border-b border-gray-300 bg-red-50">
              <div className="flex items-center">
                <div className="h-4 w-4 bg-red-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-800">Error Logs</h2>
                <span className="ml-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {eventsData.errors.length} errors
                </span>
              </div>
            </div>
            
            <div 
              ref={errorTableRef}
              className="overflow-y-auto max-h-96"
            >
              <table className="w-full table-fixed border-collapse">
                <thead className="sticky top-0 bg-gray-100">
                  <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-300">
                    <th className="w-1/4 p-3 border-r border-gray-300">Date</th>
                    <th className="w-1/4 p-3 border-r border-gray-300">Time</th>
                    <th className="w-1/4 p-3 border-r border-gray-300">Signal Name</th>
                    <th className="w-1/4 p-3 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {eventsData.errors.map((error, index) => (
                    <tr key={index} className="bg-red-50 hover:bg-red-100 transition-colors duration-150">
                      <td className="p-3 text-sm font-medium text-red-900 border-r border-gray-300">
                        {error.date}
                      </td>
                      <td className="p-3 text-sm text-red-900 border-r border-gray-300">
                        {error.time}
                      </td>
                      <td className="p-3 text-sm font-medium text-red-900 border-r border-gray-300">
                        {error.signalName}
                      </td>
                      <td className="p-3 text-sm text-right">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-200 text-red-900">
                          {error.value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
            <div className="text-center p-8 bg-white rounded-lg shadow border border-gray-300">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading events data...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && eventsData.live.length === 0 && eventsData.errors.length === 0 && (
          <div className="bg-white rounded-lg shadow border border-gray-300 p-12 text-center mt-8">
            <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events data available</h3>
            <p className="text-gray-500">Events will appear here once they are detected by the system.</p>
          </div>
        )}
      </div>
    </div>
  );
}