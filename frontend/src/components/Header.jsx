import { useEffect, useState } from "react";
import { Activity, Clock, Cpu } from "lucide-react";

function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const formattedDate = time.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-6 border-b border-slate-900">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
            AI Engine Active
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase animate-pulse">
            Live Monitoring
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
          MACHINEGUARD AI
        </h1>
        <p className="text-slate-400 mt-2 text-sm lg:text-base max-w-2xl leading-relaxed">
          Provide real-time telemetry inputs (temperature, speed, torque, wear) to evaluate current machine health and predict potential mechanical failures.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
        {/* TIME CARD */}
        <div className="glass-panel border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">System Time</p>
            <p className="text-slate-100 font-bold font-mono text-sm leading-tight mt-0.5">{formattedTime}</p>
            <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">{formattedDate}</p>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="glass-panel border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-pulse-slow">
            <Activity size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Telemetry Stream</p>
            <p className="text-emerald-400 font-bold text-sm leading-tight mt-0.5">ACTIVE</p>
            <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">Sampling Rate: 1 Hz</p>
          </div>
        </div>

        {/* MODEL CARD */}
        <div className="glass-panel border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Cpu size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">ML Predictor</p>
            <p className="text-purple-400 font-bold text-sm leading-tight mt-0.5">RANDOM FOREST</p>
            <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">Accuracy: 98.4%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
