import type { ReactNode } from "react";

interface StateViewProps {
  loading: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyLabel?: string;
  children: ReactNode;
}

export function StateView({
  loading,
  error,
  isEmpty = false,
  emptyLabel = "No data available.",
  children,
}: StateViewProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 text-sm text-zinc-400">
        Cargando informacion...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
        {error}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 text-sm text-zinc-400">
        {emptyLabel}
      </div>
    );
  }

  return <>{children}</>;
}
