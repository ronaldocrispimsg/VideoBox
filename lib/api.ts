export type VideoStatus = "uploaded" | "processing" | "ready" | "failed" | string

export interface VideoRecord {
  video_id: string
  filename: string
  status: VideoStatus

  /**
   * Endpoint do backend que dispara o X-Accel-Redirect
   * Ex: /api/videos/{id}/stream
   */
  stream_url?: string

  /**
   * Endpoint de download do vídeo bruto (se existir)
   */
  download_url?: string

  /**
   * Caminho interno (não usar no front)
   */
  path?: string
}

/**
 * Base da API (sempre via backend)
 * Ex: https://videobox.myvnc.com/api
 */
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "/api").replace(/\/$/, "")

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const detail = await safeParseError(response)
    throw new Error(detail ?? `Falha ao acessar ${path}: ${response.status}`)
  }

  return (await response.json()) as T
}

export async function deleteVideo(videoId: string): Promise<void> {
  await fetch(`${API_BASE}/videos/${videoId}`, {
    method: "DELETE",
    cache: "no-store",
  }).then(async (res) => {
    if (!res.ok) {
      const detail = await res.text()
      throw new Error(detail || "Erro ao deletar vídeo")
    }
  })
}

async function safeParseError(response: Response): Promise<string | null> {
  try {
    const data = await response.json()
    if (typeof data === "object" && data && "detail" in data) {
      return String((data as Record<string, unknown>).detail)
    }
  } catch {
    // ignora erro de parse
  }
  return null
}

/* -----------------------------
 * API pública usada pelo front
 * ---------------------------- */

export async function listVideos(): Promise<VideoRecord[]> {
  return request<VideoRecord[]>("/videos")
}

export async function fetchVideo(videoId: string): Promise<VideoRecord> {
  return request<VideoRecord>(`/videos/${videoId}`)
}

export async function uploadVideoFile(file: File): Promise<VideoRecord> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  })

  if (!response.ok) {
    const detail = await safeParseError(response)
    throw new Error(detail ?? "Não foi possível enviar o vídeo")
  }

  return (await response.json()) as VideoRecord
}

/**
 * 🎥 Streaming (X-Accel)
 *
 * O backend retorna um endpoint do tipo:
 *   /api/videos/{id}/stream
 *
 * Esse endpoint:
 * - valida acesso
 * - responde com X-Accel-Redirect
 * - nginx serve os .m3u8/.ts internamente
 *
 * O front NÃO resolve, NÃO reescreve e NÃO conhece MinIO.
 */
export function resolveStreamUrl(video: VideoRecord): string | undefined {
  if (!video.stream_url) return undefined

  try {
    const url = new URL(video.stream_url)

    // extrai o video_id do path
    // ex: /<id>/playlist.m3u8
    const parts = url.pathname.split("/").filter(Boolean)
    const videoId = parts[0]

    if (!videoId) return undefined

    return `/api/videos/${videoId}/stream`
  } catch {
    // fallback defensivo
    const match = video.stream_url.match(/\/([a-f0-9]{32})\//)
    if (!match) return undefined

    return `/api/videos/${match[1]}/stream`
  }
}
