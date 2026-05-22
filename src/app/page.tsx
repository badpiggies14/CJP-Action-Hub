import CreatorKitPreview from "@/components/CreatorKitPreview";
import Disclaimer from "@/components/Disclaimer";
import Hero from "@/components/Hero";
import ManifestoCards from "@/components/ManifestoCards";
import MarqueeTicker from "@/components/MarqueeTicker";
import SocialFollowGrid from "@/components/SocialFollowGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <ManifestoCards preview />
      <CreatorKitPreview />
      <SocialFollowGrid />
      <section className="section-shell pb-10 sm:pb-16">
        <Disclaimer />
      </section>
    </>
  );
}
