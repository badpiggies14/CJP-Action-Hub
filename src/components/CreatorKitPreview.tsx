import Link from "next/link";
import { Download, PackageOpen } from "lucide-react";
import PosterCard from "@/components/PosterCard";
import { creatorKitItems } from "@/data/creatorKit";

export default function CreatorKitPreview() {
  return (
    <section className="section-shell py-10 sm:py-16" aria-labelledby="creator-preview-title">
      <div className="mb-5 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
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
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
        {creatorKitItems.slice(0, 4).map((item) => (
          <PosterCard key={item.title} className="h-full min-h-[190px] sm:min-h-[300px]">
            <div className="flex h-full flex-col gap-3 sm:gap-5">
              <div className="min-w-0">
                <h3 className="safe-text min-h-[3.8rem] font-display text-[1.78rem] font-black uppercase leading-none sm:min-h-[5.4rem] sm:text-[2.6rem]">
                  {item.title}
                </h3>
                <p className="safe-text mt-2 text-xs font-bold leading-snug text-coal sm:mt-3 sm:min-h-[4rem] sm:text-sm sm:leading-relaxed">
                  {item.description}
                </p>
              </div>
              {item.href && (
                <a href={item.href} className="button-secondary mt-auto min-h-11 w-full sm:min-h-14" download>
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
