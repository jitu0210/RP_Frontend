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

const AnalogMeasurement = () => {
  const [measurements, setMeasurements] = useState({
    current: [],
    voltage: [],
    frequency: [],
    phaseDifference: []
  });
  const [loading, setLoading] = useState({
    current: true,
    voltage: true,
    frequency: true,
    phaseDifference: true
  });
  const [exportParams, setExportParams] = useState({
    startDate: '',
    endDate: '',
    fields: {
      voltage: true,
      current: true,
      frequency: true,
      phaseDifference: true,
      timestamp: true
    }
  });
  const [exportLoading, setExportLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // API endpoints
  const endpoints = {
    current: 'http://localhost:8000/api/analog/current',
    voltage: 'http://localhost:8000/api/analog/voltage',
    frequency: 'http://localhost:8000/api/analog/freq',
    phaseDifference: 'http://localhost:8000/api/analog/phase'
  };

  // Fetch data for a specific measurement type
  const fetchData = async (type) => {
    try {
      const response = await axios.get(endpoints[type]);
      if (response.data.success) {
        setMeasurements(prev => ({
          ...prev,
          [type]: response.data.data
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
    } finally {
      setLoading(prev => ({
        ...prev,
        [type]: false
      }));
    }
  };

  // Fetch all data
  const fetchAllData = () => {
    Object.keys(endpoints).forEach(type => {
      fetchData(type);
    });
    setLastUpdated(new Date());
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();

    // Set up interval to refresh data every 2 seconds
    const interval = setInterval(() => {
      fetchAllData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Handle export parameter changes
  const handleFieldToggle = (field) => {
    setExportParams(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [field]: !prev.fields[field]
      }
    }));
  };

  // Handle CSV export
  const handleExport = async () => {
    setExportLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (exportParams.startDate) {
        params.append('startDate', exportParams.startDate);
      }
      
      if (exportParams.endDate) {
        params.append('endDate', exportParams.endDate);
      }
      
      // Add selected fields
      Object.entries(exportParams.fields).forEach(([field, selected]) => {
        if (selected) {
          params.append('fields', field);
        }
      });

      const response = await axios.get(
        `http://localhost:8000/api/analog/export/csv?${params.toString()}`,
        { responseType: 'blob' }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `analog_measurements_${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Measurement card component
  const MeasurementCard = ({ title, data, loading, unit, icon }) => {
    if (loading) {
      return (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg bg-gray-700 mr-3">
              {icon}
            </div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-6 bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mr-3">
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        {data.length > 0 ? (
          <div className="space-y-3">
            {data.slice(0, 5).map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                <span className="text-lg font-medium text-white">
                  {item[Object.keys(item)[0]]} <span className="text-sm text-gray-400">{unit}</span>
                </span>
                <span className="text-sm text-gray-400">
                  {formatTimestamp(item.timestamp)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analog Measurements Dashboard</h1>
            <p className="text-gray-400">
              Real-time monitoring of electrical parameters
              {lastUpdated && (
                <span className="ml-2 text-sm">Last updated: {lastUpdated.toLocaleTimeString()}</span>
              )}
            </p>
          </div>
          
          <button
            onClick={fetchAllData}
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors"
          >
            <RefreshIcon />
            Refresh Data
          </button>
        </div>

        {/* Export Section - Moved to top */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DownloadIcon className="mr-2" />
            Export Data to CSV
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
                value={exportParams.startDate}
                onChange={(e) => setExportParams({...exportParams, startDate: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
                value={exportParams.endDate}
                onChange={(e) => setExportParams({...exportParams, endDate: e.target.value})}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Fields to Include</label>
            <div className="flex flex-wrap gap-4">
              {Object.entries(exportParams.fields).map(([field, selected]) => (
                <label key={field} className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleFieldToggle(field)}
                    className="mr-2 h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 focus:ring-offset-gray-800"
                  />
                  <span className="capitalize">{field}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleExport}
            disabled={exportLoading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center transition-colors ${
              exportLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <DownloadIcon />
            {exportLoading ? 'Exporting...' : 'Download CSV'}
          </button>
        </div>

        {/* Measurement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MeasurementCard 
            title="Current" 
            data={measurements.current} 
            loading={loading.current}
            unit="A"
            icon={<CurrentIcon />}
          />
          <MeasurementCard 
            title="Voltage" 
            data={measurements.voltage} 
            loading={loading.voltage}
            unit="V"
            icon={<VoltageIcon />}
          />
          <MeasurementCard 
            title="Frequency" 
            data={measurements.frequency} 
            loading={loading.frequency}
            unit="Hz"
            icon={<FrequencyIcon />}
          />
          <MeasurementCard 
            title="Phase Difference" 
            data={measurements.phaseDifference} 
            loading={loading.phaseDifference}
            unit="°"
            icon={<PhaseIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalogMeasurement;