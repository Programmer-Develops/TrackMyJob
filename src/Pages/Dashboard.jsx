import { useJobs } from "../Context/JobContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

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
      <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total, color: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
          { label: "Interview", value: stats.interview, color: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
          { label: "Offer", value: stats.offer, color: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
          { label: "Rejected", value: stats.rejected, color: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <p className="text-sm opacity-70">{s.label}</p>
            <p className="text-3xl font-semibold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Application breakdown</h2>
        <div className="w-full h-96 flex items-center justify-center">
          {chartData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <Pie 
                  data={chartData} 
                  cx="50%" 
                  cy="50%" 
                  labelLine={false}
                  label={({ name, value }) => `${value !== 0 ? name : ''}: ${value}`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} applications`} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => `${value}: ${entry.payload.value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 dark:text-gray-500">Add applications to see breakdown</p>
          )}
        </div>
      </div>
    </div>
  );
}