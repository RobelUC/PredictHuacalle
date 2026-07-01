import { httpClient } from "../../../shared/api/httpClient";
import type {
  DashboardStatusResponse,
  PredictRiskRequest,
  PredictRiskResponse,
  StudentRisk,
  UploadSiagieResponse,
} from "../types/dashboard.types";

function getInitials(name: string): string {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "SN";
}

export async function fetchDashboardStatus(): Promise<DashboardStatusResponse> {
  return httpClient.get<DashboardStatusResponse>("/api/status");
}

export async function predictStudentRisk(payload: PredictRiskRequest): Promise<PredictRiskResponse> {
  return httpClient.post<PredictRiskResponse>("/api/predict", payload);
}

export async function uploadSiagieFile(file: File): Promise<UploadSiagieResponse> {
  const formData = new FormData();
  formData.append("file", file);
  return httpClient.post<UploadSiagieResponse>("/api/upload_siagie", formData);
}

export function mapAlertStudents(students: UploadSiagieResponse["top_5_high_risk"]): StudentRisk[] {
  return students.map((student) => ({
    ...student,
    nombre: student.nombre || "Sin nombre",
    iniciales: getInitials(student.nombre || "Sin nombre"),
  }));
}
