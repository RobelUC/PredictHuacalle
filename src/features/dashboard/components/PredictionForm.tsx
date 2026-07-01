import type { FormEvent } from "react";
import { Card } from "../../../shared/ui/Card";
import type { GradeLiteral, PredictRiskRequest } from "../types/dashboard.types";

interface PredictionFormProps {
  values: PredictRiskRequest;
  submitting: boolean;
  onFieldChange: <K extends keyof PredictRiskRequest>(field: K, value: PredictRiskRequest[K]) => void;
  onGradeFieldChange: (field: "nota_matematica" | "nota_lenguaje", value: GradeLiteral) => void;
  onSubmit: () => Promise<void>;
}

export function PredictionForm({
  values,
  submitting,
  onFieldChange,
  onGradeFieldChange,
  onSubmit,
}: PredictionFormProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <Card title="Simular analisis" subtitle="Completa los campos y ejecuta la prediccion">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs text-zinc-400">Asistencia (%)</span>
          <input
            type="number"
            required
            min={0}
            max={100}
            value={values.asistencias}
            onChange={(event) => onFieldChange("asistencias", Number(event.target.value))}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none transition focus:border-blue-400"
          />
        </label>

        <GradeField
          label="Nota Matematica"
          value={values.nota_matematica}
          onChange={(value) => onGradeFieldChange("nota_matematica", value)}
        />
        <GradeField
          label="Nota Lenguaje"
          value={values.nota_lenguaje}
          onChange={(value) => onGradeFieldChange("nota_lenguaje", value)}
        />

        <label className="block">
          <span className="mb-1 block text-xs text-zinc-400">Participacion</span>
          <input
            type="number"
            required
            min={0}
            max={10}
            value={values.participacion}
            onChange={(event) => onFieldChange("participacion", Number(event.target.value))}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none transition focus:border-blue-400"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-blue-500 px-4 py-2.5 font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-blue-800"
        >
          {submitting ? "Analizando..." : "Analizar"}
        </button>
      </form>
    </Card>
  );
}

interface GradeFieldProps {
  label: string;
  value: GradeLiteral;
  onChange: (value: GradeLiteral) => void;
}

function GradeField({ label, value, onChange }: GradeFieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-zinc-400">{label}</span>
      <select
        required
        value={value}
        onChange={(event) => onChange(event.target.value as GradeLiteral)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none transition focus:border-blue-400"
      >
        <option value="AD">AD</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    </label>
  );
}
