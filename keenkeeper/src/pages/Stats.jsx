import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTimeline } from "../context/TimelineContext";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Text: "#8b5cf6",
  Call: "#1e4d3b",
  Video: "#22c55e",
  Meetup: "#f59e0b",
};

export default function Stats() {
  const { entries } = useTimeline();

  // Count each type
  const counts = entries.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto w-full px-4 py-10 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Friendship Analytics
        </h1>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-4">By Interaction Type</p>
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-gray-700 font-semibold text-lg mb-1">
                No interactions yet
              </h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Go to a friend's page and tap Call, Text, or Video to log your
                first check-in. Your chart will appear here.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[entry.name] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
