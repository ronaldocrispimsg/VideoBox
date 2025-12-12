"use client"

import * as React from "react"
import Link from "next/link"
import { UserCircle2 } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  ListItem,
} from "@/app/components/ui/navigation-menu"

export default function Header() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold hover:opacity-80">
          Home
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="items-center gap-3">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Vídeos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-60 gap-3 p-4">
                  <ListItem href="/videos" title="Meus Vídeos">
                    Acesse todos os vídeos enviados por você.
                  </ListItem>
                  <ListItem href="/videos/curtidos" title="Curtidos">
                    Veja os vídeos que você marcou com curtida.
                  </ListItem>
                  <ListItem href="/upload" title="Subir vídeo">
                    Fazer upload de um vídeo
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="gap-2">
                <UserCircle2 className="h-5 w-5" />
                Perfil
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-60 gap-3 p-4">
                  <ListItem href="/perfil" title="Meu Perfil">
                    Informações pessoais e preferências.
                  </ListItem>
                  <ListItem href="/perfil/configuracoes" title="Configurações">
                    Ajuste sua conta e opções de segurança.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}


