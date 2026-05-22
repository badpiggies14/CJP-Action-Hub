"use client";

import { Download, ExternalLink, Link as LinkIcon, QrCode } from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useMemo, useRef, useState } from "react";
import { FollowLink, isConfigured, linkValue, pendingMessage } from "@/data/links";
import CopyButton from "@/components/CopyButton";
import PosterCard from "@/components/PosterCard";
import { cn } from "@/lib/cn";

type QRCodeCardProps = {
  item: FollowLink;
};

export default function QRCodeCard({ item }: QRCodeCardProps) {
  const rawValue = linkValue(item.key);
  const configured = isConfigured(rawValue);
  const value = useMemo(() => {
    if (item.kind === "email" && configured) {
      return `mailto:${rawValue}`;
    }
    return rawValue;
  }, [configured, item.kind, rawValue]);
  const qrRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Download QR");

  async function downloadQr() {
    setStatus("Preparing");

    if (item.qrImage && configured) {
      try {
        const response = await fetch(item.qrImage);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-qr.png`;
        link.click();
        URL.revokeObjectURL(url);
        setStatus("Downloaded");
        window.setTimeout(() => setStatus("Download QR"), 1600);
        return;
      } catch {
        setStatus("Try again");
        window.setTimeout(() => setStatus("Download QR"), 1600);
        return;
      }
    }

    const svg = qrRef.current?.querySelector("svg");
    if (!svg || !configured) {
      setStatus("Download QR");
      return;
    }

    const serialized = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-qr.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Downloaded");
    window.setTimeout(() => setStatus("Download QR"), 1600);
  }

  return (
    <PosterCard
      className={cn(
        "grid h-full gap-3 sm:gap-4",
        configured ? "min-h-[410px] grid-rows-[auto_1fr_auto] sm:min-h-[500px]" : "min-h-0"
      )}
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="min-w-0 break-words font-display text-[1.75rem] font-black uppercase leading-none sm:text-[2rem] 2xl:text-4xl">
            {item.label}
          </h3>
          <p className="safe-text mt-2 text-xs font-bold text-coal sm:text-sm">{configured ? item.description : pendingMessage}</p>
        </div>
        <QrCode aria-hidden="true" className="shrink-0 text-stamp" size={24} />
      </div>
      {configured ? (
        <>
          <div ref={qrRef} className="grid aspect-square w-full place-items-center self-start border-2 border-ink bg-white p-3 sm:p-6">
            {item.qrImage ? (
              <Image
                src={item.qrImage}
                alt={`${item.label} QR code`}
                width={260}
                height={260}
                sizes="(min-width: 1280px) 260px, (min-width: 768px) 34vw, 86vw"
                className="h-full w-full max-w-[250px] object-contain sm:max-w-[280px]"
              />
            ) : (
              <QRCodeSVG value={value} size={180} level="M" includeMargin title={`${item.label} QR code`} />
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
            <CopyButton text={value} label="Copy" className="px-2 sm:px-3" />
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="button-secondary px-2 sm:px-3"
            >
              <ExternalLink aria-hidden="true" size={16} />
              Open
            </a>
            <button
              type="button"
              onClick={downloadQr}
              className="button-ghost px-2 sm:px-3"
            >
              <Download aria-hidden="true" size={16} />
              <span className="sm:hidden">QR</span>
              <span className="hidden sm:inline">{status}</span>
            </button>
          </div>
        </>
      ) : (
        <p className="flex items-center gap-2 text-xs font-black uppercase text-stamp">
          <LinkIcon aria-hidden="true" size={14} />
          Update {item.key} in src/data/links.ts
        </p>
      )}
    </PosterCard>
  );
}
