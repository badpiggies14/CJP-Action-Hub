"use client";

import { Download, RefreshCcw, Shuffle, Type } from "lucide-react";
import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import PosterCard from "@/components/PosterCard";
import { cardSizes, CardSizeKey, downloadCanvas, drawShareCard } from "@/lib/download";
import { readProgress, saveProgress } from "@/lib/localStorage";
import { captionBank, hashtagBank } from "@/data/captions";
import { cn } from "@/lib/cn";

type ShareTemplate = {
  id: string;
  name: string;
  defaultText: string;
  kicker: string;
  caption: string;
};

const templates: ShareTemplate[] = [
  {
    id: "chronically-online",
    name: "I Am Chronically Online",
    defaultText: "I am chronically online, politically awake.",
    kicker: "Membership Desk",
    caption: "Chronically online, politically awake. Follow official sources and share responsibly."
  },
  {
    id: "cannot-squash",
    name: "You Cannot Squash A Movement",
    defaultText: "You cannot squash a movement.",
    kicker: "Rally Notice",
    caption: "You cannot squash a movement. Start with the official site, then share cleanly."
  },
  {
    id: "five-zero",
    name: "Five Demands. Zero Sponsors.",
    defaultText: "Five demands. Zero sponsors.",
    kicker: "Manifesto Desk",
    caption: "Five demands. Zero sponsors. One stubborn swarm."
  },
  {
    id: "money-go",
    name: "Where Did The Money Go?",
    defaultText: "Where did the money go?",
    kicker: "Public Question",
    caption: "The question is simple: where did the money go?"
  },
  {
    id: "lazy-aware",
    name: "Lazy, Unemployed, Politically Aware",
    defaultText: "Lazy, unemployed, politically aware.",
    kicker: "Eligibility Office",
    caption: "Lazy? Maybe. Politically asleep? Absolutely not."
  },
  {
    id: "entered-chat",
    name: "The Swarm Has Entered The Chat",
    defaultText: "The swarm has entered the chat.",
    kicker: "Breaking Status",
    caption: "The group chat has discovered civic duty."
  },
  {
    id: "rant",
    name: "Rant Professionally",
    defaultText: "Rant professionally. Cite responsibly.",
    kicker: "Code of Conduct",
    caption: "Rant professionally. Keep it sharp, clean, and source-aware."
  },
  {
    id: "wifi",
    name: "Headquartered Wherever The WiFi Works",
    defaultText: "Headquartered wherever the WiFi works.",
    kicker: "HQ Notice",
    caption: "Headquartered wherever the WiFi works."
  },
  {
    id: "survive",
    name: "Together We Survive",
    defaultText: "Together we survive.",
    kicker: "People's Banner",
    caption: "Together we survive. Follow, share, create, verify."
  },
  {
    id: "manifesto",
    name: "Manifesto Card",
    defaultText: "Read the five demands.",
    kicker: "Manifesto Card",
    caption: "Read the five demands before forwarding the hot take."
  }
];

export default function ShareCardGenerator() {
  const [templateId, setTemplateId] = useState(templates[0].id);
  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === templateId) ?? templates[0],
    [templateId]
  );
  const [text, setText] = useState(selectedTemplate.defaultText);
  const [sizeKey, setSizeKey] = useState<CardSizeKey>("square");
  const [showWatermark, setShowWatermark] = useState(true);
  const [status, setStatus] = useState("Download PNG");

  const size = cardSizes[sizeKey];
  const caption = `${selectedTemplate.caption} ${hashtagBank.slice(0, 2).join(" ")}`;

  function selectTemplate(id: string) {
    const next = templates.find((template) => template.id === id) ?? templates[0];
    setTemplateId(next.id);
    setText(next.defaultText);
  }

  function reset() {
    setText(selectedTemplate.defaultText);
    setShowWatermark(true);
  }

  function randomize() {
    const currentIndex = templates.findIndex((template) => template.id === templateId);
    const next = templates[(currentIndex + Math.ceil(Math.random() * (templates.length - 1))) % templates.length];
    selectTemplate(next.id);
  }

  async function download() {
    setStatus("Preparing");
    try {
      const canvas = await drawShareCard({
        text,
        kicker: selectedTemplate.kicker,
        size: sizeKey,
        showWatermark
      });
      downloadCanvas(canvas, `cjp-action-hub-${selectedTemplate.id}-${size.width}x${size.height}.png`);
      const progress = readProgress();
      saveProgress({ ...progress, "downloaded-card": true });
      setStatus("Downloaded");
    } catch {
      setStatus("Try again");
    }
    window.setTimeout(() => setStatus("Download PNG"), 1600);
  }

  return (
    <section id="share-card-generator" className="section-shell py-10 sm:py-16" aria-labelledby="share-card-title">
      <div className="mb-5 grid gap-4 sm:mb-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="section-kicker">Share cards generator</p>
          <h2 id="share-card-title" className="section-title mt-2">
            Generate Another Rant.
          </h2>
        </div>
        <p className="text-sm font-bold leading-relaxed text-coal sm:text-base">
          Browser-only PNG cards. No upload, no account, no backend. Watermark can be hidden, but the ethical note stays
          on the graphic.
        </p>
      </div>
      <div className="grid gap-5 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <PosterCard className="grid gap-4 sm:gap-5">
          <label className="grid gap-2 text-sm font-black uppercase">
            Template
            <select value={templateId} onChange={(event) => selectTemplate(event.target.value)} className="input-field">
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-black uppercase">
            Edit text
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="input-field min-h-24 resize-y sm:min-h-32"
              maxLength={120}
            />
          </label>
          <label className="grid gap-2 text-sm font-black uppercase">
            Card size
            <select
              value={sizeKey}
              onChange={(event) => setSizeKey(event.target.value as CardSizeKey)}
              className="input-field"
            >
              {(Object.keys(cardSizes) as CardSizeKey[]).map((key) => (
                <option key={key} value={key}>
                  {cardSizes[key].label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-3 border-2 border-ink bg-paper px-4 py-3 text-sm font-black uppercase">
            <input
              type="checkbox"
              checked={showWatermark}
              onChange={(event) => setShowWatermark(event.target.checked)}
              className="h-5 w-5 accent-stamp"
            />
            Show CJP Action Hub watermark
          </label>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <button type="button" onClick={download} className="button-primary">
              <Download aria-hidden="true" size={18} />
              <span className="sm:hidden">Download</span>
              <span className="hidden sm:inline">{status}</span>
            </button>
            <button type="button" onClick={randomize} className="button-secondary">
              <Shuffle aria-hidden="true" size={18} />
              <span className="sm:hidden">Random</span>
              <span className="hidden sm:inline">Generate Another Rant</span>
            </button>
            <CopyButton
              text={caption}
              label="Copy caption"
              className="sm:col-span-1"
              onCopied={() => saveProgress({ ...readProgress(), "copied-caption": true })}
            />
            <button type="button" onClick={reset} className="button-ghost">
              <RefreshCcw aria-hidden="true" size={18} />
              Reset
            </button>
          </div>
          <p className="text-xs font-bold uppercase leading-relaxed text-coal">
            Caption seed: {captionBank[0]} Edit before posting. Link people to official channels for official updates.
          </p>
        </PosterCard>
        <div className="grid place-items-center border-2 border-ink bg-ink p-3 shadow-brutal sm:p-8">
          <div
            className={cn(
              "grid w-full max-w-[560px] place-items-center overflow-hidden border-[7px] border-black bg-paper p-4 text-center shadow-[0_20px_50px_rgb(0_0_0_/_0.35)] sm:border-[10px] sm:p-8",
              size.height > size.width ? "max-h-[520px] sm:max-h-[720px]" : "max-h-[360px] sm:max-h-[520px]"
            )}
            style={{ aspectRatio: `${size.width}/${size.height}` }}
            aria-label="Share card preview"
          >
            <div className="flex h-full w-full flex-col justify-between border-2 border-stamp p-3 sm:p-6">
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] sm:text-xs">
                  Independent supporter-made graphic
                </p>
                <p className="mt-2 break-words font-display text-lg font-black uppercase leading-none text-stamp sm:text-4xl">
                  {selectedTemplate.kicker}
                </p>
              </div>
              <p className="safe-text text-balance max-w-full break-words font-display text-2xl font-black uppercase leading-[0.95] sm:text-6xl">
                <Type aria-hidden="true" className="mx-auto mb-4 text-stamp" size={32} />
                {text}
              </p>
              <div className="flex items-end justify-between gap-3 text-[10px] font-black uppercase sm:text-xs">
                <span>Independent supporter-made graphic</span>
                {showWatermark && <span>CJP Action Hub</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
