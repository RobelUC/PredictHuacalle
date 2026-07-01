import { Card } from "../../../shared/ui/Card";
import { StateView } from "../../../shared/ui/StateView";
import type { StudentRisk } from "../types/dashboard.types";

interface HighRiskStudentsCardProps {
  students: StudentRisk[];
  loading: boolean;
  error?: string | null;
  activeStudent: string;
  onAnalyze: (student: StudentRisk) => void;
}

export function HighRiskStudentsCard({
  students,
  loading,
  error,
  activeStudent,
  onAnalyze,
}: HighRiskStudentsCardProps) {
  return (
    <Card title="Alertas prioritarias" subtitle="Accion inmediata sobre estudiantes con mayor riesgo">
      <StateView
        loading={loading}
        error={error}
        isEmpty={students.length === 0}
        emptyLabel="No hay alertas de alto riesgo por mostrar."
      >
        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.nombre}
              className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-200">
                  {student.iniciales}
                </div>
                <div>
                  <p className="font-medium text-zinc-100">{student.nombre}</p>
                  <p className="text-sm text-zinc-400">
                    Asistencia {student.asistencias}% - Mat {student.nota_matematica} - Leng{" "}
                    {student.nota_lenguaje}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full border border-red-500/40 bg-red-500/20 px-3 py-1 text-xs font-medium text-red-200">
                  {student.risk_level === "medio" ? "Riesgo medio" : "Riesgo alto"}
                </span>
                <button
                  type="button"
                  onClick={() => onAnalyze(student)}
                  disabled={loading}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && activeStudent === student.nombre ? "Analizando..." : "Registrar accion"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </StateView>
    </Card>
  );
}
