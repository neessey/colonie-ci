import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ProductsSection from "@/components/ProductsSection";
import LocationSection from "@/components/LocationSection";
import EngagementsSection from "@/components/EngagementsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StorySection />
      <ProductsSection />
      <LocationSection />
      <EngagementsSection />
      <Footer />
    </main>
  );
}
