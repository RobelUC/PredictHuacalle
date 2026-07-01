import type { PropsWithChildren, ReactNode } from "react";

interface CardProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
}

export function Card({ title, subtitle, rightSlot, children }: CardProps) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-zinc-400">{subtitle}</p> : null}
        </div>
        {rightSlot}
      </header>
      <div className="mt-4">{children}</div>
    </article>
  );
}
