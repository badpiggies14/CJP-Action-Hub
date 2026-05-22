"use client";

/* eslint-disable @next/next/no-img-element */

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import { Circle, Download, ImagePlus, RotateCcw, Square } from "lucide-react";
import PosterCard from "@/components/PosterCard";
import { cn } from "@/lib/cn";
import { downloadCanvas, drawCanvasLogo, drawFittedText, drawPosterBase, loadCanvasImage } from "@/lib/download";
import { theme } from "@/data/theme";

type FrameShape = "round" | "square";

const imageExtensionPattern = /\.(avif|bmp|gif|jpeg|jpg|png|svg|webp)$/i;
const svgExtensionPattern = /\.svg$/i;

function normalizeSvgMarkup(markup: string) {
  if (!/<svg[\s>]/i.test(markup)) {
    return markup;
  }

  return markup.replace(/<svg\b([^>]*)>/i, (match, attributes: string) => {
    const hasWidth = /\swidth=/i.test(attributes);
    const hasHeight = /\sheight=/i.test(attributes);
    const width = hasWidth ? "" : ' width="1024"';
    const height = hasHeight ? "" : ' height="1024"';
    return `<svg${attributes}${width}${height}>`;
  });
}

function svgDataUrl(markup: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(normalizeSvgMarkup(markup))}`;
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  if (!image.naturalWidth || !image.naturalHeight) {
    ctx.drawImage(image, x, y, width, height);
    return;
  }

  const imageRatio = image.naturalWidth / image.naturalHeight;
  const frameRatio = width / height;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > frameRatio) {
    sourceWidth = image.naturalHeight * frameRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / frameRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

export default function ProfileFrameTool() {
  const [imageSrc, setImageSrc] = useState("");
  const [fileName, setFileName] = useState("");
  const [shape, setShape] = useState<FrameShape>("round");
  const [status, setStatus] = useState("Download frame");
  const [error, setError] = useState("");

  const shapeLabel = useMemo(() => (shape === "round" ? "Round" : "Square"), [shape]);

  function updateImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    setError("");

    if (!file) {
      return;
    }

    const looksLikeImage = file.type.startsWith("image/") || imageExtensionPattern.test(file.name);
    if (!looksLikeImage) {
      setFileName("");
      setImageSrc("");
      setError("Upload a browser-readable image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFileName(file.name);
      const result = String(reader.result || "");
      setImageSrc(file.type === "image/svg+xml" || svgExtensionPattern.test(file.name) ? svgDataUrl(result) : result);
    };
    reader.onerror = () => {
      setFileName("");
      setImageSrc("");
      setError("This image could not be opened by the browser.");
    };
    if (file.type === "image/svg+xml" || svgExtensionPattern.test(file.name)) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  }

  function reset() {
    setImageSrc("");
    setFileName("");
    setError("");
    setShape("round");
    setStatus("Download frame");
  }

  async function downloadFrame() {
    if (!imageSrc) {
      setError("Upload your face first.");
      return;
    }

    setStatus("Preparing");

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = await loadCanvasImage(imageSrc);

      if (!ctx) {
        throw new Error("Canvas unavailable.");
      }

      canvas.width = 1080;
      canvas.height = 1080;
      drawPosterBase(ctx, 1080, 1080);
      await drawCanvasLogo(ctx, 94, 82, 430);

      const frameSize = 600;
      const frameX = (1080 - frameSize) / 2;
      const frameY = 220;

      ctx.save();
      if (shape === "round") {
        ctx.beginPath();
        ctx.arc(540, frameY + frameSize / 2, frameSize / 2, 0, Math.PI * 2);
        ctx.clip();
      } else {
        ctx.beginPath();
        ctx.rect(frameX, frameY, frameSize, frameSize);
        ctx.clip();
      }
      drawCoverImage(ctx, image, frameX, frameY, frameSize, frameSize);
      ctx.restore();

      ctx.strokeStyle = theme.colors.ink;
      ctx.lineWidth = 18;
      if (shape === "round") {
        ctx.beginPath();
        ctx.arc(540, frameY + frameSize / 2, frameSize / 2, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.strokeRect(frameX, frameY, frameSize, frameSize);
      }

      ctx.strokeStyle = theme.colors.stamp;
      ctx.lineWidth = 10;
      if (shape === "round") {
        ctx.beginPath();
        ctx.arc(540, frameY + frameSize / 2, frameSize / 2 - 30, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.strokeRect(frameX + 30, frameY + 30, frameSize - 60, frameSize - 60);
      }

      drawFittedText(ctx, {
        text: "I Support The Swarm",
        x: 118,
        y: 875,
        maxWidth: 844,
        maxHeight: 66,
        maxFontSize: 50,
        minFontSize: 34,
        textTransform: "uppercase"
      });

      ctx.fillStyle = theme.colors.ink;
      ctx.font = "900 24px Arial, sans-serif";
      ctx.fillText("Independent supporter-made graphic", 118, 955);

      downloadCanvas(canvas, `cjp-action-hub-profile-${shape}.png`);
      setStatus("Downloaded");
      setError("");
    } catch {
      setStatus("Try again");
      setError("That image could not be rendered by this browser. Try PNG, JPG, WebP, GIF, BMP, or SVG.");
    }

    window.setTimeout(() => setStatus("Download frame"), 1800);
  }

  return (
    <PosterCard className="md:col-span-2">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="min-w-0">
          <p className="section-kicker">Profile picture frame</p>
          <h3 className="safe-text mt-2 font-display text-4xl font-black uppercase leading-none sm:text-5xl">
            Upload your face.
          </h3>
          <p className="safe-text mt-2 text-sm font-bold leading-relaxed text-coal sm:mt-3">
            Make a supporter profile graphic locally in your browser. The file never leaves this device.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:gap-3">
            <label className="button-primary cursor-pointer">
              <ImagePlus aria-hidden="true" size={18} />
              <span className="sm:hidden">Image</span>
              <span className="hidden sm:inline">Choose image</span>
              <input
                type="file"
                accept="image/*,.avif,.bmp,.gif,.jpeg,.jpg,.png,.svg,.webp"
                onChange={updateImage}
                className="sr-only"
              />
            </label>
            <button type="button" onClick={downloadFrame} disabled={!imageSrc} className="button-secondary disabled:opacity-50">
              <Download aria-hidden="true" size={18} />
              <span className="sm:hidden">Download</span>
              <span className="hidden sm:inline">{status}</span>
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4" role="radiogroup" aria-label="Profile frame shape">
            {(["round", "square"] as FrameShape[]).map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={shape === option}
                onClick={() => setShape(option)}
                className={cn(
                  "button-ghost",
                  shape === option && "!bg-ink !text-paper"
                )}
              >
                {option === "round" ? <Circle aria-hidden="true" size={17} /> : <Square aria-hidden="true" size={17} />}
                {option}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase text-coal sm:mt-4 sm:gap-3 sm:text-xs">
            <span className="safe-text">{fileName || "No image selected"}</span>
            <span>{shapeLabel} frame</span>
            {imageSrc && (
              <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-stamp underline">
                <RotateCcw aria-hidden="true" size={14} />
                Reset
              </button>
            )}
          </div>
          {error && <p className="safe-text mt-3 text-sm font-black uppercase text-stamp">{error}</p>}
        </div>
        <div className="grid place-items-center border-2 border-ink bg-paper p-3 shadow-[4px_4px_0_rgb(var(--ink))] sm:p-4">
          <div className="paper-edge grid aspect-square w-full max-w-[260px] place-items-center border-2 border-stamp bg-newsprint p-4 sm:max-w-[360px] sm:p-6">
            <div
              className={cn(
                "grid aspect-square w-full place-items-center overflow-hidden border-[8px] border-ink bg-paper",
                shape === "round" ? "rounded-full" : "rounded-none"
              )}
            >
              {imageSrc ? (
                <img src={imageSrc} alt="Uploaded supporter profile preview" className="h-full w-full object-cover" />
              ) : (
                <div className="grid place-items-center gap-3 text-center text-sm font-black uppercase text-coal/70">
                  <ImagePlus aria-hidden="true" size={34} />
                  Upload your face
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PosterCard>
  );
}
