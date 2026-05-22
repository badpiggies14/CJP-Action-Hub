"use client";

import { MessageSquareQuote, RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import PosterCard from "@/components/PosterCard";
import {
  captionPlatforms,
  CaptionPlatform,
  captionTones,
  CaptionTone,
  captionTopics,
  CaptionTopic,
  generateCaptions
} from "@/data/captions";
import { readProgress, saveProgress } from "@/lib/localStorage";

export default function CaptionGenerator() {
  const [platform, setPlatform] = useState<CaptionPlatform>("X / Twitter");
  const [tone, setTone] = useState<CaptionTone>("Funny");
  const [topic, setTopic] = useState<CaptionTopic>("Five demands");
  const captions = useMemo(() => generateCaptions(platform, tone, topic), [platform, tone, topic]);

  function markCopied() {
    saveProgress({ ...readProgress(), "copied-caption": true });
  }

  return (
    <section id="caption-generator" className="section-shell py-10 sm:py-16" aria-labelledby="caption-generator-title">
      <div className="mb-5 grid gap-4 sm:mb-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="section-kicker">Social caption generator</p>
          <h2 id="caption-generator-title" className="section-title mt-2">
            Local Captions. No AI API.
          </h2>
        </div>
        <p className="text-sm font-bold leading-relaxed text-coal sm:text-base">
          Choose a platform, tone, and topic. The generator combines local templates into three clean caption options.
        </p>
      </div>
      <div className="grid gap-5 sm:gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <PosterCard className="grid gap-3 sm:gap-4">
          <label className="grid gap-2 text-sm font-black uppercase">
            Platform
            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value as CaptionPlatform)}
              className="input-field"
            >
              {captionPlatforms.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-black uppercase">
            Tone
            <select value={tone} onChange={(event) => setTone(event.target.value as CaptionTone)} className="input-field">
              {captionTones.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-black uppercase">
            Topic
            <select value={topic} onChange={(event) => setTopic(event.target.value as CaptionTopic)} className="input-field">
              {captionTopics.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button type="button" className="button-secondary" onClick={() => setTone("Funny")}>
            <RefreshCcw aria-hidden="true" size={18} />
            Reset tone
          </button>
        </PosterCard>
        <div className="grid gap-3 sm:gap-5">
          {captions.map((caption, index) => (
            <PosterCard key={caption}>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-stamp font-display text-2xl font-black text-white sm:h-12 sm:w-12 sm:text-3xl">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase text-stamp sm:mb-3 sm:text-xs">
                    <MessageSquareQuote aria-hidden="true" size={16} />
                    {platform} / {tone} / {topic}
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-coal sm:text-base">{caption}</p>
                  <CopyButton text={caption} label="Copy caption" className="mt-4" onCopied={markCopied} />
                </div>
              </div>
            </PosterCard>
          ))}
        </div>
      </div>
    </section>
  );
}
