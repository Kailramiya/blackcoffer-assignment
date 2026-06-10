import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "./ChartCard";
import { GRID_COLOR, AXIS_COLOR, TOOLTIP_STYLE, TOOLTIP_LABEL_STYLE, TOOLTIP_ITEM_STYLE } from "./chartTheme";

export default function YearlyTrendChart({ data, loading }) {
  const chartData = (data || []).map((d) => ({ ...d, year: String(d.year) }));

  return (
    <ChartCard
      title="Trend by End Year"
      subtitle="Average intensity, likelihood &amp; relevance over time"
      loading={loading}
      isEmpty={chartData.length === 0}
      className="min-h-[340px]"
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ left: 0, right: 0, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="year" type="category" stroke={AXIS_COLOR} fontSize={11} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="intensity"
            stroke="#8b5cf6"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            label={{ value: "Intensity", angle: -90, position: "insideLeft", fill: "#8b5cf6", fontSize: 11 }}
          />
          <YAxis
            yAxisId="score"
            orientation="right"
            domain={[0, 8]}
            stroke="#22d3ee"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            label={{ value: "Likelihood / Relevance", angle: 90, position: "insideRight", fill: "#22d3ee", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            labelStyle={TOOLTIP_LABEL_STYLE}
            itemStyle={TOOLTIP_ITEM_STYLE}
          />
          <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
          <Line yAxisId="intensity" type="monotone" dataKey="avgIntensity" name="Avg Intensity" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          <Line yAxisId="score" type="monotone" dataKey="avgLikelihood" name="Avg Likelihood" stroke="#22d3ee" strokeWidth={2} dot={false} />
          <Line yAxisId="score" type="monotone" dataKey="avgRelevance" name="Avg Relevance" stroke="#fbbf24" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
