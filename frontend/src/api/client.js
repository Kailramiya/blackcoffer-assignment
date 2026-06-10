import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

export function getFilterOptions() {
  return apiClient.get("/filters/options").then((res) => res.data);
}

export function getInsightStats(params) {
  return apiClient.get("/insights/stats", { params }).then((res) => res.data);
}

export function getInsights(params) {
  return apiClient.get("/insights", { params }).then((res) => res.data);
}

export default apiClient;
