import React, { useState, useEffect } from 'react';
import axios from 'axios';

// SVG Icons
const CurrentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const VoltageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16.5a2.5 2.5 0 01-5 0V7a2.5 2.5 0 015 0v9.5zM17 16.5a2.5 2.5 0 01-5 0V7a2.5 2.5 0 015 0v9.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v10" />
  </svg>
);

const FrequencyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

const PhaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AnalogMeasurement = () => {
  const [liveData, setLiveData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [exportParams, setExportParams] = useState({
    startDate: '',
    endDate: '',
    exportLoading: false
  });
  const [showDateModal, setShowDateModal] = useState(false);

  // API endpoints
  const endpoints = {
    liveData: 'http://localhost:8000/api/analog/',
    export: 'http://localhost:8000/api/analog/export/csv'
  };

  // Fetch live data
  const fetchLiveData = async () => {
    try {
      const response = await axios.get(endpoints.liveData);
      if (response.data.success) {
        setLiveData(response.data.data);
        setFilteredData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching live data:', error);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchLiveData();

    // Set up interval to refresh data every 2 seconds
    const interval = setInterval(() => {
      fetchLiveData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Handle CSV export with date range
  const handleExport = async () => {
    setExportParams({...exportParams, exportLoading: true});
    try {
      let url = endpoints.export;
      
      // Add date parameters if they exist
      const params = new URLSearchParams();
      if (exportParams.startDate) {
        params.append('startDate', exportParams.startDate);
      }
      if (exportParams.endDate) {
        params.append('endDate', exportParams.endDate);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url, {
        responseType: 'blob'
      });

      // Create download link
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `analog_measurements_${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Close modal after successful export
      setShowDateModal(false);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setExportParams({...exportParams, exportLoading: false});
    }
  };

  // Filter data based on date range
  const filterDataByDate = () => {
    if (!exportParams.startDate && !exportParams.endDate) {
      setFilteredData(liveData);
      return;
    }

    const filtered = liveData.filter(item => {
      const itemDate = new Date(item.timestamp);
      const startDate = exportParams.startDate ? new Date(exportParams.startDate) : null;
      const endDate = exportParams.endDate ? new Date(exportParams.endDate) : null;
      
      let valid = true;
      if (startDate) {
        valid = valid && itemDate >= startDate;
      }
      if (endDate) {
        // Set end date to end of day
        endDate.setHours(23, 59, 59, 999);
        valid = valid && itemDate <= endDate;
      }
      
      return valid;
    });
    
    setFilteredData(filtered);
    setShowDateModal(false);
  };

  // Reset date filters
  const resetDateFilter = () => {
    setExportParams({...exportParams, startDate: '', endDate: ''});
    setFilteredData(liveData);
    setShowDateModal(false);
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Measurement card component
  const MeasurementCard = ({ title, value, unit, icon, timestamp }) => {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mr-3">
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-white">
            {value} <span className="text-lg text-gray-400">{unit}</span>
          </span>
          <span className="text-sm text-gray-400">
            {formatTimestamp(timestamp)}
          </span>
        </div>
      </div>
    );
  };

  // Table view component
  const TableView = ({ data }) => {
    if (data.length === 0) {
      return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-gray-700">
          <p className="text-gray-400 text-center">No data available</p>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-750">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Voltage (V)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Current (A)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Frequency (Hz)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Phase Difference (°)
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {data.slice(0, 15).map((item, index) => (
              <tr key={index} className="hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatTimestamp(item.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400">
                  {item.voltage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400">
                  {item.current}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-400">
                  {item.frequency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-400">
                  {item.phaseDifference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Get latest measurement for each type
  const getLatestMeasurement = (type) => {
    if (liveData.length === 0) return { value: 'N/A', timestamp: new Date() };
    
    const latest = liveData[0]; // Most recent is first in array
    return {
      value: latest[type] || 'N/A',
      timestamp: latest.timestamp
    };
  };

  // Date range modal
  const DateRangeModal = () => {
    if (!showDateModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-2">Select Date Range</h2>
            <p className="text-gray-400 text-sm">Choose a date range to export or filter data</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                <input
                  type="datetime-local"
                  className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={exportParams.startDate}
                  onChange={(e) => setExportParams({...exportParams, startDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                <input
                  type="datetime-local"
                  className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={exportParams.endDate}
                  onChange={(e) => setExportParams({...exportParams, endDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={resetDateFilter}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Reset
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={filterDataByDate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Filter Data
                </button>
                <button
                  onClick={handleExport}
                  disabled={exportParams.exportLoading}
                  className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center ${
                    exportParams.exportLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <DownloadIcon />
                  {exportParams.exportLoading ? 'Exporting...' : 'Export CSV'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-700 flex justify-end">
            <button
              onClick={() => setShowDateModal(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Analog Measurements Dashboard
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Real-time monitoring of electrical parameters
              {lastUpdated && (
                <span className="ml-2 text-xs md:text-sm bg-gray-800 py-1 px-2 rounded-md">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center transition-all shadow-lg"
            >
              {viewMode === 'grid' ? 'Table View' : 'Grid View'}
            </button>
            <button
              onClick={fetchLiveData}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg flex items-center transition-all shadow-lg hover:shadow-blue-500/20"
            >
              <RefreshIcon />
              Refresh
            </button>
            <button
              onClick={() => setShowDateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg flex items-center transition-all shadow-lg hover:shadow-green-500/20"
            >
              <CalendarIcon />
              Export Options
            </button>
          </div>
        </div>

        {/* Date Filter Info */}
        {(exportParams.startDate || exportParams.endDate) && (
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-lg p-4 mb-6 border border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Date Filter Applied</h3>
                <p className="text-blue-200 text-sm">
                  {exportParams.startDate && `From: ${new Date(exportParams.startDate).toLocaleString()}`}
                  {exportParams.startDate && exportParams.endDate && ' to '}
                  {exportParams.endDate && `To: ${new Date(exportParams.endDate).toLocaleString()}`}
                </p>
              </div>
              <button
                onClick={resetDateFilter}
                className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
              >
                Clear Filter
              </button>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <MeasurementCard 
              title="Voltage" 
              value={getLatestMeasurement('voltage').value}
              unit="V"
              timestamp={getLatestMeasurement('voltage').timestamp}
              icon={<VoltageIcon />}
            />
            <MeasurementCard 
              title="Current" 
              value={getLatestMeasurement('current').value}
              unit="A"
              timestamp={getLatestMeasurement('current').timestamp}
              icon={<CurrentIcon />}
            />
            <MeasurementCard 
              title="Frequency" 
              value={getLatestMeasurement('frequency').value}
              unit="Hz"
              timestamp={getLatestMeasurement('frequency').timestamp}
              icon={<FrequencyIcon />}
            />
            <MeasurementCard 
              title="Phase Difference" 
              value={getLatestMeasurement('phaseDifference').value}
              unit="°"
              timestamp={getLatestMeasurement('phaseDifference').timestamp}
              icon={<PhaseIcon />}
            />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-gray-700 mb-6 md:mb-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-6 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Data View */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center">
            Live Measurements Data {filteredData.length !== liveData.length && `(${filteredData.length} filtered)`}
          </h2>
          
          {viewMode === 'table' ? (
            <TableView data={filteredData} />
          ) : (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 md:p-6 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredData.slice(0, 12).map((item, index) => (
                  <div key={index} className="bg-gray-750 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-colors">
                    <div className="text-sm text-gray-400 mb-2">
                      {formatTimestamp(item.timestamp)}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-blue-400">
                        <div className="text-xs">Voltage</div>
                        <div className="font-bold">{item.voltage} V</div>
                      </div>
                      <div className="text-green-400">
                        <div className="text-xs">Current</div>
                        <div className="font-bold">{item.current} A</div>
                      </div>
                      <div className="text-yellow-400">
                        <div className="text-xs">Frequency</div>
                        <div className="font-bold">{item.frequency} Hz</div>
                      </div>
                      <div className="text-purple-400">
                        <div className="text-xs">Phase</div>
                        <div className="font-bold">{item.phaseDifference}°</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        {filteredData.length > 0 && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-gray-700">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-750 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{filteredData.length}</div>
                <div className="text-gray-400">Total Records</div>
              </div>
              <div className="text-center p-4 bg-gray-750 rounded-lg">
                <div className="text-2xl font-bold text-green-400">
                  {Math.min(...filteredData.map(item => item.voltage)).toFixed(2)} - {Math.max(...filteredData.map(item => item.voltage)).toFixed(2)}
                </div>
                <div className="text-gray-400">Voltage Range (V)</div>
              </div>
              <div className="text-center p-4 bg-gray-750 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">
                  {Math.min(...filteredData.map(item => item.current)).toFixed(2)} - {Math.max(...filteredData.map(item => item.current)).toFixed(2)}
                </div>
                <div className="text-gray-400">Current Range (A)</div>
              </div>
              <div className="text-center p-4 bg-gray-750 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">
                  {new Date(filteredData[filteredData.length - 1].timestamp).toLocaleDateString()}
                </div>
                <div className="text-gray-400">First Record</div>
              </div>
            </div>
          </div>
        )}

        {/* Date Range Modal */}
        <DateRangeModal />
      </div>
    </div>
  );
};

export default AnalogMeasurement;