"use client";

import Link from "next/link";
import { CheckCircle2, Clock3, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultProgress, ProgressId, ProgressMap, readProgress, saveProgress } from "@/lib/localStorage";
import PosterCard from "@/components/PosterCard";
import { cn } from "@/lib/cn";

type QuickAction = {
  time: string;
  title: string;
  body: string;
  href: string;
  button: string;
  progressId: ProgressId;
};

const quickActions: QuickAction[] = [
  {
    time: "10 sec",
    title: "Follow official socials",
    body: "Start with the official site and verified channels. Screenshots are not sources.",
    href: "/follow",
    button: "Follow now",
    progressId: "followed"
  },
  {
    time: "30 sec",
    title: "Share a card",
    body: "Generate a supporter-made card with a clean disclaimer and download it.",
    href: "/tools#share-card-generator",
    button: "Make card",
    progressId: "downloaded-card"
  },
  {
    time: "2 min",
    title: "Copy a caption",
    body: "Pick a platform and tone. No AI, no tracking, just local templates.",
    href: "/tools#caption-generator",
    button: "Get captions",
    progressId: "copied-caption"
  },
  {
    time: "5 min",
    title: "Open creator kit",
    body: "Download clean resources, copy hashtags, and keep supporter-made graphics clearly marked.",
    href: "/creator-kit",
    button: "Open kit",
    progressId: "used-creator-kit"
  }
];

export default function ActionCards({ compact = false }: { compact?: boolean }) {
  const [progress, setProgress] = useState<ProgressMap>(defaultProgress);

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  function markDone(id: ProgressId) {
    const next = { ...progress, [id]: true };
    setProgress(next);
    saveProgress(next);
  }

  return (
    <section className={cn("section-shell", compact ? "py-7 sm:py-8" : "py-10 sm:py-16")} aria-labelledby="quick-actions-title">
      <div className="mb-5 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <p className="section-kicker">Help in 30 seconds</p>
          <h2 id="quick-actions-title" className="section-title mt-2">
            Pick Your Speed.
          </h2>
        </div>
        <p className="max-w-xl text-sm font-bold text-coal sm:text-base">
          You have 10 seconds, 30 seconds, 2 minutes, or 5 minutes. Choose one honest action and move.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => {
          const done = progress[action.progressId];
          return (
            <PosterCard key={action.title} className={cn("min-h-0 sm:min-h-[260px]", done && "!bg-ink !text-paper")}>
              <div className="flex h-full flex-col justify-between gap-3 sm:gap-5">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className={cn("inline-flex items-center gap-1.5 border-2 px-2 py-1 text-[11px] font-black uppercase sm:gap-2 sm:px-3 sm:text-sm", done ? "border-paper text-paper" : "border-stamp text-stamp")}>
                      <Clock3 aria-hidden="true" size={14} />
                      {action.time}
                    </span>
                    {done && <CheckCircle2 aria-label="Completed" className="text-paper" size={20} />}
                  </div>
                  <h3 className="safe-text font-display text-[1.72rem] font-black uppercase leading-none sm:text-4xl">{action.title}</h3>
                  <p className={cn("hidden text-sm font-bold leading-relaxed sm:block", done ? "text-paper/80" : "text-coal")}>
                    {action.body}
                  </p>
                </div>
                <div className="grid gap-2 sm:gap-3">
                  <Link
                    href={action.href}
                    onClick={() => markDone(action.progressId)}
                    className={done ? "button-secondary bg-paper text-ink" : "button-primary"}
                  >
                    {action.button} <ExternalLink aria-hidden="true" size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => markDone(action.progressId)}
                    className={done ? "button-ghost border-paper text-paper hover:bg-paper hover:text-ink" : "button-ghost"}
                  >
                    <span className="sm:hidden">{done ? "Done" : "Done?"}</span>
                    <span className="hidden sm:inline">{done ? "Marked done" : "Mark done"}</span>
                  </button>
                </div>
              </div>
            </PosterCard>
          );
        })}
      </div>
    </section>
  );
}
