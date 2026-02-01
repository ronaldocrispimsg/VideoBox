import Link from "next/link"

const links = [
  { label: "Upload", href: "/upload" },
  { label: "Biblioteca", href: "/videos" },
  { label: "Status do sistema", href: "/status" },
]

export default function Footer() {
  return (
    <footer className="mt-16 w-full border-t bg-white/80 px-6 py-10 text-sm text-muted-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>VideoBox © {new Date().getFullYear()} • Upload e streaming distribuído.</p>
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-zinc-900">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
