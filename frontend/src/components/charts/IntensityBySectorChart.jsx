import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import ChartCard from "./ChartCard";
import { COLORS, GRID_COLOR, AXIS_COLOR, TOOLTIP_STYLE, TOOLTIP_LABEL_STYLE, TOOLTIP_ITEM_STYLE } from "./chartTheme";

export default function IntensityBySectorChart({ data, loading }) {
  const chartData = (data || []).slice(0, 10);

  return (
    <ChartCard
      title="Average Intensity by Sector"
      subtitle="Top sectors ranked by average intensity score"
      loading={loading}
      isEmpty={chartData.length === 0}
      className="min-h-[340px]"
    >
      <ResponsiveContainer width="100%" height={Math.max(280, chartData.length * 32)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} horizontal={false} />
          <XAxis type="number" stroke={AXIS_COLOR} fontSize={11} tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="sector"
            stroke={AXIS_COLOR}
            fontSize={11}
            width={130}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            labelStyle={TOOLTIP_LABEL_STYLE}
            itemStyle={TOOLTIP_ITEM_STYLE}
            cursor={{ fill: "rgba(139,92,246,0.08)" }}
            formatter={(value, name) => [value, name === "avgIntensity" ? "Avg Intensity" : "Records"]}
          />
          <Bar dataKey="avgIntensity" radius={[0, 6, 6, 0]} maxBarSize={18}>
            {chartData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
