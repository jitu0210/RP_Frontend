<<<<<<< HEAD
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import sld from "../assets/SLDemo.jpeg";
// import imgg from "../assets/bts-2000.jpeg"
// const K_BUTTONS = [
//   {
//     id: "K1",
//     label: "BTS IN",
//     endpoint: "http://localhost:8000/api/bts/in",
//     payload: { command: "bts_in" },
//   },
//   {
//     id: "K2",
//     label: "BTS OUT",
//     endpoint: "http://localhost:8000/api/bts/out",
//     payload: { command: "bts_out" },
//   },
//   {
//     id: "K3",
//     label: "TEST MODE IN",
//     endpoint: "http://localhost:8000/api/test/in",
//     payload: { command: "test_in" },
//   },
//   {
//     id: "K4",
//     label: "TEST MODE OUT",
//     endpoint: "http://localhost:8000/api/bts/out",
//     payload: { command: "test_out" },
//   },
//   {
//     id: "K5",
//     label: "TEST MODE TRANSFER",
//     endpoint: "http://localhost:8000/api/test/transfer",
//     payload: { command: "test_transfer" },
//   },
//   {
//     id: "K6",
//     label: "LIVE TRANSFER",
//     endpoint: "http://localhost:8000/api/breaker/operate",
//     payload: { command: "live_transfer" },
//   },
// ];

// const INDICATORS = [
//   "BTS NOT READY",
//   "BTS READY",
//   "BTS BLOCKED",
//   "BTS DIST BLOCKED",
//   "UNIT NOT HEALTHY",
//   "UNIT HEALTHY",
//   "UNIT TIE BKR ON",
//   "UNIT TIE BKR OFF",
//   "STN TIE BKR ON",
//   "STN TIE BKR OFF",
//   "STN NOT HEALTHY",
//   "STN HEALTHY",
//   "FAST TRANSFER CONDITION OK",
//   "FAST TRANSFER BUS HEALTHY",
//   "NEW SOURCE BUS X PHASE OK",
//   "NEW SOURCE BUS Y PHASE OK",
// ];

// export default function BTS2000Panel() {
//   const [activeBtns, setActiveBtns] = useState({});
//   const [indicators, setIndicators] = useState(
//     INDICATORS.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );
//   const [powerGreen, setPowerGreen] = useState(true);
//   const [alarmRed, setAlarmRed] = useState(false);
//   const [btsStatus, setBtsStatus] = useState("out");
//   const [liveTransferStatus, setLiveTransferStatus] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Update BTS status LEDs based on button states
//   useEffect(() => {
//     const isBtsIn = Object.entries(activeBtns).some(
//       ([key, value]) => key === "K1" && value
//     );
//     const isBtsOut = Object.entries(activeBtns).some(
//       ([key, value]) => key === "K2" && value
//     );

//     if (isBtsIn) setBtsStatus("in");
//     else if (isBtsOut) setBtsStatus("out");

//     const isLiveTransfer = Object.entries(activeBtns).some(
//       ([key, value]) => key === "K6" && value
//     );
//     setLiveTransferStatus(isLiveTransfer);
//   }, [activeBtns]);

//   const handleKButtonClick = async (btn) => {
//     try {
//       const buttonConfig = K_BUTTONS.find((b) => b.id === btn);
//       if (buttonConfig) {
//         await axios.post(buttonConfig.endpoint, buttonConfig.payload);

//         // Update indicators based on button pressed
//         if (btn === "K1") {
//           setIndicators((prev) => ({
//             ...prev,
//             "BTS READY": true,
//             "BTS NOT READY": false,
//           }));
//           // When K1 is pressed, deactivate K2
//           setActiveBtns((prev) => ({ ...prev, [btn]: true, K2: false }));
//         } else if (btn === "K2") {
//           setIndicators((prev) => ({
//             ...prev,
//             "BTS READY": false,
//             "BTS NOT READY": true,
//           }));
//           // When K2 is pressed, deactivate K1
//           setActiveBtns((prev) => ({ ...prev, [btn]: true, K1: false }));
//         } else if (btn === "K6") {
//           setIndicators((prev) => ({
//             ...prev,
//             "FAST TRANSFER CONDITION OK": true,
//           }));
//           setActiveBtns((prev) => ({ ...prev, [btn]: !prev[btn] }));
//         } else {
//           // For other buttons, just toggle their state
//           setActiveBtns((prev) => ({ ...prev, [btn]: !prev[btn] }));
//         }
//       }
//     } catch (err) {
//       alert(`Error pressing ${btn}: ${err.message}`);
//     }
//   };

//   const handleReset = async () => {
//     try {
//       await axios.post("http://localhost:8000/api/bts/reset", {});
//       setActiveBtns({});
//       setBtsStatus("out");
//       setLiveTransferStatus(false);
//       setIndicators(
//         INDICATORS.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//       );
//     } catch (err) {
//       alert(`Error resetting system: ${err.message}`);
//     }
//   };

//   // Function to determine signal color for each button
//   const getSignalColor = (btnId) => {
//     if (btnId === "K1") {
//       return btsStatus === "in"
//         ? "bg-green-400 border-green-300 shadow-lg shadow-green-400/30"
//         : "bg-red-500 border-red-400";
//     } else if (btnId === "K2") {
//       return btsStatus === "out"
//         ? "bg-green-400 border-green-300 shadow-lg shadow-green-400/30"
//         : "bg-red-500 border-red-400";
//     } else {
//       return activeBtns[btnId]
//         ? "bg-green-400 border-green-300 shadow-lg shadow-green-400/30"
//         : "bg-red-500 border-red-400";
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
//       {/* Main Container */}
//       <div className="bg-gray-800 rounded-xl shadow-2xl aspect-video w-full max-w-7xl flex flex-col p-6 border-2 border-gray-700">
//         {/* Header */}
//         <div className="flex justify-between items-center text-white mb-4 border-b border-gray-600 pb-3">
//           <div className="flex items-center">
//             <div className="w-12 h-10 bg-blue-600 rounded-md flex items-center justify-center mr-3">
//               <span className="font-bold text-lg">ARR</span>
//             </div>
//             <span className="text-xl font-semibold tracking-wide">
//               AARTECH SOLONICS LTD
//             </span>
//           </div>
//           <div className="bg-gray-700 px-4 py-2 rounded-md border border-gray-600">
//             <span className="text-2xl font-bold text-blue-400">BTS 2000</span>
//           </div>
//           {/* <div className="text-sm text-gray-400">v2.4.1</div> */}
//         </div>

//         {/* Body */}
//         <div className="grid grid-cols-3 gap-6 flex-grow">
//           {/* Left Panel */}
//           <div className="bg-gray-900 rounded-lg p-5 flex flex-col items-center justify-between border border-gray-700 shadow-inner">
//             {/* Status Lamps */}
//             <div className="flex gap-5 mb-4">
//               <div className="flex flex-col items-center">
//                 <div
//                   className={`w-16 h-16 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-opacity-50 ${
//                     btsStatus === "in"
//                       ? "bg-green-600 ring-green-400"
//                       : btsStatus === "out"
//                       ? "bg-red-600 ring-red-400"
//                       : "bg-gray-600 ring-gray-400"
//                   }`}
//                 >
//                   {btsStatus === "in"
//                     ? "IN"
//                     : btsStatus === "out"
//                     ? "OUT"
//                     : "READY"}
//                 </div>
//                 <span className="text-xs text-gray-400 mt-1">STATUS</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-yellow-300 ring-opacity-50">
//                   TEST
//                 </div>
//                 <span className="text-xs text-gray-400 mt-1">MODE</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <div
//                   className={`w-16 h-16 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-opacity-50 ${
//                     alarmRed
//                       ? "bg-red-600 ring-red-400 animate-pulse"
//                       : "bg-gray-600 ring-gray-400"
//                   }`}
//                 >
//                   {alarmRed ? "ALARM" : "NORMAL"}
//                 </div>
//                 <span className="text-xs text-gray-400 mt-1">ALARM</span>
//               </div>
//             </div>

//             {/* Display */}
//             <div className="bg-black w-full flex-grow rounded-lg my-4 overflow-hidden flex items-center justify-center border-2 border-gray-600">
//               <img src={imgg} alt="" />
//             </div>

//             {/* Function Buttons */}
//             <div className="grid grid-cols-2 gap-3 w-full mb-4">
//               <button className="bg-blue-700 hover:bg-blue-600 py-2 rounded-md text-white font-medium transition-colors shadow-md border border-blue-500">
//                 MENU
//               </button>
//               <button className="bg-orange-600 hover:bg-orange-500 py-2 rounded-md text-white font-medium transition-colors shadow-md border border-orange-500">
//                 SET
//               </button>
//               <button className="bg-orange-600 hover:bg-orange-500 py-2 rounded-md text-white font-medium transition-colors shadow-md border border-orange-500">
//                 METER
//               </button>
//               <button className="bg-orange-600 hover:bg-orange-500 py-2 rounded-md text-white font-medium transition-colors shadow-md border border-orange-500">
//                 MNEMO
//               </button>
//             </div>

//             {/* Navigation */}
//             <div className="grid grid-cols-3 gap-2 w-full mb-4">
//               <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
//                 F1
//               </button>
//               <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
//                 ↑
//               </button>
//               <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
//                 F2
//               </button>
//               <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
//                 ←
//               </button>
//               <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
//                 ↓
//               </button>
//               <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-white">
//                 →
//               </button>
//               <div className="col-span-3 flex justify-center">
//                 <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-white">
//                   ENTER
//                 </button>
//               </div>
//             </div>

//             {/* Power */}
//             <div className="flex gap-5">
//               <div className="flex flex-col items-center">
//                 <button
//                   className={`w-12 h-12 rounded-full shadow-lg ring-2 ring-opacity-50 ${
//                     powerGreen
//                       ? "bg-green-600 ring-green-400"
//                       : "bg-gray-600 ring-gray-400"
//                   }`}
//                   onClick={() => setPowerGreen(true)}
//                 ></button>
//                 <span className="text-xs text-gray-400 mt-1">POWER ON</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <button
//                   className={`w-12 h-12 rounded-full shadow-lg ring-2 ring-opacity-50 ${
//                     !powerGreen
//                       ? "bg-red-600 ring-red-400"
//                       : "bg-gray-600 ring-gray-400"
//                   }`}
//                   onClick={() => setPowerGreen(false)}
//                 ></button>
//                 <span className="text-xs text-gray-400 mt-1">POWER OFF</span>
//               </div>
//             </div>
//           </div>

//           {/* Middle Panel - Indicators */}
//           <div className="bg-gray-800 rounded-lg p-5 grid grid-cols-1 gap-3 text-sm text-white overflow-y-auto border border-gray-700 shadow-inner">
//             <div className="text-center font-bold text-blue-400 mb-2 border-b border-gray-700 pb-2">
//               SYSTEM INDICATORS
//             </div>
//             {INDICATORS.map((label, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-center gap-3 p-2 hover:bg-gray-750 rounded-md transition-colors"
//               >
//                 <div
//                   className={`w-4 h-4 rounded-full border-2 ${
//                     indicators[label]
//                       ? "bg-green-500 border-green-400"
//                       : "bg-gray-700 border-gray-500"
//                   }`}
//                 ></div>
//                 <span className="text-xs font-medium">{label}</span>
//               </div>
//             ))}
//           </div>

//           {/* Right Panel - K Buttons (Single Column) */}
//           <div className="bg-gray-800 rounded-lg p-5 flex flex-col border border-gray-700 shadow-inner">
//             <button
//               className="bg-yellow-500 hover:bg-yellow-400 py-3 mb-5 rounded-md font-bold text-black w-full shadow-md border border-yellow-400"
//               onClick={handleReset}
//             >
//               EMERGENCY RESET
//             </button>

//             <div className="flex flex-col gap-4 flex-grow">
//               {K_BUTTONS.map((btn) => (
//                 <div key={btn.id} className="relative">
//                   <button
//                     onClick={() => handleKButtonClick(btn.id)}
//                     className={`${
//                       (btn.id === "K1" && btsStatus === "in") ||
//                       (btn.id === "K2" && btsStatus === "out") ||
//                       (btn.id !== "K1" && btn.id !== "K2" && activeBtns[btn.id])
//                         ? "bg-blue-600 border-blue-400"
//                         : "bg-blue-700 border-blue-600 hover:bg-blue-600"
//                     } text-white font-bold py-3 rounded-md shadow-md w-full h-20 flex flex-col items-center justify-center transition-all border`}
//                   >
//                     <span className="text-xs font-semibold bg-blue-800 px-2 py-1 rounded-full mb-1">
//                       {btn.id}
//                     </span>
//                     <span className="text-xs font-medium">{btn.label}</span>
//                   </button>
//                   <div
//                     className={`absolute top-2 right-2 w-3 h-3 rounded-full border ${getSignalColor(
//                       btn.id
//                     )}`}
//                   ></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center text-gray-400 text-xs mt-4 pt-3 border-t border-gray-700">
//           © {new Date().getFullYear()} AARTECH SOLONICS LTD - BTS2000 Bus
//           Transfer System | Certified to ANSI C88.41 Standards
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect } from "react";
import axios from "axios";
import imgg from "../assets/bts-2000.jpeg";

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
    endpoint: "http://localhost:8000/api/bts/out",
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          setActiveBtns((prev) => ({ ...prev, [btn]: true, K2: false }));
        } else if (btn === "K2") {
          setIndicators((prev) => ({
            ...prev,
            "BTS READY": false,
            "BTS NOT READY": true,
          }));
          // When K2 is pressed, deactivate K1
          setActiveBtns((prev) => ({ ...prev, [btn]: true, K1: false }));
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
=======
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
>>>>>>> 61fa2c1733aa59174ff7156f98036cce30f7592b
    }
  };

  // Get BTS status
  const getBtsStatus = async () => {
    try {
<<<<<<< HEAD
      await axios.post("http://localhost:8000/api/bts/reset", {});
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
      return btsStatus === "in"
        ? "bg-green-500 border-green-400 shadow-lg shadow-green-500/30"
        : "bg-gray-600 border-gray-500";
    } else if (btnId === "K2") {
      return btsStatus === "out"
        ? "bg-green-500 border-green-400 shadow-lg shadow-green-500/30"
        : "bg-gray-600 border-gray-500";
    } else {
      return activeBtns[btnId]
        ? "bg-green-500 border-green-400 shadow-lg shadow-green-500/30"
        : "bg-gray-600 border-gray-500";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-2 md:p-4">
      {/* Main Container */}
      <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-7xl flex flex-col p-3 md:p-6 border-2 border-gray-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white mb-3 md:mb-4 border-b border-gray-700 pb-2 md:pb-3">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="w-8 h-7 md:w-12 md:h-10 bg-green-600 rounded-md flex items-center justify-center mr-2 md:mr-3">
              <span className="font-bold text-xs md:text-lg">ARR</span>
            </div>
            <span className="text-sm md:text-xl font-semibold tracking-wide text-green-400">
              AARTECH SOLONICS LTD
            </span>
          </div>
          <div className="bg-gray-800 px-3 py-1 md:px-4 md:py-2 rounded-md border border-gray-700">
            <span className="text-lg md:text-2xl font-bold text-green-400">BTS 2000</span>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 flex-grow">
          {/* Left Panel */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-5 flex flex-col items-center justify-between border border-gray-700 shadow-inner order-2 md:order-1">
            {/* Status Lamps */}
            <div className="flex gap-3 md:gap-5 mb-3 md:mb-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-opacity-50 ${
                    btsStatus === "in"
                      ? "bg-green-600 ring-green-400"
                      : btsStatus === "out"
                      ? "bg-red-600 ring-red-400"
                      : "bg-gray-700 ring-gray-500"
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
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-yellow-500 flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-yellow-300 ring-opacity-50">
                  TEST
                </div>
                <span className="text-xs text-gray-400 mt-1">MODE</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg ring-2 ring-opacity-50 ${
                    alarmRed
                      ? "bg-red-600 ring-red-400 animate-pulse"
                      : "bg-gray-700 ring-gray-500"
                  }`}
                >
                  {alarmRed ? "ALARM" : "NORMAL"}
                </div>
                <span className="text-xs text-gray-400 mt-1">ALARM</span>
              </div>
            </div>

            {/* Display */}
            <div className="bg-black w-full h-56 md:h-96 rounded-lg my-3 md:my-4 overflow-hidden flex items-center justify-center border-2 border-gray-700">
              {/* <img src={imgg} alt="BTS 2000 Display" className="h-full object-contain" /> */}
            </div>

            {/* Function Buttons */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 w-full mb-3 md:mb-4">
              <button className="bg-green-700 hover:bg-green-600 py-1 md:py-2 rounded-md text-white text-xs md:text-sm font-medium transition-colors shadow-md border border-green-600">
                MENU
              </button>
              <button className="bg-green-700 hover:bg-green-600 py-1 md:py-2 rounded-md text-white text-xs md:text-sm font-medium transition-colors shadow-md border border-green-600">
                SET
              </button>
              <button className="bg-green-700 hover:bg-green-600 py-1 md:py-2 rounded-md text-white text-xs md:text-sm font-medium transition-colors shadow-md border border-green-600">
                METER
              </button>
              <button className="bg-green-700 hover:bg-green-600 py-1 md:py-2 rounded-md text-white text-xs md:text-sm font-medium transition-colors shadow-md border border-green-600">
                MNEMO
              </button>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-3 gap-1 md:gap-2 w-full mb-3 md:mb-4">
              <button className="bg-gray-700 hover:bg-gray-600 py-1 md:py-2 rounded text-white text-xs border border-gray-600">
                F1
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-1 md:py-2 rounded text-white text-xs border border-gray-600">
                ↑
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-1 md:py-2 rounded text-white text-xs border border-gray-600">
                F2
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-1 md:py-2 rounded text-white text-xs border border-gray-600">
                ←
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-1 md:py-2 rounded text-white text-xs border border-gray-600">
                ↓
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 py-1 md:py-2 rounded text-white text-xs border border-gray-600">
                →
              </button>
              <div className="col-span-3 flex justify-center">
                <button className="bg-gray-700 hover:bg-gray-600 px-4 md:px-6 py-1 md:py-2 rounded text-white text-xs border border-gray-600">
                  ENTER
                </button>
              </div>
            </div>

            {/* Power */}
            <div className="flex gap-3 md:gap-5">
              <div className="flex flex-col items-center">
                <button
                  className={`w-8 h-8 md:w-12 md:h-12 rounded-full shadow-lg ring-2 ring-opacity-50 ${
                    powerGreen
                      ? "bg-green-600 ring-green-400"
                      : "bg-gray-700 ring-gray-500"
                  }`}
                  onClick={() => setPowerGreen(true)}
                ></button>
                <span className="text-xs text-gray-400 mt-1">POWER ON</span>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className={`w-8 h-8 md:w-12 md:h-12 rounded-full shadow-lg ring-2 ring-opacity-50 ${
                    !powerGreen
                      ? "bg-red-600 ring-red-400"
                      : "bg-gray-700 ring-gray-500"
                  }`}
                  onClick={() => setPowerGreen(false)}
                ></button>
                <span className="text-xs text-gray-400 mt-1">POWER OFF</span>
              </div>
            </div>
          </div>

          {/* Middle Panel - Indicators */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-5 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-3 text-xs md:text-sm text-white overflow-y-auto border border-gray-700 shadow-inner order-3 md:order-2">
            <div className="col-span-2 md:col-span-1 text-center font-bold text-green-400 mb-1 md:mb-2 border-b border-gray-700 pb-1 md:pb-2">
              SYSTEM INDICATORS
            </div>
            {INDICATORS.map((label, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-1 md:p-2 hover:bg-gray-750 rounded-md transition-colors"
              >
                <div
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 ${
                    indicators[label]
                      ? "bg-green-500 border-green-400 shadow shadow-green-500/50"
                      : "bg-gray-700 border-gray-600"
                  }`}
                ></div>
                <span className="text-xs font-medium text-gray-300 truncate">{label}</span>
              </div>
            ))}
          </div>

          {/* Right Panel - K Buttons (Single Column) */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-5 flex flex-col border border-gray-700 shadow-inner order-1 md:order-3">
            <button
              className="bg-yellow-500 hover:bg-yellow-400 py-2 md:py-3 mb-3 md:mb-5 rounded-md font-bold text-black text-sm md:text-base w-full shadow-md border border-yellow-400"
              onClick={handleReset}
            >
              EMERGENCY RESET
            </button>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-4 flex-grow">
              {K_BUTTONS.map((btn) => (
                <div key={btn.id} className="relative">
                  <button
                    onClick={() => handleKButtonClick(btn.id)}
                    className={`${
                      (btn.id === "K1" && btsStatus === "in") ||
                      (btn.id === "K2" && btsStatus === "out") ||
                      (btn.id !== "K1" && btn.id !== "K2" && activeBtns[btn.id])
                        ? "bg-green-700 border-green-600"
                        : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                    } text-white font-bold py-2 md:py-3 rounded-md shadow-md w-full h-16 md:h-20 flex flex-col items-center justify-center transition-all border`}
                  >
                    <span className="text-xs font-semibold bg-gray-900 px-1 md:px-2 py-0.5 md:py-1 rounded-full mb-1 text-green-400">
                      {btn.id}
                    </span>
                    <span className="text-xs font-medium text-gray-200 text-center">{btn.label}</span>
                  </button>
                  <div
                    className={`absolute top-1 md:top-2 right-1 md:right-2 w-2 h-2 md:w-3 md:h-3 rounded-full border ${getSignalColor(
                      btn.id
                    )}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-700">
          © {new Date().getFullYear()} AARTECH SOLONICS LTD - BTS2000 Bus
          Transfer System | Certified to ANSI C88.41 Standards
        </div>
      </div>
=======
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
            
            <div className="mb-2 p-4 bg-gray-50 rounded-xl flex items-center">
              {/* <div className={`w-4 h-4 rounded-full mr-3 ${btsStatus.includes('IN') ? 'bg-green-500 animate-pulse' : btsStatus.includes('OUT') ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
              <span className="font-medium">Status: {btsStatus}</span> */}
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
              <h2 className="text-xl font-semibold text-gray-800">Live Transfer</h2>
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
>>>>>>> 61fa2c1733aa59174ff7156f98036cce30f7592b
    </div>
  );
};

export default ModbusControlPanel;