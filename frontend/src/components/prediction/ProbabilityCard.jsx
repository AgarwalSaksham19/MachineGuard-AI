function ProbabilityCard({ probability }) {
  const healthyProb = probability?.healthy ?? 100;
  const failureProb = probability?.failure ?? 0;

  return (
    <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
      <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-4">
        Prediction Probability
      </h3>

      <div className="space-y-4">
        {/* Healthy Probability */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Healthy Margin
            </span>
            <span className="font-mono text-slate-300">{healthyProb}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800/40">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#10b981]"
              style={{ width: `${healthyProb}%` }}
            />
          </div>
        </div>

        {/* Failure Probability */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-red-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              Failure Margin
            </span>
            <span className="font-mono text-slate-300">{failureProb}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800/40">
            <div
              className="bg-red-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#ef4444]"
              style={{ width: `${failureProb}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-[9px] text-slate-500 mt-4 leading-none text-center">
        Margin ratios reflect the distribution of decision trees.
      </p>
    </div>
  );
}

export default ProbabilityCard;
