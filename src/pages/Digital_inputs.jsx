import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DigitalInputsTable = () => {
  const [digitalInputs, setDigitalInputs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDigitalInputs();
  }, []);

  const fetchDigitalInputs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/di_bi');
      setDigitalInputs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch digital inputs data');
      console.error('Error fetching digital inputs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatKey = (key) => {
    return key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
  };

  const groupSignals = (data) => {
    const groups = {
      'Trip Coil Monitoring': [],
      'System Health': [],
      'Alarms': [],
      'Operations': [],
      'Breaker Status': []
    };

    Object.entries(data).forEach(([key, value]) => {
      const formattedKey = formatKey(key);
      
      if (key.includes('Trip_Coil_Monitoring')) {
        groups['Trip Coil Monitoring'].push({ key: formattedKey, value });
      } else if (key.includes('Alarm') || key.includes('Failure')) {
        groups['Alarms'].push({ key: formattedKey, value });
      } else if (key.includes('Healthy') || key.includes('Supply')) {
        groups['System Health'].push({ key: formattedKey, value });
      } else if (key.includes('Breaker_Open') || key.includes('Breaker_Close')) {
        groups['Breaker Status'].push({ key: formattedKey, value });
      } else {
        groups['Operations'].push({ key: formattedKey, value });
      }
    });

    return groups;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div className="text-gray-600">Loading digital inputs data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-xl mb-4">Error</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={fetchDigitalInputs}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!digitalInputs) {
    return null;
  }

  const signalGroups = groupSignals(digitalInputs.data);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Digital Inputs</h1>
              <p className="text-gray-600 mt-1">Monitoring all digital input signals</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Address: {digitalInputs.startAddress}</div>
              <div className="text-sm text-gray-500">Signals: {digitalInputs.totalSignals}</div>
            </div>
          </div>
        </div>

        {/* Signal Groups */}
        {Object.entries(signalGroups).map(([groupName, signals]) => (
          <div key={groupName} className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">{groupName}</h2>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Signal Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {signals.map((signal, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{signal.key}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          signal.value === 1 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {signal.value === 1 ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {signal.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Refresh Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={fetchDigitalInputs}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalInputsTable;