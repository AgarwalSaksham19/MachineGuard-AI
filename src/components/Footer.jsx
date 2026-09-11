import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-900 py-8 text-xs text-slate-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">MachinePulse</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">AI-Powered Predictive Maintenance</span>
          </div>
          <p className="text-slate-600 mt-1">
            Enterprise class telemetry diagnostics engine.
          </p>
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          <span>Engineered with</span>
          <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
          <span>using React • Flask • Scikit-Learn</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
