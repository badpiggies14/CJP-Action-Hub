"use client";

import { Download, ExternalLink, Share2 } from "lucide-react";
import { manifestoDemands, manifestoSource, ManifestoDemand } from "@/data/manifesto";
import { theme } from "@/data/theme";
import CopyButton from "@/components/CopyButton";
import PosterCard from "@/components/PosterCard";
import { downloadCanvas, drawCanvasLogo, drawFittedText, drawPosterBase } from "@/lib/download";
import { readProgress, saveProgress } from "@/lib/localStorage";
import { shareText } from "@/lib/share";

async function drawManifestoCard(demand: ManifestoDemand) {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas unavailable.");
  }

  canvas.width = width;
  canvas.height = height;
  drawPosterBase(ctx, width, height);

  const margin = 104;
  const logoHeight = await drawCanvasLogo(ctx, margin, 94, 430);

  ctx.fillStyle = theme.colors.stamp;
  ctx.font = "900 172px Impact, Arial Black, sans-serif";
  ctx.fillText(demand.id, margin, 272 + logoHeight * 0.15);

  drawFittedText(ctx, {
    text: demand.title,
    x: margin,
    y: 378,
    maxWidth: width - margin * 2,
    maxHeight: 185,
    maxFontSize: 88,
    minFontSize: 54,
    lineHeightRatio: 0.96,
    maxLines: 3,
    textTransform: "uppercase"
  });

  ctx.strokeStyle = theme.colors.ink;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(margin, 590);
  ctx.lineTo(width - margin, 590);
  ctx.stroke();

  drawFittedText(ctx, {
    text: demand.demand,
    x: margin,
    y: 656,
    maxWidth: width - margin * 2,
    maxHeight: 300,
    maxFontSize: 42,
    minFontSize: 28,
    weight: 700,
    family: "Arial, sans-serif",
    lineHeightRatio: 1.35
  });

  ctx.strokeStyle = theme.colors.ink;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(margin, 980);
  ctx.lineTo(width - margin, 980);
  ctx.stroke();

  ctx.fillStyle = theme.colors.stamp;
  ctx.font = "900 31px Arial, sans-serif";
  ctx.fillText("WHAT IT MEANS", margin, 1035);
  drawFittedText(ctx, {
    text: demand.whatItMeans,
    x: margin,
    y: 1080,
    maxWidth: width - margin * 2,
    maxHeight: 70,
    maxFontSize: 30,
    minFontSize: 22,
    weight: 700,
    family: "Arial, sans-serif",
    lineHeightRatio: 1.2,
    maxLines: 2
  });

  ctx.fillStyle = theme.colors.stamp;
  ctx.font = "900 34px Arial, sans-serif";
  ctx.fillText("INDEPENDENT SUPPORTER-MADE GRAPHIC", margin, height - 166);
  ctx.fillStyle = theme.colors.ink;
  ctx.fillText("CJP ACTION HUB", margin, height - 118);

  return canvas;
}

export default function ManifestoCards({ preview = false }: { preview?: boolean }) {
  const demands = preview ? manifestoDemands.slice(0, 3) : manifestoDemands;

  function markRead() {
    saveProgress({ ...readProgress(), "read-demands": true });
  }

  async function download(demand: ManifestoDemand) {
    const canvas = await drawManifestoCard(demand);
    downloadCanvas(canvas, `cjp-action-hub-demand-${demand.id}.png`);
    markRead();
  }

  async function share(demand: ManifestoDemand) {
    await shareText(`CJP manifesto demand ${demand.id}`, `${demand.title}\n\n${demand.demand}`, manifestoSource.href);
    markRead();
  }

  return (
    <section className="section-shell py-16" aria-labelledby={preview ? "manifesto-preview-title" : "manifesto-title"}>
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="section-kicker">Manifesto in 5 cards</p>
          <h2 id={preview ? "manifesto-preview-title" : "manifesto-title"} className="section-title mt-2">
            The Five Demands.
          </h2>
        </div>
        <div className="space-y-4">
          <p className="text-base font-bold leading-relaxed text-coal">
            Condensed from the official site into shareable editorial cards, with short neutral explainers for context.
          </p>
          <a href={manifestoSource.href} target="_blank" rel="noreferrer" className="button-secondary">
            {manifestoSource.label} <ExternalLink aria-hidden="true" size={16} />
          </a>
        </div>
      </div>
      <div className={preview ? "flex snap-x gap-5 overflow-x-auto pb-5 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3" : "flex snap-x gap-5 overflow-x-auto pb-5 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3 2xl:grid-cols-5"}>
        {demands.map((demand) => (
          <PosterCard key={demand.id} className="min-w-[82vw] snap-start md:min-w-0">
            <div className="flex h-full flex-col gap-5">
              <div className="min-w-0">
                <p className="font-display text-8xl font-black leading-none text-stamp">{demand.id}</p>
                <h3 className="mt-2 min-w-0 break-words font-display text-[2.15rem] font-black uppercase leading-none hyphens-auto xl:text-[2rem] 2xl:text-[1.85rem]">
                  {demand.title}
                </h3>
                <p className="safe-text mt-4 text-sm font-bold leading-relaxed text-coal">{demand.demand}</p>
              </div>
              <div className="grid gap-3 border-y-2 border-ink py-4 text-sm">
                <div>
                  <p className="font-black uppercase text-stamp">What it means</p>
                  <p className="safe-text mt-1 font-bold text-coal">{demand.whatItMeans}</p>
                </div>
                <div>
                  <p className="font-black uppercase text-stamp">Why supporters care</p>
                  <p className="safe-text mt-1 font-bold text-coal">{demand.whySupportersCare}</p>
                </div>
              </div>
              <div className="mt-auto grid gap-2">
                <CopyButton
                  text={`${demand.title}\n\n${demand.demand}\n\n${manifestoSource.href}`}
                  label="Copy caption"
                  onCopied={markRead}
                />
                <button type="button" onClick={() => download(demand)} className="button-primary">
                  <Download aria-hidden="true" size={16} />
                  Download card
                </button>
                <button type="button" onClick={() => share(demand)} className="button-secondary">
                  <Share2 aria-hidden="true" size={16} />
                  Share text
                </button>
              </div>
            </div>
          </PosterCard>
        ))}
      </div>
    </section>
  );
}
