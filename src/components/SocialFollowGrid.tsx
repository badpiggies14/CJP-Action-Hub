import QRCodeCard from "@/components/QRCodeCard";
import { followLinks } from "@/data/links";

export default function SocialFollowGrid() {
  return (
    <section className="section-shell py-10 sm:py-16" aria-labelledby="follow-grid-title">
      <div className="mb-5 max-w-3xl sm:mb-8">
        <p className="section-kicker">Follow the Swarm</p>
        <h2 id="follow-grid-title" className="section-title mt-2">
          Official Links, Clearly Marked.
        </h2>
        <p className="mt-3 text-sm font-bold leading-relaxed text-coal sm:mt-4 sm:text-base">
          Unknown official handles stay pending until they are configured. No guessing, no fake authority, no mystery
          screenshots.
        </p>
      </div>
      <div className="grid gap-3 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
        {followLinks.map((item) => (
          <QRCodeCard key={item.key} item={item} />
        ))}
      </div>
    </section>
  );
}
