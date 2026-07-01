export type GradeLiteral = "AD" | "A" | "B" | "C";
export type RiskLevel = "alto" | "medio" | "bajo";

export interface RiskSummary {
  alto: number;
  medio: number;
  bajo: number;
}

export interface PredictRiskRequest {
  asistencias: number;
  nota_matematica: GradeLiteral;
  nota_lenguaje: GradeLiteral;
  participacion: number;
}

export interface PredictRiskResponse {
  prediction: string;
  confidence: number;
  model: string;
  scale: string;
}

export interface StudentRisk {
  nombre: string;
  asistencias: number;
  nota_matematica: GradeLiteral;
  nota_lenguaje: GradeLiteral;
  participacion: number;
  risk_level: RiskLevel;
  risk_score: number;
  iniciales: string;
}

export interface UploadSiagieResponse {
  summary: RiskSummary;
  total_students: number;
  top_5_high_risk: Array<Omit<StudentRisk, "iniciales">>;
}

export interface DashboardStatusResponse {
  status: string;
  message: string;
  model_loaded: boolean;
}

export interface DashboardPredictionResult {
  sourceLabel: string;
  prediction: string;
  confidence: number;
}
