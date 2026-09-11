function StatCard({ title, value, color, icon: Icon, description }) {
  return (
    <div className="glass-panel border border-slate-800/60 rounded-2xl p-5 hover:border-slate-700/80 transition-all duration-300 group hover:-translate-y-0.5 shadow-xl relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500" />
      
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
          <h2 className={`text-3xl font-black tracking-tight mt-3 ${color || 'text-white'}`}>
            {value}
          </h2>
          {description && (
            <p className="text-[10px] text-slate-400 mt-2 font-medium">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-950/85 border border-slate-800/80 text-slate-400 group-hover:text-slate-200 group-hover:border-slate-700/80 transition-all duration-300">
            <Icon size={18} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
