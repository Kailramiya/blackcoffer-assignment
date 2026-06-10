import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ChartCard from "./ChartCard";
import { COLORS, TOOLTIP_STYLE, TOOLTIP_LABEL_STYLE, TOOLTIP_ITEM_STYLE } from "./chartTheme";

export default function PestleDonutChart({ data, loading }) {
  const chartData = data || [];

  return (
    <ChartCard
      title="PEST Category Distribution"
      subtitle="Share of records by Political, Economic, Social, Technological etc."
      loading={loading}
      isEmpty={chartData.length === 0}
      className="min-h-[340px]"
    >
      <div className="flex h-full flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <div className="h-[260px] w-full sm:h-full sm:flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="pestle"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
              >
                {chartData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                labelStyle={TOOLTIP_LABEL_STYLE}
                itemStyle={TOOLTIP_ITEM_STYLE}
                formatter={(value, name) => [value, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex w-full flex-col gap-1.5 sm:w-36 sm:flex-shrink-0">
          {chartData.map((entry, idx) => (
            <li key={entry.pestle} className="flex items-center gap-2 text-xs text-slate-300">
              <span
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span className="truncate">{entry.pestle}</span>
              <span className="ml-auto text-slate-500">{entry.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
}
