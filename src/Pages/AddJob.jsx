import { useState } from "react";
import { useJobs } from "../context/JobContext";
import { useNavigate } from "react-router-dom";

const STEPS = ["Job details", "Notes & links"];

export default function AddJob() {
  const { addJob } = useJobs();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    company: "", role: "", location: "", salary: "",
    status: "Applied", url: "", notes: "",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validateStep0 = () => {
    const e = {};
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.role.trim()) e.role = "Role is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return;
    setStep(1);
  };

  const handleSubmit = () => {
    addJob(form);
    navigate("/jobs");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Add application</h1>

      {/* Step indicator */}
      <div className="flex gap-3 mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
              ${i <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
              {i + 1}
            </div>
            <span className="text-sm text-gray-600">{s}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        {step === 0 ? (
          <>
            {[["company","Company *"],["role","Role *"],["location","Location"],["salary","Expected salary"]].map(([k,l]) => (
              <div key={k}>
                <label className="block text-sm text-gray-600 mb-1">{l}</label>
                <input value={form[k]} onChange={e => update(k, e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                {errors[k] && <p className="text-red-500 text-xs mt-1">{errors[k]}</p>}
              </div>
            ))}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <select value={form.status} onChange={e => update("status", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm">
                {["Applied","Interview","Offer","Rejected"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Job posting URL</label>
              <input value={form.url} onChange={e => update("url", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Notes</label>
              <textarea value={form.notes} onChange={e => update("notes", e.target.value)}
                rows={4} className="w-full border rounded-lg px-3 py-2 text-sm resize-none" />
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          {step > 0 && <button onClick={() => setStep(0)} className="flex-1 border rounded-lg py-2 text-sm">Back</button>}
          {step === 0
            ? <button onClick={handleNext} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm">Next</button>
            : <button onClick={handleSubmit} className="flex-1 bg-green-600 text-white rounded-lg py-2 text-sm">Save</button>}
        </div>
      </div>
    </div>
  );
}