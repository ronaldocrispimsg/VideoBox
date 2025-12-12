"use client"

import { useRef, useEffect } from "react"
import Hls from "hls.js"

type VideoPlayerProps = {
  src: string
  poster?: string
  autoPlay?: boolean
}

export default function VideoPlayer({ src, poster, autoPlay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src
    } else if (Hls.isSupported()) {

      const hls = new Hls()
      
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch(() => { console.log("Erro ao tocar o vídeo") })
        }
      })

      return () => {
        hls.destroy()
      }
    } else {
      video.src = src
    }
  }, [src, autoPlay])

  return (
    <video
      ref={videoRef}
      controls
      poster={poster}
      className="aspect-video w-full rounded-lg border bg-black"
    />
  )
}
