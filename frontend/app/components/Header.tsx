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

const actions = [
  { href: "/upload", label: "Enviar vídeo", icon: UploadCloud },
  { href: "/videos", label: "Biblioteca", icon: Video },
  { href: "/perfil", label: "Perfil", icon: User },
]

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
              <NavigationMenuTrigger className="gap-2">
                <Video className="h-4 w-4" />
                Vídeos
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-64 gap-3 p-4">
                  <ListItem href="/videos" title="Todos os envios" prefetch={false}>
                    Status em tempo real e acesso ao player.
                  </ListItem>
                  <ListItem href="/upload" title="Subir vídeo" prefetch={false}>
                    Envie um novo arquivo para processamento distribuído.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="gap-2">
                <User className="h-4 w-4" />
                Perfil
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-64 gap-3 p-4">
                  <ListItem href="/perfil" title="Meu perfil" prefetch={false}>
                    Informações básicas e assinatura.
                  </ListItem>
                  <ListItem href="/perfil/configuracoes" title="Configurações" prefetch={false}>
                    Ajustar segurança e notificações.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              prefetch={false}
              className="hidden items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 md:inline-flex"
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Link>
          ))}
          <button className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-zinc-800">
            <Send className="h-4 w-4" />
            Login
          </button>
          <button className="rounded-full border border-zinc-200 p-2 text-zinc-600 transition hover:bg-zinc-50">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
