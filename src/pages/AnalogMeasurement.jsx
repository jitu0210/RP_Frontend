// import React, { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// /* ---------------- SIGNAL CONFIG ---------------- */
// const SIGNAL_MAP = [
//   { key: "IC1_LPT_Sample", label: "IC1 LPT Sample", unit: "V", color: "#3b82f6" },
//   { key: "BUS1_PT_Sample", label: "BUS1 PT Sample", unit: "V", color: "#60a5fa" },
//   { key: "IC2_LPT_Sample", label: "IC2 LPT Sample", unit: "V", color: "#2563eb" },
//   { key: "BUS2_PT_Sample", label: "BUS2 PT Sample", unit: "V", color: "#93c5fd" },

//   { key: "IC1_LN_Freq", label: "IC1 LN Freq", unit: "Hz", color: "#16a34a" },
//   { key: "BUS_1_Freq", label: "BUS 1 Freq", unit: "Hz", color: "#22c55e" },
//   { key: "IC2_LN_Freq", label: "IC2 LN Freq", unit: "Hz", color: "#15803d" },
//   { key: "BUS_2_Freq", label: "BUS 2 Freq", unit: "Hz", color: "#4ade80" },

//   { key: "IC1_Ph_Diff", label: "IC1 Ph Diff", unit: "°", color: "#8b5cf6" },
//   { key: "TieBkr_ph_dd", label: "TieBkr Ph DD", unit: "°", color: "#a855f7" },
//   { key: "IC2_Ph_Diff", label: "IC2 Ph Diff", unit: "°", color: "#d946ef" },
// ];

// /* ---------------- API MAP ---------------- */
// const API_BASE = "http://localhost:8000/api/v1";

// const API_MAP = {
//   IC1_LPT_Sample: "/bts/ic1pt",
//   BUS1_PT_Sample: "/bts/bus1pt",
//   BUS2_PT_Sample: "/bts/bus2pt",
//   IC2_LPT_Sample: "/bts/ic2pt",

//   IC1_LN_Freq: "/bts/ic1freq",
//   BUS_1_Freq: "/bts/bus1freq",
//   BUS_2_Freq: "/bts/bus2freq",
//   IC2_LN_Freq: "/bts/ic2freq",

//   IC1_Ph_Diff: "/bts/ic1phd",
//   TieBkr_ph_dd: "/bts/tiephd",
//   IC2_Ph_Diff: "/bts/ic2phd",
// };

// /* ---------------- INITIAL STATE ---------------- */
// const INITIAL_VALUES = SIGNAL_MAP.reduce(
//   (acc, sig) => ({ ...acc, [sig.key]: 0 }),
//   { timestamp: null }
// );

// /* ---------------- COMPONENT ---------------- */
// const AnalogMeasurement = () => {
//   const [latest, setLatest] = useState(INITIAL_VALUES);
//   const [data, setData] = useState([]);
//   const [connected, setConnected] = useState(false);
//   const [error, setError] = useState(null);

//   const MAX_AGE_MS = 120 * 1000;

//   useEffect(() => {
//     const fetchAllSignals = async () => {
//       try {
//         const responses = await Promise.all(
//           Object.entries(API_MAP).map(async ([key, endpoint]) => {
//             const res = await fetch(`${API_BASE}${endpoint}`);
//             const json = await res.json();
//             return { key, value: json.value };
//           })
//         );

//         const now = Date.now();
//         const payload = { timestamp: now, _receivedAt: now };

//         responses.forEach(({ key, value }) => {
//           payload[key] = value ?? 0;
//         });

//         setLatest(payload);
//         setConnected(true);
//         setError(null);

//         setData((prev) => {
//           const updated = [payload, ...prev];
//           return updated.filter((i) => now - i._receivedAt <= MAX_AGE_MS);
//         });
//       } catch (err) {
//         setConnected(false);
//         setError("Failed to fetch analog values");
//       }
//     };

//     fetchAllSignals();
//     const timer = setInterval(fetchAllSignals, 2000);
//     return () => clearInterval(timer);
//   }, []);

//   const calculateTrend = (current, prev) => {
//     if (!prev || prev === 0) return 0;
//     return ((current - prev) / prev) * 100;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {error && (
//         <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 text-xs">
//           ⚠️ {error}
//         </div>
//       )}

//       {/* Measurement Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
//         {SIGNAL_MAP.map((sig) => (
//           <div key={sig.key} className="bg-white p-4 rounded-xl border">
//             <h3 className="text-[10px] font-bold uppercase">{sig.label}</h3>
//             <div className="text-2xl font-bold">
//               {latest[sig.key].toFixed(2)} {sig.unit}
//             </div>
//             <div className="text-[10px] text-gray-500">
//               Trend: {calculateTrend(latest[sig.key], data[1]?.[sig.key]).toFixed(2)}%
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {SIGNAL_MAP.map((sig) => (
//           <div key={sig.key} className="bg-white p-4 rounded-xl border">
//             <ResponsiveContainer width="100%" height={150}>
//               <LineChart data={[...data].reverse()}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis hide />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="stepAfter"
//                   dataKey={sig.key}
//                   stroke={sig.color}
//                   dot={false}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AnalogMeasurement;






import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- SIGNAL CONFIG ---------------- */
const SIGNAL_MAP = [
  { key: "IC1_LPT_Sample", label: "IC1 LPT Sample", unit: "V", color: "#3b82f6" },
  { key: "BUS1_PT_Sample", label: "BUS1 PT Sample", unit: "V", color: "#60a5fa" },
  { key: "IC2_LPT_Sample", label: "IC2 LPT Sample", unit: "V", color: "#2563eb" },
  { key: "BUS2_PT_Sample", label: "BUS2 PT Sample", unit: "V", color: "#93c5fd" },

  { key: "IC1_LN_Freq", label: "IC1 LN Frequency", unit: "Hz", color: "#16a34a" },
  { key: "BUS_1_Freq", label: "BUS 1 Frequency", unit: "Hz", color: "#22c55e" },
  { key: "IC2_LN_Freq", label: "IC2 LN Frequency", unit: "Hz", color: "#15803d" },
  { key: "BUS_2_Freq", label: "BUS 2 Frequency", unit: "Hz", color: "#4ade80" },

  { key: "IC1_Ph_Diff", label: "IC1 Phase Diff", unit: "°", color: "#8b5cf6" },
  { key: "TieBkr_ph_dd", label: "TieBkr Phase DD", unit: "°", color: "#a855f7" },
  { key: "IC2_Ph_Diff", label: "IC2 Phase Diff", unit: "°", color: "#d946ef" },
];

/* ---------------- API CONFIG ---------------- */
const API_BASE = "http://localhost:8000/api/v1";

const API_MAP = {
  IC1_LPT_Sample: "/bts/ic1pt",
  BUS1_PT_Sample: "/bts/bus1pt",
  IC2_LPT_Sample: "/bts/ic2pt",
  BUS2_PT_Sample: "/bts/bus2pt",

  IC1_LN_Freq: "/bts/ic1freq",
  BUS_1_Freq: "/bts/bus1freq",
  IC2_LN_Freq: "/bts/ic2freq",
  BUS_2_Freq: "/bts/bus2freq",

  IC1_Ph_Diff: "/bts/ic1phd",
  TieBkr_ph_dd: "/bts/tiephd",
  IC2_Ph_Diff: "/bts/ic2phd",
};

/* ---------------- INITIAL STATE ---------------- */
const INITIAL_VALUES = SIGNAL_MAP.reduce(
  (acc, sig) => ({ ...acc, [sig.key]: 0 }),
  { timestamp: null }
);

/* ---------------- COMPONENT ---------------- */
const AnalogMeasurement = () => {
  const [latest, setLatest] = useState(INITIAL_VALUES);
  const [data, setData] = useState([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  const MAX_AGE_MS = 120 * 1000; // 2 minutes

  /* ---------------- FETCH LOOP ---------------- */
  useEffect(() => {
    const fetchAllSignals = async () => {
      try {
        const responses = await Promise.all(
          Object.entries(API_MAP).map(async ([key, endpoint]) => {
            const res = await fetch(`${API_BASE}${endpoint}`);
            const json = await res.json();
            return { key, value: json?.value ?? 0 };
          })
        );

        const now = Date.now();
        const payload = { timestamp: now, _receivedAt: now };

        responses.forEach(({ key, value }) => {
          payload[key] = value;
        });

        setLatest(payload);
        setConnected(true);
        setError(null);

        setData((prev) => {
          const updated = [payload, ...prev];
          return updated.filter(
            (item) => now - item._receivedAt <= MAX_AGE_MS
          );
        });
      } catch (err) {
        setConnected(false);
        setError("Failed to fetch analog values");
      }
    };

    fetchAllSignals();
    const timer = setInterval(fetchAllSignals, 2000);
    return () => clearInterval(timer);
  }, []);

  /* ---------------- HELPERS ---------------- */
  const calculateTrend = (current, prev) => {
    if (prev === undefined || prev === null || prev === 0) return 0;
    return ((current - prev) / prev) * 100;
  };

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    });

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* STATUS */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Analog Measurement Dashboard</h1>
        <div
          className={`px-3 py-1 rounded-full text-sm ${
            connected
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {connected ? "CONNECTED" : "DISCONNECTED"}
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* MEASUREMENT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-10">
        {SIGNAL_MAP.map((sig) => {
          const trend = calculateTrend(
            latest[sig.key],
            data[1]?.[sig.key]
          );

          return (
            <div
              key={sig.key}
              className="bg-white p-4 rounded-xl border shadow-sm"
            >
              <h3 className="text-[10px] font-bold uppercase text-gray-600">
                {sig.label}
              </h3>

              <div className="text-2xl font-bold text-gray-900">
                {latest[sig.key].toFixed(2)}{" "}
                <span className="text-sm text-gray-500">{sig.unit}</span>
              </div>

              <div className="text-[10px] mt-1 text-gray-500">
                Trend: {trend.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>

      {/* GRAPHS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SIGNAL_MAP.map((sig) => (
          <div
            key={sig.key}
            className="bg-white p-4 rounded-xl border shadow-sm"
          >
            <div className="mb-2 flex justify-between items-center">
              <h3 className="text-xs font-semibold text-gray-700">
                {sig.label}
              </h3>
              <span className="text-[10px] text-gray-500">{sig.unit}</span>
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={[...data].reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatTime}
                  fontSize={10}
                />
                <YAxis fontSize={10} />
                <Tooltip
                  labelFormatter={(ts) =>
                    new Date(ts).toLocaleTimeString()
                  }
                  formatter={(value) => [
                    value.toFixed(2) + " " + sig.unit,
                    sig.label,
                  ]}
                />
                <Line
                  type="stepAfter"
                  dataKey={sig.key}
                  stroke={sig.color}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalogMeasurement;
