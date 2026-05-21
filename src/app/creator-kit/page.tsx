import type { Metadata } from "next";
import CreatorKit from "@/components/CreatorKit";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Creator Kit",
  description: "Static supporter resources, caption banks, hashtag banks, and responsible sharing guides."
};

export default function CreatorKitPage() {
  return (
    <>
      <section className="border-b-2 border-ink bg-newsprint py-14">
        <div className="section-shell">
          <h1 className="section-title">Creator Kit.</h1>
          <p className="mt-4 max-w-3xl text-lg font-bold leading-relaxed text-coal">
            Download static templates, copy captions, and keep supporter-made material clearly marked.
          </p>
        </div>
      </section>
      <CreatorKit />
      <section className="section-shell pb-16">
        <Disclaimer />
      </section>
    </>
  );
}
