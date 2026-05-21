import { theme } from "@/data/theme";

export type CardSizeKey = "square" | "story" | "twitter" | "whatsapp";

export const cardSizes: Record<CardSizeKey, { label: string; width: number; height: number }> = {
  square: { label: "Instagram Square 1080x1080", width: 1080, height: 1080 },
  story: { label: "Instagram Story 1080x1920", width: 1080, height: 1920 },
  twitter: { label: "X/Twitter Post 1600x900", width: 1600, height: 900 },
  whatsapp: { label: "WhatsApp Status 1080x1920", width: 1080, height: 1920 }
};

export function downloadCanvas(canvas: HTMLCanvasElement, fileName: string) {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function loadCanvasImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image: ${src}`));
    image.src = src;
  });
}

export async function drawCanvasLogo(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number
) {
  try {
    const logo = await loadCanvasImage("/cjp-logo.svg");
    const height = width * (90 / 760);
    ctx.drawImage(logo, x, y, width, height);
    return height;
  } catch {
    const height = width * 0.14;
    ctx.save();
    ctx.fillStyle = theme.colors.paper;
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = theme.colors.ink;
    ctx.lineWidth = Math.max(2, width * 0.005);
    ctx.beginPath();
    ctx.arc(x + height * 0.5, y + height * 0.5, height * 0.36, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = theme.colors.ink;
    ctx.font = `900 ${Math.round(height * 0.28)}px Arial Black, Impact, sans-serif`;
    ctx.fillText("CJP ACTION HUB", x + height, y + height * 0.44);
    ctx.fillStyle = theme.colors.stamp;
    ctx.font = `700 ${Math.round(height * 0.16)}px Arial, sans-serif`;
    ctx.fillText("INDEPENDENT SUPPORTER TOOLKIT", x + height, y + height * 0.72);
    ctx.restore();
    return height;
  }
}

function splitLongToken(ctx: CanvasRenderingContext2D, token: string, maxWidth: number) {
  const pieces: string[] = [];
  let piece = "";

  Array.from(token).forEach((char) => {
    const testPiece = `${piece}${char}`;
    if (ctx.measureText(testPiece).width > maxWidth && piece) {
      pieces.push(piece);
      piece = char;
      return;
    }
    piece = testPiece;
  });

  if (piece) {
    pieces.push(piece);
  }

  return pieces;
}

export function getWrappedLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const tokens = text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .flatMap((token) => (ctx.measureText(token).width > maxWidth ? splitLongToken(ctx, token, maxWidth) : token));

  const lines: string[] = [];
  let line = "";

  tokens.forEach((token) => {
    const testLine = line ? `${line} ${token}` : token;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = token;
      return;
    }
    line = testLine;
  });

  if (line) {
    lines.push(line);
  }

  return lines;
}

export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines?: number
) {
  let lines = getWrappedLines(ctx, text, maxWidth);

  if (maxLines && lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    let lastLine = lines[lines.length - 1] ?? "";
    while (lastLine && ctx.measureText(`${lastLine}...`).width > maxWidth) {
      lastLine = lastLine.slice(0, -1).trimEnd();
    }
    lines[lines.length - 1] = `${lastLine}...`;
  }

  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });

  return y + lines.length * lineHeight;
}

export function drawFittedText(
  ctx: CanvasRenderingContext2D,
  options: {
    text: string;
    x: number;
    y: number;
    maxWidth: number;
    maxHeight: number;
    maxFontSize: number;
    minFontSize: number;
    weight?: number | string;
    family?: string;
    color?: string;
    lineHeightRatio?: number;
    maxLines?: number;
    textTransform?: "uppercase" | "none";
  }
) {
  const {
    x,
    y,
    maxWidth,
    maxHeight,
    maxFontSize,
    minFontSize,
    weight = 900,
    family = "Impact, Arial Black, sans-serif",
    color = theme.colors.ink,
    lineHeightRatio = 1.02,
    maxLines,
    textTransform = "none"
  } = options;
  const text = textTransform === "uppercase" ? options.text.toUpperCase() : options.text;
  let fontSize = maxFontSize;
  let lines: string[] = [];
  let lineHeight = fontSize * lineHeightRatio;

  for (let size = maxFontSize; size >= minFontSize; size -= 2) {
    ctx.font = `${weight} ${Math.round(size)}px ${family}`;
    const candidateLineHeight = size * lineHeightRatio;
    const candidateLines = getWrappedLines(ctx, text, maxWidth);
    const fitsHeight = candidateLines.length * candidateLineHeight <= maxHeight;
    const fitsLines = !maxLines || candidateLines.length <= maxLines;

    fontSize = size;
    lines = candidateLines;
    lineHeight = candidateLineHeight;

    if (fitsHeight && fitsLines) {
      break;
    }
  }

  if (maxLines && lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    let lastLine = lines[lines.length - 1] ?? "";
    while (lastLine && ctx.measureText(`${lastLine}...`).width > maxWidth) {
      lastLine = lastLine.slice(0, -1).trimEnd();
    }
    lines[lines.length - 1] = `${lastLine}...`;
  }

  const safeLineCount = Math.max(1, Math.floor(maxHeight / lineHeight));
  if (lines.length > safeLineCount) {
    lines = lines.slice(0, safeLineCount);
  }

  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${weight} ${Math.round(fontSize)}px ${family}`;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
  ctx.restore();

  return y + lines.length * lineHeight;
}

export function drawPosterBase(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = theme.colors.paper;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.13;
  ctx.fillStyle = theme.colors.ink;
  for (let i = 0; i < width * height * 0.00018; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.globalAlpha = 1;

  const margin = Math.max(40, width * 0.055);
  ctx.strokeStyle = theme.colors.ink;
  ctx.lineWidth = Math.max(8, width * 0.01);
  ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

  ctx.strokeStyle = theme.colors.stamp;
  ctx.lineWidth = Math.max(5, width * 0.006);
  ctx.strokeRect(margin + 26, margin + 26, width - (margin + 26) * 2, height - (margin + 26) * 2);
}

export async function drawShareCard(options: {
  text: string;
  kicker: string;
  size: CardSizeKey;
  showWatermark: boolean;
}) {
  const size = cardSizes[options.size];
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas is not supported.");
  }

  canvas.width = size.width;
  canvas.height = size.height;

  drawPosterBase(ctx, size.width, size.height);

  const shortestSide = Math.min(size.width, size.height);
  const margin = Math.max(60, shortestSide * 0.08);
  const logoWidth = Math.min(size.width * 0.42, 500);
  const logoHeight = await drawCanvasLogo(ctx, margin, margin, logoWidth);

  ctx.fillStyle = theme.colors.ink;
  ctx.font = `900 ${Math.round(shortestSide * 0.028)}px Arial, sans-serif`;
  ctx.fillText("INDEPENDENT SUPPORTER-MADE GRAPHIC", margin, margin + logoHeight + shortestSide * 0.05);

  ctx.fillStyle = theme.colors.stamp;
  ctx.font = `900 ${Math.round(shortestSide * 0.04)}px Arial, sans-serif`;
  wrapText(
    ctx,
    options.kicker.toUpperCase(),
    margin,
    margin + logoHeight + shortestSide * 0.105,
    size.width - margin * 2,
    shortestSide * 0.045,
    2
  );

  const titleTop = Math.max(size.height * 0.33, margin + logoHeight + shortestSide * 0.22);
  const titleBottom = size.height - margin - Math.max(210, shortestSide * 0.2);
  drawFittedText(ctx, {
    text: options.text,
    x: margin,
    y: titleTop,
    maxWidth: size.width - margin * 2,
    maxHeight: Math.max(shortestSide * 0.22, titleBottom - titleTop),
    maxFontSize: Math.max(76, shortestSide * 0.105),
    minFontSize: 42,
    textTransform: "uppercase"
  });

  const stampWidth = Math.min(size.width * 0.42, 520);
  const stampHeight = Math.max(110, size.height * 0.08);
  ctx.save();
  ctx.translate(size.width - margin - stampWidth / 2, size.height - margin - stampHeight);
  ctx.rotate(-0.08);
  ctx.strokeStyle = theme.colors.stamp;
  ctx.lineWidth = 9;
  ctx.strokeRect(-stampWidth / 2, -stampHeight / 2, stampWidth, stampHeight);
  ctx.fillStyle = theme.colors.stamp;
  ctx.font = `900 ${Math.round(stampHeight * 0.35)}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("CLEAN SATIRE", 0, 12);
  ctx.restore();

  ctx.textAlign = "left";
  ctx.fillStyle = theme.colors.ink;
  ctx.font = `700 ${Math.round(shortestSide * 0.026)}px Arial, sans-serif`;
  ctx.fillText("Independent supporter-made graphic", margin, size.height - margin - 24);

  if (options.showWatermark) {
    ctx.textAlign = "right";
    ctx.fillStyle = theme.colors.ink;
    ctx.font = `900 ${Math.round(shortestSide * 0.028)}px Arial, sans-serif`;
    ctx.fillText("CJP ACTION HUB", size.width - margin, size.height - margin - 24);
  }

  return canvas;
}
