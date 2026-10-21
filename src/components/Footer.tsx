
import React from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  Lock,
  Plane,
  CheckCircle2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "@/assets/indo-air-aviation-logo-removebg-preview.png";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  
  const navigateToHome = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 70;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 relative border-t border-slate-800/80 overflow-hidden">
      {/* Subtle aviation background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Accreditation & Trust Ribbon */}
      <div className="border-b border-slate-800/60 bg-slate-900/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>DGCA & IATA Aligned Training Curriculum</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>500+ Graduates Successfully Placed Across 50+ Airlines</span>
            </div>
            <div className="flex items-center space-x-2">
              <Plane className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>Indore Premier Aviation Campus (Sayaji Plaza)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Academy Overview & Credentials (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={navigateToHome}
            >
              <img 
                src={logoImage} 
                alt="Indo Air Aviation Academy Logo" 
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  Indo Air Aviation Academy
                </h3>
                <p className="text-[11px] text-amber-400 font-semibold tracking-wider uppercase">
                  Aviation Career Consultancy & Training
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Guiding aspiring aviators with end-to-end career pathways, personalized counseling, 
              DGCA-aligned ground school, flight simulator training, and direct placement assistance with leading airlines.
            </p>

            {/* Executive Leadership */}
            <div className="inline-flex items-center space-x-2.5 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-xs">
              <span className="text-slate-400 font-medium">Company CEO:</span>
              <span className="text-white font-bold tracking-wide">S S Rajpoot</span>
            </div>

            {/* Verification Callout Box */}
            <div className="bg-slate-900/90 border border-amber-400/30 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Online Certificate Verification</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Airlines, recruiters, and students can authenticate course completion certificates instantly.
              </p>
              <button
                onClick={() => {
                  navigate('/verify');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-300 hover:text-white bg-amber-400/15 hover:bg-amber-400/30 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
              >
                <span>Verify Student Certificate</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Aviation Programs (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-4 border-b border-slate-800 pb-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Aviation Programs</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                "Commercial Pilot License (CPL / PPL)",
                "Cabin Crew & Flight Attendant",
                "Ground Services & Airport Ops",
                "Aviation Management & Business",
                "Aviation Security & Safety",
                "Airline Customer Service",
              ].map((prog, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigateToSection('programs')}
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center space-x-2 text-left cursor-pointer group"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-400/70 group-hover:text-amber-400 flex-shrink-0" />
                    <span>{prog}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Student Links (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-4 border-b border-slate-800 pb-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Student Hub</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={navigateToHome}
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToSection('about')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>About Academy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToSection('programs')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Training Programs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToSection('testimonials')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Success Stories</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/verify');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-amber-300 font-semibold hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Verify Certificate</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToSection('faq')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>FAQs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToSection('contact')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Admissions & Campus</span>
                </button>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="text-slate-500 hover:text-slate-300 hover:translate-x-1 transition-all duration-200 flex items-center space-x-2 cursor-pointer text-xs"
                >
                  <Lock className="w-3 h-3 text-slate-600" />
                  <span>Admin Access</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Indore Campus & Admissions (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-4 border-b border-slate-800 pb-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Indore Campus</span>
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-amber-400 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Campus Address</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    1st Floor, Sayaji Plaza, In front of Bhandari Hospital, Near Sayaji Hotel, Indore, MP - 452001
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Admissions Helpline</p>
                  <a 
                    href="tel:+918858453069" 
                    className="text-xs text-slate-300 hover:text-amber-300 transition-colors font-medium"
                  >
                    +91 88584 53069
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email Enquiries</p>
                  <a 
                    href="mailto:Indoairaviation107@gmail.com" 
                    className="text-xs text-slate-300 hover:text-amber-300 transition-colors font-medium truncate block max-w-[200px]"
                  >
                    Indoairaviation107@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-purple-400 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Campus Hours</p>
                  <p className="text-[11px] text-slate-400">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-[11px] text-slate-400">Sunday: 10:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Indo Air Aviation Academy. All rights reserved. Dedicated to Aviation Excellence.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link 
              to="/privacy-policy" 
              className="hover:text-slate-300 transition-colors"
              onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)}
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link 
              to="/terms-of-service" 
              className="hover:text-slate-300 transition-colors"
              onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)}
            >
              Terms of Service
            </Link>
            <span>•</span>
            <Link 
              to="/cookie-policy" 
              className="hover:text-slate-300 transition-colors"
              onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)}
            >
              Cookie Policy
            </Link>
            <span>•</span>
            <Link 
              to="/verify" 
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
              onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)}
            >
              Verify Certificate
            </Link>
            <span>•</span>
            <Link 
              to="/admin/login" 
              className="text-slate-600 hover:text-slate-400 transition-colors flex items-center space-x-1"
              onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)}
            >
              <Lock className="w-2.5 h-2.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
