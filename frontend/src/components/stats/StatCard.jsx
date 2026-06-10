const ACCENT_CLASSES = {
  violet: "from-violet-500/20 to-violet-500/0 text-violet-300",
  cyan: "from-cyan-400/20 to-cyan-400/0 text-cyan-300",
  pink: "from-pink-400/20 to-pink-400/0 text-pink-300",
  amber: "from-amber-400/20 to-amber-400/0 text-amber-300",
  emerald: "from-emerald-400/20 to-emerald-400/0 text-emerald-300",
};

export default function StatCard({ label, value, icon: Icon, accent = "violet", suffix }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-surface-border bg-surface-700 p-4">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${ACCENT_CLASSES[accent]}`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-white">
            {value}
            {suffix && <span className="ml-1 text-sm font-medium text-slate-400">{suffix}</span>}
          </p>
        </div>
        {Icon && (
          <div className={`rounded-lg bg-surface-600/60 p-2 ${ACCENT_CLASSES[accent].split(" ").pop()}`}>
            <Icon size={18} />
          </div>
        )}
      </div>
    </div>
  );
}
