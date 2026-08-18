import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import IndustryPartnersSection from "@/components/IndustryPartnersSection";
import AdmissionsSection from "@/components/AdmissionsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="md:pt-16 pt-8">
        <HeroSection />
      </section>
      
      {/* About Section */}
      <section id="about" className="md:pt-16 pt-8">
        <AboutSection />
      </section>
      
      {/* Programs Section */}
      <section id="programs" className="md:pt-16 pt-8">
        <ProgramsSection />
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="md:pt-16 pt-8">
        <TestimonialsSection />
      </section>
      
      {/* Industry Partners Section */}
      <section id="partners" className="md:pt-16 pt-8">
          <IndustryPartnersSection />
      </section>
      
      {/* Admissions Section */}
      <section id="contact" className="md:pt-16 pt-8">
        <AdmissionsSection />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
