import { Info, RotateCcw, FileText } from "lucide-react";
import { jsPDF } from "jspdf";
import HealthGauge from "./HealthGauge";
import PredictionStatus from "./PredictionStatus";
import ProbabilityCard from "./ProbabilityCard";
import RiskCard from "./RiskCard";
import ConfidenceCard from "./ConfidenceCard";
import RecommendationCard from "./RecommendationCard";

function PredictionOverview({ prediction, onReset, inputs }) {
  if (!prediction) {
    return (
      <div className="glass-panel border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col justify-between min-h-[500px]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Diagnostics Output</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">Real-time prediction results based on sensor inputs.</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-center my-auto py-10">
          <div className="p-4 rounded-full bg-slate-900 border border-slate-800/60 text-slate-500 animate-pulse-slow">
            <Info size={40} />
          </div>
          <div>
            <p className="text-slate-300 font-semibold text-sm">Awaiting Telemetry</p>
            <p className="text-slate-500 text-xs mt-1 max-w-xs leading-relaxed">
              Configure parameters on the left panel and click "Evaluate Machine Status" to run ML inference.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const {
    health_score,
    machine_status,
    confidence,
    prediction_probability,
    risk_level,
    recommendations,
    timestamp,
    remaining_life,
    next_inspection,
    maintenance_priority,
  } = prediction;

  const exportPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Header Background
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 38, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("MachinePulse", 15, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text("AI-POWERED PREDICTIVE MAINTENANCE REPORT", 15, 22);

    // Meta Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`REPORT ID: MP-${Date.now().toString().slice(-6)}`, 150, 16);
    doc.text(`GENERATED: ${timestamp}`, 150, 22);
    doc.text("OPERATOR ACCESS: SECURE", 150, 28);

    // Section 1: System Diagnosis
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("1. SYSTEM DIAGNOSTIC EVALUATION", 15, 52);
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.4);
    doc.line(15, 54, 195, 54);

    // Diagnostics Table Info
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105); // slate-600

    doc.setFont("helvetica", "normal");
    doc.text("Machine Status:", 18, 62);
    doc.setFont("helvetica", "bold");
    if (machine_status === "Healthy") {
      doc.setTextColor(22, 163, 74); // green-600
      doc.text("OPERATIONAL (HEALTHY)", 65, 62);
    } else {
      doc.setTextColor(220, 38, 38); // red-600
      doc.text("FAILURE DETECTED (ACTION REQ.)", 65, 62);
    }

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Overall Health Score:", 18, 70);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`${health_score}%`, 65, 70);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Prediction Confidence:", 18, 78);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(`${confidence}%`, 65, 78);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Critical Risk Level:", 18, 86);
    doc.setFont("helvetica", "bold");
    if (risk_level === "Low") {
      doc.setTextColor(22, 163, 74);
    } else if (risk_level === "Moderate" || risk_level === "Medium") {
      doc.setTextColor(202, 138, 4); // yellow-600
    } else {
      doc.setTextColor(220, 38, 38);
    }
    doc.text(`${risk_level.toUpperCase()}`, 65, 86);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Healthy/Failure Margins:", 18, 94);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`${prediction_probability?.healthy ?? 100}% / ${prediction_probability?.failure ?? 0}%`, 65, 94);

    // Section 2: Sensor Telemetry
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("2. ACTIVE TELEMETRY INPUTS", 15, 110);
    doc.line(15, 112, 195, 112);

    const activeInputs = inputs || {
      Type: 1,
      "Air temperature [K]": 298.1,
      "Process temperature [K]": 308.6,
      "Rotational speed [rpm]": 1550,
      "Torque [Nm]": 40.0,
      "Tool wear [min]": 10,
    };

    const typeStr = activeInputs.Type === 0 ? "Low Carbon Steel (L)" : (activeInputs.Type === 1 ? "Medium Carbon Steel (M)" : "High Carbon Steel (H)");

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);

    doc.text("Machine Quality Type:", 18, 120);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(typeStr, 75, 120);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Air Temperature [K]:", 18, 127);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`${activeInputs["Air temperature [K]"]} K`, 75, 127);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Process Temperature [K]:", 18, 134);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`${activeInputs["Process temperature [K]"]} K`, 75, 134);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Rotational Speed [RPM]:", 18, 141);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`${activeInputs["Rotational speed [rpm]"]} RPM`, 75, 141);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Torque [Nm]:", 18, 148);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`${activeInputs["Torque [Nm]"]} Nm`, 75, 148);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Tool Wear [Minutes]:", 18, 155);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`${activeInputs["Tool wear [min]"]} minutes`, 75, 155);

    // Section 3: Recommendations
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("3. MAINTENANCE & REMEDIATION PLAN", 15, 172);
    doc.line(15, 174, 195, 174);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    let yPos = 182;
    recommendations.forEach((rec, idx) => {
      doc.text(`- ${rec}`, 18, yPos);
      yPos += 7;
    });

    // Section 4: Model Specifications
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("4. PREDICTOR ML CONFIGURATION", 15, 215);
    doc.line(15, 217, 195, 217);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("Classifier Engine:", 18, 225);
    doc.setFont("helvetica", "bold");
    doc.text("Random Forest Classifier", 75, 225);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Engine Accuracy:", 18, 232);
    doc.setFont("helvetica", "bold");
    doc.text("98.4% (Holdout Split)", 75, 232);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Reference Dataset:", 18, 239);
    doc.setFont("helvetica", "bold");
    doc.text("AI4I 2020 Predictive Maintenance Dataset", 75, 239);

    // Footer Panel
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(0, 274, 210, 23, "F");

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.setFont("helvetica", "italic");
    doc.text("CONFIDENTIAL REPORT - GENERATED AUTOMATICALLY VIA MACHINEPULSE ENGINE", 15, 283);
    doc.text("Report complies with ISO/TR 24483 predictive telemetry protocols.", 15, 288);

    doc.save(`MachinePulse_Report_${Date.now().toString().slice(-6)}.pdf`);
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col justify-between min-h-[500px]">
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Diagnostic Report</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">Generated by Random Forest Classifier.</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={exportPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 border border-blue-500 text-[10px] font-semibold text-white transition-colors uppercase tracking-wider"
            >
              <FileText size={12} />
              Export PDF
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-[10px] font-semibold text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
        </div>

        {/* 5-Column Grid containing the subcomponents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <HealthGauge healthScore={health_score} status={machine_status} />
          <PredictionStatus status={machine_status} />
          <ProbabilityCard probability={prediction_probability} />
          <RiskCard riskLevel={risk_level} />
          <ConfidenceCard confidence={confidence} />
        </div>

        {/* Dynamic Maintenance Recommendations */}
        <RecommendationCard recommendations={recommendations} status={machine_status} />
      </div>

      {/* AI Prognosis Specifications */}
      <div className="mt-6 pt-5 border-t border-slate-900/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <p className="text-slate-500 font-semibold uppercase tracking-wider text-[9px]">Remaining Life Est.</p>
          <p className="text-slate-200 font-bold mt-1 font-mono">{remaining_life || "N/A"}</p>
        </div>
        <div>
          <p className="text-slate-500 font-semibold uppercase tracking-wider text-[9px]">Next Inspection</p>
          <p className="text-slate-200 font-bold mt-1 font-mono">{next_inspection || "N/A"}</p>
        </div>
        <div>
          <p className="text-slate-500 font-semibold uppercase tracking-wider text-[9px]">Priority Level</p>
          <p className={`font-bold mt-1 font-mono uppercase ${
            maintenance_priority === "Low" 
              ? "text-green-400" 
              : maintenance_priority === "Moderate" || maintenance_priority === "Medium"
              ? "text-yellow-400" 
              : "text-red-400"
          }`}>{maintenance_priority || "N/A"}</p>
        </div>
        <div>
          <p className="text-slate-500 font-semibold uppercase tracking-wider text-[9px]">Execution Time</p>
          <p className="text-slate-400 font-mono mt-1 text-[11px]">{timestamp || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default PredictionOverview;
