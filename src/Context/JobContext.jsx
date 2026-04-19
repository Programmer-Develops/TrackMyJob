import { createContext, useState, useEffect } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs((prev) => [
      ...prev,
      { ...job, id: Date.now(), createdAt: new Date().toISOString() },
    ]);
  };

  const updateStatus = (id, status) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status } : j))
    );
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const filteredJobs = jobs
    .filter((j) => filter === "All" || j.status === filter)
    .filter(
      (j) =>
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : a.company.localeCompare(b.company)
    );

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "Applied").length,
    interview: jobs.filter((j) => j.status === "Interview").length,
    offer: jobs.filter((j) => j.status === "Offer").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        stats,
        darkMode,
        filter,
        search,
        sortBy,
        setDarkMode,
        setFilter,
        setSearch,
        setSortBy,
        addJob,
        updateStatus,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};