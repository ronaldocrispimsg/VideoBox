
const stats = [
  { label: "Uploads concluídos", value: "42" },
  { label: "Tempo de streaming", value: "180h" },
  { label: "Regiões disponíveis", value: "5" },
]

export default function PerfilPage() {
  return (
    <main className="flex w-full max-w-5xl flex-col gap-10 px-6 py-12 lg:px-0">

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-zinc-900">Histórico recente</h2>
        <ul className="mt-4 space-y-4">
          {["Upload VideoBox tour.mp4", "Processamento finalizado", "Stream pronto"].map((item, index) => (
            <li key={item} className="flex items-center justify-between rounded-2xl border px-4 py-3 text-sm">
              <span>{item}</span>
              <span className="text-muted-foreground">{index + 1}h atrás</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
