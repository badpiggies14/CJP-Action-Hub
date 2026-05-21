import Link from "next/link";
import { Download, PackageOpen } from "lucide-react";
import PosterCard from "@/components/PosterCard";
import { creatorKitItems } from "@/data/creatorKit";

export default function CreatorKitPreview() {
  return (
    <section className="section-shell py-16" aria-labelledby="creator-preview-title">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Creator kit preview</p>
          <h2 id="creator-preview-title" className="section-title mt-2">
            Build the Poster Wall.
          </h2>
        </div>
        <Link href="/creator-kit" className="button-primary w-fit">
          <PackageOpen aria-hidden="true" size={18} />
          Open Creator Kit
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {creatorKitItems.slice(0, 4).map((item) => (
          <PosterCard key={item.title} className="h-full min-h-[300px]">
            <div className="flex h-full flex-col gap-5">
              <div className="min-w-0">
                <h3 className="safe-text min-h-[5.4rem] font-display text-[2.6rem] font-black uppercase leading-none">
                  {item.title}
                </h3>
                <p className="safe-text mt-3 min-h-[4rem] text-sm font-bold leading-relaxed text-coal">
                  {item.description}
                </p>
              </div>
              {item.href && (
                <a href={item.href} className="button-secondary mt-auto min-h-14 w-full" download>
                  <Download aria-hidden="true" size={16} />
                  Download
                </a>
              )}
            </div>
          </PosterCard>
        ))}
      </div>
    </section>
  );
}
