import { NavLink, useNavigate } from "react-router-dom";
import { useJobs } from "../Context/JobContext";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/jobs", label: "Jobs" },
  { to: "/ai", label: "AI Analyzer" },
];

export default function Navbar() {
  const { darkMode, setDarkMode } = useJobs();
  const navigate = useNavigate();

  return (
    <nav className={`sticky top-0 z-50 border-b px-4 py-3 flex items-center justify-between
      ${darkMode
        ? "bg-gray-900 border-gray-700 text-white"
        : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex items-center gap-6">
        <span
          className="font-semibold text-lg tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          JobTrackr
        </span>
        <div className="hidden sm:flex gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900 font-medium"
                    : darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add job
        </button>
        <button
          onClick={() => setDarkMode((d) => !d)}
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-colors
            ${darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          {darkMode ? "☀" : "☾"}
        </button>
      </div>
    </nav>
  );
}