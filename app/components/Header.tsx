"use client"

import * as React from "react"
import Link from "next/link"
import { LogOut, UploadCloud, Video, Send, User } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  ListItem,
} from "@/app/components/ui/navigation-menu"


export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur dark:bg-zinc-900/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          prefetch={false}
          className="text-lg font-semibold tracking-tight text-zinc-900 hover:opacity-80"
        >
          VideoBox
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="items-center gap-3">
            <NavigationMenuItem>
              <Link
                href="/videos"
                prefetch={false}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Video className="h-4 w-4" />
                Vídeos
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/upload"
                prefetch={false}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <UploadCloud className="h-4 w-4" />
                Upload
              </Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
