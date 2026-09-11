import { useState } from "react";
import { Cpu, Thermometer, RotateCw, Wrench, Zap, Info, AlertTriangle } from "lucide-react";
import API from "../services/api";

function PredictionForm({ formData, setFormData, onSubmitSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handlePreset = (presetType) => {
    switch (presetType) {
      case "healthy":
        setFormData({
          Type: 1,
          "Air temperature [K]": 298.1,
          "Process temperature [K]": 308.6,
          "Rotational speed [rpm]": 1550,
          "Torque [Nm]": 40.0,
          "Tool wear [min]": 10,
        });
        break;
      case "tool_wear":
        setFormData({
          Type: 0,
          "Air temperature [K]": 298.5,
          "Process temperature [K]": 309.0,
          "Rotational speed [rpm]": 1400,
          "Torque [Nm]": 48.0,
          "Tool wear [min]": 220, // Threshold in recommendation.py is > 200
        });
        break;
      case "overtorque":
        setFormData({
          Type: 2,
          "Air temperature [K]": 297.8,
          "Process temperature [K]": 308.2,
          "Rotational speed [rpm]": 1250,
          "Torque [Nm]": 65.5, // Threshold in recommendation.py is > 60
          "Tool wear [min]": 85,
        });
        break;
      case "thermal":
        setFormData({
          Type: 1,
          "Air temperature [K]": 297.0,
          "Process temperature [K]": 311.5, // Diff = 14.5K (Threshold in recommendation.py is > 12)
          "Rotational speed [rpm]": 1600,
          "Torque [Nm]": 35.0,
          "Tool wear [min]": 30,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/predict", formData);
      onSubmitSuccess(res.data, formData);
    } catch (err) {
      alert("Error calling Flask API. Make sure the backend is running on port 5000.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Warning check: Process Temp should ideally be higher than Air Temp
  const tempDiff = formData["Process temperature [K]"] - formData["Air temperature [K]"];
  const showTempWarning = tempDiff <= 0;

  return (
    <div id="predict" className="glass-panel border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Machine Telemetry Inputs</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">Configure sensor metrics or apply a predefined preset below.</p>
        </div>

        {/* PRESETS BUTTONS */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800/60">
          <button
            type="button"
            onClick={() => handlePreset("healthy")}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            Nominal
          </button>
          <button
            type="button"
            onClick={() => handlePreset("tool_wear")}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition bg-slate-900 border border-slate-800 text-amber-400 hover:bg-amber-400/10"
          >
            Wear Fault
          </button>
          <button
            type="button"
            onClick={() => handlePreset("overtorque")}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition bg-slate-900 border border-slate-800 text-red-400 hover:bg-red-400/10"
          >
            Overtorque
          </button>
          <button
            type="button"
            onClick={() => handlePreset("thermal")}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition bg-slate-900 border border-slate-800 text-orange-400 hover:bg-orange-400/10"
          >
            Thermal
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Machine Type */}
        <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-900">
          <label className="text-xs text-slate-400 font-semibold flex items-center gap-2 mb-2">
            <Cpu size={14} className="text-blue-400" />
            Machine Material Quality (Type)
          </label>
          <select
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            className="w-full bg-slate-900/90 text-sm text-slate-200 rounded-lg p-2.5 outline-none border border-slate-800 focus:border-blue-500 transition-colors"
          >
            <option value={0}>Low Quality Material (L)</option>
            <option value={1}>Medium Quality Material (M)</option>
            <option value={2}>High Quality Material (H)</option>
          </select>
        </div>

        {/* Temperature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-900">
            <label className="text-xs text-slate-400 font-semibold flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-2">
                <Thermometer size={14} className="text-cyan-400" />
                Air Temp [K]
              </span>
              <span className="text-[10px] font-mono text-slate-500">295 - 305 K</span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min="295"
                max="305"
                step="0.1"
                name="Air temperature [K]"
                value={formData["Air temperature [K]"]}
                onChange={handleChange}
                className="w-full accent-blue-500"
              />
              <input
                type="number"
                step="0.1"
                name="Air temperature [K]"
                value={formData["Air temperature [K]"]}
                onChange={handleChange}
                className="w-20 bg-slate-900 text-xs text-center text-slate-200 border border-slate-800 rounded p-1"
              />
            </div>
          </div>

          <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-900">
            <label className="text-xs text-slate-400 font-semibold flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-2">
                <Thermometer size={14} className="text-orange-400" />
                Process Temp [K]
              </span>
              <span className="text-[10px] font-mono text-slate-500">305 - 315 K</span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min="305"
                max="315"
                step="0.1"
                name="Process temperature [K]"
                value={formData["Process temperature [K]"]}
                onChange={handleChange}
                className="w-full accent-blue-500"
              />
              <input
                type="number"
                step="0.1"
                name="Process temperature [K]"
                value={formData["Process temperature [K]"]}
                onChange={handleChange}
                className="w-20 bg-slate-900 text-xs text-center text-slate-200 border border-slate-800 rounded p-1"
              />
            </div>
          </div>
        </div>

        {/* Validation warning */}
        {showTempWarning && (
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-lg">
            <AlertTriangle size={14} className="shrink-0" />
            <span>Warning: Process temperature is normally higher than air temperature.</span>
          </div>
        )}

        {/* Mechanical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-900">
            <label className="text-xs text-slate-400 font-semibold flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-2">
                <RotateCw size={14} className="text-green-400" />
                Rotational Speed [RPM]
              </span>
              <span className="text-[10px] font-mono text-slate-500">1000 - 2800</span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min="1000"
                max="2800"
                step="1"
                name="Rotational speed [rpm]"
                value={formData["Rotational speed [rpm]"]}
                onChange={handleChange}
                className="w-full accent-blue-500"
              />
              <input
                type="number"
                name="Rotational speed [rpm]"
                value={formData["Rotational speed [rpm]"]}
                onChange={handleChange}
                className="w-20 bg-slate-900 text-xs text-center text-slate-200 border border-slate-800 rounded p-1"
              />
            </div>
          </div>

          <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-900">
            <label className="text-xs text-slate-400 font-semibold flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-2">
                <Zap size={14} className="text-yellow-400" />
                Torque [Nm]
              </span>
              <span className="text-[10px] font-mono text-slate-500">5 - 80 Nm</span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min="5"
                max="80"
                step="0.1"
                name="Torque [Nm]"
                value={formData["Torque [Nm]"]}
                onChange={handleChange}
                className="w-full accent-blue-500"
              />
              <input
                type="number"
                step="0.1"
                name="Torque [Nm]"
                value={formData["Torque [Nm]"]}
                onChange={handleChange}
                className="w-20 bg-slate-900 text-xs text-center text-slate-200 border border-slate-800 rounded p-1"
              />
            </div>
          </div>
        </div>

        {/* Tool Wear Slider */}
        <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-900">
          <label className="text-xs text-slate-400 font-semibold flex items-center justify-between gap-2 mb-2">
            <span className="flex items-center gap-2">
              <Wrench size={14} className="text-purple-400" />
              Tool Wear [Minutes]
            </span>
            <span className="text-[10px] font-mono text-slate-500">0 - 250 min</span>
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="range"
              min="0"
              max="250"
              step="1"
              name="Tool wear [min]"
              value={formData["Tool wear [min]"]}
              onChange={handleChange}
              className="w-full accent-blue-500"
            />
            <input
              type="number"
              name="Tool wear [min]"
              value={formData["Tool wear [min]"]}
              onChange={handleChange}
              className="w-20 bg-slate-900 text-xs text-center text-slate-200 border border-slate-800 rounded p-1"
              />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 disabled:bg-blue-800/50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition duration-300 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Machine Telemetry...</span>
            </>
          ) : (
            <>
              <span>⚡ EVALUATE MACHINE STATUS</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default PredictionForm;
