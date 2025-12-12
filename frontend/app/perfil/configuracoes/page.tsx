const notifications = [
  { label: "Processamento concluído", description: "Receber email quando o worker publicar video.ready" },
  { label: "Falha no upload", description: "Avisar quando houver erro no backend" },
  { label: "Novas regiões", description: "Ser notificado quando novas regiões de streaming forem ativadas" },
]

export default function ConfiguracoesPage() {
  return (
    <main className="flex w-full max-w-4xl flex-col gap-8 px-6 py-12 lg:px-0">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-zinc-900">Configurações</h1>
        <p className="mt-2 text-muted-foreground">
          Ajuste preferências pessoais, segurança e notificações sobre sua infraestrutura distribuída.
        </p>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Notificações</h2>
        <p className="text-sm text-muted-foreground">Escolha quais eventos enviar para email ou Slack.</p>
        <form className="mt-6 space-y-4">
          {notifications.map((item) => (
            <label key={item.label} className="flex items-start gap-3 rounded-2xl border px-4 py-3">
              <input type="checkbox" className="mt-1" defaultChecked />
              <div>
                <p className="font-semibold text-zinc-900">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </label>
          ))}
          <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800">
            Salvar preferências
          </button>
        </form>
      </section>
    </main>
  )
}
