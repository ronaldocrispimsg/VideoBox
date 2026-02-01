import { UploadForm } from "../components/UploadForm"

export default function UploadPage() {
  return (
    <main className="flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-12 lg:px-0">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Upload distribuído</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Envie um vídeo para o VideoBox</h1>
        <p className="mt-2 text-muted-foreground">
          O arquivo fica temporariamente no backend, dispara o processamento no worker e segue para streaming no
          repo_stream.
        </p>
      </div>

      <UploadForm />
    </main>
  )
}
