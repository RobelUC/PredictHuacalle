import type { RiskSummary } from "../types/dashboard.types";

interface MetricsCardsProps {
  stats: RiskSummary;
}

const metricConfig = [
  { key: "alto", label: "Riesgo alto", tone: "text-red-400" },
  { key: "medio", label: "Riesgo medio", tone: "text-orange-400" },
  { key: "bajo", label: "Sin riesgo", tone: "text-emerald-400" },
] as const;

export function MetricsCards({ stats }: MetricsCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {metricConfig.map((metric) => (
        <article key={metric.key} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
          <p className="text-sm text-zinc-400">{metric.label}</p>
          <p className={`mt-2 text-5xl font-semibold ${metric.tone}`}>{stats[metric.key]}</p>
          <p className="mt-1 text-sm text-zinc-500">estudiantes</p>
        </article>
      ))}
    </section>
  );
}
