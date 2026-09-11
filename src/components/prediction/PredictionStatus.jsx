import { ShieldCheck, AlertTriangle } from "lucide-react";

function PredictionStatus({ status }) {
  const isHealthy = status === "Healthy";

  return (
    <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
      <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-3 self-start">
        Prognosis Status
      </h3>

      <div className={`p-3.5 rounded-full ${isHealthy ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse'}`}>
        {isHealthy ? <ShieldCheck size={36} /> : <AlertTriangle size={36} />}
      </div>

      <h4 className={`text-xl font-black mt-3 ${isHealthy ? 'text-green-400' : 'text-red-400'}`}>
        {isHealthy ? "OPERATIONAL" : "FAILURE DETECTED"}
      </h4>

      <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
        {isHealthy 
          ? "Telemetry signals nominal. The predictive algorithm estimates steady state operation." 
          : "Anomalous sensor signals. Highly recommend checking components immediately."}
      </p>
    </div>
  );
}

export default PredictionStatus;
