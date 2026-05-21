import ActionCards from "@/components/ActionCards";
import CreatorKitPreview from "@/components/CreatorKitPreview";
import Disclaimer from "@/components/Disclaimer";
import Hero from "@/components/Hero";
import ManifestoCards from "@/components/ManifestoCards";
import MarqueeTicker from "@/components/MarqueeTicker";
import ProgressChecklist from "@/components/ProgressChecklist";
import SocialFollowGrid from "@/components/SocialFollowGrid";
import VolunteerGrid from "@/components/VolunteerGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <ActionCards />
      <ManifestoCards preview />
      <CreatorKitPreview />
      <SocialFollowGrid />
      <section className="section-shell py-16">
        <ProgressChecklist />
      </section>
      <VolunteerGrid />
      <section className="section-shell pb-16">
        <Disclaimer />
      </section>
    </>
  );
}
