import { useEffect, useState } from "react";

export default function RangeFilter({ label, min, max, value, onChange }) {
  const [low, high] = value || [min, max];

  const [localLow, setLocalLow] = useState(low);
  const [localHigh, setLocalHigh] = useState(high);

  useEffect(() => {
    setLocalLow(low);
    setLocalHigh(high);
  }, [low, high]);

  if (min === undefined || max === undefined || min === max) return null;

  const commit = (nextLow, nextHigh) => {
    if (nextLow <= min && nextHigh >= max) {
      onChange(null);
    } else {
      onChange([nextLow, nextHigh]);
    }
  };

  const handleLowChange = (e) => {
    const v = Math.min(Number(e.target.value), localHigh);
    setLocalLow(v);
    commit(v, localHigh);
  };

  const handleHighChange = (e) => {
    const v = Math.max(Number(e.target.value), localLow);
    setLocalHigh(v);
    commit(localLow, v);
  };

  const lowPct = ((localLow - min) / (max - min)) * 100;
  const highPct = ((localHigh - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <span className="text-xs font-medium text-violet-300">
          {localLow} &ndash; {localHigh}
        </span>
      </div>
      <div className="relative h-5">
        <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full rounded-full bg-surface-600" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-violet-500"
          style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localLow}
          onChange={handleLowChange}
          className="range-thumb absolute top-1/2 -translate-y-1/2 w-full appearance-none bg-transparent pointer-events-none"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localHigh}
          onChange={handleHighChange}
          className="range-thumb absolute top-1/2 -translate-y-1/2 w-full appearance-none bg-transparent pointer-events-none"
        />
      </div>
    </div>
  );
}
