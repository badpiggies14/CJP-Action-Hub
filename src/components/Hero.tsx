import Link from "next/link";
import { ArrowRight, Megaphone, PackageOpen, PenTool } from "lucide-react";
import StampBadge from "@/components/StampBadge";
import { theme } from "@/data/theme";

export default function Hero() {
  return (
    <section className="section-shell grid gap-6 py-6 sm:gap-10 sm:py-10 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
      <div className="min-w-0 space-y-5 sm:space-y-8">
        <div className="space-y-3 sm:space-y-5">
          <h1 className="font-display text-[4.35rem] font-black uppercase leading-[0.84] sm:text-8xl lg:text-[9rem]">
            <span className="block">CJP</span>
            <span className="block">Action</span>
            <span className="block">Hub</span>
          </h1>
          <p className="max-w-3xl font-editorial text-base font-bold leading-snug sm:text-3xl">
            An independent community toolkit for people who want to follow, share, and create for the
            Cockroach Janta Party movement.
          </p>
          <p className="max-w-2xl text-sm font-black uppercase text-stamp sm:text-lg">Help the Swarm Grow.</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <Link href="/follow" className="button-primary w-full max-w-full text-center">
            <Megaphone aria-hidden="true" size={18} />
            <span className="sm:hidden">Follow</span>
            <span className="hidden sm:inline">Follow Official Channels</span>
          </Link>
          <Link href="/tools#share-card-generator" className="button-secondary w-full max-w-full text-center">
            <PenTool aria-hidden="true" size={18} />
            <span className="sm:hidden">Make Card</span>
            <span className="hidden sm:inline">Make a Share Card</span>
          </Link>
          <Link href="/manifesto" className="button-secondary w-full max-w-full text-center">
            <span className="sm:hidden">5 Demands</span>
            <span className="hidden sm:inline">Share the 5 Demands</span> <ArrowRight aria-hidden="true" size={18} />
          </Link>
          <Link href="/creator-kit" className="button-secondary w-full max-w-full text-center">
            <PackageOpen aria-hidden="true" size={18} />
            <span className="sm:hidden">Creator Kit</span>
            <span className="hidden sm:inline">Open Creator Kit</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 border-2 border-ink bg-newsprint shadow-brutal sm:grid-cols-4" aria-label="Movement stats">
          {theme.stats.map((stat) => (
            <div key={stat.label} className="border-b border-r border-ink p-2.5 last:border-r-0 sm:border-b-0 sm:p-4">
              <p className="font-display text-3xl font-black leading-none text-stamp sm:text-5xl">{stat.value}</p>
              <p className="mt-1 text-[10px] font-black uppercase leading-tight text-coal sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative hidden min-h-[560px] min-w-0 lg:block">
        <div className="absolute left-4 top-4 z-10">
          <StampBadge>Supporter Made</StampBadge>
        </div>
        <div className="paper-edge relative h-full min-h-[560px] rotate-1 overflow-hidden border-[10px] border-ink bg-newsprint p-8 shadow-brutal">
          <div className="relative z-10 flex h-full flex-col justify-between border-2 border-ink p-6">
            <div className="border-b-4 border-ink pb-5 text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em]">Community Toolkit · Volume 1</p>
              <p className="mt-3 font-display text-6xl font-black uppercase leading-none">Follow. Share.</p>
              <p className="font-display text-6xl font-black uppercase leading-none text-stamp">Create. Verify.</p>
            </div>
            <div className="grid gap-4 py-8">
              <div className="border-2 border-ink bg-paper p-5">
                <p className="font-display text-4xl font-black uppercase leading-none">You cannot squash a movement.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-ink p-4">
                  <p className="font-display text-5xl font-black text-stamp">5</p>
                  <p className="text-xs font-black uppercase">Demands</p>
                </div>
                <div className="border-2 border-ink p-4">
                  <p className="font-display text-5xl font-black text-stamp">0</p>
                  <p className="text-xs font-black uppercase">Sponsors</p>
                </div>
              </div>
            </div>
            <div className="border-t-4 border-ink pt-5">
              <p className="font-editorial text-2xl font-black leading-tight">
                &quot;Five demands. Zero sponsors. One stubborn swarm.&quot;
              </p>
              <p className="mt-3 text-xs font-black uppercase text-coal">
                Not official. Points to official sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
