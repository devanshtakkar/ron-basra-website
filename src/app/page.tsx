import Hero from "./Hero";
import HomePageContent from "./HomePageContent";
import FeaturedListings from "./FeaturedListings/FeaturedListings";
import HomePageContent_2 from "./HomePageContent_2";
import TestimonialSection from "./TestimonialSection";
import InstagramEmbed from "./components/InstagramEmbed";

export default function Home() {
  return (
    <>
      <Hero />
      <HomePageContent />
      <FeaturedListings />
      <HomePageContent_2 />
      <TestimonialSection />
      <InstagramEmbed />
    </>
  );
}
