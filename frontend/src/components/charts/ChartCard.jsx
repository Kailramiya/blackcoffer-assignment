export default function ChartCard({ title, subtitle, children, className = "", loading, isEmpty }) {
  return (
    <div
      className={`flex flex-col rounded-xl border border-surface-border bg-surface-700 p-4 sm:p-5 ${className}`}
    >
      <div className="mb-3">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
      <div className="relative flex-1">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-surface-700/60 backdrop-blur-[1px]">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
          </div>
        )}
        {isEmpty && !loading ? (
          <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-slate-500">
            No data for current filters
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
