import { createContext, useContext, useMemo, useState, useCallback } from "react";

const FilterContext = createContext(null);

export const EMPTY_FILTERS = {
  endYear: [],
  topics: [],
  sector: [],
  region: [],
  pestle: [],
  source: [],
  country: [],
  likelihood: [],
  intensityRange: null,
  relevanceRange: null,
};

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
  }, []);

  const queryParams = useMemo(() => {
    const params = {};
    if (filters.endYear.length) params.endYear = filters.endYear.join(",");
    if (filters.topics.length) params.topics = filters.topics.join(",");
    if (filters.sector.length) params.sector = filters.sector.join(",");
    if (filters.region.length) params.region = filters.region.join(",");
    if (filters.pestle.length) params.pestle = filters.pestle.join(",");
    if (filters.source.length) params.source = filters.source.join(",");
    if (filters.country.length) params.country = filters.country.join(",");
    if (filters.likelihood.length) params.likelihood = filters.likelihood.join(",");
    if (filters.intensityRange) {
      params.intensityMin = filters.intensityRange[0];
      params.intensityMax = filters.intensityRange[1];
    }
    if (filters.relevanceRange) {
      params.relevanceMin = filters.relevanceRange[0];
      params.relevanceMax = filters.relevanceRange[1];
    }
    return params;
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.endYear.length;
    count += filters.topics.length;
    count += filters.sector.length;
    count += filters.region.length;
    count += filters.pestle.length;
    count += filters.source.length;
    count += filters.country.length;
    count += filters.likelihood.length;
    if (filters.intensityRange) count += 1;
    if (filters.relevanceRange) count += 1;
    return count;
  }, [filters]);

  const value = { filters, setFilter, resetFilters, queryParams, activeFilterCount };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within a FilterProvider");
  return ctx;
}
