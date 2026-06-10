import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import ChartCard from "./ChartCard";
import worldGeo from "world-atlas/countries-110m.json";

// Map data country names to topojson feature names where they differ
const NAME_OVERRIDES = {
  "South Sudan": "S. Sudan",
};

export default function WorldMapChart({ data, loading }) {
  const [tooltip, setTooltip] = useState(null);

  const lookup = useMemo(() => {
    const map = new Map();
    (data || []).forEach((d) => {
      const geoName = NAME_OVERRIDES[d.country] || d.country;
      map.set(geoName, d);
    });
    return map;
  }, [data]);

  const colorScale = useMemo(() => {
    const values = (data || []).map((d) => d.avgIntensity);
    const max = Math.max(...values, 1);
    return scaleLinear()
      .domain([0, max / 2, max])
      .range(["#1e3a8a", "#8b5cf6", "#f472b6"]);
  }, [data]);

  const isEmpty = !data || data.length === 0;

  return (
    <ChartCard
      title="Average Intensity by Country"
      subtitle="Hover a country to see intensity, likelihood &amp; relevance"
      loading={loading}
      isEmpty={isEmpty}
      className="min-h-[380px] lg:col-span-2"
    >
      <div className="relative">
        <ComposableMap
          projectionConfig={{ scale: 140 }}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={worldGeo}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const entry = lookup.get(geo.properties.name);
                const fill = entry ? colorScale(entry.avgIntensity) : "#1a1f38";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#262c45"
                    strokeWidth={0.5}
                    onMouseEnter={(evt) => {
                      setTooltip({
                        name: geo.properties.name,
                        entry,
                        x: evt.clientX,
                        y: evt.clientY,
                      });
                    }}
                    onMouseMove={(evt) => {
                      setTooltip((prev) =>
                        prev ? { ...prev, x: evt.clientX, y: evt.clientY } : prev
                      );
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: { outline: "none", transition: "fill 0.2s" },
                      hover: { fill: "#22d3ee", outline: "none", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {tooltip && (
          <div
            className="pointer-events-none fixed z-50 rounded-lg border border-surface-border bg-surface-800-solid px-3 py-2 text-xs shadow-xl"
            style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}
          >
            <p className="font-bold text-white">{tooltip.name}</p>
            {tooltip.entry ? (
              <div className="mt-1 space-y-0.5 text-slate-300">
                <p>Avg Intensity: <span className="font-semibold text-violet-300">{tooltip.entry.avgIntensity}</span></p>
                <p>Avg Likelihood: <span className="font-semibold text-cyan-300">{tooltip.entry.avgLikelihood}</span></p>
                <p>Avg Relevance: <span className="font-semibold text-amber-300">{tooltip.entry.avgRelevance}</span></p>
                <p>Records: <span className="font-semibold text-slate-200">{tooltip.entry.count}</span></p>
              </div>
            ) : (
              <p className="mt-1 text-slate-500">No data</p>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <span>Low</span>
          <div className="h-2 flex-1 max-w-[160px] rounded-full bg-gradient-to-r from-[#1e2746] to-[#8b5cf6]" />
          <span>High intensity</span>
        </div>
      </div>
    </ChartCard>
  );
}
