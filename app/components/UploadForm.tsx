"use client"

import { useState } from "react"
import { uploadVideoFile } from "@/lib/api"

type UploadState = "idle" | "uploading" | "success" | "error"

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<UploadState>("idle")
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!file) {
      setMessage("Selecione um arquivo antes de enviar.")
      setStatus("error")
      return
    }

    setStatus("uploading")
    setMessage(null)

    try {
      const uploaded = await uploadVideoFile(file)
      setStatus("success")
      setMessage(`Vídeo ${uploaded.filename} enviado! Acompanhe o processamento em /videos.`)
      setFile(null)
      ;(event.target as HTMLFormElement).reset()
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Erro ao enviar vídeo.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl flex-col gap-6">
      <label
        htmlFor="video"
        className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center transition hover:border-zinc-400 hover:bg-white"
      >
        <span className="text-lg font-semibold">Arraste um arquivo MP4 ou clique para selecionar</span>
        <span className="text-sm text-muted-foreground">
          Tamanho máximo: 2 GB • Formatos suportados: mp4, mov, mkv
        </span>
        <input
          id="video"
          name="video"
          type="file"
          accept="video/*"
          className="sr-only"
          onChange={(event) => {
            const nextFile = event.target.files?.[0]
            setFile(nextFile ?? null)
            setStatus("idle")
            setMessage(null)
          }}
        />
      </label>

      {file && (
        <div className="rounded-2xl border bg-white p-4 text-sm">
          <p className="font-medium">Pronto para envio</p>
          <p className="text-muted-foreground">{file.name}</p>
          <p className="text-muted-foreground">
            {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type || "tipo desconhecido"}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={!file || status === "uploading"}
        className="rounded-full bg-black px-8 py-3 text-base font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
      >
        {status === "uploading" ? "Enviando..." : "Enviar vídeo"}
      </button>

      {message && (
        <p
          className={`rounded-2xl p-4 text-sm ${
            status === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-emerald-700"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
