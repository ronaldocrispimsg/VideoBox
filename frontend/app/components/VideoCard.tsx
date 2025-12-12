"use client"

import { useState } from "react"
import type { VideoRecord } from "@/lib/api"
import { resolveStreamUrl } from "@/lib/api"
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
          <a
            href={streamUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            Abrir no navegador
          </a>
        </div>
      )}

      {!canPlay && (
        <p className="text-sm text-muted-foreground">
          {video.status === "processing"
            ? "Estamos convertendo seu arquivo para HLS."
            : "Assim que o processamento terminar, o player é liberado aqui."}
        </p>
      )}

      {video.download_url && (
        <a
          href={video.download_url}
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          Baixar arquivo original
        </a>
      )}
    </article>
  )
}
