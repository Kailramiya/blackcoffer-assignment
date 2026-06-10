import { useState } from "react";
import { Database, Gauge, TrendingUp, Target, Globe2, Tags } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import ActiveFilters from "../components/filters/ActiveFilters";
import StatCard from "../components/stats/StatCard";
import IntensityBySectorChart from "../components/charts/IntensityBySectorChart";
import IntensityByRegionChart from "../components/charts/IntensityByRegionChart";
import YearlyTrendChart from "../components/charts/YearlyTrendChart";
import PestleDonutChart from "../components/charts/PestleDonutChart";
import TopTopicsChart from "../components/charts/TopTopicsChart";
import TopSourcesChart from "../components/charts/TopSourcesChart";
import LikelihoodRelevanceBubbleChart from "../components/charts/LikelihoodRelevanceBubbleChart";
import WorldMapChart from "../components/charts/WorldMapChart";
import { useFilters } from "../context/FilterContext";
import { useDashboardData } from "../hooks/useDashboardData";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { queryParams } = useFilters();
  const { data, loading, error } = useDashboardData(queryParams);

  const overview = data?.overview;

  return (
    <div className="flex h-screen overflow-hidden bg-surface-900">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          onRefresh={() => window.location.reload()}
          totalRecords={overview?.totalRecords}
          loading={loading}
        />
        <ActiveFilters />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
              Failed to load dashboard data. Make sure the backend API is running on port 5000.
            </div>
          )}

          {/* KPI cards */}
          <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard
              label="Total Records"
              value={overview ? overview.totalRecords.toLocaleString() : "—"}
              icon={Database}
              accent="violet"
            />
            <StatCard
              label="Avg Intensity"
              value={overview ? overview.avgIntensity : "—"}
              icon={Gauge}
              accent="cyan"
            />
            <StatCard
              label="Avg Likelihood"
              value={overview ? overview.avgLikelihood : "—"}
              icon={TrendingUp}
              accent="amber"
            />
            <StatCard
              label="Avg Relevance"
              value={overview ? overview.avgRelevance : "—"}
              icon={Target}
              accent="pink"
            />
            <StatCard
              label="Countries"
              value={overview ? overview.countriesCount : "—"}
              icon={Globe2}
              accent="emerald"
            />
            <StatCard
              label="Topics"
              value={overview ? overview.topicsCount : "—"}
              icon={Tags}
              accent="violet"
            />
          </div>

          {/* Chart grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <WorldMapChart data={data?.countryIntensity} loading={loading} />
            <IntensityBySectorChart data={data?.intensityBySector} loading={loading} />
            <YearlyTrendChart data={data?.yearlyTrend} loading={loading} />
            <PestleDonutChart data={data?.pestleDistribution} loading={loading} />
            <TopTopicsChart data={data?.topTopics} loading={loading} />
            <LikelihoodRelevanceBubbleChart data={data?.likelihoodRelevanceBubble} loading={loading} />
            <IntensityByRegionChart data={data?.intensityByRegion} loading={loading} />
            <TopSourcesChart data={data?.topSources} loading={loading} />
          </div>
        </main>
      </div>
    </div>
  );
}
