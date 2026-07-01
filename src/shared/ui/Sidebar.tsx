const sections = [
  { label: "Dashboard", active: true },
  { label: "Estudiantes", active: false },
  { label: "Intervenciones", active: false },
  { label: "Reportes", active: false },
];

export function Sidebar() {
  return (
    <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
      <p className="text-xs uppercase tracking-wider text-zinc-400">PredictEdu</p>
      <h1 className="mt-2 text-2xl font-semibold text-white">Dropout Risk</h1>
      <p className="mt-1 text-sm text-zinc-500">I.E.I. N 32857 - Huacalle</p>

      <nav className="mt-6 space-y-2">
        {sections.map((section) => (
          <button
            key={section.label}
            className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
              section.active
                ? "border-zinc-600 bg-zinc-800 text-zinc-100"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"
            }`}
            type="button"
          >
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
