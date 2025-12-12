export type VideoStatus = "uploaded" | "processing" | "ready" | "failed" | string

export interface VideoRecord {
  video_id: string
  filename: string
  path: string
  status: VideoStatus
  stream_url?: string
  download_url?: string
}

const DEFAULT_API_BASE = "http://172.31.70.86:8000/api"
const DEFAULT_STREAM_BASE = "http://172.31.76.247:8001"

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? DEFAULT_API_BASE).replace(/\/$/, "")
const STREAM_API_BASE = (process.env.NEXT_PUBLIC_STREAM_BASE ?? DEFAULT_STREAM_BASE).replace(/\/$/, "")

function createRequester(baseUrl: string) {
  return async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${baseUrl}${path}`, {
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
}

export const backendRequest = createRequester(API_BASE)
export const streamRequest = createRequester(STREAM_API_BASE)

async function safeParseError(response: Response): Promise<string | null> {
  try {
    const data = await response.json()
    if (typeof data === "object" && data && "detail" in data) {
      return String((data as Record<string, unknown>).detail)
    }
  } catch {
    // Ignora erros de parsing
  }
  return null
}

export async function listVideos(): Promise<VideoRecord[]> {
  return backendRequest<VideoRecord[]>("/videos")
}

export async function fetchVideo(videoId: string): Promise<VideoRecord> {
  return backendRequest<VideoRecord>(`/videos/${videoId}`)
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

export function resolveStreamUrl(video: VideoRecord): string | undefined {
  if (!video.stream_url) {
    return undefined
  }

  try {
    const parsed = new URL(video.stream_url)
    return `${STREAM_API_BASE}${parsed.pathname}`
  } catch {
    if (video.stream_url.startsWith("/")) {
      return `${STREAM_API_BASE}${video.stream_url}`
    }
    return video.stream_url
  }
}
