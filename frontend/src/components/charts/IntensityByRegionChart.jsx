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

export default function IntensityByRegionChart({ data, loading }) {
  const chartData = data || [];

  return (
    <ChartCard
      title="Average Intensity by Region"
      subtitle="Top 12 regions ranked by average intensity"
      loading={loading}
      isEmpty={chartData.length === 0}
      className="min-h-[340px]"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ left: -10, right: 10, top: 5, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
          <XAxis
            dataKey="region"
            stroke={AXIS_COLOR}
            fontSize={10}
            angle={-35}
            textAnchor="end"
            interval={0}
            height={60}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke={AXIS_COLOR} fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            labelStyle={TOOLTIP_LABEL_STYLE}
            itemStyle={TOOLTIP_ITEM_STYLE}
            formatter={(value, name) => [value, name === "avgIntensity" ? "Avg Intensity" : "Records"]}
          />
          <Bar dataKey="avgIntensity" radius={[6, 6, 0, 0]} maxBarSize={32}>
            {chartData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
