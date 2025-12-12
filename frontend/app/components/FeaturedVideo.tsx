"use client"

import type { VideoRecord } from "@/lib/api"
import { resolveStreamUrl } from "@/lib/api"
import VideoPlayer from "./VideoPlayer"
import { StatusBadge } from "./StatusBadge"

export function FeaturedVideo({ video }: { video: VideoRecord }) {
  const streamUrl = resolveStreamUrl(video)
  if (!streamUrl) return null

  return (
    <section className="w-full rounded-3xl border bg-linear-to-br from-zinc-900 via-black to-zinc-900 p-8 text-white shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-widest text-zinc-400">Destaque da semana</p>
          <h2 className="mt-2 text-3xl font-semibold">{video.filename}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
            <StatusBadge status={video.status} />
            <span>ID: {video.video_id}</span>
          </div>
          <p className="mt-4 max-w-xl text-zinc-200">
            Esse vídeo já está disponível para todas as regiões da CDN distribuída do VideoBox.
          </p>
          <a
            href={streamUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-100"
          >
            Abrir em nova aba
          </a>
        </div>
        <div className="flex-1">
          <VideoPlayer src={streamUrl} />
        </div>
      </div>
    </section>
  )
}
