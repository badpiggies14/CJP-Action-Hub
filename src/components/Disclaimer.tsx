import { AlertTriangle } from "lucide-react";
import { links, mailtoLink } from "@/data/links";

export default function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className="stamp-border bg-newsprint p-5 text-sm font-bold leading-relaxed text-coal"
      aria-label="Independent project disclaimer"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle aria-hidden="true" className="mt-1 shrink-0 text-stamp" size={22} />
        <div className="space-y-3">
          <p>
            CJP Action Hub is an independent community support project and is not the official website of Cockroach
            Janta Party unless officially endorsed. For official updates, visit cockroachjantaparty.org and verified
            official social channels.
          </p>
          {!compact && (
            <p>
              Found something outdated or incorrect?{" "}
              <a
                className="underline decoration-stamp decoration-2 underline-offset-4 focus-ring"
                href={mailtoLink(
                  links.correctionEmail,
                  "CJP Action Hub Correction",
                  "Hi,\n\nI would like to report a correction for CJP Action Hub:\n\nPage/section:\nCorrection:\nSource:\n"
                )}
              >
                Submit a correction
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
