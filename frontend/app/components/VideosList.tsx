"use client"

import { useMemo, useState, useTransition } from "react"
import { listVideos, type VideoRecord, type VideoStatus } from "@/lib/api"
import { VideoCard } from "./VideoCard"

const FILTERS: { label: string; value: "all" | VideoStatus }[] = [
  { label: "Todos", value: "all" },
  { label: "Prontos", value: "ready" },
  { label: "Processando", value: "processing" },
  { label: "Enviados", value: "uploaded" },
]

export function VideosList({ initialVideos }: { initialVideos: VideoRecord[] }) {
  const [videos, setVideos] = useState(initialVideos)
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all")
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (filter === "all") return videos
    return videos.filter((video) => video.status === filter)
  }, [filter, videos])

  const refresh = () => {
    startTransition(async () => {
      setError(null)
      try {
        const fresh = await listVideos()
        setVideos(fresh)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Não foi possível atualizar os vídeos")
      }
    })
  }

  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 rounded-full border bg-zinc-50 p-1 text-sm font-medium">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`rounded-full px-4 py-1.5 transition ${
                filter === item.value ? "bg-white shadow" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={refresh}
          disabled={pending}
          className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
        >
          {pending ? "Atualizando..." : "Atualizar lista"}
        </button>
      </div>

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((video) => (
          <VideoCard video={video} key={video.video_id} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          Nenhum vídeo por aqui ainda. Que tal{" "}
          <a className="text-blue-600 underline" href="/upload">
            enviar o primeiro?
          </a>
        </div>
      )}
    </section>
  )
}
