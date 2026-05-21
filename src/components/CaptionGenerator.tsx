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
    <section id="caption-generator" className="section-shell py-16" aria-labelledby="caption-generator-title">
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="section-kicker">Social caption generator</p>
          <h2 id="caption-generator-title" className="section-title mt-2">
            Local Captions. No AI API.
          </h2>
        </div>
        <p className="text-base font-bold leading-relaxed text-coal">
          Choose a platform, tone, and topic. The generator combines local templates into three clean caption options.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <PosterCard className="grid gap-4">
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
        <div className="grid gap-5">
          {captions.map((caption, index) => (
            <PosterCard key={caption}>
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center border-2 border-ink bg-stamp font-display text-3xl font-black text-white">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-black uppercase text-stamp">
                    <MessageSquareQuote aria-hidden="true" size={16} />
                    {platform} / {tone} / {topic}
                  </div>
                  <p className="text-base font-bold leading-relaxed text-coal">{caption}</p>
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
