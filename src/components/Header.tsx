import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ShieldCheck, Award, GraduationCap } from "lucide-react";
import logoImage from "@/assets/indo-air-aviation-logo-removebg-preview.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation function that works smoothly across all pages
  const navigateToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      if (sectionId === 'home') {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(`/#${sectionId}`);
      }
    } else {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md shadow-xl border-b border-white/10 py-2.5' 
          : 'bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => navigateToSection('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <img 
                src={logoImage} 
                alt="Indo Air Aviation Academy Logo" 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
              />
            </div>
            <div className="hidden min-[380px]:block">
              <span className="font-extrabold text-sm sm:text-base md:text-lg text-white tracking-tight leading-tight block group-hover:text-amber-300 transition-colors">
                Indo Air Aviation
              </span>
              <span className="text-[10px] sm:text-xs text-amber-400 font-semibold tracking-wider uppercase block">
                Consultancy & Training • Indore
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <button 
              onClick={() => navigateToSection('home')} 
              className="px-3.5 py-1.5 text-xs lg:text-sm text-slate-200 hover:text-white font-semibold rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => navigateToSection('about')} 
              className="px-3.5 py-1.5 text-xs lg:text-sm text-slate-200 hover:text-white font-semibold rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => navigateToSection('programs')} 
              className="px-3.5 py-1.5 text-xs lg:text-sm text-slate-200 hover:text-white font-semibold rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              Programs
            </button>
            <button 
              onClick={() => navigateToSection('faq')} 
              className="px-3.5 py-1.5 text-xs lg:text-sm text-slate-200 hover:text-white font-semibold rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              FAQs
            </button>
            <button 
              onClick={() => navigateToSection('contact')} 
              className="px-3.5 py-1.5 text-xs lg:text-sm text-slate-200 hover:text-white font-semibold rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              Admissions
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Verify Certificate Pill */}
            <button
              onClick={() => {
                navigate('/verify');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                location.pathname === '/verify'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                  : 'bg-white/10 text-amber-300 border-amber-400/40 hover:bg-amber-400 hover:text-slate-950'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Verify Certificate</span>
            </button>

            {/* Direct Phone Call Button */}
            <a 
              href="tel:+918233787629" 
              className="inline-flex items-center space-x-1.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs px-3.5 py-2 rounded-full border border-white/10 shadow-md transition-all transform hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+91 8233787629</span>
            </a>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Quick verify button on mobile */}
            <button
              onClick={() => {
                navigate('/verify');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 shadow-sm"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Verify</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-5 border-t border-white/10 bg-slate-950/95 backdrop-blur-xl rounded-2xl shadow-2xl px-4 animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col space-y-1">
              <button 
                onClick={() => navigateToSection('home')} 
                className="text-slate-200 hover:text-amber-300 font-semibold py-2.5 px-3 rounded-lg text-left text-sm hover:bg-white/5 transition-all cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => navigateToSection('about')} 
                className="text-slate-200 hover:text-amber-300 font-semibold py-2.5 px-3 rounded-lg text-left text-sm hover:bg-white/5 transition-all cursor-pointer"
              >
                About Academy
              </button>
              <button 
                onClick={() => navigateToSection('programs')} 
                className="text-slate-200 hover:text-amber-300 font-semibold py-2.5 px-3 rounded-lg text-left text-sm hover:bg-white/5 transition-all cursor-pointer"
              >
                Training Programs
              </button>
              <button 
                onClick={() => navigateToSection('faq')} 
                className="text-slate-200 hover:text-amber-300 font-semibold py-2.5 px-3 rounded-lg text-left text-sm hover:bg-white/5 transition-all cursor-pointer"
              >
                Frequently Asked Questions
              </button>
              <button 
                onClick={() => navigateToSection('contact')} 
                className="text-slate-200 hover:text-amber-300 font-semibold py-2.5 px-3 rounded-lg text-left text-sm hover:bg-white/5 transition-all cursor-pointer"
              >
                Admissions & Enrollment
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/verify');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="text-amber-300 font-bold py-2.5 px-3 rounded-lg text-left text-sm bg-amber-400/10 border border-amber-400/20 flex items-center justify-between mt-1 cursor-pointer"
              >
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-amber-400" />
                  Verify Certificate
                </span>
                <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-extrabold uppercase">
                  Official
                </span>
              </button>

              {/* Call Admissions Footer in Drawer */}
              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
                <a 
                  href="tel:+918233787629" 
                  className="flex items-center text-xs text-slate-300 font-medium hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
                  +91-8233787629
                </a>
                <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  ● Admissions Open
                </span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;