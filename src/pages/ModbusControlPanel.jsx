import React, { useState, useEffect } from "react";
import axios from "axios";
import sld from "../assets/SLDemo.jpeg"; // replace with your actual diagram path

// Base URL for API calls
const API_BASE_URL = "http://localhost:8000";

// Indicator labels
const INDICATORS = [
  "BTS READY",
  "BTS NOT READY",
  "FAST TRANSFER CONDITION OK",
  "SUPPLY HEALTHY",
  "SYSTEM HEALTHY",
  "REMOTE MODE ACTIVE",
  "AUTO MODE ENABLED",
];

// K Button configurations
const K_BUTTONS = [
  {
    id: "K1",
    label: "BTS IN",
    endpoint: `${API_BASE_URL}/api/bts/in`,
    payload: {},
  },
  {
    id: "K2",
    label: "BTS OUT",
    endpoint: `${API_BASE_URL}/api/bts/out`,
    payload: {},
  },
  {
    id: "K6",
    label: "LIVE TRANSFER",
    endpoint: `${API_BASE_URL}/api/bts/transfer`,
    payload: {},
  },
];

const ModbusControlPanel = () => {
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [btsStatus, setBtsStatus] = useState("Unknown");
  const [notifications, setNotifications] = useState([]);
  const [coilData, setCoilData] = useState({});
  const [registerData, setRegisterData] = useState({
    voltage: "--",
    current: "--",
    frequency: "--",
    phaseDiff: "--",
  });
  const [coilAddress, setCoilAddress] = useState("0");
  const [coilLength, setCoilLength] = useState("1");
  const [useHex, setUseHex] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("control");

  // 🔧 Added missing states
  const [activeBtns, setActiveBtns] = useState({});
  const [indicators, setIndicators] = useState(
    INDICATORS.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );
  const [liveTransferStatus, setLiveTransferStatus] = useState(false);
  const [alarmRed, setAlarmRed] = useState(false);
  const [powerGreen, setPowerGreen] = useState(false);

  // ✅ Add notification system
  const addNotification = (message, type = "info") => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications((prev) => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  // ✅ Connection status check
  const checkConnection = async () => {
    setIsLoading(true);
    try {
      await axios.get(`${API_BASE_URL}/api/bts/status`);
      setConnectionStatus("connected");
      addNotification("Connection established successfully", "success");
      return true;
    } catch (error) {
      setConnectionStatus("disconnected");
      addNotification("Connection failed: " + error.message, "error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Get BTS status
  const getBtsStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bts/status`);
      setBtsStatus(response.data.bts?.status || "Unknown");
      return response.data;
    } catch (error) {
      addNotification("Failed to get BTS status: " + error.message, "error");
      throw error;
    }
  };

  // ✅ Control BTS command
  const controlBts = async (command) => {
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/bts/control`, { command });
      addNotification(`BTS ${command.toUpperCase()} command sent successfully`, "success");
      setTimeout(() => getBtsStatus(), 1000);
    } catch (error) {
      addNotification(`Failed to send BTS command: ${error.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Update BTS status based on active buttons
  useEffect(() => {
    const isBtsIn = activeBtns["K1"];
    const isBtsOut = activeBtns["K2"];
    const isLiveTransfer = activeBtns["K6"];

    if (isBtsIn) setBtsStatus("in");
    else if (isBtsOut) setBtsStatus("out");
    else setBtsStatus("ready");

    setLiveTransferStatus(isLiveTransfer);
  }, [activeBtns]);

  // ✅ Handle K button clicks
  const handleKButtonClick = async (btn) => {
    try {
      const buttonConfig = K_BUTTONS.find((b) => b.id === btn);
      if (buttonConfig) {
        await axios.post(buttonConfig.endpoint, buttonConfig.payload);

        // Indicator logic
        if (btn === "K1") {
          setIndicators((prev) => ({
            ...prev,
            "BTS READY": true,
            "BTS NOT READY": false,
          }));
        } else if (btn === "K2") {
          setIndicators((prev) => ({
            ...prev,
            "BTS READY": false,
            "BTS NOT READY": true,
          }));
        } else if (btn === "K6") {
          setIndicators((prev) => ({
            ...prev,
            "FAST TRANSFER CONDITION OK": true,
          }));
        }

        setActiveBtns((prev) => ({ ...prev, [btn]: !prev[btn] }));
      }
    } catch (err) {
      alert(`Error pressing ${btn}: ${err.message}`);
    }
  };

  // ✅ Handle Reset
  const handleReset = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/bts/reset`, {});
      setActiveBtns({});
      setBtsStatus("out");
      setLiveTransferStatus(false);
      setIndicators(
        INDICATORS.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
      );
      addNotification("System reset successfully", "info");
    } catch (err) {
      alert(`Error resetting system: ${err.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl aspect-video w-full max-w-7xl flex flex-col p-6 border-2 border-gray-700">

        {/* Header */}
        <div className="flex justify-between items-center text-white mb-4 border-b border-gray-600 pb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center mr-3">
              <span className="font-bold text-lg">AS</span>
            </div>
            <span className="text-xl font-semibold tracking-wide">
              AARTECH SOLONICS LTD
            </span>
          </div>
          <div className="bg-gray-700 px-4 py-2 rounded-md border border-gray-600">
            <span className="text-2xl font-bold text-blue-400">BTS 2000</span>
          </div>
          <div className="text-sm text-gray-400">v2.4.1</div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-3 gap-6 flex-grow">

          {/* Left Panel */}
          <div className="bg-gray-900 rounded-lg p-5 flex flex-col items-center justify-between border border-gray-700 shadow-inner">
            {/* Status Lamps */}
            <div className="flex gap-5 mb-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-opacity-50 ${
                    btsStatus === "in"
                      ? "bg-green-600 ring-green-400"
                      : btsStatus === "out"
                      ? "bg-red-600 ring-red-400"
                      : "bg-gray-600 ring-gray-400"
                  }`}
                >
                  {btsStatus.toUpperCase()}
                </div>
                <span className="text-xs text-gray-400 mt-1">STATUS</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-yellow-300 ring-opacity-50">
                  TEST
                </div>
                <span className="text-xs text-gray-400 mt-1">MODE</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-opacity-50 ${
                    alarmRed
                      ? "bg-red-600 ring-red-400 animate-pulse"
                      : "bg-gray-600 ring-gray-400"
                  }`}
                >
                  {alarmRed ? "ALARM" : "NORMAL"}
                </div>
                <span className="text-xs text-gray-400 mt-1">ALARM</span>
              </div>
            </div>

            {/* Display */}
            <div className="bg-black w-full flex-grow rounded-lg my-4 overflow-hidden flex items-center justify-center border-2 border-gray-600">
              <img src={sld} alt="System Diagram" className="object-contain" />
            </div>

            {/* Power Buttons */}
            <div className="flex gap-5">
              <div className="flex flex-col items-center">
                <button
                  className={`w-12 h-12 rounded-full shadow-lg ring-2 ring-opacity-50 ${
                    powerGreen
                      ? "bg-green-600 ring-green-400"
                      : "bg-gray-600 ring-gray-400"
                  }`}
                  onClick={() => setPowerGreen(true)}
                ></button>
                <span className="text-xs text-gray-400 mt-1">POWER ON</span>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className={`w-12 h-12 rounded-full shadow-lg ring-2 ring-opacity-50 ${
                    !powerGreen
                      ? "bg-red-600 ring-red-400"
                      : "bg-gray-600 ring-gray-400"
                  }`}
                  onClick={() => setPowerGreen(false)}
                ></button>
                <span className="text-xs text-gray-400 mt-1">POWER OFF</span>
              </div>
            </div>
          </div>

          {/* Middle Panel - Indicators */}
          <div className="bg-gray-800 rounded-lg p-5 grid grid-cols-1 gap-3 text-sm text-white overflow-y-auto border border-gray-700 shadow-inner">
            <div className="text-center font-bold text-blue-400 mb-2 border-b border-gray-700 pb-2">
              SYSTEM INDICATORS
            </div>
            {INDICATORS.map((label, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 hover:bg-gray-750 rounded-md transition-colors"
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    indicators[label]
                      ? "bg-green-500 border-green-400"
                      : "bg-gray-700 border-gray-500"
                  }`}
                ></div>
                <span className="text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Right Panel - K Buttons */}
          <div className="bg-gray-800 rounded-lg p-5 flex flex-col border border-gray-700 shadow-inner">
            <button
              className="bg-yellow-500 hover:bg-yellow-400 py-3 mb-5 rounded-md font-bold text-black w-full shadow-md border border-yellow-400"
              onClick={handleReset}
            >
              EMERGENCY RESET
            </button>

            <div className="flex flex-col gap-4 flex-grow">
              {K_BUTTONS.map((btn) => (
                <div key={btn.id} className="relative">
                  <button
                    onClick={() => handleKButtonClick(btn.id)}
                    className={`${
                      activeBtns[btn.id]
                        ? "bg-blue-600 border-blue-400"
                        : "bg-blue-700 border-blue-600 hover:bg-blue-600"
                    } text-white font-bold py-3 rounded-md shadow-md w-full h-20 flex flex-col items-center justify-center transition-all border`}
                  >
                    <span className="text-xs font-semibold bg-blue-800 px-2 py-1 rounded-full mb-1">
                      {btn.id}
                    </span>
                    <span className="text-xs font-medium">{btn.label}</span>
                  </button>
                  <div
                    className={`absolute top-2 right-2 w-3 h-3 rounded-full border ${
                      activeBtns[btn.id]
                        ? "bg-green-400 border-green-300 shadow-lg shadow-green-400/30"
                        : "bg-red-500 border-red-400"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <div className="text-center text-gray-400 text-xs mt-4 pt-3 border-t border-gray-700">
            © {new Date().getFullYear()} AARTECH SOLONICS LTD - BTS2000 Bus
            Transfer System | Certified to ANSI C88.41 Standards
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModbusControlPanel;
