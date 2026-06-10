import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "./ChartCard";
import { GRID_COLOR, AXIS_COLOR, TOOLTIP_STYLE, TOOLTIP_LABEL_STYLE, TOOLTIP_ITEM_STYLE } from "./chartTheme";

export default function TopTopicsChart({ data, loading }) {
  const chartData = (data || []).slice(0, 10);

  return (
    <ChartCard
      title="Most Discussed Topics"
      subtitle="Top topics by number of records"
      loading={loading}
      isEmpty={chartData.length === 0}
      className="min-h-[340px]"
    >
      <ResponsiveContainer width="100%" height={Math.max(280, chartData.length * 32)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} horizontal={false} />
          <XAxis type="number" stroke={AXIS_COLOR} fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="topic"
            stroke={AXIS_COLOR}
            fontSize={11}
            width={110}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            labelStyle={TOOLTIP_LABEL_STYLE}
            itemStyle={TOOLTIP_ITEM_STYLE}
            formatter={(value, name) => [value, name === "count" ? "Records" : "Avg Intensity"]}
          />
          <Bar dataKey="count" fill="#22d3ee" radius={[0, 6, 6, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
