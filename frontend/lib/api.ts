export type VideoStatus = "uploaded" | "processing" | "ready" | "failed" | string

export interface VideoRecord {
  video_id: string
  filename: string
  path: string
  status: VideoStatus
  stream_url?: string
  download_url?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000/api"

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
  })

  if (!response.ok) {
    const detail = await safeParseError(response)
    throw new Error(detail ?? "Não foi possível enviar o vídeo")
  }

  return (await response.json()) as VideoRecord
}
