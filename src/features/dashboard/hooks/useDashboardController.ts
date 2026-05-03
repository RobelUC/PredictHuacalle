import { useMemo, useState } from "react";
import { usePredictStudentRiskMutation } from "./usePredictStudentRiskMutation";
import { useUploadSiagieMutation } from "./useUploadSiagieMutation";
import type {
  DashboardPredictionResult,
  GradeLiteral,
  PredictRiskRequest,
  RiskSummary,
  StudentRisk,
} from "../types/dashboard.types";
import { mapAlertStudents } from "../services/dashboardService";

const initialForm: PredictRiskRequest = {
  asistencias: 0,
  nota_matematica: "A",
  nota_lenguaje: "A",
  participacion: 0,
};

const initialStats: RiskSummary = { alto: 4, medio: 7, bajo: 21 };

const initialAlerts: StudentRisk[] = [
  {
    nombre: "Luis Mendoza",
    iniciales: "LM",
    asistencias: 42,
    nota_matematica: "C",
    nota_lenguaje: "B",
    participacion: 3,
    risk_level: "alto",
    risk_score: 0.91,
  },
  {
    nombre: "Camila Rojas",
    iniciales: "CR",
    asistencias: 58,
    nota_matematica: "B",
    nota_lenguaje: "B",
    participacion: 4,
    risk_level: "medio",
    risk_score: 0.66,
  },
  {
    nombre: "Diego Huaman",
    iniciales: "DH",
    asistencias: 63,
    nota_matematica: "B",
    nota_lenguaje: "C",
    participacion: 5,
    risk_level: "medio",
    risk_score: 0.61,
  },
];

function classifyRisk(prediction: string, confidence: number): keyof RiskSummary {
  const predictedHigh = prediction.toLowerCase().includes("alto");
  if (predictedHigh) return "alto";
  if (confidence >= 0.5 && confidence < 0.75) return "medio";
  return "bajo";
}

export function useDashboardController() {
  const [stats, setStats] = useState<RiskSummary>(initialStats);
  const [alerts, setAlerts] = useState<StudentRisk[]>(initialAlerts);
  const [result, setResult] = useState<DashboardPredictionResult | null>(null);
  const [activeStudent, setActiveStudent] = useState<string>("");
  const [uiError, setUiError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PredictRiskRequest>(initialForm);

  const predictMutation = usePredictStudentRiskMutation();
  const uploadMutation = useUploadSiagieMutation();

  const totalStudents = stats.alto + stats.medio + stats.bajo;

  const barData = useMemo(
    () => [
      { label: "Riesgo alto", value: stats.alto, colorClass: "bg-red-500" },
      { label: "Riesgo medio", value: stats.medio, colorClass: "bg-orange-400" },
      { label: "Sin riesgo", value: stats.bajo, colorClass: "bg-emerald-500" },
    ],
    [stats],
  );

  const riskIsHigh = (result?.prediction ?? "").toLowerCase().includes("alto");

  async function runPrediction(payload: PredictRiskRequest, sourceLabel: string) {
    setUiError(null);
    const response = await predictMutation.mutateAsync(payload);
    const bucket = classifyRisk(response.prediction, response.confidence);
    setStats((prev) => ({ ...prev, [bucket]: prev[bucket] + 1 }));
    setResult({
      sourceLabel,
      prediction: response.prediction,
      confidence: response.confidence,
    });
  }

  async function submitManualPrediction() {
    try {
      await runPrediction(formData, "Formulario manual");
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo analizar el estudiante.";
      setUiError(message);
    }
  }

  async function analyzeAlertStudent(student: StudentRisk) {
    setActiveStudent(student.nombre);
    try {
      await runPrediction(
        {
          asistencias: student.asistencias,
          nota_matematica: student.nota_matematica,
          nota_lenguaje: student.nota_lenguaje,
          participacion: student.participacion,
        },
        `Alerta: ${student.nombre}`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo analizar la alerta.";
      setUiError(message);
    } finally {
      setActiveStudent("");
    }
  }

  async function uploadSiagie(file: File) {
    setUiError(null);
    try {
      const data = await uploadMutation.mutateAsync(file);
      setStats(data.summary);
      const mappedAlerts = mapAlertStudents(data.top_5_high_risk);
      setAlerts(mappedAlerts);
      setResult({
        sourceLabel: "Carga SIAGIE",
        prediction: data.summary.alto > data.summary.bajo ? "Alto Riesgo" : "Bajo Riesgo",
        confidence: data.total_students ? data.summary.alto / data.total_students : 0,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo procesar el archivo SIAGIE.";
      setUiError(message);
    }
  }

  function setField<K extends keyof PredictRiskRequest>(key: K, value: PredictRiskRequest[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function setGradeField(field: "nota_matematica" | "nota_lenguaje", value: GradeLiteral) {
    setField(field, value);
  }

  return {
    alerts,
    barData,
    formData,
    result,
    riskIsHigh,
    stats,
    totalStudents,
    activeStudent,
    error: uiError,
    isPredicting: predictMutation.isPending,
    isUploading: uploadMutation.isPending,
    setField,
    setGradeField,
    submitManualPrediction,
    analyzeAlertStudent,
    uploadSiagie,
  };
}
