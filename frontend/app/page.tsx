import { LandingNavBar } from "@/components/landing/LandingNavBar";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { PartnersSection } from "@/components/landing/PartnersSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
    return (
        <div className="min-h-screen font-sans">
            <LandingNavBar />
            <main>
                <HeroSection />
                <AboutSection />
                <BenefitsSection />
                <PartnersSection />
                <ContactSection />
            </main>
            <LandingFooter />
        </div>
    );
}
