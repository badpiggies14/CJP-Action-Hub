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
    title: "Volunteer a skill",
    body: "Design, research, edit, translate, moderate, write, or build.",
    href: "/#volunteer",
    button: "Volunteer",
    progressId: "volunteered"
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
    <section className={cn("section-shell", compact ? "py-8" : "py-16")} aria-labelledby="quick-actions-title">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Help in 30 seconds</p>
          <h2 id="quick-actions-title" className="section-title mt-2">
            Pick Your Speed.
          </h2>
        </div>
        <p className="max-w-xl text-base font-bold text-coal">
          You have 10 seconds, 30 seconds, 2 minutes, or 5 minutes. Choose one honest action and move.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => {
          const done = progress[action.progressId];
          return (
            <PosterCard key={action.title} className={cn("min-h-[260px]", done && "!bg-ink !text-paper")}>
              <div className="flex h-full flex-col justify-between gap-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className={cn("inline-flex items-center gap-2 border-2 px-3 py-1 text-sm font-black uppercase", done ? "border-paper text-paper" : "border-stamp text-stamp")}>
                      <Clock3 aria-hidden="true" size={16} />
                      {action.time}
                    </span>
                    {done && <CheckCircle2 aria-label="Completed" className="text-paper" size={24} />}
                  </div>
                  <h3 className="font-display text-4xl font-black uppercase leading-none">{action.title}</h3>
                  <p className={cn("text-sm font-bold leading-relaxed", done ? "text-paper/80" : "text-coal")}>
                    {action.body}
                  </p>
                </div>
                <div className="grid gap-3">
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
                    {done ? "Marked done" : "Mark done"}
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
