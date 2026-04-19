import { useState } from "react";

const GEMINI_API =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function AIAnalyzer() {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");

    const prompt = `You are a career coach. Analyze this job description and candidate background.
Return ONLY a valid JSON object, no markdown, no explanation, no backticks:
{
  "fitScore": number (0-100),
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "tips": ["tip1", "tip2", "tip3"],
  "summary": "one sentence summary"
}

Job Description:
${jd}

Candidate background:
${resume || "Not provided — give general advice."}`;

    try {
      const res = await fetch(`${GEMINI_API}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3 },
        }),
      });

      const data = await res.json();
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e) {
      console.log(e);
      setError("Something went wrong. Check your API key in .env");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">AI job analyzer</h1>
      <p className="text-gray-500 text-sm mb-6">
        Paste a job description to get a fit score and suggestions.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Job description *
          </label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            rows={8}
            placeholder="Paste JD here..."
            className="w-full border rounded-xl px-3 py-2 text-sm resize-none focus:ring-2
              focus:ring-blue-400 focus:outline-none dark:bg-gray-800 dark:border-gray-700
              dark:text-white dark:placeholder-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Your background (optional)
          </label>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows={8}
            placeholder="Skills, experience, education..."
            className="w-full border rounded-xl px-3 py-2 text-sm resize-none focus:ring-2
              focus:ring-blue-400 focus:outline-none dark:bg-gray-800 dark:border-gray-700
              dark:text-white dark:placeholder-gray-500"
          />
        </div>
      </div>

      <button
        onClick={analyze}
        disabled={loading || !jd.trim()}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm
          hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? "Analyzing..." : "Analyze with Gemini"}
      </button>

      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

      {result && (
        <div
          className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-4 border
          border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-blue-600">
              {result.fitScore}
              <span className="text-lg text-gray-400">/100</span>
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${result.fitScore}%` }}
                />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {result.summary}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">
                Matched skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills.map((s) => (
                  <span
                    key={s}
                    className="bg-green-50 dark:bg-green-900/30 text-green-700
                    dark:text-green-400 text-xs px-3 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                Skill gaps
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((s) => (
                  <span
                    key={s}
                    className="bg-red-50 dark:bg-red-900/30 text-red-600
                    dark:text-red-400 text-xs px-3 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 dark:text-white">
              Tips to improve
            </h3>
            <ul className="space-y-2">
              {result.tips.map((t, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-600 dark:text-gray-400 flex gap-2"
                >
                  <span className="text-blue-400 flex-shrink-0">→</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
