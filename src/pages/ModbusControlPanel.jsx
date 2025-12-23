// import { useEffect, useState } from "react";

// const API_BASE = "http://localhost:8000/api/v1";

// /* ---------------- DATA STRUCTURES ---------------- */
// const actions = [
//   {
//     title: "BTS Control",
//     buttons: [
//       { label: "BTS IN", endpoint: "/bts/in", color: "green" },
//       { label: "BTS OUT", endpoint: "/bts/out", color: "red" },
//       { label: "BTS RESET", endpoint: "/bts/reset", color: "yellow" },
//     ],
//   },
//   {
//     title: "Remote Test",
//     buttons: [
//       { label: "Remote Test IN", endpoint: "/remote-test-in", color: "blue" },
//       { label: "Remote Test OUT", endpoint: "/remote-test-out", color: "blue" },
//       { label: "Remote Test Transfer", endpoint: "/remote-test-transfer", color: "purple" },
//     ],
//   },
//   {
//     title: "Bus to Source",
//     buttons: [
//       { label: "Bus1 to Src1", endpoint: "/bus1tosrc1", color: "gray" },
//       { label: "Bus1 to Src2", endpoint: "/bus1Tosrc2", color: "gray" },
//       { label: "Bus2 to Src1", endpoint: "/bus2tosrc1", color: "gray" },
//       { label: "Bus2 to Src2", endpoint: "/bus2Tosrc2", color: "gray" },
//       { label: "Bus1 & 2 to Src1", endpoint: "/bus1and2tosrc1", color: "gray" },
//       { label: "Bus1 & 2 to Src2", endpoint: "/bus1and2tosrc2", color: "gray" },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       { label: "Operate Breaker", endpoint: "/breaker/operate", color: "orange" },
//     ],
//   },
// ];

// const availabilityEndpoints = [
//   { label: "Bus1 to Src1", endpoint: "/bts/b1_s1_available" },
//   { label: "Bus1 to Src2", endpoint: "/bts/b1_s2_available" },
//   { label: "Bus2 to Src1", endpoint: "/bts/b2_s1_available" },
//   { label: "Bus2 to Src2", endpoint: "/bts/b2_s2_available" },
//   { label: "Bus1 & 2 to Src1", endpoint: "/bts/b1_2_to_s1_available" },
//   { label: "Bus1 & 2 to Src2", endpoint: "/bts/b1_2_to_s2_available" },
// ];

// export default function ModbusControlPanel() {
//   const [loading, setLoading] = useState(false);
//   const [availability, setAvailability] = useState({});
//   const [logs, setLogs] = useState([]);
//   const [btsIn, setBtsIn] = useState(false);
//   const [btsOut, setBtsOut] = useState(false);

//   // Helper to add logs
//   const addLog = (msg, type = "info") => {
//     const timestamp = new Date().toLocaleTimeString();
//     setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONTROL CALL ---------------- */
//   const callApi = async (label, endpoint) => {
//     try {
//       setLoading(true);
//       addLog(`Sending command: ${label}...`, "info");

//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`Success: ${label} - ${data.message || "Executed"}`, "success");
//     } catch (err) {
//       addLog(`Error: ${label} - ${err.message}`, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- FETCH LOGIC ---------------- */
//   const fetchAvailability = async () => {
//     try {
//       const results = {};
//       for (const item of availabilityEndpoints) {
//         const res = await fetch(`${API_BASE}${item.endpoint}`);
//         const data = await res.json();
//         results[item.label] = data.value;
//       }
//       setAvailability(results);
//     } catch (err) { console.error(err); }
//   };

//   const fetchBtsStatus = async () => {
//     try {
//       const inRes = await fetch(`${API_BASE}/bts/btsIN`);
//       const inData = await inRes.json();
//       const outRes = await fetch(`${API_BASE}/bts/btsOUT`);
//       const outData = await outRes.json();
//       setBtsIn(inData.active ?? inData.value ?? false);
//       setBtsOut(outData.active ?? outData.value ?? false);
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     fetchAvailability();
//     fetchBtsStatus();
//     const interval = setInterval(() => {
//       fetchAvailability();
//       fetchBtsStatus();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const colorClasses = {
//     green: "bg-green-600 hover:bg-green-700 text-white",
//     red: "bg-red-600 hover:bg-red-700 text-white",
//     yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
//     blue: "bg-blue-600 hover:bg-blue-700 text-white",
//     purple: "bg-purple-600 hover:bg-purple-700 text-white",
//     gray: "bg-gray-600 hover:bg-gray-700 text-white",
//     orange: "bg-orange-600 hover:bg-orange-700 text-white"
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 font-sans">
//       <div className="max-w-7xl mx-auto">
//         <header className="bg-slate-800 text-white p-6 rounded-t-xl shadow-lg mb-1">
//           <h1 className="text-2xl font-bold">BTS Relay System Interface</h1>
//           <p className="text-slate-400 text-sm">System Monitoring & Control Engine</p>
//         </header>

//         {/* MAIN TWO-COLUMN LAYOUT */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
//           {/* LEFT COLUMN: CONTROLLING */}
//           <div className="bg-white p-6 rounded-bl-xl shadow-md border-r border-gray-200">
//             <h2 className="text-xl font-bold mb-6 pb-2 border-b text-blue-800">Command Control Center</h2>
            
//             {actions.map((section, idx) => (
//               <div key={idx} className="mb-8 last:mb-0">
//                 <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-3">{section.title}</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   {section.buttons.map((btn, i) => (
//                     <button
//                       key={i}
//                       onClick={() => callApi(btn.label, btn.endpoint)}
//                       disabled={loading}
//                       className={`py-3 px-4 rounded font-medium transition-all active:scale-95 text-sm ${colorClasses[btn.color]} disabled:opacity-50`}
//                     >
//                       {btn.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* RIGHT COLUMN: MONITORING */}
//           <div className="flex flex-col gap-6">
//             <div className="bg-white p-6 rounded-br-xl shadow-md flex-grow">
//               <h2 className="text-xl font-bold mb-6 pb-2 border-b text-emerald-800">Live System Status</h2>
              
//               {/* BTS STATUS BULBS */}
//               <div className="grid grid-cols-2 gap-4 mb-8">
//                 <div className={`p-4 rounded-lg border flex items-center justify-between ${btsIn ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
//                   <span className="font-bold text-gray-700">BTS IN</span>
//                   <div className={`w-6 h-6 rounded-full shadow-inner ${btsIn ? "bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" : "bg-gray-300"}`} />
//                 </div>
//                 <div className={`p-4 rounded-lg border flex items-center justify-between ${btsOut ? 'bg-red-50 border-red-200' : 'bg-gray-50'}`}>
//                   <span className="font-bold text-gray-700">BTS OUT</span>
//                   <div className={`w-6 h-6 rounded-full shadow-inner ${btsOut ? "bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "bg-gray-300"}`} />
//                 </div>
//               </div>

//               {/* AVAILABILITY LIST */}
//               <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-3">Bus Availability</h3>
//               <div className="space-y-2">
//                 {availabilityEndpoints.map((item, i) => (
//                   <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
//                     <span className="text-sm font-medium text-gray-600">{item.label}</span>
//                     <span className={`text-[10px] font-bold px-2 py-1 rounded ${availability[item.label] ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//                       {availability[item.label] ? "AVAILABLE" : "OFFLINE"}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* LOG AREA */}
//             <div className="bg-slate-900 rounded-xl p-4 shadow-inner h-64 overflow-hidden flex flex-col">
//               <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">System Command Logs</h3>
//               <div className="flex-grow overflow-y-auto font-mono text-xs space-y-1 pr-2 custom-scrollbar">
//                 {logs.length === 0 && <p className="text-slate-600 italic">No activity recorded...</p>}
//                 {logs.map((log, i) => (
//                   <div key={i} className="border-l-2 border-slate-700 pl-2 py-1">
//                     <span className="text-slate-500">[{log.timestamp}]</span>{" "}
//                     <span className={log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-blue-300'}>
//                       {log.msg}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <footer className="mt-4 text-center text-gray-400 text-xs py-4">
//           Modbus Protocol Communication Active • Refresh Rate: 5000ms
//         </footer>
//       </div>
//     </div>
//   );
// }







// import { useEffect, useState } from "react";

// const API_BASE = "http://localhost:8000/api/v1";

// /* ---------------- DATA STRUCTURES ---------------- */
// const actions = [
//   {
//     title: "BTS Control",
//     buttons: [
//       { label: "BTS IN", endpoint: "/bts/in", color: "green" },
//       { label: "BTS OUT", endpoint: "/bts/out", color: "red" },
//       { label: "BTS RESET", endpoint: "/bts/reset", color: "yellow" },
//     ],
//   },
//   {
//     title: "Remote Test",
//     buttons: [
//       { label: "Remote Test IN", endpoint: "/remote-test-in", color: "blue" },
//       { label: "Remote Test OUT", endpoint: "/remote-test-out", color: "blue" },
//       { label: "Remote Test Transfer", endpoint: "/remote-test-transfer", color: "purple" },
//     ],
//   },
//   {
//     title: "Bus to Source",
//     buttons: [
//       { label: "Bus1 to Src1", endpoint: "/bus1tosrc1", color: "gray" },
//       { label: "Bus1 to Src2", endpoint: "/bus1Tosrc2", color: "gray" },
//       { label: "Bus2 to Src1", endpoint: "/bus2tosrc1", color: "gray" },
//       { label: "Bus2 to Src2", endpoint: "/bus2Tosrc2", color: "gray" },
//       { label: "Bus1 & 2 to Src1", endpoint: "/bus1and2tosrc1", color: "gray" },
//       { label: "Bus1 & 2 to Src2", endpoint: "/bus1and2tosrc2", color: "gray" },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       { label: "Operate Breaker", endpoint: "/breaker/operate", color: "orange" },
//     ],
//   },
// ];

// const availabilityEndpoints = [
//   { label: "Bus1 to Src1", endpoint: "/bts/b1_s1_available" },
//   { label: "Bus1 to Src2", endpoint: "/bts/b1_s2_available" },
//   { label: "Bus2 to Src1", endpoint: "/bts/b2_s1_available" },
//   { label: "Bus2 to Src2", endpoint: "/bts/b2_s2_available" },
//   { label: "Bus1 & 2 to Src1", endpoint: "/bts/b1_2_to_s1_available" },
//   { label: "Bus1 & 2 to Src2", endpoint: "/bts/b1_2_to_s2_available" },
// ];

// export default function ModbusControlPanel() {
//   const [loading, setLoading] = useState(false);
//   const [availability, setAvailability] = useState({});
//   const [logs, setLogs] = useState([]);
//   const [btsIn, setBtsIn] = useState(false);
//   const [btsOut, setBtsOut] = useState(false);

//   // Helper to add logs
//   const addLog = (msg, type = "info") => {
//     const timestamp = new Date().toLocaleTimeString();
//     setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONTROL CALL ---------------- */
//   const callApi = async (label, endpoint) => {
//     try {
//       setLoading(true);
//       addLog(`Sending command: ${label}..., "info"`);

//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`Success: ${label} - ${data.message || "Executed"}, "success"`);
//     } catch (err) {
//       addLog(`Error: ${label} - ${err.message}, "error"`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- FETCH LOGIC ---------------- */
//   const fetchAvailability = async () => {
//     try {
//       const results = {};
//       for (const item of availabilityEndpoints) {
//         const res = await fetch(`${API_BASE}${item.endpoint}`);
//         const data = await res.json();
//         results[item.label] = data.value;
//       }
//       setAvailability(results);
//     } catch (err) { console.error(err); }
//   };

//   const fetchBtsStatus = async () => {
//     try {
//       const inRes = await fetch(`${API_BASE}/bts/btsIN`);
//       const inData = await inRes.json();
//       const outRes = await fetch(`${API_BASE}/bts/btsOUT`);
//       const outData = await outRes.json();
//       setBtsIn(inData.active ?? inData.value ?? false);
//       setBtsOut(outData.active ?? outData.value ?? false);
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     fetchAvailability();
//     fetchBtsStatus();
//     const interval = setInterval(() => {
//       fetchAvailability();
//       fetchBtsStatus();
//     }, 100);
//     return () => clearInterval(interval);
//   }, []);

//   const colorClasses = {
//     green: "bg-green-600 hover:bg-green-700 text-white",
//     red: "bg-red-600 hover:bg-red-700 text-white",
//     yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
//     blue: "bg-blue-600 hover:bg-blue-700 text-white",
//     purple: "bg-purple-600 hover:bg-purple-700 text-white",
//     gray: "bg-gray-600 hover:bg-gray-700 text-white",
//     orange: "bg-orange-600 hover:bg-orange-700 text-white"
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 font-sans">
//       <div className="max-w-7xl mx-auto">
        

//         {/* MAIN TWO-COLUMN LAYOUT */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
//           {/* LEFT COLUMN: CONTROLLING */}
//           <div className="bg-white p-6 rounded-bl-xl shadow-md border-r border-gray-200">
//             <h2 className="text-xl font-bold mb-6 pb-2 border-b text-blue-800">Command Control Center</h2>
            
//             {actions.map((section, idx) => (
//               <div key={idx} className="mb-8 last:mb-0">
//                 <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-3">{section.title}</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   {section.buttons.map((btn, i) => (
//                     <button
//                       key={i}
//                       onClick={() => callApi(btn.label, btn.endpoint)}
//                       disabled={loading}
//                       className={`py-3 px-4 rounded font-medium transition-all active:scale-95 text-sm ${colorClasses[btn.color]} disabled:opacity-50`}
//                     >
//                       {btn.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* RIGHT COLUMN: MONITORING */}
//           <div className="flex flex-col gap-6">
//             <div className="bg-white p-6 rounded-br-xl shadow-md flex-grow">
//               <h2 className="text-xl font-bold mb-6 pb-2 border-b text-emerald-800">Live System Status</h2>
              
//               {/* BTS STATUS BULBS */}
//               <div className="grid grid-cols-2 gap-4 mb-8">
//                 <div className={`p-4 rounded-lg border flex items-center justify-between ${btsIn ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
//                   <span className="font-bold text-gray-700">BTS IN</span>
//                   <div className={`w-6 h-6 rounded-full shadow-inner ${btsIn ? "bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" : "bg-gray-300"}`} />
//                 </div>
//                 <div className={`p-4 rounded-lg border flex items-center justify-between ${btsOut ? 'bg-red-50 border-red-200' : 'bg-gray-50'}`}>
//                   <span className="font-bold text-gray-700">BTS OUT</span>
//                   <div className={`w-6 h-6 rounded-full shadow-inner ${btsOut ? "bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "bg-gray-300"}`} />
//                 </div>
//               </div>

//               {/* AVAILABILITY LIST */}
//               <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-3">Bus Availability</h3>
//               <div className="space-y-2">
//                 {availabilityEndpoints.map((item, i) => (
//                   <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
//                     <span className="text-sm font-medium text-gray-600">{item.label}</span>
//                     <span className={`text-[10px] font-bold px-2 py-1 rounded ${availability[item.label] ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//                       {availability[item.label] ? "AVAILABLE" : "OFFLINE"}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* LOG AREA */}
//             <div className="bg-slate-900 rounded-xl p-4 shadow-inner h-64 overflow-hidden flex flex-col">
//               <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">System Command Logs</h3>
//               <div className="flex-grow overflow-y-auto font-mono text-xs space-y-1 pr-2 custom-scrollbar">
//                 {logs.length === 0 && <p className="text-slate-600 italic">No activity recorded...</p>}
//                 {logs.map((log, i) => (
//                   <div key={i} className="border-l-2 border-slate-700 pl-2 py-1">
//                     <span className="text-slate-500">[{log.timestamp}]</span>{" "}
//                     <span className={log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-blue-300'}>
//                       {log.msg}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








import { useEffect, useState } from "react";

const API_BASE = "http://localhost:8000/api/v1";

/* ---------------- DATA STRUCTURES ---------------- */
const actions = [
  {
    title: "BTS Control",
    buttons: [
      { label: "BTS IN", endpoint: "/bts/in", color: "green" },
      { label: "BTS OUT", endpoint: "/bts/out", color: "red" },
      { label: "BTS RESET", endpoint: "/bts/reset", color: "yellow" },
    ],
  },
  {
    title: "Remote Test",
    buttons: [
      { label: "Remote Test IN", endpoint: "/remote-test-in", color: "blue" },
      { label: "Remote Test OUT", endpoint: "/remote-test-out", color: "blue" },
      { label: "Remote Test Transfer", endpoint: "/remote-test-transfer", color: "purple" },
    ],
  },
  {
    title: "Bus to Source",
    buttons: [
      { label: "Bus1 to Src1", endpoint: "/bus1tosrc1", color: "gray" },
      { label: "Bus1 to Src2", endpoint: "/bus1Tosrc2", color: "gray" },
      { label: "Bus2 to Src1", endpoint: "/bus2tosrc1", color: "gray" },
      { label: "Bus2 to Src2", endpoint: "/bus2Tosrc2", color: "gray" },
      { label: "Bus1 & 2 to Src1", endpoint: "/bus1and2tosrc1", color: "gray" },
      { label: "Bus1 & 2 to Src2", endpoint: "/bus1and2tosrc2", color: "gray" },
    ],
  },
  {
    title: "Live Transfer",
    buttons: [
      { label: "Operate Breaker", endpoint: "/breaker/operate", color: "orange" },
    ],
  },
];

const availabilityEndpoints = [
  { label: "Bus1 to Src1", endpoint: "/bts/b1_s1_available" },
  { label: "Bus1 to Src2", endpoint: "/bts/b1_s2_available" },
  { label: "Bus2 to Src1", endpoint: "/bts/b2_s1_available" },
  { label: "Bus2 to Src2", endpoint: "/bts/b2_s2_available" },
  { label: "Bus1 & 2 to Src1", endpoint: "/bts/b1_2_to_s1_available" },
  { label: "Bus1 & 2 to Src2", endpoint: "/bts/b1_2_to_s2_available" },
];

export default function ModbusControlPanel() {
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState({});
  const [logs, setLogs] = useState([]);
  const [btsIn, setBtsIn] = useState(false);
  const [btsOut, setBtsOut] = useState(false);

  /* ---------------- LOGGING ---------------- */
  const addLog = (msg, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [{ timestamp, msg, type }, ...prev].slice(0, 50));
  };

  /* ---------------- CONTROL CALL ---------------- */
  const callApi = async (label, endpoint) => {
    try {
      setLoading(true);
      addLog(`Sending command: ${label}...`, "info");

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");

      addLog(`Success: ${label} - ${data.message || "Executed"}`, "success");

      // 🔑 Force immediate status sync
      fetchBtsStatus();
      fetchAvailability();

    } catch (err) {
      addLog(`Error: ${label} - ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FETCH AVAILABILITY ---------------- */
  const fetchAvailability = async () => {
    try {
      const results = {};
      for (const item of availabilityEndpoints) {
        const res = await fetch(`${API_BASE}${item.endpoint}`);
        const data = await res.json();
        results[item.label] = data.value;
      }
      setAvailability(results);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- BTS STATUS (SINGLE SOURCE OF TRUTH) ---------------- */
  const fetchBtsStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/bts/btsNotReadyStatus`);
      const data = await res.json();

      const notReady = data.value ?? data.active ?? false;

      // HARD RULE
      setBtsOut(notReady);
      setBtsIn(!notReady);

    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- POLLING ---------------- */
  useEffect(() => {
    fetchAvailability();
    fetchBtsStatus();

    const interval = setInterval(() => {
      fetchAvailability();
      fetchBtsStatus();
    }, 1000); // sane polling

    return () => clearInterval(interval);
  }, []);

  const colorClasses = {
    green: "bg-green-600 hover:bg-green-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    purple: "bg-purple-600 hover:bg-purple-700 text-white",
    gray: "bg-gray-600 hover:bg-gray-700 text-white",
    orange: "bg-orange-600 hover:bg-orange-700 text-white",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT: CONTROL */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-6 border-b pb-2 text-blue-800">
            Command Control Center
          </h2>

          {actions.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-sm font-black uppercase text-gray-500 mb-3">
                {section.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {section.buttons.map((btn, i) => (
                  <button
                    key={i}
                    disabled={loading}
                    onClick={() => callApi(btn.label, btn.endpoint)}
                    className={`py-3 px-4 rounded text-sm font-medium transition active:scale-95 disabled:opacity-50 ${colorClasses[btn.color]}`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: STATUS */}
        <div className="flex flex-col gap-6">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-6 border-b pb-2 text-emerald-800">
              Live System Status
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className={`p-4 rounded-lg border flex justify-between ${btsIn ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
                <span className="font-bold">BTS IN</span>
                <div className={`w-6 h-6 rounded-full ${btsIn ? "bg-green-500 animate-pulse" : "bg-gray-300"}`} />
              </div>

              <div className={`p-4 rounded-lg border flex justify-between ${btsOut ? "bg-red-50 border-red-200" : "bg-gray-50"}`}>
                <span className="font-bold">BTS OUT</span>
                <div className={`w-6 h-6 rounded-full ${btsOut ? "bg-red-500 animate-pulse" : "bg-gray-300"}`} />
              </div>
            </div>

            <h3 className="text-sm font-black uppercase text-gray-500 mb-3">
              Bus Availability
            </h3>

            <div className="space-y-2">
              {availabilityEndpoints.map((item, i) => (
                <div key={i} className="flex justify-between p-3 bg-gray-50 rounded border">
                  <span>{item.label}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    availability[item.label]
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {availability[item.label] ? "AVAILABLE" : "OFFLINE"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* LOGS */}
          <div className="bg-slate-900 rounded-xl p-4 h-64 overflow-y-auto text-xs font-mono">
            {logs.length === 0 && <p className="text-slate-500">No activity…</p>}
            {logs.map((log, i) => (
              <div key={i}>
                <span className="text-slate-400">[{log.timestamp}] </span>
                <span className={
                  log.type === "error"
                    ? "text-red-400"
                    : log.type === "success"
                    ? "text-green-400"
                    : "text-blue-300"
                }>
                  {log.msg}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
