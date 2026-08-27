import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImage from "@/assets/indo-air-aviation-logo-removebg-preview.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation function that works from any page
  const navigateToSection = (sectionId: string) => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // If we're not on the homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToElement(sectionId);
      }, 100);
    } else {
      // We're already on homepage, just scroll
      scrollToElement(sectionId);
    }
  };

  // Smooth scroll function
  const scrollToElement = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset for fixed header
      const headerHeight = 64; // 16 * 4 = 64px (h-16)
      const elementPosition = element.offsetTop - headerHeight;
      
      // Smooth scroll to section
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
      isScrolled 
        ? 'bg-primary/95 backdrop-blur-sm shadow-lg' 
        : 'bg-primary/95'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-1 relative z-50">
          {/* Logo - Hanging below header */}
          <div className="relative flex items-center space-x-3 absolute bottom-0 left-0">
            <img 
              src={logoImage} 
              alt="Indo Air Aviation Academy Logo" 
              className="h-[80px] sm:h-[100px] md:h-[120px] lg:h-[160px] w-auto object-contain transition-all duration-300 relative z-50 drop-shadow-lg cursor-pointer hover:scale-105"
              onClick={() => navigateToSection('home')}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <button 
              onClick={() => navigateToSection('home')} 
              className="text-white transition-colors font-medium cursor-pointer text-sm lg:text-base hover:text-yellow-300"
            >
              Home
            </button>
            <button 
              onClick={() => navigateToSection('about')} 
              className="text-white transition-colors font-medium cursor-pointer text-sm lg:text-base hover:text-yellow-300"
            >
              About
            </button>
            <button 
              onClick={() => navigateToSection('programs')} 
              className="text-white transition-colors font-medium cursor-pointer text-sm lg:text-base hover:text-yellow-300"
            >
              Programs
            </button>
            <button 
              onClick={() => navigateToSection('testimonials')} 
              className="text-white transition-colors font-medium cursor-pointer text-sm lg:text-base hover:text-yellow-300"
            >
              Testimonials
            </button>
            <button 
              onClick={() => navigateToSection('contact')} 
              className="text-white transition-colors font-medium cursor-pointer text-sm lg:text-base hover:text-yellow-300"
            >
              Contact
            </button>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <div className="flex items-center space-x-2 text-sm text-white">
              <Phone className="w-4 h-4 text-white" />
              <span className="text-white">+91 8233787629</span>
            </div>
            <Button 
              size="sm" 
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs lg:text-sm px-2 lg:px-4"
              onClick={() => window.open('mailto:Indoairaviation107@gmail.com?subject=Enrollment%20Inquiry%20-%20Indo%20Air%20Aviation%20Academy&body=Hi,%0A%0AI%20am%20interested%20in%20enrolling%20at%20Indo%20Air%20Aviation%20Academy.%20Please%20send%20me%20more%20information%20about%20your%20programs%20and%20admission%20process.%0A%0AThank%20you!')}
            >
              🚀 Enroll Now - Limited Seats!
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white transition-colors z-50 relative"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 bg-primary/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => navigateToSection('home')} 
                className="text-white transition-colors font-medium py-3 text-left cursor-pointer hover:text-yellow-300 active:text-yellow-400 text-base"
              >
                Home
              </button>
              <button 
                onClick={() => navigateToSection('about')} 
                className="text-white transition-colors font-medium py-3 text-left cursor-pointer hover:text-yellow-300 active:text-yellow-400 text-base"
              >
                About
              </button>
              <button 
                onClick={() => navigateToSection('programs')} 
                className="text-white transition-colors font-medium py-3 text-left cursor-pointer hover:text-yellow-300 active:text-yellow-400 text-base"
              >
                Programs
              </button>
              <button 
                onClick={() => navigateToSection('testimonials')} 
                className="text-white transition-colors font-medium py-3 text-left cursor-pointer hover:text-yellow-300 active:text-yellow-400 text-base"
              >
                Testimonials
              </button>
              <button 
                onClick={() => navigateToSection('contact')} 
                className="text-white transition-colors font-medium py-3 text-left cursor-pointer hover:text-yellow-300 active:text-yellow-400 text-base"
              >
                Contact
              </button>
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center space-x-2 text-sm text-white mb-3">
                  <Phone className="w-4 h-4 text-white" />
                  <span className="text-white">+91 8233787629</span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('mailto:Indoairaviation107@gmail.com?subject=Enrollment%20Inquiry%20-%20Indo%20Air%20Aviation%20Academy&body=Hi,%0A%0AI%20am%20interested%20in%20enrolling%20at%20Indo%20Air%20Aviation%20Academy.%20Please%20send%20me%20more%20information%20about%20your%20programs%20and%20admission%20process.%0A%0AThank%20you!')}
                >
                  🚀 Enroll Now - Limited Seats!
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;