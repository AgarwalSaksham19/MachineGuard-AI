function ConfidenceCard({ confidence }) {
  return (
    <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between items-center text-center">
      <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-4 self-start">
        Model Confidence
      </h3>

      <div className="my-auto">
        <h2 className="text-4xl font-black text-blue-400 font-mono tracking-tight">
          {confidence}%
        </h2>
        <p className="text-slate-400 text-[11px] mt-1.5 font-medium">Prediction Certainty</p>
      </div>

      <p className="text-[9px] text-slate-500 mt-4 leading-none">
        Calculated from decision consensus rates.
      </p>
    </div>
  );
}

export default ConfidenceCard;
