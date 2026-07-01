import { useMutation } from "@tanstack/react-query";
import { predictStudentRisk } from "../services/dashboardService";

export function usePredictStudentRiskMutation() {
  return useMutation({
    mutationFn: predictStudentRisk,
  });
}
