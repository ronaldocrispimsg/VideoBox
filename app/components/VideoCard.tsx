"use client"

import { useState } from "react"
import type { VideoRecord } from "@/lib/api"
import { resolveStreamUrl, deleteVideo } from "@/lib/api"
import { StatusBadge } from "./StatusBadge"
import VideoPlayer from "./VideoPlayer"
import { cn } from "@/lib/utils"

type VideoCardProps = {
  video: VideoRecord
}

export function VideoCard({ video }: VideoCardProps) {
  const [expanded, setExpanded] = useState(video.status === "ready")
  const streamUrl = resolveStreamUrl(video)
  const canPlay = video.status === "ready" && !!streamUrl
  async function handleDelete() {
    const ok = confirm(`Tem certeza que deseja excluir o vídeo "${video.filename}"?`)
    if (!ok) return

    try {
      await deleteVideo(video.video_id)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao excluir vídeo")
    }
  }
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{video.filename}</h3>
          <p className="text-sm text-muted-foreground">{video.video_id}</p>
        </div>
        <StatusBadge status={video.status} />
      </div>

      {canPlay && expanded && <VideoPlayer src={streamUrl!} poster="/poster-fallback.jpg" />}

      {canPlay && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              expanded
                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
            )}
          >
            {expanded ? "Ocultar player" : "Assistir agora"}
          </button>

        <button className="rounded-full p-2 text-red-600 transition hover:bg-red-50" onClick={handleDelete}>
          Excluir
      </button>
        </div>
      )}

      {!canPlay && (
        <div>
          <p className="text-sm text-muted-foreground">
            {video.status === "processing"
              ? "Estamos convertendo seu arquivo para HLS."
              : "Assim que o processamento terminar, o player é liberado aqui."}
          </p>

          <button className="rounded-full p-2 text-red-600 transition hover:bg-red-50" onClick={handleDelete}>
            cancelar
        </button>
        </div>
        
      )}
    </article>
  )
}
