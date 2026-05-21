import { Download, FileArchive, Palette, ShieldCheck } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import PosterCard from "@/components/PosterCard";
import ProfileFrameTool from "@/components/ProfileFrameTool";
import { captionBank, hashtagBank } from "@/data/captions";
import { colorGuide, creatorKitItems, doGuide, dontGuide, downloadAllZip } from "@/data/creatorKit";

export default function CreatorKit() {
  const staticItems = creatorKitItems.filter((item) => item.title !== "Profile picture frame");

  return (
    <section className="section-shell py-16" aria-labelledby="creator-kit-title">
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="section-kicker">Creator kit</p>
          <h2 id="creator-kit-title" className="section-title mt-2">
            Assets for Clean Chaos.
          </h2>
        </div>
        <div className="space-y-4">
          <p className="text-base font-bold leading-relaxed text-coal">
            Static templates, caption banks, hashtag starters, and responsible sharing rules. Add new files in
            /public/creator-kit/.
          </p>
          {downloadAllZip ? (
            <a href={downloadAllZip} className="button-primary">
              <FileArchive aria-hidden="true" size={18} />
              Download All Kit
            </a>
          ) : (
            <div className="inline-flex border-2 border-ink bg-newsprint px-4 py-3 text-sm font-black uppercase">
              Coming soon - add files to /public/creator-kit/
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5 md:grid-cols-2">
          <ProfileFrameTool />
          {staticItems.map((item) => (
            <PosterCard key={item.title} className="h-full min-h-[310px]">
              <div className="flex h-full flex-col gap-4">
                <div className="min-w-0">
                  <h3 className="safe-text min-h-[5.4rem] font-display text-[2.6rem] font-black uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="safe-text mt-2 min-h-[3.6rem] text-sm font-bold leading-relaxed text-coal">
                    {item.description}
                  </p>
                </div>
                {item.href ? (
                  <a href={item.href} className="button-secondary mt-auto min-h-14 w-full" download>
                    <Download aria-hidden="true" size={16} />
                    Download
                  </a>
                ) : (
                  <span className="mt-auto min-h-14 border-2 border-ink px-4 py-2 text-sm font-black uppercase opacity-60">
                    Pending
                  </span>
                )}
              </div>
            </PosterCard>
          ))}
        </div>
        <div className="grid gap-5">
          <PosterCard>
            <div className="flex items-center gap-3">
              <Palette aria-hidden="true" className="text-stamp" size={28} />
              <h3 className="font-display text-4xl font-black uppercase leading-none">Font / Color Guide</h3>
            </div>
            <div className="mt-5 grid gap-3">
              {colorGuide.map((color) => (
                <div key={color.name} className="flex items-center justify-between border-2 border-ink bg-paper p-3">
                  <span className="text-sm font-black uppercase">{color.name}</span>
                  <span className="flex items-center gap-3 font-mono text-sm font-bold">
                    <span className="h-8 w-8 border-2 border-ink" style={{ backgroundColor: color.value }} />
                    {color.value}
                  </span>
                </div>
              ))}
            </div>
          </PosterCard>
          <PosterCard>
            <h3 className="font-display text-4xl font-black uppercase leading-none">Caption Bank</h3>
            <div className="mt-4 grid gap-3">
              {captionBank.map((caption) => (
                <div key={caption} className="grid gap-2 border-b-2 border-ink pb-3">
                  <p className="text-sm font-bold">{caption}</p>
                  <CopyButton text={caption} label="Copy caption" className="w-fit" />
                </div>
              ))}
            </div>
          </PosterCard>
          <PosterCard>
            <h3 className="font-display text-4xl font-black uppercase leading-none">Hashtag Bank</h3>
            <p className="mt-3 text-sm font-bold leading-relaxed">{hashtagBank.join(" ")}</p>
            <CopyButton text={hashtagBank.join(" ")} label="Copy hashtags" className="mt-4" />
          </PosterCard>
          <PosterCard>
            <div className="flex items-center gap-3">
              <ShieldCheck aria-hidden="true" className="text-stamp" size={28} />
              <h3 className="font-display text-4xl font-black uppercase leading-none">Do / Don&apos;t</h3>
            </div>
            <div className="mt-5 grid gap-5 text-sm font-bold leading-relaxed">
              <div>
                <p className="font-black uppercase text-stamp">Do</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {doGuide.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-black uppercase text-stamp">Don&apos;t</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {dontGuide.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </PosterCard>
        </div>
      </div>
    </section>
  );
}
