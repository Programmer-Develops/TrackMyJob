import { useJobs } from "../context/JobContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#378ADD", "#639922", "#BA7517", "#E24B4A"];
const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export default function Dashboard() {
  const { stats } = useJobs();

  const chartData = STATUSES.map((s) => ({
    name: s,
    value: stats[s.toLowerCase()] || 0,
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total, color: "bg-blue-50 text-blue-700" },
          { label: "Interview", value: stats.interview, color: "bg-green-50 text-green-700" },
          { label: "Offer", value: stats.offer, color: "bg-amber-50 text-amber-700" },
          { label: "Rejected", value: stats.rejected, color: "bg-red-50 text-red-700" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <p className="text-sm opacity-70">{s.label}</p>
            <p className="text-3xl font-semibold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4">Application breakdown</h2>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" outerRadius={100}
              dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}