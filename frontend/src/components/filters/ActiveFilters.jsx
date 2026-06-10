import { X } from "lucide-react";
import { useFilters } from "../../context/FilterContext";

const LIST_KEYS = [
  { key: "endYear", label: "Year" },
  { key: "topics", label: "Topic" },
  { key: "sector", label: "Sector" },
  { key: "region", label: "Region" },
  { key: "pestle", label: "PEST" },
  { key: "source", label: "Source" },
  { key: "country", label: "Country" },
  { key: "likelihood", label: "Likelihood" },
];

const RANGE_KEYS = [
  { key: "intensityRange", label: "Intensity" },
  { key: "relevanceRange", label: "Relevance" },
];

export default function ActiveFilters() {
  const { filters, setFilter, activeFilterCount } = useFilters();

  if (activeFilterCount === 0) return null;

  const removeListItem = (key, item) => {
    setFilter(
      key,
      filters[key].filter((v) => v !== item)
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-surface-border bg-surface-800 px-4 py-3 sm:px-6">
      {LIST_KEYS.flatMap(({ key, label }) =>
        filters[key].map((item) => (
          <span
            key={`${key}-${item}`}
            className="flex items-center gap-1.5 rounded-full bg-surface-600 py-1 pl-3 pr-1.5 text-xs font-medium text-slate-200"
          >
            <span className="text-violet-300">{label}:</span> {item}
            <button
              onClick={() => removeListItem(key, item)}
              className="rounded-full p-0.5 text-slate-400 hover:bg-surface-border hover:text-white"
            >
              <X size={12} />
            </button>
          </span>
        ))
      )}
      {RANGE_KEYS.map(({ key, label }) =>
        filters[key] ? (
          <span
            key={key}
            className="flex items-center gap-1.5 rounded-full bg-surface-600 py-1 pl-3 pr-1.5 text-xs font-medium text-slate-200"
          >
            <span className="text-violet-300">{label}:</span> {filters[key][0]}&ndash;{filters[key][1]}
            <button
              onClick={() => setFilter(key, null)}
              className="rounded-full p-0.5 text-slate-400 hover:bg-surface-border hover:text-white"
            >
              <X size={12} />
            </button>
          </span>
        ) : null
      )}
    </div>
  );
}
