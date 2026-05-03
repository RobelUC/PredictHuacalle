import { Card } from "../../../shared/ui/Card";

interface RiskBar {
  label: string;
  value: number;
  colorClass: string;
}

interface RiskDistributionCardProps {
  totalStudents: number;
  bars: RiskBar[];
}

export function RiskDistributionCard({ totalStudents, bars }: RiskDistributionCardProps) {
  return (
    <Card title={`Distribucion de riesgo - ${totalStudents} estudiantes`}>
      <div className="space-y-4">
        {bars.map((item) => {
          const percent = totalStudents ? (item.value / totalStudents) * 100 : 0;
          return (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm text-zinc-300">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className={`h-full rounded-full ${item.colorClass}`} style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
