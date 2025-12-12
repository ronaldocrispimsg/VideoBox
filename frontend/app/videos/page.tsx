import { Suspense } from "react"
import { listVideos } from "@/lib/api"
import { VideosList } from "../components/VideosList"

async function VideosContent() {
  const videos = await listVideos().catch(() => [])
  return <VideosList initialVideos={videos} />
}

export default function VideosPage() {
  return (
    <main className="flex w-full max-w-6xl flex-col gap-8 px-6 py-12 lg:px-0">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Biblioteca</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Seus envios</h1>
        <p className="text-muted-foreground">
          Acompanhe o status da pipeline distribuída, abra o player ou baixe o arquivo original.
        </p>
      </div>

      <Suspense fallback={<p className="text-sm text-muted-foreground">Carregando vídeos...</p>}>
        <VideosContent />
      </Suspense>
    </main>
  )
}
