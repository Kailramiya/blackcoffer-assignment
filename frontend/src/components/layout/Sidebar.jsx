import { X, BarChart3 } from "lucide-react";
import FilterPanel from "../filters/FilterPanel";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-80 transform border-r border-surface-border bg-surface-800-solid transition-transform duration-200 ease-out lg:static lg:translate-x-0 lg:bg-surface-800 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
                <BarChart3 size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight text-white">Blackcoffer</p>
                <p className="text-xs leading-tight text-slate-400">Insights Dashboard</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-slate-400 hover:bg-surface-600 hover:text-white lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          <FilterPanel />
        </div>
      </aside>
    </>
  );
}
