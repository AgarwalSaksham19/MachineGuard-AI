import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Trash2, History } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function FailureChart({ history = [], onClearHistory }) {
  // Prep chart data
  const chartLabels = history.map((_, i) => `Run #${i + 1}`);
  const healthScores = history.map((item) => item.health_score);

  const data = {
    labels: chartLabels.length > 0 ? chartLabels : ["No Runs"],
    datasets: [
      {
        label: "Health Score",
        data: healthScores.length > 0 ? healthScores : [100],
        borderColor: "rgba(16, 185, 129, 0.8)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#10b981",
        borderWidth: 2,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0f172a",
        borderColor: "#334155",
        borderWidth: 1,
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        padding: 10,
        callbacks: {
          afterBody: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const run = history[index];
            if (run) {
              return `Status: ${run.machine_status}\nRisk: ${run.risk_level}\nTime: ${run.timestamp}`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
          font: {
            family: "Outfit, Inter",
            size: 9,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.03)",
        },
        ticks: {
          color: "#64748b",
          font: {
            family: "Outfit, Inter",
            size: 10,
          },
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-3xl p-5 shadow-xl flex flex-col h-[320px]">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <History size={16} className="text-emerald-400" />
            Machine Health Trend
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">Historical overview of recent diagnostics.</p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/30 text-slate-500 hover:text-red-400 transition"
            title="Clear History"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>

      <div className="flex-1 mt-4 relative">
        {history.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs font-medium">
            Run diagnostic tests to populate history trend.
          </div>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
}

export default FailureChart;
