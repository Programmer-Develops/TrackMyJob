import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JobProvider } from "./Context/JobContext";
import { useJobs } from "./Context/useJobs";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Jobs from "./Pages/Jobs";
import AddJob from "./Pages/AddJob";
import AIAnalyzer from "./Pages/AIAnalyzer";
import NotFound from "./Pages/NotFound";

function AppLayout() {
  const { darkMode } = useJobs();

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors`}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/ai" element={<AIAnalyzer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <JobProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </JobProvider>
  );
}