import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:8000';

const ModbusControlPanel = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [btsStatus, setBtsStatus] = useState('Unknown');
  const [notifications, setNotifications] = useState([]);
  const [coilData, setCoilData] = useState({});
  const [registerData, setRegisterData] = useState({
    voltage: '--',
    current: '--',
    frequency: '--',
    phaseDiff: '--'
  });
  const [coilAddress, setCoilAddress] = useState('0');
  const [coilLength, setCoilLength] = useState('1');
  const [useHex, setUseHex] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('control');

  // Add a notification
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Check connection status
  const checkConnection = async () => {
    setIsLoading(true);
    try {
      await axios.get(`${API_BASE_URL}/api/bts/status`);
      setConnectionStatus('connected');
      addNotification('Connection established successfully', 'success');
      return true;
    } catch (error) {
      setConnectionStatus('disconnected');
      addNotification('Connection failed: ' + error.message, 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get BTS status
  const getBtsStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bts/status`);
      setBtsStatus(response.data.bts.status);
      return response.data;
    } catch (error) {
      addNotification('Failed to get BTS status: ' + error.message, 'error');
      throw error;
    }
  };

  // Control BTS
  const controlBts = async (command) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/bts/control`, { command });
      addNotification(`BTS ${command.toUpperCase()} command sent successfully`, 'success');
      
      // Refresh status after a short delay
      setTimeout(() => getBtsStatus(), 1000);
      return response.data;
    } catch (error) {
      addNotification(`Failed to send BTS command: ${error.message}`, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset BTS
  const resetBts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/bts/reset`);
      addNotification('BTS reset command sent successfully', 'success');
      
      // Refresh status after a short delay
      setTimeout(() => getBtsStatus(), 1000);
      return response.data;
    } catch (error) {
      addNotification('Failed to reset BTS: ' + error.message, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Operate breaker
  const operateBreaker = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/breaker/operate`);
      addNotification('Breaker operate command sent successfully', 'success');
      return response.data;
    } catch (error) {
      addNotification('Failed to operate breaker: ' + error.message, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Read coils
  const readCoils = async (start, length) => {
    setIsLoading(true);
    try {
      const hexParam = useHex ? '?hex=true' : '';
      const response = await axios.get(
        `${API_BASE_URL}/api/read-coils/${start}/${length}${hexParam}`
      );
      setCoilData(response.data);
      addNotification(`Read ${length} coil(s) starting at ${start}`, 'success');
      return response.data;
    } catch (error) {
      addNotification('Failed to read coils: ' + error.message, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Write coil
  const writeCoil = async (addr, value) => {
    setIsLoading(true);
    try {
      const hexParam = useHex ? '?hex=true' : '';
      const response = await axios.post(
        `${API_BASE_URL}/api/write-coil/${addr}/${value}${hexParam}`
      );
      addNotification(`Coil ${addr} set to ${value ? 'ON' : 'OFF'}`, 'success');
      
      // Refresh coil data if we're viewing that area
      if (coilData.coilAddress !== undefined) {
        readCoils(coilAddress, coilLength);
      }
      return response.data;
    } catch (error) {
      addNotification('Failed to write coil: ' + error.message, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch measurement data
  const fetchMeasurement = async (endpoint, key) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/${endpoint}`);
      // For streaming endpoints, we'll simulate with interval
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      return null;
    }
  };

  // Initialize connection and data on component mount
  useEffect(() => {
    checkConnection();
    getBtsStatus();
    
    // Set up interval to check connection and BTS status
    const statusInterval = setInterval(() => {
      if (connectionStatus === 'connected') {
        getBtsStatus();
      }
    }, 10000);
    
    // Set up interval for measurements (simulate streaming)
    const measurementInterval = setInterval(() => {
      if (connectionStatus === 'connected') {
        // Simulate measurement updates
        setRegisterData(prev => ({
          voltage: (Math.random() * 240 + 200).toFixed(1),
          current: (Math.random() * 10 + 5).toFixed(2),
          frequency: (Math.random() * 2 + 49.5).toFixed(2),
          phaseDiff: (Math.random() * 10).toFixed(1)
        }));
      }
    }, 3000);
    
    return () => {
      clearInterval(statusInterval);
      clearInterval(measurementInterval);
    };
  }, [connectionStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <header className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-indigo-100 p-3 rounded-xl mr-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Modbus Control Panel</h1>
            <p className="text-sm text-gray-600">Industrial Device Management Interface</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium mr-4">
            {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
          </span>
          <button 
            onClick={checkConnection}
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg shadow-md transition-colors flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </>
            ) : 'Reconnect'}
          </button>
        </div>
      </header>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`p-4 rounded-xl shadow-lg text-white transform transition-all duration-300 ${
              notification.type === 'error' ? 'bg-red-500' : 
              notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {notification.type === 'error' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : notification.type === 'success' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 flex">
        <button
          onClick={() => setActiveTab('control')}
          className={`flex-1 py-3 px-4 rounded-xl text-center font-medium transition-colors ${activeTab === 'control' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}
        >
          Control
        </button>
        <button
          onClick={() => setActiveTab('monitor')}
          className={`flex-1 py-3 px-4 rounded-xl text-center font-medium transition-colors ${activeTab === 'monitor' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}
        >
          Monitoring
        </button>
        <button
          onClick={() => setActiveTab('coils')}
          className={`flex-1 py-3 px-4 rounded-xl text-center font-medium transition-colors ${activeTab === 'coils' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}
        >
          Coils
        </button>
      </div>

      {/* Control Tab Content */}
      {activeTab === 'control' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* BTS Control Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">BTS Control</h2>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-xl flex items-center">
              <div className={`w-4 h-4 rounded-full mr-3 ${btsStatus.includes('IN') ? 'bg-green-500 animate-pulse' : btsStatus.includes('OUT') ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
              <span className="font-medium">Status: {btsStatus}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button 
                onClick={() => controlBts('in')}
                disabled={isLoading}
                className="py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-xl shadow-md transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                BTS IN
              </button>
              <button 
                onClick={() => controlBts('out')}
                disabled={isLoading}
                className="py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-xl shadow-md transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                BTS OUT
              </button>
            </div>
            
            <button 
              onClick={resetBts}
              disabled={isLoading}
              className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white rounded-xl shadow-md transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              RESET BTS
            </button>
          </div>

          {/* Breaker Control Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Breaker Control</h2>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-600 text-sm">Operate the main circuit breaker with caution. This action will interrupt power flow.</p>
            </div>
            
            <button 
              onClick={operateBreaker}
              disabled={isLoading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-xl shadow-md transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              OPERATE BREAKER
            </button>
          </div>
        </div>
      )}

      {/* Monitoring Tab Content */}
      {activeTab === 'monitor' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-8">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">System Measurements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl border border-blue-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-blue-700 uppercase tracking-wide">Voltage</h3>
                <div className="bg-blue-100 p-1 rounded">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-800">{registerData.voltage} <span className="text-sm font-normal">V</span></p>
              <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${Math.min(100, (parseFloat(registerData.voltage) / 250) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl border border-green-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-green-700 uppercase tracking-wide">Current</h3>
                <div className="bg-green-100 p-1 rounded">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-green-800">{registerData.current} <span className="text-sm font-normal">A</span></p>
              <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${Math.min(100, (parseFloat(registerData.current) / 15) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl border border-purple-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-purple-700 uppercase tracking-wide">Frequency</h3>
                <div className="bg-purple-100 p-1 rounded">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-purple-800">{registerData.frequency} <span className="text-sm font-normal">Hz</span></p>
              <div className="mt-2 h-2 bg-purple-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full" 
                  style={{ width: `${Math.min(100, Math.abs(parseFloat(registerData.frequency) - 49) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-2xl border border-orange-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-orange-700 uppercase tracking-wide">Phase Diff</h3>
                <div className="bg-orange-100 p-1 rounded">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-orange-800">{registerData.phaseDiff} <span className="text-sm font-normal">°</span></p>
              <div className="mt-2 h-2 bg-orange-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: `${Math.min(100, (parseFloat(registerData.phaseDiff) / 10) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coils Tab Content */}
      {activeTab === 'coils' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-8">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Coil Control</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-5 rounded-2xl">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Read Coils</h3>
              
              <div className="flex items-center mb-4">
                <input 
                  type="checkbox" 
                  id="hexToggle"
                  checked={useHex}
                  onChange={(e) => setUseHex(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="hexToggle" className="ml-2 block text-sm text-gray-700">
                  Use Hexadecimal Addresses
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Address</label>
                  <input 
                    type="text" 
                    value={coilAddress}
                    onChange={(e) => setCoilAddress(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={useHex ? "e.g., 0x7801" : "e.g., 0"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                  <input 
                    type="number" 
                    value={coilLength}
                    onChange={(e) => setCoilLength(e.target.value)}
                    min="1"
                    max="20"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <button 
                onClick={() => readCoils(coilAddress, coilLength)}
                disabled={isLoading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg shadow-md transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                READ COILS
              </button>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-2xl">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Coil Status</h3>
              
              {coilData.details && (
                <div className="bg-white p-4 rounded-xl border border-gray-200 max-h-64 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-2">
                    {coilData.details.map((coil, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-mono text-sm">{useHex ? `0x${coil.coil.toString(16)}` : coil.coil}</span>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${coil.status === 'ON' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm font-medium">{coil.status}</span>
                          <button 
                            onClick={() => writeCoil(coil.coil, coil.status === 'ON' ? 0 : 1)}
                            disabled={isLoading}
                            className="ml-3 text-xs bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 px-2 py-1 rounded transition-colors"
                          >
                            Toggle
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!coilData.details && (
                <div className="bg-white p-4 rounded-xl border border-gray-200 h-32 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">No coil data available. Read coils to view status.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* System Status Footer */}
      <footer className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              Modbus TCP: {connectionStatus === 'connected' ? '192.168.50.20:502' : 'Disconnected'}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            System Time: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModbusControlPanel;