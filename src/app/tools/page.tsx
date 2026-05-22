import type { Metadata } from "next";
import ActionCards from "@/components/ActionCards";
import CaptionGenerator from "@/components/CaptionGenerator";
import Disclaimer from "@/components/Disclaimer";
import ProgressChecklist from "@/components/ProgressChecklist";
import ShareCardGenerator from "@/components/ShareCardGenerator";

export const metadata: Metadata = {
  title: "Tools",
  description: "Share-card generator, caption generator, action timer, and local supporter checklist."
};

export default function ToolsPage() {
  return (
    <>
      <section className="border-b-2 border-ink bg-newsprint py-8 sm:py-14">
        <div className="section-shell">
          <h1 className="section-title">Tools for the Swarm.</h1>
          <p className="mt-3 max-w-3xl text-sm font-bold leading-relaxed text-coal sm:mt-4 sm:text-lg">
            Make cards, copy captions, track local progress, and share responsibly. Everything runs in your browser.
          </p>
        </div>
      </section>
      <ShareCardGenerator />
      <CaptionGenerator />
      <ActionCards compact />
      <section className="section-shell py-10 sm:py-16">
        <ProgressChecklist />
      </section>
      <section className="section-shell pb-10 sm:pb-16">
        <Disclaimer />
      </section>
    </>
  );
}
