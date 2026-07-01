import { useRef } from "react";
import { Card } from "../../../shared/ui/Card";
import { StateView } from "../../../shared/ui/StateView";
import { HighRiskStudentsCard } from "./HighRiskStudentsCard";
import { MetricsCards } from "./MetricsCards";
import { PredictionForm } from "./PredictionForm";
import { RiskDistributionCard } from "./RiskDistributionCard";
import { useDashboardSummaryQuery } from "../hooks/useDashboardSummaryQuery";
import { useDashboardController } from "../hooks/useDashboardController";

export function DashboardPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const statusQuery = useDashboardSummaryQuery();
  const {
    alerts,
    barData,
    formData,
    result,
    riskIsHigh,
    stats,
    totalStudents,
    activeStudent,
    error,
    isPredicting,
    isUploading,
    setField,
    setGradeField,
    submitManualPrediction,
    analyzeAlertStudent,
    uploadSiagie,
  } = useDashboardController();

  const motivationalMessage = riskIsHigh
    ? "Prioriza contacto con la familia y seguimiento semanal para reducir el riesgo."
    : "Buen pronostico: manten actividades participativas para consolidar este avance.";

  const onClickUpload = () => fileRef.current?.click();

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/30">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-sm text-zinc-400">I.E.I. N 32857 - Huacalle</p>
            <h2 className="mt-1 text-4xl font-semibold text-white">Modern Analytics Dashboard</h2>
          </div>
          <div>
            <button
              type="button"
              onClick={onClickUpload}
              disabled={isUploading}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-100 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUploading ? "Procesando SIAGIE..." : "+ Cargar SIAGIE"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                await uploadSiagie(file);
                event.target.value = "";
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          <StateView loading={statusQuery.isLoading} error={statusQuery.error?.message} isEmpty={!statusQuery.data}>
            <p className="text-xs text-zinc-400">
              API: {statusQuery.data?.message} {statusQuery.data?.model_loaded ? "(modelo cargado)" : "(sin modelo)"}
            </p>
          </StateView>
        </div>
      </header>

      <MetricsCards stats={stats} />

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RiskDistributionCard totalStudents={totalStudents} bars={barData} />
        </div>
        <PredictionForm
          values={formData}
          submitting={isPredicting}
          onFieldChange={setField}
          onGradeFieldChange={setGradeField}
          onSubmit={submitManualPrediction}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <HighRiskStudentsCard
            students={alerts}
            loading={isPredicting}
            error={error}
            activeStudent={activeStudent}
            onAnalyze={analyzeAlertStudent}
          />
        </div>
        <Card title="Resultado del motor" subtitle="Prediccion en vivo desde Flask">
          <StateView
            loading={false}
            error={error}
            isEmpty={!result}
            emptyLabel="Aun no hay predicciones. Ejecuta un analisis para actualizar este panel."
          >
            <div
              className={`rounded-xl border p-4 ${
                riskIsHigh ? "border-red-500/40 bg-red-500/10" : "border-emerald-500/40 bg-emerald-500/10"
              }`}
            >
              <p className="text-xs uppercase tracking-wide text-zinc-400">{result?.sourceLabel}</p>
              <p className={`mt-2 text-2xl font-semibold ${riskIsHigh ? "text-red-300" : "text-emerald-300"}`}>
                {riskIsHigh ? "Riesgo Alto" : "Riesgo Bajo"}
              </p>
              <p className="mt-2 text-sm text-zinc-200">Confianza: {((result?.confidence ?? 0) * 100).toFixed(1)}%</p>
              <p className="mt-3 text-sm text-zinc-100">{motivationalMessage}</p>
            </div>
          </StateView>
        </Card>
      </section>
    </div>
  );
}
