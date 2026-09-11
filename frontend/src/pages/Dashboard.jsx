import { useEffect, useState, useRef } from "react";
import { Cpu, ShieldCheck, AlertTriangle, AlertCircle, History, Trash2 } from "lucide-react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import StatCard from "../components/StatCard";
import PredictionForm from "../components/PredictionForm";
import PredictionOverview from "../components/prediction/PredictionOverview";

import FailureChart from "../components/charts/FailureChart";
import FeatureChart from "../components/charts/FeatureChart";
import SensorHealthStatus from "../components/charts/SensorHealthStatus";
import ModelInfo from "../components/charts/ModelInfo";

import API from "../services/api";

function Dashboard() {
  const [prediction, setPrediction] = useState(null);
  const [activeInputs, setActiveInputs] = useState(null);
  const [history, setHistory] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Lifted form state for controlled behavior and simulation overrides
  const [formData, setFormData] = useState({
    Type: 1,
    "Air temperature [K]": 298.1,
    "Process temperature [K]": 308.6,
    "Rotational speed [rpm]": 1550,
    "Torque [Nm]": 40.0,
    "Tool wear [min]": 10,
  });

  const [stats, setStats] = useState({
    accuracy: 0,
    healthy: 0,
    maintenance: 0,
    critical: 0,
    dataset_size: 0,
    training_samples: 0,
    testing_samples: 0,
    model: "Random Forest",
    dataset: "AI4I 2020 Predictive Maintenance Dataset",
    version: "1.0",
    feature_importance: null,
  });

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("machinepulse_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error("Error reading prediction history:", err);
      }
    }

    async function fetchStats() {
      try {
        const res = await API.get("/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching model statistics from Flask:", err);
      }
    }

    fetchStats();
  }, []);

  const handlePredictionResponse = (resData, inputsSubmitted) => {
    setPrediction(resData);
    setActiveInputs(inputsSubmitted);

    // Save to history list
    const newHistoryEntry = {
      timestamp: resData.timestamp,
      health_score: resData.health_score,
      prediction: resData.machine_status, // "Healthy" vs "Failure"
      machine_status: resData.machine_status, // Compatibility
      confidence: resData.confidence,
      risk_level: resData.risk_level,
    };

    setHistory((prevHistory) => {
      const updated = [newHistoryEntry, ...prevHistory].slice(0, 30); // Limit to last 30 runs
      localStorage.setItem("machinepulse_history", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("machinepulse_history");
  };

  const handleReset = () => {
    setPrediction(null);
    setActiveInputs(null);
    setIsSimulating(false);
  };

  // Helper to round numbers to 1 decimal place
  const roundTo1 = (num) => Math.round(num * 10) / 10;

  // Simulation mode loop
  useEffect(() => {
    if (!isSimulating) return;

    const runSimulationStep = async () => {
      const rand = Math.random();
      let simulatedData = { ...formData };

      if (rand < 0.4) {
        // Scenario 1: Nominal/Healthy state
        simulatedData = {
          Type: Math.floor(Math.random() * 3),
          "Air temperature [K]": roundTo1(297.5 + Math.random() * 2),
          "Process temperature [K]": roundTo1(307.5 + Math.random() * 2),
          "Rotational speed [rpm]": Math.floor(1450 + Math.random() * 150),
          "Torque [Nm]": roundTo1(36.0 + Math.random() * 10),
          "Tool wear [min]": Math.floor(10 + Math.random() * 70),
        };
      } else if (rand < 0.7) {
        // Scenario 2: Warning state (borderline wear, torque, or delta)
        const warnTrigger = Math.random();
        simulatedData = {
          Type: Math.floor(Math.random() * 3),
          "Air temperature [K]": roundTo1(298.0 + Math.random() * 1.5),
          "Process temperature [K]": roundTo1(308.0 + Math.random() * 1.5),
          "Rotational speed [rpm]": Math.floor(1300 + Math.random() * 150),
          "Torque [Nm]": warnTrigger < 0.5 ? roundTo1(51.5 + Math.random() * 6) : roundTo1(36.0 + Math.random() * 10),
          "Tool wear [min]": warnTrigger >= 0.5 ? Math.floor(155 + Math.random() * 25) : Math.floor(10 + Math.random() * 50),
        };
      } else {
        // Scenario 3: Failure state (critical wear, torque, or thermal delta)
        const failTrigger = Math.random();
        const air = roundTo1(296.5 + Math.random() * 2);
        
        simulatedData = {
          Type: Math.floor(Math.random() * 3),
          "Air temperature [K]": air,
          "Process temperature [K]": failTrigger < 0.33 ? roundTo1(air + 13.2) : roundTo1(air + 9.5),
          "Rotational speed [rpm]": Math.floor(1150 + Math.random() * 100),
          "Torque [Nm]": (failTrigger >= 0.33 && failTrigger < 0.66) ? roundTo1(62.5 + Math.random() * 10) : roundTo1(35.0 + Math.random() * 10),
          "Tool wear [min]": failTrigger >= 0.66 ? Math.floor(205 + Math.random() * 30) : Math.floor(10 + Math.random() * 50),
        };
      }

      setFormData(simulatedData);

      try {
        const res = await API.post("/predict", simulatedData);
        handlePredictionResponse(res.data, simulatedData);
      } catch (err) {
        console.error("Simulation prediction failed:", err);
      }
    };

    // Execute first step immediately, then run on interval
    runSimulationStep();
    const interval = setInterval(runSimulationStep, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500/30 selection:text-blue-200">
      <div>
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Header />

          {/* Simulation Toggle Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-slate-900/40 border border-slate-900 p-4 rounded-2xl">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Dashboard Diagnostics Mode</span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2.5 h-2.5 rounded-full ${isSimulating ? 'bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]' : 'bg-slate-600'}`} />
                <span className="text-slate-200 font-extrabold text-sm uppercase">
                  {isSimulating ? 'Live Simulation Stream Active' : 'Manual Telemetry Mode'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 shadow-md ${
                isSimulating
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {isSimulating ? '🛑 STOP SIMULATION' : '▶️ START SIMULATION'}
            </button>
          </div>

          {/* Top Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard
              title="ML Model Accuracy"
              value={`${stats.accuracy}%`}
              color="text-blue-400 font-mono"
              icon={Cpu}
              description={`Algorithm: ${stats.model}`}
            />

            <StatCard
              title="Healthy Machines"
              value={stats.healthy.toLocaleString()}
              color="text-emerald-400"
              icon={ShieldCheck}
              description="Dataset baseline samples"
            />

            <StatCard
              title="Maintenance Warnings"
              value={stats.maintenance.toLocaleString()}
              color="text-yellow-400"
              icon={AlertTriangle}
              description="Early failure warnings logged"
            />

            <StatCard
              title="Critical Faults"
              value={stats.critical.toLocaleString()}
              color="text-red-400 animate-pulse"
              icon={AlertCircle}
              description="Operational failures predicted"
            />
          </div>

          {/* Diagnostics Section */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            <div className="xl:col-span-5">
              <PredictionForm
                formData={formData}
                setFormData={setFormData}
                onSubmitSuccess={handlePredictionResponse}
              />
            </div>

            <div className="xl:col-span-7">
              <PredictionOverview 
                prediction={prediction} 
                onReset={handleReset} 
                inputs={activeInputs} 
              />
            </div>
          </div>

          {/* Charts/Analytics Panel */}
          <div className="mt-12">
            <h2 className="text-xl font-bold tracking-tight text-white mb-6 uppercase flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full" />
              Machine Analytics Control Panel
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FailureChart history={history} onClearHistory={handleClearHistory} />
              <FeatureChart importances={stats.feature_importance} />
              <SensorHealthStatus inputs={activeInputs} />
              <ModelInfo stats={stats} />
            </div>
          </div>

          {/* Timeline History log list */}
          <div className="mt-8 glass-panel border border-slate-800/80 rounded-3xl p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-900/60">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <History size={16} className="text-blue-400" />
                  Telemetry Diagnostics Timeline
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Chronological record of diagnostic reports.</p>
              </div>
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-900 hover:border-red-500/20 text-[10px] font-bold text-slate-500 hover:text-red-400 uppercase tracking-wider transition-all"
                >
                  <Trash2 size={12} />
                  Clear Timeline Logs
                </button>
              )}
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
              {history.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs font-semibold">
                  No diagnostic records logged. Run manual telemetry predictions or toggle simulation mode.
                </div>
              ) : (
                history.map((entry, index) => (
                  <div key={index} className="bg-slate-950/40 border border-slate-900/60 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-slate-800 transition">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${entry.prediction === "Healthy" ? 'bg-green-500 shadow-[0_0_6px_#22c55e]' : 'bg-red-500 shadow-[0_0_6px_#ef4444]'}`} />
                      <div>
                        <p className="text-xs font-bold text-slate-200">
                          Run #{history.length - index} • {entry.prediction === "Healthy" ? 'OPERATIONAL' : 'FAILURE DETECTED'}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{entry.timestamp}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs font-semibold text-slate-400">
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wide">Health</span>
                        <span className={entry.health_score >= 90 ? 'text-green-400 font-mono font-bold' : (entry.health_score >= 70 ? 'text-yellow-400 font-mono font-bold' : 'text-red-400 font-mono font-bold')}>{entry.health_score}%</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wide">Risk</span>
                        <span className={entry.risk_level === 'Low' ? 'text-green-400 font-bold' : (entry.risk_level === 'Moderate' || entry.risk_level === 'Medium' ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold')}>{entry.risk_level}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wide">Confidence</span>
                        <span className="text-blue-400 font-mono font-bold">{entry.confidence}%</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
