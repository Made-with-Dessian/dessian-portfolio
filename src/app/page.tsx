import { HeroSection } from "@/components/sections/HeroSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Featured3DWorks } from "@/components/sections/Featured3DWorks";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <HeroSection />
      <PhilosophySection />
      <PrinciplesSection />
      <FeaturedProjects />
      <Featured3DWorks />
      <ContactSection />

      {/* Footer */}
      <footer className="py-10 px-8 border-t border-bg-secondary">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <span className="text-[9px] tracking-[0.25em] text-muted font-semibold">
            © 2025 MINJAE KIM
          </span>
          <span className="text-[9px] tracking-[0.25em] text-muted">
            TRANSPORTATION DESIGN
          </span>
        </div>
      </footer>
    </div>
  );
}
