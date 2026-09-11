import { Activity, ShieldAlert, CheckCircle2 } from "lucide-react";

function SensorHealthStatus({ inputs }) {
  // If no inputs yet, show baseline default indicators
  const currentInputs = inputs || {
    "Air temperature [K]": 298.1,
    "Process temperature [K]": 308.6,
    "Rotational speed [rpm]": 1550,
    "Torque [Nm]": 40.0,
    "Tool wear [min]": 10,
  };

  const toolWear = currentInputs["Tool wear [min]"];
  const torque = currentInputs["Torque [Nm]"];
  const tempDiff = currentInputs["Process temperature [K]"] - currentInputs["Air temperature [K]"];

  // 1. Tool Wear Status
  let wearStatus = "SAFE";
  let wearColor = "text-green-400";
  let wearBarColor = "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]";
  const wearPct = Math.min(100, (toolWear / 200) * 100);

  if (toolWear > 200) {
    wearStatus = "CRITICAL";
    wearColor = "text-red-400 animate-pulse font-bold";
    wearBarColor = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-pulse";
  } else if (toolWear > 150) {
    wearStatus = "WARNING";
    wearColor = "text-amber-400 font-bold";
    wearBarColor = "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]";
  } else if (toolWear > 100) {
    wearStatus = "MODERATE";
    wearColor = "text-yellow-400";
    wearBarColor = "bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.5)]";
  }

  // 2. Torque Status
  let torqueStatus = "SAFE";
  let torqueColor = "text-green-400";
  let torqueBarColor = "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]";
  const torquePct = Math.min(100, (torque / 60) * 100);

  if (torque > 60) {
    torqueStatus = "CRITICAL";
    torqueColor = "text-red-400 animate-pulse font-bold";
    torqueBarColor = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-pulse";
  } else if (torque > 50) {
    torqueStatus = "WARNING";
    torqueColor = "text-amber-400 font-bold";
    torqueBarColor = "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]";
  }

  // 3. Thermal Delta Status
  let thermalStatus = "SAFE";
  let thermalColor = "text-green-400";
  let thermalBarColor = "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]";
  const thermalPct = Math.min(100, (tempDiff / 12) * 100);

  if (tempDiff > 12) {
    thermalStatus = "CRITICAL";
    thermalColor = "text-red-400 animate-pulse font-bold";
    thermalBarColor = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-pulse";
  } else if (tempDiff > 10) {
    thermalStatus = "MODERATE";
    thermalColor = "text-yellow-400";
    thermalBarColor = "bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.5)]";
  }

  return (
    <div className="glass-panel border border-slate-800/80 rounded-3xl p-5 shadow-xl flex flex-col h-[320px]">
      <div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Activity size={16} className="text-blue-400" />
          Sensor Threshold Health
        </h3>
        <p className="text-slate-400 text-xs mt-0.5">Real-time parameters vs safety boundaries.</p>
      </div>

      <div className="flex-grow flex flex-col justify-center space-y-4 mt-2">
        {/* Tool Wear Status */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Tool Wear: {toolWear} min / 200 min</span>
            <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 ${wearColor}`}>
              {wearStatus}
            </span>
          </div>
          <div className="w-full bg-slate-905 h-2 rounded-full border border-slate-850">
            <div className={`h-full rounded-full transition-all duration-500 ${wearBarColor}`} style={{ width: `${wearPct}%` }} />
          </div>
        </div>

        {/* Torque Status */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Torque: {torque.toFixed(1)} Nm / 60 Nm</span>
            <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 ${torqueColor}`}>
              {torqueStatus}
            </span>
          </div>
          <div className="w-full bg-slate-905 h-2 rounded-full border border-slate-850">
            <div className={`h-full rounded-full transition-all duration-500 ${torqueBarColor}`} style={{ width: `${torquePct}%` }} />
          </div>
        </div>

        {/* Thermal Delta Status */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Thermal Delta: {tempDiff.toFixed(1)} K / 12 K</span>
            <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 ${thermalColor}`}>
              {thermalStatus}
            </span>
          </div>
          <div className="w-full bg-slate-905 h-2 rounded-full border border-slate-850">
            <div className={`h-full rounded-full transition-all duration-500 ${thermalBarColor}`} style={{ width: `${thermalPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensorHealthStatus;
