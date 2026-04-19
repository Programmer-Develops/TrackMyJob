import { useJobs } from "../context/JobContext";
import JobCard from "../components/JobCard";
import { useCallback } from "react";

const STATUSES = ["All", "Applied", "Interview", "Offer", "Rejected"];

export default function Jobs() {
  const {
    filteredJobs,
    filter, setFilter,
    search, setSearch,
    sortBy, setSortBy,
    darkMode,
    stats,
  } = useJobs();

  const handleSearch = useCallback(
    (e) => setSearch(e.target.value),
    [setSearch]
  );

  const inputCls = darkMode
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400";

  const selectCls = darkMode
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-200 text-gray-700";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
          Applications
        </h1>
        <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          {filteredJobs.length} of {stats.total}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search company or role..."
          value={search}
          onChange={handleSearch}
          className={`flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none
            focus:ring-2 focus:ring-blue-400 ${inputCls}`}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`border rounded-xl px-3 py-2 text-sm focus:outline-none
            focus:ring-2 focus:ring-blue-400 ${selectCls}`}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`border rounded-xl px-3 py-2 text-sm focus:outline-none
            focus:ring-2 focus:ring-blue-400 ${selectCls}`}
        >
          <option value="date">Sort: newest first</option>
          <option value="company">Sort: company A–Z</option>
        </select>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filter === s
                ? "bg-blue-600 text-white border-blue-600"
                : darkMode
                ? "border-gray-700 text-gray-400 hover:border-gray-500"
                : "border-gray-200 text-gray-500 hover:border-gray-400"
            }`}
          >
            {s}
            {s !== "All" && (
              <span className="ml-1 opacity-60">
                {s === "Applied" && stats.applied}
                {s === "Interview" && stats.interview}
                {s === "Offer" && stats.offer}
                {s === "Rejected" && stats.rejected}
              </span>
            )}
          </button>
        ))}
      </div>

      {filteredJobs.length === 0 ? (
        <div className={`text-center py-20 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          <p className="text-4xl mb-3">📭</p>
          <p className="text-sm">No applications found</p>
          <p className="text-xs mt-1">Try a different filter or add a new job</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}