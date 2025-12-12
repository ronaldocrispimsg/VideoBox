import Link from "next/link"
import { listVideos, resolveStreamUrl, type VideoRecord } from "@/lib/api"
import { FeaturedVideo } from "./components/FeaturedVideo"
import { StatusBadge } from "./components/StatusBadge"

const CARDS = [
  { label: "Total de vídeos", key: "total" },
  { label: "Prontos para assistir", key: "ready" },
  { label: "Em processamento", key: "processing" },
]

function buildStats(videos: VideoRecord[]) {
  const ready = videos.filter((video) => video.status === "ready").length
  const processing = videos.filter((video) => video.status === "processing").length
  return {
    total: videos.length,
    ready,
    processing,
  }
}

export default async function Home() {
  let videos: VideoRecord[] = []
  try {
    videos = await listVideos()
  } catch {
    // mantém lista vazia
  }

  const stats = buildStats(videos)
  const highlight = videos.find((video) => video.status === "ready" && resolveStreamUrl(video))

  return (
    <main className="flex w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:px-0">
      <section className="rounded-4xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-10 shadow-sm">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              VideoBox distribuído
            </p>
            <h1 className="text-4xl font-semibold text-zinc-900 md:text-5xl">
              Upload, processamento e streaming de vídeos em múltiplas regiões.
            </h1>
            <p className="text-lg text-muted-foreground">
              Cada evento trafega por RabbitMQ e seus arquivos percorrem rotas dedicadas até chegar ao player
              online. Acompanhe o status em tempo real e ofereça experiências sem travamentos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/upload"
                prefetch={false}
                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Enviar novo vídeo
              </Link>
              <Link
                href="/videos"
                prefetch={false}
                className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-white"
              >
                Gerenciar biblioteca
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {CARDS.map((card) => (
              <div
                key={card.key}
                className="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{card.label}</p>
                <p className="mt-2 text-3xl font-semibold text-zinc-900">{stats[card.key as keyof typeof stats]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {highlight && <FeaturedVideo video={highlight} />}

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-emerald-600">Status de execução</p>
            <h2 className="text-2xl font-semibold text-zinc-900">Fila distribuída de processamento</h2>
            <p className="text-sm text-muted-foreground">
              O backend publica eventos “video.uploaded” e cada worker responde com “video.processing” e
              “video.ready”.
            </p>
          </div>
          <Link href="/videos" prefetch={false} className="text-sm font-semibold text-blue-600 hover:underline">
            Abrir lista completa →
          </Link>
        </div>

        <div className="mt-8 grid gap-3">
          {videos.slice(0, 5).map((video) => (
            <div
              key={video.video_id}
              className="flex flex-col gap-3 rounded-2xl border border-zinc-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-900">{video.filename}</p>
                <p className="text-xs text-muted-foreground">{video.video_id}</p>
              </div>
              <StatusBadge status={video.status} />
            </div>
          ))}

          {videos.length === 0 && (
            <p className="rounded-2xl border border-dashed border-zinc-200 p-6 text-center text-muted-foreground">
              Nenhum envio ainda. Comece pela página de upload!
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
