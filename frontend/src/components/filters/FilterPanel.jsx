import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useFilters } from "../../context/FilterContext";
import { getFilterOptions } from "../../api/client";
import MultiSelectFilter from "./MultiSelectFilter";
import RangeFilter from "./RangeFilter";

export default function FilterPanel() {
  const { filters, setFilter, resetFilters, activeFilterCount } = useFilters();
  const [options, setOptions] = useState(null);

  useEffect(() => {
    getFilterOptions().then(setOptions).catch(() => setOptions(null));
  }, []);

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300">Filters</h2>
        <button
          onClick={resetFilters}
          disabled={activeFilterCount === 0}
          className="flex items-center gap-1.5 rounded-md border border-surface-border px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:border-violet-500 hover:text-violet-300 disabled:opacity-40 disabled:hover:border-surface-border disabled:hover:text-slate-400"
        >
          <RotateCcw size={12} />
          Reset{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </button>
      </div>

      {!options ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse-soft rounded-lg bg-surface-700" />
          ))}
        </div>
      ) : (
        <>
          <MultiSelectFilter
            label="End Year"
            options={options.endYears}
            value={filters.endYear}
            onChange={(v) => setFilter("endYear", v)}
            placeholder="All years"
          />
          <MultiSelectFilter
            label="Topics"
            options={options.topics}
            value={filters.topics}
            onChange={(v) => setFilter("topics", v)}
            placeholder="All topics"
          />
          <MultiSelectFilter
            label="Sector"
            options={options.sectors}
            value={filters.sector}
            onChange={(v) => setFilter("sector", v)}
            placeholder="All sectors"
          />
          <MultiSelectFilter
            label="Region"
            options={options.regions}
            value={filters.region}
            onChange={(v) => setFilter("region", v)}
            placeholder="All regions"
          />
          <MultiSelectFilter
            label="PEST"
            options={options.pestles}
            value={filters.pestle}
            onChange={(v) => setFilter("pestle", v)}
            placeholder="All categories"
          />
          <MultiSelectFilter
            label="Source"
            options={options.sources}
            value={filters.source}
            onChange={(v) => setFilter("source", v)}
            placeholder="All sources"
          />
          <MultiSelectFilter
            label="Country"
            options={options.countries}
            value={filters.country}
            onChange={(v) => setFilter("country", v)}
            placeholder="All countries"
          />
          <MultiSelectFilter
            label="Likelihood"
            options={[1, 2, 3, 4]}
            value={filters.likelihood}
            onChange={(v) => setFilter("likelihood", v)}
            placeholder="All levels"
          />

          <div className="h-px bg-surface-border" />

          <RangeFilter
            label="Intensity"
            min={options.ranges?.minIntensity}
            max={options.ranges?.maxIntensity}
            value={filters.intensityRange}
            onChange={(v) => setFilter("intensityRange", v)}
          />
          <RangeFilter
            label="Relevance"
            min={options.ranges?.minRelevance}
            max={options.ranges?.maxRelevance}
            value={filters.relevanceRange}
            onChange={(v) => setFilter("relevanceRange", v)}
          />
        </>
      )}
    </div>
  );
}
