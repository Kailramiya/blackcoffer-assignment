import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { scaleLinear } from "d3-scale";
import ChartCard from "./ChartCard";
import { GRID_COLOR, AXIS_COLOR, TOOLTIP_STYLE, TOOLTIP_LABEL_STYLE, TOOLTIP_ITEM_STYLE } from "./chartTheme";

export default function LikelihoodRelevanceBubbleChart({ data, loading }) {
  const chartData = data || [];

  const colorScale = useMemo(() => {
    const intensities = chartData.map((d) => d.avgIntensity);
    const min = Math.min(...intensities, 0);
    const max = Math.max(...intensities, 1);
    return scaleLinear().domain([min, max]).range(["#22d3ee", "#f472b6"]);
  }, [chartData]);

  return (
    <ChartCard
      title="Likelihood vs Relevance"
      subtitle="Bubble size = record count, color = average intensity"
      loading={loading}
      isEmpty={chartData.length === 0}
      className="min-h-[340px]"
    >
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ left: -10, right: 20, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
          <XAxis
            type="number"
            dataKey="likelihood"
            name="Likelihood"
            domain={[0, 5]}
            ticks={[1, 2, 3, 4]}
            stroke={AXIS_COLOR}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="number"
            dataKey="relevance"
            name="Relevance"
            domain={[0, 8]}
            stroke={AXIS_COLOR}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <ZAxis type="number" dataKey="count" range={[60, 700]} name="Records" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3", stroke: GRID_COLOR }}
            contentStyle={TOOLTIP_STYLE}
            labelStyle={TOOLTIP_LABEL_STYLE}
            itemStyle={TOOLTIP_ITEM_STYLE}
            formatter={(value, name) => [value, name]}
          />
          <Scatter data={chartData} fillOpacity={0.7}>
            {chartData.map((entry, idx) => (
              <Cell key={idx} fill={colorScale(entry.avgIntensity)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
