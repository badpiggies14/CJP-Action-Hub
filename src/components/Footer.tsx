import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";
import { links } from "@/data/links";

export default function Footer() {
  return (
    <footer className="no-print border-t-2 border-ink bg-ink text-paper">
      <div className="section-shell grid gap-8 py-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div className="space-y-5">
          <div>
            <p className="font-display text-5xl font-black uppercase leading-none">CJP Action Hub</p>
            <p className="mt-2 max-w-xl text-sm font-bold text-paper/75">
              A supporter-made toolkit for following official sources, sharing clean satire, volunteering skills, and
              creating responsibly.
            </p>
          </div>
          <div className="bg-paper text-ink">
            <Disclaimer compact />
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl font-black uppercase">Move</h2>
          <ul className="mt-4 grid gap-2 text-sm font-black uppercase">
            <li>
              <Link className="underline-offset-4 hover:underline" href="/follow">
                Follow the Swarm
              </Link>
            </li>
            <li>
              <Link className="underline-offset-4 hover:underline" href="/tools">
                Make a Share Card
              </Link>
            </li>
            <li>
              <Link className="underline-offset-4 hover:underline" href="/manifesto">
                Five Demands
              </Link>
            </li>
            <li>
              <Link className="underline-offset-4 hover:underline" href="/creator-kit">
                Creator Kit
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-black uppercase">Official</h2>
          <ul className="mt-4 grid gap-2 text-sm font-black uppercase">
            <li>
              <a className="inline-flex items-center gap-2 underline-offset-4 hover:underline" href={links.officialWebsite} target="_blank" rel="noreferrer">
                cockroachjantaparty.org <ExternalLink aria-hidden="true" size={14} />
              </a>
            </li>
            <li>
              <Link className="underline-offset-4 hover:underline" href="/press">
                Press / Explainer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/20 py-4">
        <div className="section-shell text-xs font-bold uppercase tracking-[0.14em] text-paper/70">
          © 2026 CJP Action Hub. Independent supporter project. No analytics, no accounts.
        </div>
      </div>
    </footer>
  );
}
