import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Menu } from "lucide-react";
import { links } from "@/data/links";

const nav = [
  { href: "/follow", label: "Follow" },
  { href: "/tools", label: "Tools" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/creator-kit", label: "Creator Kit" },
  { href: "/press", label: "Press" }
];

export default function Header() {
  return (
    <header className="no-print sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="border-b border-ink/25 bg-ink py-1 text-paper">
        <div className="section-shell flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.12em] sm:text-[11px] sm:tracking-[0.16em]">
          <span>Independent Support Desk</span>
          <span className="hidden sm:inline">No login. No tracking. All rants local.</span>
        </div>
      </div>
      <div className="section-shell flex min-h-14 items-center justify-between gap-3 py-2 sm:min-h-16 sm:gap-4 sm:py-3">
        <Link href="/" className="focus-ring flex min-w-0 flex-1 items-center" aria-label="CJP Action Hub home">
          <span className="relative block aspect-[420/50] w-[220px] max-w-[58vw] sm:w-[360px] xl:w-[420px]">
            <Image
              src="/cjp-logo.svg"
              alt="Cockroach Janta Party logo"
              fill
              priority
              sizes="(min-width: 1280px) 420px, (min-width: 640px) 360px, 58vw"
              className="object-contain object-left"
            />
          </span>
          <span className="sr-only">CJP Action Hub</span>
        </Link>
        <nav className="hidden items-center gap-2 xl:flex" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="button-ghost h-14 w-32 shrink-0 px-4 text-center leading-tight">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={links.officialWebsite}
            target="_blank"
            rel="noreferrer"
            className="button-primary !hidden h-14 w-[168px] shrink-0 px-5 text-center leading-tight lg:!inline-flex"
          >
            Official Site <ExternalLink aria-hidden="true" size={16} />
          </a>
          <details className="relative xl:hidden">
            <summary className="button-ghost h-11 w-11 list-none px-0 py-0 sm:h-12 sm:w-12" aria-label="Open navigation menu">
              <Menu aria-hidden="true" size={20} />
            </summary>
            <div className="absolute right-0 top-14 z-50 grid w-56 gap-2 border-2 border-ink bg-newsprint p-3 shadow-brutal">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="button-ghost justify-start">
                  {item.label}
                </Link>
              ))}
              <a href={links.officialWebsite} target="_blank" rel="noreferrer" className="button-primary">
                Official Site <ExternalLink aria-hidden="true" size={16} />
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
