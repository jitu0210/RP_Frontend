import React, { useEffect, useState } from "react";
import axios from "axios";

// BTS2000 Dashboard - white professional version
export default function BTS2000Dashboard() {
  // Updated input signals (name, boolean)
  const initialSignals = [
    "BTS NOT READY", "BTS READY", "BTS NOT BLOCKED", "BTS BLOCKED",
    "BTS NOT HEALTHY", "BTS HEALTHY", "UNIT IN BK OFF", "UNIT IN BK ON",
    "UNIT OUT BK OFF", "UNIT OUT BK ON", "STN IN BK OFF", "STN IN BK ON",
    "STN OUT BK OFF", "STN OUT BK ON", "STN NOT HEALTHY", "STN HEALTHY",
    "FAST TRANSFER CONDITION OK", "FAST TRANSFER BUS BK ON",
    "NEW SOURCE BUS BK ON", "NEW SOURCE BK OFF", "NEW SOURCE BK ON",
    "ANSI C37 UV1 OK", "ANSI C37 UV2 OK"
  ];

  const [signals, setSignals] = useState(
    initialSignals.map((s, i) => ({ id: i + 1, name: s, value: false }))
  );

  // K buttons with new names
  const kButtonNames = [
    "K1 - BTS IN", "K2 - BTS OUT", "K3 - TEST MODE IN", "K4 - TEST MODE OUT",
    "K5 - TEST MODE TRANSFER", "K6 - LIVE TRANSFER", "K7 - BTS IN",
    "K8 - BTS OUT", "K9 - TEST MODE IN", "K10 - TEST MODE OUT",
    "K11 - TEST MODE TRANSFER", "K12 - LIVE TRANSFER", "K13 - RESET"
  ];

  const [kStates, setKStates] = useState(
    Array.from({ length: 13 }, (_, i) => ({
      id: i + 1,
      name: kButtonNames[i],
      active: false
    }))
  );

  // Status indicators
  const [powerGreen, setPowerGreen] = useState(true);
  const [alarmRed, setAlarmRed] = useState(false);
  const [btsStatus, setBtsStatus] = useState("out");
  const [liveTransferStatus, setLiveTransferStatus] = useState(false);

  // Update BTS status LEDs
  useEffect(() => {
    const isBtsIn = kStates.some(k => (k.id === 1 || k.id === 7) && k.active);
    const isBtsOut = kStates.some(k => (k.id === 2 || k.id === 8) && k.active);
    if (isBtsIn) setBtsStatus("in");
    else if (isBtsOut) setBtsStatus("out");

    const isLiveTransfer = kStates.some(k => (k.id === 6 || k.id === 12) && k.active);
    setLiveTransferStatus(isLiveTransfer);
  }, [kStates]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleKButtonClick = async (id) => {
    try {
      let endpoint = "";
      let payload = {};

      if (id === 1 || id === 7) {
        endpoint = "http://localhost:8000/api/bts/control";
        payload = { command: "bts_in" };
        // Update signals for BTS IN
        setSignals(prev => prev.map(s => {
          if (s.name === "BTS READY") return {...s, value: true};
          if (s.name === "BTS NOT READY") return {...s, value: false};
          return s;
        }));
      } else if (id === 2 || id === 8) {
        endpoint = "http://localhost:8000/api/bts/control";
        payload = { command: "bts_out" };
        // Update signals for BTS OUT
        setSignals(prev => prev.map(s => {
          if (s.name === "BTS READY") return {...s, value: false};
          if (s.name === "BTS NOT READY") return {...s, value: true};
          return s;
        }));
      } else if (id === 6 || id === 12) {
        endpoint = "http://localhost:8000/api/breaker/operate";
        payload = { command: "live_transfer" };
        // Update signals for LIVE TRANSFER
        setSignals(prev => prev.map(s => {
          if (s.name === "FAST TRANSFER BUS BK ON") return {...s, value: true};
          return s;
        }));
      }

      if (endpoint) {
        const response = await axios.post(endpoint, payload);
        console.log(`API response for ${kButtonNames[id - 1]}:`, response.data);
        if (response.status === 200) toggleK(id);
      } else {
        toggleK(id);
      }
    } catch (error) {
      console.error(`API error for ${kButtonNames[id - 1]}:`, error);
      alert(`Failed to execute command for ${kButtonNames[id - 1]}`);
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/reset", {});
      console.log("Reset API response:", response.data);
      if (response.status === 200) {
        resetAll();
        alert("System reset successfully");
      }
    } catch (error) {
      console.error("Reset API error:", error);
      alert("Failed to reset system");
    }
  };

  function toggleK(id) {
    setKStates((prev) =>
      prev.map((k) => (k.id === id ? { ...k, active: !k.active } : k))
    );
  }

  function resetAll() {
    setKStates((prev) => prev.map((k) => ({ ...k, active: false })));
    setBtsStatus("out");
    setLiveTransferStatus(false);
    // Reset all signals to off
    setSignals(prev => prev.map(s => ({...s, value: false})));
  }

  return (
    <div className="w-full h-full bg-white shadow-xl rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="text-xl font-bold text-blue-600">AARTECH SOLONICS LTD</div>
        <div className="text-2xl font-bold text-gray-800 mt-2 md:mt-0">BTS 2000 CONTROL PANEL</div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${powerGreen ? "bg-green-500" : "bg-gray-400"}`} />
            <div className="text-sm text-gray-700">Power</div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${alarmRed ? "bg-red-500 animate-pulse" : "bg-gray-400"}`} />
            <div className="text-sm text-gray-700">Alarm</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left display */}
        <div className="lg:col-span-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="bg-blue-950 rounded-lg h-72 shadow-sm mb-4 flex flex-col items-center justify-center text-gray-800 p-4 border border-black">
            <div className="text-center p-4 w-full">
              <div className="text-xs text-gray-500 uppercase tracking-wider">SYSTEM STATUS DISPLAY</div>
              <div className="text-2xl font-mono mt-4 text-white">BTS 2000 MONITOR</div>
            </div>
          </div>
          
          {/* Control buttons */}
          <div className="mt-6">
            <div className="text-lg font-semibold text-gray-800 mb-3">SYSTEM CONTROLS</div>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors border border-gray-300">
                MENU
              </button>
              <button className="py-3 rounded-lg bg-yellow-100 text-gray-700 font-medium hover:bg-yellow-200 transition-colors border border-yellow-300">
                SET
              </button>
              <button className="py-3 rounded-lg bg-blue-100 text-gray-700 font-medium hover:bg-blue-200 transition-colors border border-blue-300">
                METER
              </button>
              <button 
                onClick={handleReset}
                className="py-3 rounded-lg bg-red-100 text-gray-700 font-medium hover:bg-red-200 transition-colors border border-red-300"
              >
                SYSTEM RESET
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

        {/* Center: input signals */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-gray-800 text-lg">INPUT SIGNALS</div>
            <div className="text-xs text-gray-500">{signals.length} signals</div>
          </div>
          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
            {signals.map((s) => (
              <div key={s.id} className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                <div className="text-sm text-gray-700">{s.name}</div>
                <div className={`w-4 h-4 rounded-full ${s.value ? "bg-green-500" : "bg-gray-400"}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: K buttons */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
          <div className="font-semibold text-gray-800 text-lg mb-4">CONTROL BUTTONS</div>
          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
            {kStates.map((k) => (
              <button
                key={k.id}
                onClick={() => handleKButtonClick(k.id)}
                className={`p-3 rounded-lg flex items-center justify-between transition-all ${k.active 
                  ? 'bg-blue-100 border border-blue-300' 
                  : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
              >
                <span className="text-sm font-medium text-gray-700">{k.name}</span>
                <div className={`w-5 h-5 rounded-full ${k.active ? "bg-green-500 ring-2 ring-green-200" : "bg-gray-300"}`}></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="text-gray-600">Connection: <span className="font-medium text-blue-600">Local (mock)</span></div>
        <div className="text-gray-600 mt-2 sm:mt-0">Last update: <span className="font-medium text-green-600">{new Date().toLocaleTimeString()}</span></div>
        <div className="text-gray-600 mt-2 sm:mt-0">Status: <span className="font-medium text-green-600">Operational</span></div>
      </div>
    </div>
  );
}