import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AirlinePartnersMarquee from "@/components/AirlinePartnersMarquee";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import StudentCareerRoadmap from "@/components/StudentCareerRoadmap";
import CertificateVerificationBanner from "@/components/CertificateVerificationBanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import AdmissionsSection from "@/components/AdmissionsSection";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* 1. Dynamic Hero Slider */}
      <section id="home">
        <HeroSection />
      </section>

      {/* 2. Top Airline Partners Marquee */}
      <AirlinePartnersMarquee />
      
      {/* 3. About Section */}
      <section id="about">
        <AboutSection />
      </section>
      
      {/* 4. Interactive Training Programs */}
      <section id="programs">
        <ProgramsSection />
      </section>

      {/* 5. 4-Step Career Roadmap */}
      <StudentCareerRoadmap />

      {/* 6. Certificate Verification Banner */}
      <section id="verify-banner" className="py-2 sm:py-4">
        <CertificateVerificationBanner />
      </section>
      
      {/* 7. Alumni Success Stories Slider */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* 8. Interactive Frequently Asked Questions (FAQ / AEO / GEO) */}
      <FAQSection />
      
      {/* 9. Admissions Section */}
      <section id="contact">
        <AdmissionsSection />
      </section>
      
      {/* 9. Footer */}
      <Footer />

      {/* 10. WhatsApp Instant Counseling Button */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Index;
