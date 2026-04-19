import { useJobs } from "../Context/JobContext";
import StatusBadge from "./StatusBadge";

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export default function JobCard({ job }) {
  const { updateStatus, deleteJob } = useJobs();

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="border rounded-2xl p-4 transition-shadow hover:shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-700 flex items-center
            justify-center font-semibold text-blue-700 dark:text-blue-400 text-sm flex-shrink-0">
            {job.company.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate text-gray-900 dark:text-white">{job.company}</p>
            <p className="text-xs truncate text-gray-500 dark:text-gray-400">{job.role}</p>
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        {job.location && <span>📍 {job.location}</span>}
        {job.salary && <span>💰 {job.salary}</span>}
        <span className="ml-auto">{formatDate(job.createdAt)}</span>
      </div>

      {job.notes && (
        <p className="mt-2 text-xs leading-relaxed line-clamp-2 text-gray-500 dark:text-gray-400">
          {job.notes}
        </p>
      )}

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <select
          value={job.status}
          onChange={(e) => updateStatus(job.id, e.target.value)}
          className="text-xs px-2 py-1 rounded-lg border flex-1 min-w-0
            bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-white"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            View JD
          </a>
        )}

        <button
          onClick={() => deleteJob(job.id)}
          className="text-xs px-3 py-1 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}