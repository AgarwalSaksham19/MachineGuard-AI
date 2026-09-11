import { Cpu, ShieldCheck, Database, FileText } from "lucide-react";

function ModelInfo({ stats }) {
  const modelStats = stats || {
    model: "Random Forest",
    accuracy: 98.4,
    dataset: "AI4I 2020 Predictive Maintenance Dataset",
    training_samples: 8000,
    testing_samples: 2000,
    version: "1.0",
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-3xl p-5 shadow-xl flex flex-col justify-between h-[320px]">
      <div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Cpu size={16} className="text-purple-400" />
          Model Specifications
        </h3>
        <p className="text-slate-400 text-xs mt-0.5">Parameters and accuracy details of the active classifier.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 my-4">
        {/* MODEL */}
        <div className="bg-slate-950/70 border border-slate-900 rounded-xl p-3 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Algorithm</span>
          <span className="text-slate-200 font-bold text-xs mt-1 truncate">{modelStats.model}</span>
        </div>

        {/* ACCURACY */}
        <div className="bg-slate-950/70 border border-slate-900 rounded-xl p-3 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Testing Acc.</span>
          <span className="text-emerald-400 font-extrabold text-xs mt-1 font-mono">{modelStats.accuracy}%</span>
        </div>

        {/* TRAINING SAMPLES */}
        <div className="bg-slate-950/70 border border-slate-900 rounded-xl p-3 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Training Size</span>
          <span className="text-slate-200 font-bold text-xs mt-1 font-mono">{modelStats.training_samples}</span>
        </div>

        {/* TESTING SAMPLES */}
        <div className="bg-slate-950/70 border border-slate-900 rounded-xl p-3 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Testing Size</span>
          <span className="text-slate-200 font-bold text-xs mt-1 font-mono">{modelStats.testing_samples}</span>
        </div>
      </div>

      {/* Dataset Details */}
      <div className="bg-slate-950/40 border border-slate-900/60 rounded-xl p-3 text-xs flex items-start gap-2.5">
        <Database size={15} className="text-slate-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Reference Dataset</span>
          <p className="text-slate-300 font-medium text-xs mt-0.5 leading-relaxed">{modelStats.dataset}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-mono">
        <span>ENGINE VERSION: {modelStats.version}</span>
        <span>STATUS: ONLINE</span>
      </div>
    </div>
  );
}

export default ModelInfo;
