import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- Measurement Card ---
const MeasurementCard = ({ title, value, unit, timestamp, trend }) => {
  const getTrendColor = () => {
    if (!trend) return "text-gray-500";
    return trend > 0
      ? "text-green-600"
      : trend < 0
      ? "text-red-600"
      : "text-gray-500";
  };

  const getTrendIcon = () => {
    if (!trend) return "●";
    return trend > 0 ? "↗" : trend < 0 ? "↘" : "→";
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-700">{title}</h2>
        {trend !== undefined && (
          <span
            className={`text-xs font-medium ${getTrendColor()} bg-gray-50 px-2 py-1 rounded-full`}
          >
            {getTrendIcon()} {Math.abs(trend).toFixed(1)}%
          </span>
        )}
      </div>
      <div className="flex items-baseline space-x-2 mb-3">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 font-medium">{unit}</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">Updated</span>
        <span className="text-xs text-gray-600 font-medium">
          {timestamp ? new Date(timestamp).toLocaleTimeString() : "--:--:--"}
        </span>
      </div>
    </div>
  );
};

// --- Data Table ---
const DataTable = ({ data }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg mt-8 overflow-hidden">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Historical Data</h3>
      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
        {data.length} records
      </span>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {[
              "Timestamp",
              "PT Voltage",
              "Bus PT Voltage",
              "IC Frequency",
              "Bus PT Frequency",
              "IC Phase Diff",
              "Tie Phase Diff",
            ].map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {new Date(item.timestamp).toLocaleTimeString()}
              </td>
              <td className="px-4 py-3 text-blue-700 text-sm font-medium">
                {item.PT_V.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-blue-700 text-sm font-medium">
                {item.BUS_PT_V.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-green-700 text-sm font-medium">
                {item.IC_Freq.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-green-700 text-sm font-medium">
                {item.BUS_PT_Freq.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-purple-700 text-sm font-medium">
                {item.IC_ph_diff.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-purple-700 text-sm font-medium">
                {item.TIE_ph_diff.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Status Bar ---
const StatusBar = ({ connected, lastUpdate, dataCount }) => (
  <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              connected ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          ></div>
          <span
            className={`text-sm font-medium ${
              connected ? "text-green-700" : "text-red-700"
            }`}
          >
            {connected ? "Live Connection" : "Disconnected"}
          </span>
        </div>
        <div className="w-px h-4 bg-gray-300"></div>
        <span className="text-sm text-gray-600">
          Data Points: <strong className="text-gray-800">{dataCount}</strong>
        </span>
      </div>

      {lastUpdate && (
        <div className="text-right">
          <p className="text-xs text-gray-500">Last Update</p>
          <p className="text-sm font-medium text-gray-700">
            {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  </div>
);

// --- Main Component ---
const AnalogMeasurement = () => {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(null);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const endpoint = "http://localhost:8000/api/bts/analog";
  const MAX_AGE_MS = 120 * 1000;

  useEffect(() => {
    const eventSource = new EventSource(endpoint);

    eventSource.onopen = () => {
      setConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const obj = JSON.parse(event.data);
        const now = new Date().getTime();
        obj._receivedAt = now;

        setLatest(obj);
        setLastUpdate(new Date());
        setConnected(true);
        setError(null);

        setData((prev) => {
          const updated = [obj, ...prev];
          return updated.filter((item) => now - item._receivedAt <= MAX_AGE_MS);
        });
      } catch (err) {
        console.error("Error parsing data:", err);
        setError("Error processing data");
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      setError("Connection lost. Trying to reconnect...");
      setConnected(false);
    };

    return () => eventSource.close();
  }, []);

  const calculateTrend = (currentValue, previousValue) => {
    if (!previousValue || currentValue === previousValue) return 0;
    return ((currentValue - previousValue) / previousValue) * 100;
  };

  const getPreviousValue = (key) => {
    if (data.length < 2) return null;
    return data[1][key];
  };

  // Prepare chart data
  const chartData = latest
    ? [
        { name: "PT Voltage", value: latest.PT_V },
        { name: "Bus PT Voltage", value: latest.BUS_PT_V },
        { name: "IC Frequency", value: latest.IC_Freq },
        { name: "Bus PT Frequency", value: latest.BUS_PT_Freq },
        { name: "IC Phase Diff", value: latest.IC_ph_diff },
        { name: "Tie Phase Diff", value: latest.TIE_ph_diff },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Power System Monitoring Dashboard
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Real-time monitoring of voltage, frequency, and phase difference
            measurements for power transmission systems
          </p>
        </header>

        <StatusBar
          connected={connected}
          lastUpdate={lastUpdate}
          dataCount={data.length}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {latest ? (
          <>
            {/* Measurement Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <MeasurementCard
                title="PT Voltage"
                value={latest.PT_V.toFixed(2)}
                unit="V"
                timestamp={latest.timestamp}
                trend={calculateTrend(latest.PT_V, getPreviousValue("PT_V"))}
              />
              <MeasurementCard
                title="Bus PT Voltage"
                value={latest.BUS_PT_V.toFixed(2)}
                unit="V"
                timestamp={latest.timestamp}
                trend={calculateTrend(
                  latest.BUS_PT_V,
                  getPreviousValue("BUS_PT_V")
                )}
              />
              <MeasurementCard
                title="IC Frequency"
                value={latest.IC_Freq.toFixed(2)}
                unit="Hz"
                timestamp={latest.timestamp}
                trend={calculateTrend(
                  latest.IC_Freq,
                  getPreviousValue("IC_Freq")
                )}
              />
              <MeasurementCard
                title="Bus PT Frequency"
                value={latest.BUS_PT_Freq.toFixed(2)}
                unit="Hz"
                timestamp={latest.timestamp}
                trend={calculateTrend(
                  latest.BUS_PT_Freq,
                  getPreviousValue("BUS_PT_Freq")
                )}
              />
              <MeasurementCard
                title="IC Phase Difference"
                value={latest.IC_ph_diff.toFixed(2)}
                unit="°"
                timestamp={latest.timestamp}
                trend={calculateTrend(
                  latest.IC_ph_diff,
                  getPreviousValue("IC_ph_diff")
                )}
              />
              <MeasurementCard
                title="Tie Phase Difference"
                value={latest.TIE_ph_diff.toFixed(2)}
                unit="°"
                timestamp={latest.timestamp}
                trend={calculateTrend(
                  latest.TIE_ph_diff,
                  getPreviousValue("TIE_ph_diff")
                )}
              />
            </div>

            {/* Horizontal Bar Chart */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Real-time Parameter Comparison
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  layout="vertical"
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 60, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={120}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">
              Waiting for real-time data...
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Connecting to data source
            </p>
          </div>
        )}

        {data.length > 0 && <DataTable data={data} />}
      </div>
    </div>
  );
};

export default AnalogMeasurement;
