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
    align?: CanvasTextAlign;
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
    textTransform = "none",
    align = "left"
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
  ctx.textAlign = align;
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

function drawShareStar(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color = theme.colors.stamp) {
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

function drawShareBurst(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, flip = 1) {
  ctx.save();
  ctx.strokeStyle = theme.colors.stamp;
  ctx.lineWidth = Math.max(3, scale * 0.008);
  [-1, -0.5, 0, 0.5, 1].forEach((offset, index) => {
    ctx.beginPath();
    ctx.moveTo(x, y + offset * scale * 0.08);
    ctx.lineTo(x + flip * scale * (index === 2 ? 0.12 : 0.095), y + offset * scale * 0.035);
    ctx.stroke();
  });
  ctx.restore();
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

  const shortestSide = Math.min(size.width, size.height);
  const margin = Math.max(34, shortestSide * 0.055);
  const inner = margin * 1.55;
  const headerHeight = Math.max(74, shortestSide * 0.105);
  const footerHeight = Math.max(92, shortestSide * 0.12);

  ctx.fillStyle = theme.colors.paper;
  ctx.fillRect(0, 0, size.width, size.height);
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = theme.colors.ink;
  for (let i = 0; i < size.width * size.height * 0.00016; i += 1) {
    const dot = Math.random() > 0.82 ? 2.2 : 1.2;
    ctx.fillRect(Math.random() * size.width, Math.random() * size.height, dot, dot);
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = theme.colors.ink;
  ctx.lineWidth = Math.max(10, shortestSide * 0.018);
  ctx.strokeRect(margin * 0.52, margin * 0.52, size.width - margin * 1.04, size.height - margin * 1.04);
  ctx.strokeStyle = theme.colors.stamp;
  ctx.lineWidth = Math.max(5, shortestSide * 0.007);
  ctx.strokeRect(margin * 0.86, margin * 0.86, size.width - margin * 1.72, size.height - margin * 1.72);
  ctx.strokeStyle = theme.colors.ink;
  ctx.lineWidth = Math.max(2, shortestSide * 0.0025);
  ctx.strokeRect(inner * 0.78, inner * 0.78, size.width - inner * 1.56, size.height - inner * 1.56);

  const cjpBoxWidth = Math.min(size.width * 0.22, shortestSide * 0.25);
  const cjpBoxHeight = headerHeight;
  const headerY = inner;
  ctx.strokeStyle = theme.colors.ink;
  ctx.lineWidth = Math.max(3, shortestSide * 0.004);
  ctx.strokeRect(inner, headerY, cjpBoxWidth, cjpBoxHeight);
  ctx.fillStyle = theme.colors.ink;
  ctx.fillRect(inner + cjpBoxWidth * 0.06, headerY + cjpBoxHeight * 0.12, cjpBoxWidth * 0.58, cjpBoxHeight * 0.76);
  ctx.fillStyle = theme.colors.paper;
  ctx.font = `900 ${Math.round(cjpBoxHeight * 0.5)}px Impact, Arial Black, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("CJP", inner + cjpBoxWidth * 0.35, headerY + cjpBoxHeight * 0.65);
  drawShareStar(ctx, inner + cjpBoxWidth * 0.79, headerY + cjpBoxHeight * 0.5, cjpBoxHeight * 0.22);

  const barX = inner + cjpBoxWidth + shortestSide * 0.018;
  const barWidth = size.width - inner * 2 - cjpBoxWidth - shortestSide * 0.018;
  ctx.fillStyle = theme.colors.ink;
  ctx.fillRect(barX, headerY + headerHeight * 0.13, barWidth, headerHeight * 0.74);
  ctx.fillStyle = theme.colors.paper;
  ctx.textAlign = "left";
  ctx.font = `900 ${Math.round(headerHeight * 0.23)}px Arial Black, Impact, sans-serif`;
  ctx.fillText("COCKROACH JANTA PARTY", barX + barWidth * 0.04, headerY + headerHeight * 0.58);
  drawShareStar(ctx, barX + barWidth * 0.64, headerY + headerHeight * 0.5, headerHeight * 0.16);
  ctx.font = `900 ${Math.round(headerHeight * 0.14)}px Arial Black, Arial, sans-serif`;
  ctx.textAlign = "right";
  ctx.fillText("SUPPORTER MADE", barX + barWidth * 0.94, headerY + headerHeight * 0.56);
  drawShareStar(ctx, barX + barWidth * 0.98, headerY + headerHeight * 0.5, headerHeight * 0.16);

  const starRowY = headerY + headerHeight + shortestSide * 0.095;
  ctx.strokeStyle = theme.colors.stamp;
  ctx.lineWidth = Math.max(3, shortestSide * 0.004);
  ctx.beginPath();
  ctx.moveTo(size.width * 0.58, starRowY - shortestSide * 0.035);
  ctx.lineTo(size.width - inner, starRowY - shortestSide * 0.035);
  ctx.moveTo(size.width * 0.58, starRowY + shortestSide * 0.035);
  ctx.lineTo(size.width - inner, starRowY + shortestSide * 0.035);
  ctx.stroke();
  for (let i = 0; i < 5; i += 1) {
    drawShareStar(ctx, size.width * 0.63 + i * shortestSide * 0.065, starRowY, shortestSide * 0.018, "#5b5b35");
  }

  const stampRadius = Math.min(shortestSide * 0.058, 68);
  const stampX = size.width - inner - stampRadius * 0.95;
  const stampY = headerY + headerHeight + shortestSide * 0.1;
  ctx.save();
  ctx.globalAlpha = 0.86;
  ctx.strokeStyle = "#5b5b35";
  ctx.lineWidth = Math.max(4, shortestSide * 0.005);
  ctx.beginPath();
  ctx.arc(stampX, stampY, stampRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(stampX, stampY, stampRadius * 0.8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#5b5b35";
  ctx.textAlign = "center";
  ctx.font = `900 ${Math.round(stampRadius * 0.22)}px Arial Black, Arial, sans-serif`;
  ctx.fillText("PEOPLE FIRST", stampX, stampY - stampRadius * 0.34);
  drawShareStar(ctx, stampX, stampY - stampRadius * 0.04, stampRadius * 0.13);
  ctx.font = `900 ${Math.round(stampRadius * 0.42)}px Impact, Arial Black, sans-serif`;
  ctx.fillText("CJP", stampX, stampY + stampRadius * 0.32);
  ctx.restore();

  const titleTop = Math.max(size.height * 0.39, headerY + headerHeight + shortestSide * 0.28);
  const titleBottom = size.height - inner - footerHeight - shortestSide * 0.1;
  ctx.save();
  ctx.translate(size.width / 2, titleTop - shortestSide * 0.09);
  ctx.rotate(-0.018);
  const ribbonWidth = Math.min(size.width - inner * 2, shortestSide * 0.76);
  const ribbonHeight = Math.max(58, shortestSide * 0.075);
  ctx.fillStyle = "#5b5b35";
  ctx.fillRect(-ribbonWidth / 2, -ribbonHeight / 2, ribbonWidth, ribbonHeight);
  ctx.fillStyle = theme.colors.paper;
  ctx.font = `900 ${Math.round(ribbonHeight * 0.45)}px Impact, Arial Black, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(options.kicker.toUpperCase(), 0, ribbonHeight * 0.17);
  ctx.restore();

  drawShareBurst(ctx, inner * 1.08, titleTop + shortestSide * 0.16, shortestSide, 1);
  drawShareBurst(ctx, size.width - inner * 1.08, titleTop + shortestSide * 0.16, shortestSide, -1);
  drawFittedText(ctx, {
    text: options.text,
    x: size.width / 2,
    y: titleTop + shortestSide * 0.14,
    maxWidth: size.width - inner * 2.55,
    maxHeight: Math.max(shortestSide * 0.22, titleBottom - titleTop - shortestSide * 0.08),
    maxFontSize: Math.max(64, shortestSide * 0.105),
    minFontSize: 34,
    lineHeightRatio: 0.92,
    maxLines: 4,
    textTransform: "uppercase",
    align: "center"
  });

  const dotY = titleBottom + shortestSide * 0.02;
  ctx.fillStyle = theme.colors.ink;
  for (let x = inner; x <= size.width - inner; x += shortestSide * 0.022) {
    ctx.beginPath();
    ctx.arc(x, dotY, Math.max(2, shortestSide * 0.0045), 0, Math.PI * 2);
    ctx.fill();
  }

  const blackBarY = size.height - inner - footerHeight;
  ctx.fillStyle = theme.colors.ink;
  ctx.fillRect(inner, blackBarY, size.width - inner * 2, footerHeight * 0.54);
  drawShareBurst(ctx, inner + shortestSide * 0.02, blackBarY + footerHeight * 0.28, shortestSide * 0.8, 1);
  drawShareBurst(ctx, size.width - inner - shortestSide * 0.02, blackBarY + footerHeight * 0.28, shortestSide * 0.8, -1);
  ctx.fillStyle = theme.colors.paper;
  ctx.font = `900 ${Math.round(footerHeight * 0.25)}px Impact, Arial Black, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("FOLLOW / SHARE / READ / VERIFY", size.width / 2, blackBarY + footerHeight * 0.35);

  ctx.fillStyle = theme.colors.stamp;
  ctx.fillRect(inner, blackBarY + footerHeight * 0.61, size.width - inner * 2, footerHeight * 0.39);
  drawShareStar(ctx, inner + footerHeight * 0.22, blackBarY + footerHeight * 0.81, footerHeight * 0.13, theme.colors.paper);
  ctx.fillStyle = theme.colors.paper;
  ctx.textAlign = "left";
  ctx.font = `900 ${Math.round(footerHeight * 0.12)}px Arial Black, Arial, sans-serif`;
  ctx.fillText("INDEPENDENT SUPPORTER-MADE GRAPHIC", inner + footerHeight * 0.44, blackBarY + footerHeight * 0.84);

  ctx.textAlign = "right";
  ctx.font = `900 ${Math.round(footerHeight * 0.12)}px Arial Black, Arial, sans-serif`;
  ctx.fillText(options.showWatermark ? "CJP ACTION HUB" : "SUPPORTER MADE", size.width - inner - footerHeight * 0.16, blackBarY + footerHeight * 0.84);

  return canvas;
}
