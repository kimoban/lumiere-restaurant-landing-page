import { HeroSection } from "@/components/hero-section";
import { ReservationWidget } from "@/components/reservation-widget";
import { StorySection } from "@/components/story-section";
import { ChefsTasting } from "@/components/chefs-tasting";
import { MenuHighlights } from "@/components/menu-highlights";
import { AmbianceGallery } from "@/components/ambiance-gallery";
import { SocialProofSection } from "@/components/social-proof";
import { EventDetails } from "@/components/event-details";
import { PrintableMenu } from "@/components/printable-menu";
import { ReservationFooter } from "@/components/reservation-footer";
import { Navigation } from "@/components/navigation";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ReservationWidget />
      <StorySection />
      <ChefsTasting />
      <MenuHighlights />
      <AmbianceGallery />
      <SocialProofSection />
      <EventDetails />
      <PrintableMenu />
      <ReservationFooter />
    </div>
  );
}
