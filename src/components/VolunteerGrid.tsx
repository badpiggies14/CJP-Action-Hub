"use client";

import { ExternalLink, MousePointer2, Send, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import PosterCard from "@/components/PosterCard";
import { volunteerHref, volunteerSkills } from "@/data/volunteer";
import { readProgress, saveProgress } from "@/lib/localStorage";
import { cn } from "@/lib/cn";

export default function VolunteerGrid() {
  const [selected, setSelected] = useState(volunteerSkills[0].name);
  const skill = useMemo(
    () => volunteerSkills.find((item) => item.name === selected) ?? volunteerSkills[0],
    [selected]
  );
  const suggestedMessage = `Hi,\n\nI want to volunteer for CJP Action Hub as a ${skill.name}.\n\nWhat I can help with:\nAvailability:\nCity/time zone:\n\nI understand this is an independent community support project and official updates should come from official CJP channels.`;

  function markVolunteered() {
    saveProgress({ ...readProgress(), volunteered: true });
  }

  return (
    <section id="volunteer" className="section-shell py-16" aria-labelledby="volunteer-title">
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="section-kicker">Volunteer without login</p>
          <h2 id="volunteer-title" className="section-title mt-2">
            Five-Minute Volunteer Flow.
          </h2>
        </div>
        <p className="text-base font-bold leading-relaxed text-coal">
          No account, no database. Pick a skill, copy a clean intro, then open the configured form or email fallback.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {volunteerSkills.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelected(item.name)}
              className={cn(
                "focus-ring border-2 border-ink bg-newsprint p-5 text-left shadow-[5px_5px_0_rgb(var(--ink))] transition hover:-translate-y-0.5",
                selected === item.name && "!bg-ink !text-paper"
              )}
            >
              <span className={cn("font-display text-3xl font-black uppercase leading-none", selected === item.name ? "text-paper" : "text-ink")}>
                {item.name}
              </span>
              <span className={cn("mt-3 block text-sm font-bold leading-relaxed", selected === item.name ? "text-paper/75" : "text-coal")}>
                {item.description}
              </span>
              <span className={cn("mt-4 block border-t-2 pt-3 text-xs font-black uppercase leading-relaxed", selected === item.name ? "border-paper/40 text-paper" : "border-ink text-stamp")}>
                {item.impact}
              </span>
            </button>
          ))}
        </div>
        <PosterCard className="sticky top-28 h-fit">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 border-2 border-stamp px-3 py-1 text-sm font-black uppercase text-stamp">
              <MousePointer2 aria-hidden="true" size={16} />
              Selected skill
            </div>
            <h3 className="font-display text-5xl font-black uppercase leading-none">{skill.name}</h3>
            <ol className="grid gap-3 text-sm font-bold leading-relaxed">
              <li>
                <strong>Step 1:</strong> Pick a skill.
              </li>
              <li>
                <strong>Step 2:</strong> Copy the suggested message.
              </li>
              <li>
                <strong>Step 3:</strong> Open the form/email.
              </li>
              <li>
                <strong>Step 4:</strong> Follow official socials for official updates.
              </li>
            </ol>
            <div className="border-2 border-ink bg-paper p-4 text-sm font-bold whitespace-pre-wrap">
              {suggestedMessage}
            </div>
            <div className="grid gap-3">
              <CopyButton text={suggestedMessage} label="Copy suggested message" />
              <a href={volunteerHref(skill.name)} onClick={markVolunteered} className="button-primary">
                <UserPlus aria-hidden="true" size={18} />
                Volunteer with this skill
              </a>
              <a href="/follow" className="button-secondary">
                <Send aria-hidden="true" size={18} />
                Follow official channels <ExternalLink aria-hidden="true" size={16} />
              </a>
            </div>
          </div>
        </PosterCard>
      </div>
    </section>
  );
}
