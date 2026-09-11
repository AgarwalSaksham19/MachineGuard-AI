import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

function RecommendationCard({ recommendations, status }) {
  const isHealthy = status === "Healthy";

  return (
    <div className={`mt-6 border rounded-2xl p-5 ${
      isHealthy 
        ? "bg-green-500/5 border-green-500/20 text-emerald-300" 
        : "bg-red-500/5 border-red-500/20 text-red-300"
    }`}>
      <div className="flex items-center gap-2.5 mb-4">
        {isHealthy ? (
          <ShieldCheck className="text-green-400" size={18} />
        ) : (
          <AlertTriangle className="text-red-400 animate-pulse" size={18} />
        )}
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
          MAINTENANCE PLAN & RECOMMENDATIONS
        </h4>
      </div>

      <div className="space-y-3">
        {recommendations.map((item, index) => (
          <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isHealthy ? 'text-green-400' : 'text-red-400'}`} />
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationCard;
