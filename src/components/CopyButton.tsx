"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { copyText } from "@/lib/share";
import { cn } from "@/lib/cn";

type CopyButtonProps = {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  onCopied?: () => void;
};

export default function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
  className,
  onCopied
}: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function handleCopy() {
    try {
      await copyText(text);
      setStatus("copied");
      onCopied?.();
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 1800);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn("button-ghost", className)}
      aria-live="polite"
    >
      {status === "copied" ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
      {status === "copied" ? copiedLabel : status === "error" ? "Copy failed" : label}
    </button>
  );
}
