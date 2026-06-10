import { Menu, RefreshCw } from "lucide-react";

export default function Topbar({ onMenuClick, onRefresh, totalRecords, loading }) {
  return (
    <header className="flex items-center justify-between border-b border-surface-border bg-surface-800 px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-slate-300 hover:bg-surface-600 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white sm:text-xl">Strategic Insights Overview</h1>
          <p className="text-xs text-slate-400 sm:text-sm">
            Visualizing intensity, likelihood &amp; relevance across sectors, regions &amp; topics
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {totalRecords !== undefined && (
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-lg font-bold text-white">{totalRecords.toLocaleString()}</span>
            <span className="text-xs text-slate-400">records matched</span>
          </div>
        )}
        <button
          onClick={onRefresh}
          className="rounded-md border border-surface-border p-2 text-slate-300 transition hover:border-violet-500 hover:text-violet-300"
          title="Refresh data"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>
    </header>
  );
}
