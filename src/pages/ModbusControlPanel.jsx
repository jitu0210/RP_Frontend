
import React, { useState, useEffect } from "react";
import axios from "axios";

const K_BUTTONS = [
  {
    id: "K1",
    label: "BTS IN",
    endpoint: "http://localhost:8000/api/bts/in",
    payload: { command: "bts_in" },
  },
  {
    id: "K2",
    label: "BTS OUT",
    endpoint: "http://localhost:8000/api/bts/out",
    payload: { command: "bts_out" },
  },
  {
    id: "K3",
    label: "TEST MODE IN",
    endpoint: "http://localhost:8000/api/test/in",
    payload: { command: "test_in" },
  },
  {
    id: "K4",
    label: "TEST MODE OUT",
    endpoint: "http://localhost:8000/api/test/out",
    payload: { command: "test_out" },
  },
  {
    id: "K5",
    label: "TEST MODE TRANSFER",
    endpoint: "http://localhost:8000/api/test/transfer",
    payload: { command: "test_transfer" },
  },
  {
    id: "K6",
    label: "LIVE TRANSFER",
    endpoint: "http://localhost:8000/api/breaker/operate",
    payload: { command: "live_transfer" },
  },
];

const INDICATORS = [
  "BTS NOT READY",
  "BTS READY",
  "BTS BLOCKED",
  "BTS DIST BLOCKED",
  "UNIT NOT HEALTHY",
  "UNIT HEALTHY",
  "UNIT TIE BKR ON",
  "UNIT TIE BKR OFF",
  "STN TIE BKR ON",
  "STN TIE BKR OFF",
  "STN NOT HEALTHY",
  "STN HEALTHY",
  "FAST TRANSFER CONDITION OK",
  "FAST TRANSFER BUS HEALTHY",
  "NEW SOURCE BUS X PHASE OK",
  "NEW SOURCE BUS Y PHASE OK",
];

export default function BTS2000Panel() {
  const [activeBtns, setActiveBtns] = useState({});
  const [indicators, setIndicators] = useState(
    INDICATORS.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );
  const [powerGreen, setPowerGreen] = useState(true);
  const [alarmRed, setAlarmRed] = useState(false);
  const [btsStatus, setBtsStatus] = useState("out");
  const [liveTransferStatus, setLiveTransferStatus] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update BTS status LEDs based on button states
  useEffect(() => {
    const isBtsIn = Object.entries(activeBtns).some(
      ([key, value]) => key === "K1" && value
    );
    const isBtsOut = Object.entries(activeBtns).some(
      ([key, value]) => key === "K2" && value
    );

    if (isBtsIn) setBtsStatus("in");
    else if (isBtsOut) setBtsStatus("out");

    const isLiveTransfer = Object.entries(activeBtns).some(
      ([key, value]) => key === "K6" && value
    );
    setLiveTransferStatus(isLiveTransfer);
  }, [activeBtns]);

  const handleKButtonClick = async (btn) => {
    try {
      const buttonConfig = K_BUTTONS.find((b) => b.id === btn);
      if (buttonConfig) {
        await axios.post(buttonConfig.endpoint, buttonConfig.payload);

        // Update indicators based on button pressed
        if (btn === "K1") {
          setIndicators((prev) => ({
            ...prev,
            "BTS READY": true,
            "BTS NOT READY": false,
          }));
          // When K1 is pressed, deactivate K2
          setActiveBtns((prev) => ({ ...prev, [btn]: true, "K2": false }));
        } else if (btn === "K2") {
          setIndicators((prev) => ({
            ...prev,
            "BTS READY": false,
            "BTS NOT READY": true,
          }));
          // When K2 is pressed, deactivate K1
          setActiveBtns((prev) => ({ ...prev, [btn]: true, "K1": false }));
        } else if (btn === "K6") {
          setIndicators((prev) => ({
            ...prev,
            "FAST TRANSFER CONDITION OK": true,
          }));
          setActiveBtns((prev) => ({ ...prev, [btn]: !prev[btn] }));
        } else {
          // For other buttons, just toggle their state
          setActiveBtns((prev) => ({ ...prev, [btn]: !prev[btn] }));
        }
      }
    } catch (err) {
      alert(`Error pressing ${btn}: ${err.message}`);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:8000/api/reset", {});
      setActiveBtns({});
      setBtsStatus("out");
      setLiveTransferStatus(false);
      setIndicators(
        INDICATORS.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
      );
    } catch (err) {
      alert(`Error resetting system: ${err.message}`);
    }
  };

  // Function to determine signal color for each button
  const getSignalColor = (btnId) => {
    if (btnId === "K1") {
      return btsStatus === "in" ? "bg-green-400 border-green-300 shadow-lg shadow-green-400/30" : "bg-red-500 border-red-400";
    } else if (btnId === "K2") {
      return btsStatus === "out" ? "bg-green-400 border-green-300 shadow-lg shadow-green-400/30" : "bg-red-500 border-red-400";
    } else {
      return activeBtns[btnId] ? "bg-green-400 border-green-300 shadow-lg shadow-green-400/30" : "bg-red-500 border-red-400";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      {/* Main Container */}
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
                  {btsStatus === "in"
                    ? "IN"
                    : btsStatus === "out"
                    ? "OUT"
                    : "READY"}
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
              <div className="text-center p-4 w-full h-full flex flex-col items-center justify-center text-white">
                <div className="text-xs text-gray-300 uppercase tracking-wider mb-2">
                  SYSTEM STATUS DISPLAY
                </div>
                <div className="text-xl font-mono mt-2">BTS 2000 MONITOR</div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="flex flex-col items-center">
                    <div className="text-sm mb-2 text-gray-300">BTS STATUS</div>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        btsStatus === "in"
                          ? "bg-green-500 ring-2 ring-green-200"
                          : btsStatus === "out"
                          ? "bg-red-500 ring-2 ring-red-200"
                          : "bg-gray-400"
                      }`}
                    >
                      <span className="text-xs font-bold">
                        {btsStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-sm mb-2 text-gray-300">
                      LIVE TRANSFER
                    </div>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        liveTransferStatus
                          ? "bg-green-500 ring-2 ring-green-200"
                          : "bg-red-500 ring-2 ring-red-200"
                      }`}
                    >
                      <span className="text-xs font-bold">
                        {liveTransferStatus ? "ON" : "OFF"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Function Buttons */}
            <div className="grid grid-cols-2 gap-3 w-full mb-4">
              <button className="bg-blue-700 hover:bg-blue-600 py-2 rounded-md text-white font-medium transition-colors shadow-md border border-blue-500">
                MENU
              </button>
              <button className="bg-orange-600 hover:bg-orange-500 py-2 rounded-md text-white font-medium transition-colors shadow-md border border-orange-500">
                SET
              </button>
              <button className="bg-orange-600 hover:bg-orange-500 py-2 rounded-md text-white font-medium transition-colors shadow-md border border-orange-500">
                METER
              </button>
              <button className="bg-orange-600 hover:bg-orange-500 py-2 rounded-md text-white font-medium transition-colors shadow-md border border-orange-500">
                MNEMO
              </button>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-3 gap-2 w-full mb-4">
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
                F1
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
                ↑
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
                F2
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
                ←
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
                ↓
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
                →
              </button>
              <div className="col-span-3 flex justify-center">
                <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-white">
                  ENTER
                </button>
              </div>
            </div>

            {/* Power */}
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

          {/* Right Panel - K Buttons (Single Column) */}
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
                      (btn.id === "K1" && btsStatus === "in") || 
                      (btn.id === "K2" && btsStatus === "out") ||
                      (btn.id !== "K1" && btn.id !== "K2" && activeBtns[btn.id])
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
                    className={`absolute top-2 right-2 w-3 h-3 rounded-full border ${getSignalColor(btn.id)}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs mt-4 pt-3 border-t border-gray-700">
          © {new Date().getFullYear()} AARTECH SOLONICS LTD - BTS2000 Bus
          Transfer System | Certified to ANSI C88.41 Standards
        </div>
      </div>
    </div>
  );
}
