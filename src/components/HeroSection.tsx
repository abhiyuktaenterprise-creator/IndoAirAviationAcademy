import { Button } from "@/components/ui/button";
import OptimizedImage from "./OptimizedImage";
import heroImage from "@/assets/hero-aviation.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden md:pt-[240px] pt-[150px] md:pb-[80px] pb-[40px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={heroImage}
          alt="Aviation training students and aircraft"
          className="w-full h-full object-cover"
          priority={true}
          loading="eager"
          width={1920}
          height={1080}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white md:mb-6 mb-4 leading-tight drop-shadow-lg">
          Soar to New Heights with{" "}
          <span className="text-gradient-gold drop-shadow-lg">Indo Air Aviation Academy</span>
        </h1>
        <p className="text-base md:text-xl lg:text-2xl text-white md:mb-8 mb-4 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Premier aviation training institute in <strong>Indore, Madhya Pradesh</strong> empowering the next generation of pilots, cabin crew, 
          and aviation professionals. Transform your passion for flight into a successful career.
        </p>
        
        <div className="md:text-lg text-base text-white/90 md:mb-8 mb-4 drop-shadow-md">
          📍 Located at Sayaji Plaza, Indore | 📞 +91-8233787629
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            className="btn-hero pulse-glow"
            onClick={() => window.open('mailto:Indoairaviation107@gmail.com?subject=Enrollment%20Inquiry%20-%20Next%20Batch&body=Hi,%0A%0AI%20am%20interested%20in%20joining%20the%20next%20batch%20at%20Indo%20Air%20Aviation%20Academy.%20Please%20send%20me%20details%20about%20the%20upcoming%20batch%20and%20enrollment%20process.%0A%0AThank%20you!')}
          >
            🚀 Enroll Now - Next Batch Starts Soon!
          </Button>
          {/* <Button 
            className="btn-secondary hover:scale-105 transition-all duration-300"
            onClick={() => window.open('mailto:Indoairaviation107@gmail.com?subject=Request%20for%20Free%20Brochure%20-%20Indo%20Air%20Aviation%20Academy&body=Hi,%0A%0AI%20would%20like%20to%20request%20a%20free%20brochure%20for%20Indo%20Air%20Aviation%20Academy.%20Please%20send%20me%20detailed%20information%20about%20your%20courses,%20fees,%20and%20facilities.%0A%0AThank%20you!')}
          >
            📋 Request Free Brochure
          </Button> */}
        </div>
        
        <div className="mt-6 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-white">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">500+</div>
            <div className="text-white drop-shadow-md text-sm md:text-base">Graduates Placed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">15+</div>
            <div className="text-white drop-shadow-md text-sm md:text-base">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">95%</div>
            <div className="text-white drop-shadow-md text-sm md:text-base">Job Placement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">50+</div>
            <div className="text-white drop-shadow-md text-sm md:text-base">Industry Partners</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;