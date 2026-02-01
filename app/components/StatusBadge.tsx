"use client"

import type { VideoStatus } from "@/lib/api"
import { cn } from "@/lib/utils"

const COLORS: Record<string, string> = {
  uploaded: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  ready: "bg-emerald-50 text-emerald-700 border-emerald-200",
  failed: "bg-red-50 text-red-700 border-red-200",
}

export function StatusBadge({ status }: { status: VideoStatus }) {
  const normalized = status?.toLowerCase() ?? "uploaded"
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        COLORS[normalized] ?? "bg-zinc-100 text-zinc-700 border-zinc-200"
      )}
    >
      {status}
    </span>
  )
}
