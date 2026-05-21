"use client";

import { Download, ExternalLink, Link as LinkIcon, QrCode } from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useMemo, useRef, useState } from "react";
import { FollowLink, isConfigured, linkValue, pendingMessage } from "@/data/links";
import CopyButton from "@/components/CopyButton";
import PosterCard from "@/components/PosterCard";

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
    <PosterCard className="grid h-full min-h-[500px] grid-rows-[auto_1fr_auto_auto] gap-4">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="min-w-0 break-words font-display text-[2rem] font-black uppercase leading-none 2xl:text-4xl">
            {item.label}
          </h3>
          <p className="safe-text mt-2 text-sm font-bold text-coal">{configured ? item.description : pendingMessage}</p>
        </div>
        <QrCode aria-hidden="true" className="shrink-0 text-stamp" size={28} />
      </div>
      <div ref={qrRef} className="grid aspect-square w-full place-items-center self-start border-2 border-ink bg-white p-6">
        {configured && item.qrImage ? (
          <Image
            src={item.qrImage}
            alt={`${item.label} QR code`}
            width={260}
            height={260}
            sizes="(min-width: 1280px) 260px, (min-width: 768px) 34vw, 78vw"
            className="h-full w-full max-w-[280px] object-contain"
          />
        ) : configured ? (
          <QRCodeSVG value={value} size={180} level="M" includeMargin title={`${item.label} QR code`} />
        ) : (
          <div className="text-center text-sm font-black uppercase text-coal/70">
            QR waits for a real official link.
          </div>
        )}
      </div>
      <div className="grid gap-2">
        <CopyButton
          text={value || pendingMessage}
          label="Copy link"
          className="px-3"
        />
        <a
          href={configured ? value : undefined}
          target={configured ? "_blank" : undefined}
          rel="noreferrer"
          aria-disabled={!configured}
          className={configured ? "button-secondary px-3" : "button-secondary pointer-events-none px-3 opacity-50"}
        >
          <ExternalLink aria-hidden="true" size={16} />
          Open
        </a>
        <button
          type="button"
          disabled={!configured}
          onClick={downloadQr}
          className="button-ghost px-3 disabled:opacity-50"
        >
          <Download aria-hidden="true" size={16} />
          {status}
        </button>
      </div>
      {!configured && (
        <p className="flex items-center gap-2 text-xs font-black uppercase text-stamp">
          <LinkIcon aria-hidden="true" size={14} />
          Update {item.key} in src/data/links.ts
        </p>
      )}
    </PosterCard>
  );
}
