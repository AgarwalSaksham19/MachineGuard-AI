function RiskCard({ riskLevel }) {
  // Map backend risk levels (Low, Moderate, High, Critical) to Low, Medium, High
  let activeRisk = "LOW";
  if (riskLevel === "Moderate") {
    activeRisk = "MEDIUM";
  } else if (riskLevel === "High" || riskLevel === "Critical") {
    activeRisk = "HIGH";
  }

  return (
    <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
      <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-4">
        Risk Meter
      </h3>

      <div className="flex flex-col gap-2.5 my-auto">
        {/* LOW RISK INDICATOR */}
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-300 ${
            activeRisk === "LOW"
              ? "bg-green-500/10 border-green-500/50 text-green-400 font-bold animate-glow-green"
              : "bg-slate-955/30 border-slate-900/60 text-slate-600"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              activeRisk === "LOW" ? "bg-green-400" : "bg-slate-800"
            }`}
          />
          <span className="text-xs tracking-wider font-semibold">🟢 LOW</span>
        </div>

        {/* MEDIUM RISK INDICATOR */}
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-300 ${
            activeRisk === "MEDIUM"
              ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-400 font-bold animate-glow-yellow"
              : "bg-slate-955/30 border-slate-900/60 text-slate-600"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              activeRisk === "MEDIUM" ? "bg-yellow-400" : "bg-slate-800"
            }`}
          />
          <span className="text-xs tracking-wider font-semibold">🟡 MEDIUM</span>
        </div>

        {/* HIGH RISK INDICATOR */}
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-300 ${
            activeRisk === "HIGH"
              ? "bg-red-500/10 border-red-500/50 text-red-400 font-bold animate-glow-red"
              : "bg-slate-955/30 border-slate-900/60 text-slate-600"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              activeRisk === "HIGH" ? "bg-red-400" : "bg-slate-800"
            }`}
          />
          <span className="text-xs tracking-wider font-semibold">🔴 HIGH</span>
        </div>
      </div>

      <p className="text-[9px] text-slate-500 mt-4 leading-none text-center">
        Glow indicators follow system criticality alerts.
      </p>
    </div>
  );
}

export default RiskCard;
