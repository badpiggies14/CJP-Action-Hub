import { FileArchive, Palette, ShieldCheck } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import PosterCard from "@/components/PosterCard";
import ProfileFrameTool from "@/components/ProfileFrameTool";
import PosterTemplateEditor from "@/components/PosterTemplateEditor";
import { captionBank, hashtagBank } from "@/data/captions";
import { colorGuide, doGuide, dontGuide, downloadAllZip } from "@/data/creatorKit";

export default function CreatorKit() {
  return (
    <section className="section-shell py-10 sm:py-16" aria-labelledby="creator-kit-title">
      <div className="mb-5 grid gap-4 sm:mb-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="section-kicker">Creator kit</p>
          <h2 id="creator-kit-title" className="section-title mt-2">
            Assets for Clean Chaos.
          </h2>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm font-bold leading-relaxed text-coal sm:text-base">
            Editable poster tools, profile graphics, caption banks, hashtag starters, and responsible sharing rules.
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
      <div className="mb-6">
        <PosterTemplateEditor />
      </div>
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5 md:grid-cols-2">
          <ProfileFrameTool />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-1">
          <PosterCard>
            <div className="flex items-center gap-3">
              <Palette aria-hidden="true" className="text-stamp" size={24} />
              <h3 className="font-display text-[1.7rem] font-black uppercase leading-none sm:text-4xl">Font / Color Guide</h3>
            </div>
            <div className="mt-4 grid gap-2 sm:mt-5 sm:gap-3">
              {colorGuide.map((color) => (
                <div key={color.name} className="flex items-center justify-between gap-2 border-2 border-ink bg-paper p-2 sm:p-3">
                  <span className="text-xs font-black uppercase sm:text-sm">{color.name}</span>
                  <span className="flex items-center gap-2 font-mono text-[10px] font-bold sm:gap-3 sm:text-sm">
                    <span className="h-6 w-6 border-2 border-ink sm:h-8 sm:w-8" style={{ backgroundColor: color.value }} />
                    {color.value}
                  </span>
                </div>
              ))}
            </div>
          </PosterCard>
          <PosterCard>
            <h3 className="font-display text-[1.8rem] font-black uppercase leading-none sm:text-4xl">Caption Bank</h3>
            <div className="mt-3 grid gap-2 sm:mt-4 sm:gap-3">
              {captionBank.map((caption) => (
                <div key={caption} className="grid gap-2 border-b-2 border-ink pb-3">
                  <p className="text-xs font-bold sm:text-sm">{caption}</p>
                  <CopyButton text={caption} label="Copy caption" className="w-fit" />
                </div>
              ))}
            </div>
          </PosterCard>
          <PosterCard>
            <h3 className="font-display text-[1.8rem] font-black uppercase leading-none sm:text-4xl">Hashtag Bank</h3>
            <p className="mt-3 text-xs font-bold leading-relaxed sm:text-sm">{hashtagBank.join(" ")}</p>
            <CopyButton text={hashtagBank.join(" ")} label="Copy hashtags" className="mt-4" />
          </PosterCard>
          <PosterCard>
            <div className="flex items-center gap-3">
              <ShieldCheck aria-hidden="true" className="text-stamp" size={24} />
              <h3 className="font-display text-[1.8rem] font-black uppercase leading-none sm:text-4xl">Do / Don&apos;t</h3>
            </div>
            <div className="mt-4 grid gap-4 text-xs font-bold leading-relaxed sm:mt-5 sm:gap-5 sm:text-sm">
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
