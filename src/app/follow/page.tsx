import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import SocialFollowGrid from "@/components/SocialFollowGrid";

export const metadata: Metadata = {
  title: "Follow the Swarm",
  description: "Official and pending social links for CJP Action Hub supporters."
};

export default function FollowPage() {
  return (
    <>
      <section className="border-b-2 border-ink bg-newsprint py-14">
        <div className="section-shell">
          <h1 className="section-title">Follow the Swarm.</h1>
          <p className="mt-4 max-w-3xl text-lg font-bold leading-relaxed text-coal">
            This page is intentionally config-first. If a verified official link is unknown, it stays pending until
            updated in src/data/links.ts.
          </p>
        </div>
      </section>
      <SocialFollowGrid />
      <section className="section-shell pb-16">
        <Disclaimer />
      </section>
    </>
  );
}
