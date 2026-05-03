import type { PropsWithChildren } from "react";
import { Sidebar } from "../../shared/ui/Sidebar";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <section>{children}</section>
      </div>
    </main>
  );
}
