import type { Metadata } from "next";
import { Download, ExternalLink, Mail } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";
import PosterCard from "@/components/PosterCard";
import { links, mailtoLink } from "@/data/links";
import { manifestoDemands } from "@/data/manifesto";

export const metadata: Metadata = {
  title: "Press / Explainer",
  description: "Clear explainer for CJP Action Hub, its independent status, and correction contact."
};

const faqs = [
  {
    question: "What is CJP Action Hub?",
    answer:
      "CJP Action Hub is an independent community support toolkit for people who want to follow official channels, create supporter-made graphics, understand the manifesto, and volunteer skills."
  },
  {
    question: "Is this official?",
    answer:
      "No. This hub is independent unless officially endorsed. It points visitors to cockroachjantaparty.org and verified official social channels for official updates."
  },
  {
    question: "What is Cockroach Janta Party?",
    answer:
      "The official site presents Cockroach Janta Party as a satirical political movement for people described as lazy, unemployed, and chronically online."
  },
  {
    question: "What does the official site say?",
    answer:
      "The official site uses a satirical newspaper/rally-poster tone, states five demands, and describes itself as a work of satire."
  },
  {
    question: "Who should use this hub?",
    answer:
      "Supporters, creators, volunteers, and curious readers who want clean, transparent, non-abusive community resources."
  }
];

export default function PressPage() {
  return (
    <>
      <section className="border-b-2 border-ink bg-newsprint py-14">
        <div className="section-shell">
          <h1 className="section-title">Press / Explainer.</h1>
          <p className="mt-4 max-w-3xl text-lg font-bold leading-relaxed text-coal">
            A serious page for the obvious question: what is this, and what is it not?
          </p>
        </div>
      </section>
      <section className="section-shell grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <PosterCard className="h-fit !bg-ink !text-paper">
          <p className="font-body text-sm font-black uppercase tracking-[0.16em] text-paper/70">Press card</p>
          <h2 className="mt-3 font-display text-5xl font-black uppercase leading-none">CJP Action Hub</h2>
          <dl className="mt-6 grid gap-4 text-sm font-bold leading-relaxed">
            <div>
              <dt className="font-black uppercase text-paper/70">Purpose</dt>
              <dd>Independent community toolkit for following, sharing, volunteering, and creating responsibly.</dd>
            </div>
            <div>
              <dt className="font-black uppercase text-paper/70">Launch status</dt>
              <dd>Static frontend, configurable links, no login, no backend.</dd>
            </div>
            <div>
              <dt className="font-black uppercase text-paper/70">Contact</dt>
              <dd>{links.pressEmail || "Press email pending - update src/data/links.ts"}</dd>
            </div>
          </dl>
          <div className="mt-6 grid gap-3">
            <a href={links.officialWebsite} target="_blank" rel="noreferrer" className="button-secondary bg-paper text-ink">
              Official website <ExternalLink aria-hidden="true" size={16} />
            </a>
            <a href="/creator-kit" className="button-secondary bg-paper text-ink">
              <Download aria-hidden="true" size={16} />
              Download creator kit
            </a>
            <a
              href={mailtoLink(links.correctionEmail, "CJP Action Hub Correction")}
              className="button-secondary bg-paper text-ink"
            >
              <Mail aria-hidden="true" size={16} />
              Correction contact
            </a>
          </div>
        </PosterCard>
        <div className="grid gap-5">
          {faqs.map((item) => (
            <PosterCard key={item.question}>
              <h2 className="font-display text-4xl font-black uppercase leading-none">{item.question}</h2>
              <p className="mt-3 text-base font-bold leading-relaxed text-coal">{item.answer}</p>
            </PosterCard>
          ))}
          <PosterCard>
            <h2 className="font-display text-4xl font-black uppercase leading-none">What are the five demands?</h2>
            <ol className="mt-5 grid gap-3 text-sm font-bold leading-relaxed">
              {manifestoDemands.map((demand) => (
                <li key={demand.id}>
                  <span className="font-black text-stamp">{demand.id}. {demand.title}:</span> {demand.demand}
                </li>
              ))}
            </ol>
          </PosterCard>
          <Disclaimer />
        </div>
      </section>
    </>
  );
}
