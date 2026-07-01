import { useMutation } from "@tanstack/react-query";
import { uploadSiagieFile } from "../services/dashboardService";

export function useUploadSiagieMutation() {
  return useMutation({
    mutationFn: uploadSiagieFile,
  });
}
