import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import ManifestoCards from "@/components/ManifestoCards";

export const metadata: Metadata = {
  title: "Manifesto in 5 Cards",
  description: "Digestible supporter-made cards for the five official CJP manifesto demands."
};

export default function ManifestoPage() {
  return (
    <>
      <section className="border-b-2 border-ink bg-newsprint py-8 sm:py-14">
        <div className="section-shell">
          <h1 className="section-title">Manifesto in 5 Cards.</h1>
          <p className="mt-3 max-w-3xl text-sm font-bold leading-relaxed text-coal sm:mt-4 sm:text-lg">
            Five official demands, reshaped into supporter-made cards with short neutral explainers.
          </p>
        </div>
      </section>
      <ManifestoCards />
      <section className="section-shell pb-10 sm:pb-16">
        <Disclaimer />
      </section>
    </>
  );
}
