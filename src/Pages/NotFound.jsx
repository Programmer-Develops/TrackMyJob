import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-7xl mb-4 text-gray-900 dark:text-white">404</p>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Page not found
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        This route doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm hover:bg-blue-700 transition-colors"
      >
        Back to dashboard
      </button>
    </div>
  );
}