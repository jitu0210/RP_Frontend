import { useState } from "react";

export default function BTSDashboard() {
  const [lights, setLights] = useState({ green: false, red: true });
  const [kStates, setKStates] = useState({});

  const toggleLight = (color) => {
    setLights((prev) => ({ ...prev, [color]: !prev[color] }));
  };

  const toggleK = (k) => {
    setKStates((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const inputs = [
    "BTS NOT READY", "BTS READY", "BTS NOT BLOCKED", "BTS BLOCKED",
    "BTS NOT HEALTHY", "BTS HEALTHY", "UNIT IN BK OFF", "UNIT IN BK ON",
    "UNIT OUT BK OFF", "UNIT OUT BK ON", "STN IN BK OFF", "STN IN BK ON",
    "STN OUT BK OFF", "STN OUT BK ON", "STN NOT HEALTHY", "STN HEALTHY",
    "FAST TRANSFER CONDITION OK", "FAST TRANSFER BUS BK ON",
    "NEW SOURCE BUS BK ON", "NEW SOURCE BK OFF", "NEW SOURCE BK ON",
    "ANSI C37 UV1 OK", "ANSI C37 UV2 OK"
  ];

  const ks = [
    "K1 - BTS IN", "K2 - BTS OUT", "K3 - TEST MODE IN", "K4 - TEST MODE OUT",
    "K5 - TEST MODE TRANSFER", "K6 - LIVE TRANSFER", "K7 - BTS IN",
    "K8 - BTS OUT", "K9 - TEST MODE IN", "K10 - TEST MODE OUT",
    "K11 - TEST MODE TRANSFER", "K12 - LIVE TRANSFER", "K13 - RESET"
  ];

  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-white">AARTECH SOLONICS LTD - BTS 2000</h1>
      
      <div className="flex w-full max-w-6xl gap-8">
        {/* Left Side - Display and Lights */}
        <div className="w-1/4 flex flex-col items-center">
          <div className="bg-black text-green-400 w-full h-48 flex items-center justify-center text-xl mb-6 rounded-lg border-2 border-green-600 p-4 relative">
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-red-500"></div>
            LCD DISPLAY
            <div className="absolute bottom-2 right-2 text-xs">BTS v2.0</div>
          </div>
          
          <div className="flex flex-col items-center w-full bg-navy-800 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">INDICATOR LIGHTS</h2>
            <div className="flex gap-6 mb-2">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full ${lights.green ? "bg-green-500 glow-green" : "bg-gray-700"} border-2 border-gray-400 mb-1`}
                  onClick={() => toggleLight("green")}
                />
                <span className="text-xs">GREEN</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full ${lights.red ? "bg-red-500 glow-red" : "bg-gray-700"} border-2 border-gray-400 mb-1`}
                  onClick={() => toggleLight("red")}
                />
                <span className="text-xs">RED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Input Signals */}
        <div className="w-2/4">
          <h2 className="text-xl font-semibold mb-4 text-center bg-navy-800 py-2 rounded-xl">INPUT SIGNALS</h2>
          <div className="grid grid-cols-2 gap-3">
            {inputs.map((signal, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-navy-800 rounded-lg p-3 hover:bg-navy-700 cursor-pointer transition-all border border-navy-700"
              >
                <span className="text-sm">{signal}</span>
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-gray-600 border border-gray-500" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - K Buttons */}
        <div className="w-1/4">
          <h2 className="text-xl font-semibold mb-4 text-center bg-navy-800 py-2 rounded-xl">CONTROL RELAYS</h2>
          <div className="grid grid-cols-1 gap-3">
            {ks.map((k, idx) => (
              <button
                key={idx}
                className={`w-full p-3 rounded-xl font-semibold transition-all ${
                  kStates[k] 
                    ? "bg-green-600 text-white shadow-lg" 
                    : "bg-navy-700 text-gray-200 hover:bg-navy-600"
                } border border-navy-600 text-sm`}
                onClick={() => toggleK(k)}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .bg-navy-900 { background-color: #0a192f; }
        .bg-navy-800 { background-color: #162b4d; }
        .bg-navy-700 { background-color: #1e3a6b; }
        .bg-navy-600 { background-color: #2a4a7e; }
        .glow-green {
          box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
        }
        .glow-red {
          box-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
        }
      `}</style>
    </div>
  );
}