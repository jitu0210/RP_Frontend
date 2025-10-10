import React, { useState } from "react";
import axios from "axios";
import SLDemo from "../assets/SLDemo.jpeg";

const K_BUTTONS = [
  { id: "K1", label: "BTS IN" },
  { id: "K2", label: "BTS OUT" },
  { id: "K3", label: "TEST MODE IN" },
  { id: "K4", label: "TEST MODE OUT" },
  { id: "K5", label: "TEST MODE TRANSFER" },
  { id: "K6", label: "LIVE TRANSFER" },
  { id: "K7", label: "BTS IN" },
  { id: "K8", label: "BTS OUT" },
  { id: "K9", label: "TEST MODE IN" },
  { id: "K10", label: "TEST MODE OUT" },
  { id: "K11", label: "TEST MODE TRANSFER" },
  { id: "K12", label: "LIVE TRANSFER" },
  { id: "K13", label: "EMERGENCY STOP" },
];

const INDICATORS = [
  "BTS NOT READY", "BTS READY", "BTS BLOCKED", "BTS DIST BLOCKED",
  "UNIT NOT HEALTHY", "UNIT HEALTHY", "UNIT TIE BKR ON", "UNIT TIE BKR OFF",
  "STN TIE BKR ON", "STN TIE BKR OFF", "STN NOT HEALTHY", "STN HEALTHY",
  "FAST TRANSFER CONDITION OK", "FAST TRANSFER BUS HEALTHY",
  "NEW SOURCE BUS X PHASE OK", "NEW SOURCE BUS Y PHASE OK",
  "ANSI C88.41 (VIF) OK", "BTS OUT", "OSTN TIE BCB NOT READY",
  "STM TIE BCB READY", "UNIT → STATION", "STATION → UNIT",
];

export default function BTS2000Panel() {
  const [activeBtns, setActiveBtns] = useState({});
  const [indicators, setIndicators] = useState(
    INDICATORS.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );

  const handleKButtonClick = async (btn) => {
    try {
      await axios.post("http://localhost:8000/api/bts/action", { button: btn });
      setActiveBtns((prev) => ({ ...prev, [btn]: !prev[btn] }));
    } catch (err) {
      alert(`Error pressing ${btn}: ${err.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      {/* Main Container with industrial styling */}
      <div className="bg-gray-800 rounded-xl shadow-2xl aspect-video w-full max-w-7xl flex flex-col p-6 border-2 border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center text-white mb-4 border-b border-gray-600 pb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center mr-3">
              <span className="font-bold text-lg">AS</span>
            </div>
            <span className="text-xl font-semibold tracking-wide">AARTECH SOLONICS LTD</span>
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
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-green-400 ring-opacity-50">
                  READY
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
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-red-400 ring-opacity-50">
                  ERROR
                </div>
                <span className="text-xs text-gray-400 mt-1">ALARM</span>
              </div>
            </div>

            {/* Display with Image */}
            <div className="bg-black w-full flex-grow rounded-lg my-4 overflow-hidden flex items-center justify-center border-2 border-gray-600">
              <img 
                src={SLDemo} 
                alt="System Display" 
                className="w-full h-full object-contain"
              />
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

            {/* Navigation Buttons */}
            <div className="grid grid-cols-3 gap-2 w-full mb-4">
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white font-medium transition-colors shadow border border-gray-600">
                F1
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white font-medium transition-colors shadow border border-gray-600">
                ↑
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white font-medium transition-colors shadow border border-gray-600">
                F2
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white font-medium transition-colors shadow border border-gray-600">
                ←
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white font-medium transition-colors shadow border border-gray-600">
                ↓
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white font-medium transition-colors shadow border border-gray-600">
                →
              </button>
              <div className="col-span-3 flex justify-center">
                <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-white font-medium transition-colors shadow border border-gray-600">
                  ENTER
                </button>
              </div>
            </div>

            {/* Power Buttons */}
            <div className="flex gap-5">
              <div className="flex flex-col items-center">
                <button className="w-12 h-12 bg-green-600 rounded-full shadow-lg ring-2 ring-green-400 ring-opacity-50"></button>
                <span className="text-xs text-gray-400 mt-1">POWER ON</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-12 h-12 bg-red-600 rounded-full shadow-lg ring-2 ring-red-400 ring-opacity-50"></button>
                <span className="text-xs text-gray-400 mt-1">POWER OFF</span>
              </div>
            </div>
          </div>

          {/* Middle Panel - Indicators */}
          <div className="bg-gray-800 rounded-lg p-5 grid grid-cols-1 gap-3 text-sm text-white overflow-y-auto border border-gray-700 shadow-inner">
            <div className="text-center font-bold text-blue-400 mb-2 border-b border-gray-700 pb-2">SYSTEM INDICATORS</div>
            {INDICATORS.map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-750 rounded-md transition-colors">
                <div className={`w-4 h-4 rounded-full border-2 ${indicators[label] ? "bg-green-500 border-green-400" : "bg-gray-700 border-gray-500"}`}></div>
                <span className="text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Right Panel - K Buttons */}
          <div className="bg-gray-800 rounded-lg p-5 flex flex-col border border-gray-700 shadow-inner">
            {/* Reset Button */}
            <button className="bg-yellow-500 hover:bg-yellow-400 py-3 mb-5 rounded-md font-bold text-black w-full shadow-md border border-yellow-400 transition-colors">
              EMERGENCY RESET
            </button>

            {/* K Buttons Grid */}
            <div className="grid grid-cols-2 gap-4 flex-grow">
              {K_BUTTONS.map((btn) => (
                <div key={btn.id} className="relative">
                  <button
                    onClick={() => handleKButtonClick(btn.id)}
                    className={`${activeBtns[btn.id] ? 'bg-blue-600' : 'bg-blue-700'} hover:bg-blue-600 text-white font-bold py-3 rounded-md shadow-md w-full h-20 flex flex-col items-center justify-center transition-all border ${activeBtns[btn.id] ? 'border-blue-400' : 'border-blue-600'}`}
                  >
                    <span className="text-xs font-semibold bg-blue-800 px-2 py-1 rounded-full mb-1">{btn.id}</span>
                    <span className="text-xs font-medium">{btn.label}</span>
                  </button>
                  {/* LED Indicator */}
                  <div
                    className={`absolute top-2 right-2 w-3 h-3 rounded-full border ${
                      activeBtns[btn.id] ? "bg-green-400 border-green-300 shadow-lg shadow-green-400/30" : "bg-red-500 border-red-400"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs mt-4 pt-3 border-t border-gray-700">
          © {new Date().getFullYear()} AARTECH SOLONICS LTD - BTS2000 Bus Transfer System | Certified to ANSI C88.41 Standards
        </div>
      </div>
    </div>
  );
}