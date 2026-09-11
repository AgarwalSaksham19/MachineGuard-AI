import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function FeatureChart({ importances }) {
  // Fallback defaults in case backend is offline or loading
  const defaultImportances = {
    "Tool wear [min]": 35.5,
    "Torque [Nm]": 26.2,
    "Process temperature [K]": 16.8,
    "Rotational speed [rpm]": 12.4,
    "Air temperature [K]": 6.8,
    "Type": 2.3,
  };

  const dataMap = importances || defaultImportances;

  // Sort descending by importance
  const sortedFeatures = Object.entries(dataMap).sort((a, b) => b[1] - a[1]);
  const labels = sortedFeatures.map(([name]) => name.replace(" [K]", " (K)").replace(" [Nm]", " (Nm)").replace(" [rpm]", " (RPM)").replace(" [min]", " (Min)"));
  const dataValues = sortedFeatures.map(([, val]) => val);

  const data = {
    labels,
    datasets: [
      {
        label: "RF Feature Weight (%)",
        data: dataValues,
        backgroundColor: "rgba(59, 130, 246, 0.75)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(34, 211, 238, 0.85)",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#f1f5f9",
        bodyColor: "#cbd5e1",
        borderColor: "#334155",
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context) => ` ${context.parsed.x.toFixed(2)}% Importance`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.03)",
        },
        ticks: {
          color: "#64748b",
          font: {
            family: "Outfit, Inter",
            size: 10,
          },
          callback: (value) => `${value}%`,
        },
        max: 50,
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
          font: {
            family: "Outfit, Inter",
            size: 11,
            weight: "medium",
          },
        },
      },
    },
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-3xl p-5 shadow-xl flex flex-col h-[320px]">
      <div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Feature Importance</h3>
        <p className="text-slate-400 text-xs mt-1">RandomForest Classifier internal node-split weights.</p>
      </div>

      <div className="flex-1 mt-4 relative">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default FeatureChart;
