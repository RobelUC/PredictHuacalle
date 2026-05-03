import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStatus } from "../services/dashboardService";

export const dashboardKeys = {
  status: ["dashboard", "status"] as const,
};

export function useDashboardSummaryQuery() {
  return useQuery({
    queryKey: dashboardKeys.status,
    queryFn: fetchDashboardStatus,
  });
}
