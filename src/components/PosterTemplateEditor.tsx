"use client";

import { ChangeEvent, useState } from "react";
import { Download, FileDown, Hand, Megaphone, RotateCcw, Shield, UsersRound } from "lucide-react";
import PosterCard from "@/components/PosterCard";
import {
  posterTemplateDefaults,
  posterTemplateFieldGroups,
  PosterTemplateFieldId,
  PosterTemplateValues
} from "@/data/posterTemplate";
import { theme } from "@/data/theme";
import { cn } from "@/lib/cn";
import { downloadCanvas, getWrappedLines } from "@/lib/download";

const posterWidth = 1200;
const posterHeight = 1500;
const olive = "#5b5b35";
const topSlogan = "जनता का हक, जनता के साथ";
const demandIds: PosterTemplateFieldId[] = ["demandOne", "demandTwo", "demandThree", "demandFour"];
const demandIcons = [Shield, UsersRound, Hand, Megaphone];

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function drawNoise(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = theme.colors.ink;
  for (let i = 0; i < 1400; i += 1) {
    const size = Math.random() > 0.86 ? 2.4 : 1.2;
    ctx.fillRect(Math.random() * posterWidth, Math.random() * posterHeight, size, size);
  }
  ctx.restore();
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color = theme.colors.stamp) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const pointRadius = i % 2 === 0 ? radius : radius * 0.42;
    ctx.lineTo(x + Math.cos(angle) * pointRadius, y + Math.sin(angle) * pointRadius);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawFittedSingleLine(
  ctx: CanvasRenderingContext2D,
  options: {
    text: string;
    x: number;
    y: number;
    maxWidth: number;
    maxFontSize: number;
    minFontSize: number;
    weight?: number | string;
    family?: string;
    color?: string;
    align?: CanvasTextAlign;
  }
) {
  const {
    x,
    y,
    maxWidth,
    maxFontSize,
    minFontSize,
    weight = 900,
    family = "Impact, Arial Black, sans-serif",
    color = theme.colors.ink,
    align = "center"
  } = options;
  let text = cleanText(options.text).toUpperCase();
  let fontSize = maxFontSize;

  ctx.save();
  for (let size = maxFontSize; size >= minFontSize; size -= 1) {
    ctx.font = `${weight} ${Math.round(size)}px ${family}`;
    fontSize = size;
    if (ctx.measureText(text).width <= maxWidth) {
      break;
    }
  }

  ctx.font = `${weight} ${Math.round(fontSize)}px ${family}`;
  while (text.length > 1 && ctx.measureText(text).width > maxWidth) {
    text = text.slice(0, -1).trimEnd();
  }

  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text || options.text.slice(0, 1), x, y);
  ctx.restore();
}

function getManualLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  return text
    .split(/\r?\n/)
    .flatMap((line) => {
      const cleanLine = line.trim();
      return cleanLine ? getWrappedLines(ctx, cleanLine, maxWidth) : [""];
    })
    .filter((line, index, lines) => line || index < lines.length - 1);
}

function drawFittedPosterText(
  ctx: CanvasRenderingContext2D,
  options: {
    text: string;
    x: number;
    y: number;
    maxWidth: number;
    maxHeight: number;
    maxFontSize: number;
    minFontSize: number;
    color: string;
    lineHeightRatio: number;
    family?: string;
    maxLines?: number;
  }
) {
  const {
    text,
    x,
    y,
    maxWidth,
    maxHeight,
    maxFontSize,
    minFontSize,
    color,
    lineHeightRatio,
    family = "Impact, Arial Black, sans-serif",
    maxLines
  } = options;
  const value = text.toUpperCase();
  let fontSize = maxFontSize;
  let lines: string[] = [];
  let lineHeight = fontSize * lineHeightRatio;

  for (let size = maxFontSize; size >= minFontSize; size -= 2) {
    ctx.font = `900 ${Math.round(size)}px ${family}`;
    const candidateLineHeight = size * lineHeightRatio;
    const candidateLines = getManualLines(ctx, value, maxWidth);
    const fitsHeight = candidateLines.length * candidateLineHeight <= maxHeight;
    const fitsLines = !maxLines || candidateLines.length <= maxLines;
    fontSize = size;
    lines = candidateLines;
    lineHeight = candidateLineHeight;

    if (fitsHeight && fitsLines) {
      break;
    }
  }

  const safeLineCount = Math.max(1, Math.floor(maxHeight / lineHeight));
  if (lines.length > safeLineCount) {
    lines = lines.slice(0, safeLineCount);
  }

  if (maxLines && lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
  }

  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `900 ${Math.round(fontSize)}px ${family}`;
  ctx.textAlign = "left";
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
  ctx.restore();
}

function drawWrappedPosterText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
) {
  ctx.save();
  ctx.fillStyle = theme.colors.ink;
  ctx.font = "900 25px Arial Narrow, Arial Black, sans-serif";
  const lines = getManualLines(ctx, text.toUpperCase(), maxWidth).slice(0, maxLines);
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
  ctx.restore();
}

function drawBurst(ctx: CanvasRenderingContext2D, x: number, y: number, flip = 1) {
  ctx.save();
  ctx.strokeStyle = theme.colors.stamp;
  ctx.lineWidth = 4;
  const offsets = [-44, -24, 0, 24, 44];
  offsets.forEach((offset, index) => {
    ctx.beginPath();
    ctx.moveTo(x, y + offset);
    ctx.lineTo(x + flip * (index === 2 ? 54 : 42), y + offset * 0.45);
    ctx.stroke();
  });
  ctx.restore();
}

function drawDemandIcon(ctx: CanvasRenderingContext2D, index: number, x: number, y: number) {
  ctx.save();
  ctx.fillStyle = olive;
  ctx.beginPath();
  ctx.arc(x, y, 39, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = theme.colors.paper;
  ctx.fillStyle = theme.colors.paper;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (index === 0) {
    ctx.beginPath();
    ctx.moveTo(x, y - 22);
    ctx.lineTo(x + 20, y - 12);
    ctx.lineTo(x + 15, y + 19);
    ctx.lineTo(x, y + 29);
    ctx.lineTo(x - 15, y + 19);
    ctx.lineTo(x - 20, y - 12);
    ctx.closePath();
    ctx.stroke();
    drawStar(ctx, x, y + 1, 10, theme.colors.paper);
  } else if (index === 1) {
    ctx.beginPath();
    ctx.arc(x, y - 13, 10, 0, Math.PI * 2);
    ctx.arc(x - 19, y - 3, 8, 0, Math.PI * 2);
    ctx.arc(x + 19, y - 3, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y + 25, 25, Math.PI, Math.PI * 2);
    ctx.arc(x - 20, y + 24, 17, Math.PI, Math.PI * 2);
    ctx.arc(x + 20, y + 24, 17, Math.PI, Math.PI * 2);
    ctx.stroke();
  } else if (index === 2) {
    ctx.fillRect(x - 22, y - 2, 17, 28);
    ctx.fillRect(x - 6, y - 14, 15, 40);
    ctx.fillRect(x + 8, y - 10, 15, 36);
    ctx.fillRect(x + 20, y - 2, 10, 28);
    ctx.fillRect(x - 25, y + 21, 52, 9);
  } else {
    ctx.beginPath();
    ctx.moveTo(x - 25, y - 2);
    ctx.lineTo(x + 14, y - 22);
    ctx.lineTo(x + 14, y + 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x - 26, y - 10, 13, 20);
    ctx.strokeStyle = theme.colors.paper;
    ctx.beginPath();
    ctx.moveTo(x + 22, y - 18);
    ctx.lineTo(x + 32, y - 28);
    ctx.moveTo(x + 25, y);
    ctx.lineTo(x + 38, y);
    ctx.moveTo(x + 22, y + 18);
    ctx.lineTo(x + 32, y + 28);
    ctx.stroke();
  }

  ctx.restore();
}

function drawPosterBase(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = theme.colors.paper;
  ctx.fillRect(0, 0, posterWidth, posterHeight);
  drawNoise(ctx);

  ctx.strokeStyle = theme.colors.ink;
  ctx.lineWidth = 22;
  ctx.strokeRect(34, 34, posterWidth - 68, posterHeight - 68);
  ctx.strokeStyle = theme.colors.stamp;
  ctx.lineWidth = 7;
  ctx.strokeRect(58, 58, posterWidth - 116, posterHeight - 116);
  ctx.strokeStyle = theme.colors.ink;
  ctx.lineWidth = 2;
  ctx.strokeRect(72, 72, posterWidth - 144, posterHeight - 144);

  ctx.strokeStyle = theme.colors.ink;
  ctx.lineWidth = 5;
  ctx.strokeRect(78, 82, 190, 92);
  ctx.fillStyle = theme.colors.ink;
  ctx.fillRect(88, 92, 105, 72);
  ctx.fillStyle = theme.colors.paper;
  ctx.font = "900 58px Impact, Arial Black, sans-serif";
  ctx.fillText("CJP", 102, 148);
  drawStar(ctx, 226, 126, 26);

  ctx.fillStyle = theme.colors.ink;
  ctx.fillRect(278, 94, 812, 68);
  drawFittedSingleLine(ctx, {
    text: "COCKROACH JANTA PARTY",
    x: 306,
    y: 139,
    maxWidth: 365,
    maxFontSize: 33,
    minFontSize: 20,
    color: theme.colors.paper,
    align: "left"
  });
  drawStar(ctx, 710, 128, 18);
  drawFittedSingleLine(ctx, {
    text: topSlogan,
    x: 890,
    y: 139,
    maxWidth: 315,
    maxFontSize: 26,
    minFontSize: 15,
    family: "Arial Black, Nirmala UI, sans-serif",
    color: theme.colors.paper
  });
  drawStar(ctx, 1056, 128, 18);

  ctx.strokeStyle = theme.colors.stamp;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(700, 230);
  ctx.lineTo(1060, 230);
  ctx.moveTo(700, 298);
  ctx.lineTo(1060, 298);
  ctx.stroke();
  for (let i = 0; i < 5; i += 1) {
    drawStar(ctx, 760 + i * 66, 264, 18, olive);
  }

  ctx.strokeStyle = olive;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(925, 492, 118, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(925, 492, 98, 0, Math.PI * 2);
  ctx.stroke();
  drawFittedSingleLine(ctx, {
    text: "People First",
    x: 925,
    y: 430,
    maxWidth: 190,
    maxFontSize: 24,
    minFontSize: 15,
    family: "Arial Black, Arial, sans-serif",
    color: olive
  });
  drawStar(ctx, 925, 466, 16, theme.colors.stamp);
  drawFittedSingleLine(ctx, {
    text: "CJP",
    x: 925,
    y: 522,
    maxWidth: 150,
    maxFontSize: 54,
    minFontSize: 32,
    color: olive
  });
  drawFittedSingleLine(ctx, {
    text: "Power to the People",
    x: 925,
    y: 578,
    maxWidth: 210,
    maxFontSize: 21,
    minFontSize: 13,
    family: "Arial Black, Arial, sans-serif",
    color: olive
  });
  drawStar(ctx, 858, 504, 15, olive);
  drawStar(ctx, 992, 504, 15, olive);

  ctx.strokeStyle = olive;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(78, 748);
  ctx.lineTo(706, 748);
  ctx.stroke();

  drawBurst(ctx, 98, 872, 1);
  drawBurst(ctx, 674, 872, -1);

  ctx.fillStyle = theme.colors.ink;
  for (let x = 78; x < 712; x += 16) {
    ctx.beginPath();
    ctx.arc(x, 1038, 4.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = theme.colors.ink;
  ctx.fillRect(70, 1288, 1060, 90);
  drawFittedSingleLine(ctx, {
    text: "Call To Action / Join / Share / Speak Up",
    x: 600,
    y: 1348,
    maxWidth: 880,
    maxFontSize: 44,
    minFontSize: 24,
    color: theme.colors.paper
  });
  drawBurst(ctx, 100, 1334, 1);
  drawBurst(ctx, 1100, 1334, -1);

  ctx.fillStyle = theme.colors.stamp;
  ctx.fillRect(70, 1388, 1060, 62);
  const footer = ["#YourHashtag", "YourWebsite.com", "Your Tagline Here"];
  footer.forEach((text, index) => {
    const x = 170 + index * 335;
    drawStar(ctx, x - 68, 1419, 18, theme.colors.paper);
    drawFittedSingleLine(ctx, {
      text,
      x: x + 70,
      y: 1429,
      maxWidth: 225,
      maxFontSize: 24,
      minFontSize: 12,
      color: theme.colors.paper
    });
    if (index < 2) {
      ctx.strokeStyle = theme.colors.paper;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(420 + index * 335, 1399);
      ctx.lineTo(420 + index * 335, 1440);
      ctx.stroke();
    }
  });
}

function drawDemandsPanel(ctx: CanvasRenderingContext2D, values: PosterTemplateValues) {
  ctx.strokeStyle = olive;
  ctx.lineWidth = 4;
  ctx.strokeRect(700, 668, 405, 520);
  ctx.save();
  ctx.translate(742, 675);
  ctx.rotate(-0.018);
  ctx.fillStyle = olive;
  ctx.fillRect(0, 0, 285, 62);
  drawFittedSingleLine(ctx, {
    text: "Our Demands",
    x: 143,
    y: 42,
    maxWidth: 245,
    maxFontSize: 36,
    minFontSize: 22,
    color: theme.colors.paper
  });
  ctx.restore();

  ctx.strokeStyle = theme.colors.stamp;
  ctx.lineWidth = 4;
  [[720, 702, 692, 690], [720, 718, 690, 718], [720, 734, 692, 746], [1074, 702, 1102, 690], [1074, 718, 1104, 718], [1074, 734, 1102, 746]].forEach(
    ([x1, y1, x2, y2]) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  );

  demandIds.forEach((id, index) => {
    const y = 790 + index * 102;
    drawDemandIcon(ctx, index, 770, y);
    drawFittedPosterText(ctx, {
      text: values[id],
      x: 840,
      y: y - 18,
      maxWidth: 230,
      maxHeight: 64,
      maxFontSize: 27,
      minFontSize: 16,
      color: theme.colors.ink,
      lineHeightRatio: 1.12,
      family: "Arial Black, Arial, sans-serif",
      maxLines: 2
    });
    ctx.strokeStyle = theme.colors.stamp;
    ctx.lineWidth = 2;
    ctx.setLineDash([9, 8]);
    ctx.beginPath();
    ctx.moveTo(808, y + 46);
    ctx.lineTo(1074, y + 46);
    ctx.stroke();
    ctx.setLineDash([]);
  });
}

function drawEditablePoster(values: PosterTemplateValues) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas unavailable.");
  }

  canvas.width = posterWidth;
  canvas.height = posterHeight;

  drawPosterBase(ctx);
  drawFittedPosterText(ctx, {
    text: values.headline,
    x: 78,
    y: 335,
    maxWidth: 680,
    maxHeight: 390,
    maxFontSize: 155,
    minFontSize: 54,
    color: theme.colors.ink,
    lineHeightRatio: 0.86,
    maxLines: 3
  });
  drawFittedPosterText(ctx, {
    text: values.message,
    x: 128,
    y: 850,
    maxWidth: 545,
    maxHeight: 170,
    maxFontSize: 92,
    minFontSize: 40,
    color: theme.colors.stamp,
    lineHeightRatio: 0.9,
    maxLines: 2
  });
  drawWrappedPosterText(ctx, values.description, 92, 1080, 590, 34, 4);
  drawDemandsPanel(ctx, values);

  return canvas;
}

function PreviewText({
  id,
  values,
  className
}: {
  id: PosterTemplateFieldId;
  values: PosterTemplateValues;
  className?: string;
}) {
  if (!values[id].trim()) {
    return null;
  }

  return <span className={cn("whitespace-pre-line", className)}>{values[id]}</span>;
}

function DemandIcon({ index }: { index: number }) {
  const Icon = demandIcons[index] ?? Shield;

  return (
    <span className="grid aspect-square place-items-center rounded-full bg-[#5b5b35] text-paper">
      <Icon aria-hidden="true" size="58%" strokeWidth={3} />
    </span>
  );
}

export default function PosterTemplateEditor() {
  const [values, setValues] = useState<PosterTemplateValues>(posterTemplateDefaults);
  const [status, setStatus] = useState("Download poster");

  function updateField(id: PosterTemplateFieldId, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
  }

  function resetPoster() {
    setValues(posterTemplateDefaults);
    setStatus("Download poster");
  }

  function downloadPoster() {
    setStatus("Preparing");
    try {
      const canvas = drawEditablePoster(values);
      downloadCanvas(canvas, "cjp-action-hub-editable-poster.png");
      setStatus("Downloaded");
    } catch {
      setStatus("Try again");
    }
    window.setTimeout(() => setStatus("Download poster"), 1600);
  }

  return (
    <PosterCard className="md:col-span-2" id="poster-template-editor">
      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="min-w-0">
          <p className="section-kicker">Poster template</p>
          <h3 className="safe-text mt-2 font-display text-4xl font-black uppercase leading-none sm:text-5xl">
            Build your poster.
          </h3>
          <p className="safe-text mt-2 text-sm font-bold leading-relaxed text-coal sm:mt-3">
            Edit only the headline, main message, subheadline, and demand lines. The poster frame stays locked to the
            rally-newspaper template.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:gap-3">
            <button type="button" onClick={downloadPoster} className="button-primary">
              <Download aria-hidden="true" size={18} />
              <span className="sm:hidden">Download</span>
              <span className="hidden sm:inline">{status}</span>
            </button>
            <a href="/creator-kit/poster-template.svg" className="button-secondary" download>
              <FileDown aria-hidden="true" size={18} />
              Base SVG
            </a>
            <button type="button" onClick={resetPoster} className="button-ghost sm:col-span-2">
              <RotateCcw aria-hidden="true" size={18} />
              Reset poster
            </button>
          </div>

          <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4">
            {posterTemplateFieldGroups.map((group, index) => (
              <details key={group.title} open={index === 0} className="border-2 border-ink bg-paper">
                <summary className="cursor-pointer px-4 py-3 text-sm font-black uppercase">
                  {group.title}
                </summary>
                <div className="grid gap-4 border-t-2 border-ink p-4">
                  {group.fields.map((field) => {
                    const inputId = `poster-${field.id}`;

                    return (
                      <div key={field.id} className="grid gap-2">
                        <label htmlFor={inputId} className="text-xs font-black uppercase text-coal">
                          {field.label}
                        </label>
                        <textarea
                          id={inputId}
                          value={values[field.id]}
                          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateField(field.id, event.target.value)}
                          maxLength={field.maxLength}
                          rows={field.rows}
                          className="input-field min-h-20 resize-y"
                        />
                      </div>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="grid min-w-0 place-items-center xl:sticky xl:top-32 xl:self-start">
          <div
            className="poster-template-preview paper-edge relative aspect-[4/5] w-full max-w-[330px] overflow-hidden border-[7px] border-ink bg-paper p-[3.2%] shadow-brutal sm:max-w-[590px] sm:border-[10px]"
            aria-label="Editable poster preview"
          >
            <div className="absolute inset-[2.8%] border-[3px] border-stamp" />
            <div className="absolute inset-[4%] border border-ink/70" />
            <div className="relative z-10 h-full w-full">
              <div className="absolute left-[2.2%] top-[2.3%] flex h-[6.8%] w-[18%] items-center gap-[6%] overflow-hidden border-2 border-ink bg-paper p-[1.2%]">
                <span className="grid h-full w-[66%] place-items-center bg-ink text-paper">
                  <span className="poster-preview-logo font-display font-black uppercase leading-none">CJP</span>
                </span>
                <span className="poster-preview-star text-stamp">*</span>
              </div>
              <div className="absolute left-[21.2%] top-[3.2%] flex h-[5.6%] w-[76%] items-center justify-between gap-[2%] overflow-hidden bg-ink px-[3%] text-paper">
                <span className="poster-preview-party font-display font-black uppercase leading-none">Cockroach Janta Party</span>
                <span className="poster-preview-star shrink-0 text-stamp">*</span>
                <span className="poster-preview-top-slogan text-right font-black leading-tight">{topSlogan}</span>
                <span className="poster-preview-star shrink-0 text-stamp">*</span>
              </div>

              <div className="absolute left-[2.5%] top-[11.5%] h-[37%] w-[67%] overflow-hidden">
                <PreviewText id="headline" values={values} className="poster-preview-headline font-display font-black uppercase leading-[0.84]" />
              </div>
              <div className="absolute left-[2.5%] top-[49.5%] h-[0.75%] w-[61%] bg-[#5b5b35]" />
              <div className="absolute left-[7.5%] top-[51.5%] h-[15.8%] w-[55%] overflow-hidden text-stamp">
                <PreviewText id="message" values={values} className="poster-preview-message font-display font-black uppercase leading-[0.87]" />
              </div>
              <div className="absolute left-[5.5%] top-[55.3%] h-[9%] w-[4%]">
                <span className="block h-[2px] w-full rotate-[28deg] bg-stamp" />
                <span className="mt-[45%] block h-[2px] w-full rotate-[12deg] bg-stamp" />
                <span className="mt-[45%] block h-[2px] w-full bg-stamp" />
                <span className="mt-[45%] block h-[2px] w-full rotate-[-12deg] bg-stamp" />
              </div>
              <div className="absolute left-[63%] top-[55.3%] h-[9%] w-[4%]">
                <span className="block h-[2px] w-full rotate-[-28deg] bg-stamp" />
                <span className="mt-[45%] block h-[2px] w-full rotate-[-12deg] bg-stamp" />
                <span className="mt-[45%] block h-[2px] w-full bg-stamp" />
                <span className="mt-[45%] block h-[2px] w-full rotate-[12deg] bg-stamp" />
              </div>
              <div className="absolute left-[2.5%] top-[68.5%] flex w-[62%] gap-[1.1%]">
                {Array.from({ length: 28 }).map((_, index) => (
                  <span key={index} className="h-1.5 w-1.5 rounded-full bg-ink" />
                ))}
              </div>
              <div className="absolute left-[3.8%] top-[70.2%] h-[10.2%] w-[58.5%] overflow-hidden">
                <PreviewText id="description" values={values} className="poster-preview-description font-black uppercase leading-[1.35] tracking-[0.07em]" />
              </div>

              <div className="absolute right-[4%] top-[15.2%] h-[8%] w-[35%] border-y-4 border-stamp py-[2%] text-center text-[#5b5b35]">
                <span className="poster-preview-star mx-2">*</span>
                <span className="poster-preview-star mx-2">*</span>
                <span className="poster-preview-star mx-2">*</span>
                <span className="poster-preview-star mx-2">*</span>
                <span className="poster-preview-star mx-2">*</span>
              </div>

              <div className="absolute right-[8%] top-[27%] grid aspect-square w-[24%] place-items-center overflow-hidden rounded-full border-[3px] border-[#5b5b35] p-[8%] text-center text-[#5b5b35]">
                <span className="poster-preview-stamp-small font-black uppercase tracking-[0.08em]">People First</span>
                <span className="text-stamp">*</span>
                <span className="poster-preview-stamp-main font-display font-black uppercase leading-none">CJP</span>
                <span className="poster-preview-stamp-small font-black uppercase tracking-normal">Power To The People</span>
              </div>

              <div className="absolute right-[3.8%] top-[45.4%] h-[35.6%] w-[36.5%] border-[3px] border-[#5b5b35] bg-paper/40 p-[4%]">
                <div className="absolute -left-[3%] top-[5%] h-[8%] w-[9%]">
                  <span className="block h-[2px] w-full rotate-[32deg] bg-stamp" />
                  <span className="mt-[40%] block h-[2px] w-full bg-stamp" />
                  <span className="mt-[40%] block h-[2px] w-full rotate-[-32deg] bg-stamp" />
                </div>
                <div className="absolute -right-[3%] top-[5%] h-[8%] w-[9%]">
                  <span className="block h-[2px] w-full rotate-[-32deg] bg-stamp" />
                  <span className="mt-[40%] block h-[2px] w-full bg-stamp" />
                  <span className="mt-[40%] block h-[2px] w-full rotate-[32deg] bg-stamp" />
                </div>
                <div className="mb-[5%] rotate-[-1deg] bg-[#5b5b35] px-[4%] py-[3%] text-center text-paper">
                  <span className="poster-preview-panel-title font-display font-black uppercase leading-none">Our Demands</span>
                </div>
                <div className="grid h-[75%] grid-rows-4">
                  {demandIds.map((id, index) => (
                    <div key={id} className="grid min-h-0 grid-cols-[23%_1fr] items-center gap-[5%] overflow-hidden border-b border-dashed border-stamp py-[1.6%] last:border-b-0">
                      <DemandIcon index={index} />
                      <PreviewText id={id} values={values} className="poster-preview-demand font-black uppercase leading-tight" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-[6.4%] left-[3%] flex h-[6%] w-[94%] items-center justify-center overflow-hidden bg-ink px-[4%] text-paper">
                <span className="poster-preview-cta text-center font-display font-black uppercase leading-none">
                  Call To Action / Join / Share / Speak Up
                </span>
              </div>
              <div className="absolute bottom-[1.6%] left-[3%] grid h-[4.3%] w-[94%] grid-cols-3 items-center overflow-hidden bg-stamp text-center text-paper">
                <span className="poster-preview-footer font-display font-black uppercase leading-none">#YourHashtag</span>
                <span className="poster-preview-footer border-x border-paper/70 font-display font-black uppercase leading-none">YourWebsite.com</span>
                <span className="poster-preview-footer font-display font-black uppercase leading-none">Your Tagline Here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PosterCard>
  );
}
