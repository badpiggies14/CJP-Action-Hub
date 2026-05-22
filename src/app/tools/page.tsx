import type { Metadata } from "next";
import CaptionGenerator from "@/components/CaptionGenerator";
import Disclaimer from "@/components/Disclaimer";
import ShareCardGenerator from "@/components/ShareCardGenerator";

export const metadata: Metadata = {
  title: "Tools",
  description: "Share-card generator and caption generator for responsible supporter-made content."
};

export default function ToolsPage() {
  return (
    <>
      <section className="border-b-2 border-ink bg-newsprint py-8 sm:py-14">
        <div className="section-shell">
          <h1 className="section-title">Tools for the Swarm.</h1>
          <p className="mt-3 max-w-3xl text-sm font-bold leading-relaxed text-coal sm:mt-4 sm:text-lg">
            Make cards, copy captions, and share responsibly. Everything runs in your browser.
          </p>
        </div>
      </section>
      <ShareCardGenerator />
      <CaptionGenerator />
      <section className="section-shell pb-10 sm:pb-16">
        <Disclaimer />
      </section>
    </>
  );
}
