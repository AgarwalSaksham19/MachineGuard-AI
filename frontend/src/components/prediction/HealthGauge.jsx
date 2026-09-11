import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function HealthGauge({ healthScore, status }) {
  const isHealthy = status === "Healthy";
  
  // Custom color based on health score range
  let pathColor = "#22c55e"; // green
  if (healthScore < 40) {
    pathColor = "#ef4444"; // red
  } else if (healthScore < 70) {
    pathColor = "#f97316"; // orange
  } else if (healthScore < 90) {
    pathColor = "#eab308"; // yellow
  }

  return (
    <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center">
      <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-4 self-start">
        Health Score
      </h3>

      <div className="w-28 h-28 relative">
        <CircularProgressbar
          value={healthScore}
          text={`${healthScore}%`}
          strokeWidth={10}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: pathColor,
            trailColor: "#0f172a",
            textSize: "18px",
            pathTransitionDuration: 0.5,
          })}
        />
        {/* Subtle glow underneath */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-20 pointer-events-none" 
          style={{ backgroundColor: pathColor }}
        />
      </div>

      <p className="text-[10px] text-slate-400 mt-4 text-center">
        Overall condition score based on cumulative sensor anomalies.
      </p>
    </div>
  );
}

export default HealthGauge;
