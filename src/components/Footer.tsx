
import { Twitter, Facebook, Linkedin, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "@/assets/indo-air-aviation-logo-removebg-preview.png";

const Footer = () => {
  const navigate = useNavigate();
  
  const navigateToHome = () => {
    navigate('/', { replace: true });
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-navy-blue text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-3 md:mb-4">
              <img src={logoImage} alt="Indo Air Aviation Academy Logo" className="h-12 md:h-16 w-auto object-contain mr-3 md:mr-4 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={navigateToHome} />
              <h3 className="text-lg md:text-xl font-bold text-white cursor-pointer hover:text-yellow-300 transition-colors duration-300" onClick={navigateToHome}>
                Indo Air Aviation Academy
              </h3>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Leading aviation training institute empowering the next generation of aviation professionals. 
              Transform your passion for flight into a successful career with industry-relevant training and guaranteed job placement.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Programs</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 opacity-60"></div>
                <a href="#programs" className="text-sm md:text-base hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">Aviation Management</a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 opacity-60"></div>
                <a href="#programs" className="text-sm md:text-base hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">Cabin Crew Training</a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 opacity-60"></div>
                <a href="#programs" className="text-sm md:text-base hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">Ground Services</a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 opacity-60"></div>
                <a href="#programs" className="text-sm md:text-base hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">Pilot Training</a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 opacity-60"></div>
                <a href="#programs" className="text-sm md:text-base hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">Customer Service</a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 opacity-60"></div>
                <a href="#programs" className="text-sm md:text-base hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">Aviation Security</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
            <div className="space-y-4 text-white/80">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white mb-1">Address</p>
                  <p className="text-sm leading-relaxed">1st floor, Sayaji Plaza, in front of Bhandari Hospital near Sayaji Hotel, 452001</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white mb-1">Phone</p>
                  <a href="tel:+91-6394311851" className="text-sm hover:text-white transition-colors duration-300 hover:underline">
                    +91-6394311851
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white mb-1">Email</p>
                  <a href="mailto:Indoairaviation107@gmail.com" className="text-sm hover:text-white transition-colors duration-300 hover:underline">
                  Indoairaviation107@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white mb-1">Office Hours</p>
                  <div className="text-sm space-y-1">
                    <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p>Sunday: 10:00 AM - 3:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 Indo Air Aviation Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-white/60">
            <Link 
              to="/privacy-policy" 
              className="hover:text-white transition-all duration-300 hover:translate-y-[-1px] animated-underline"
              onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-of-service" 
              className="hover:text-white transition-all duration-300 hover:translate-y-[-1px] animated-underline"
              onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookie-policy" 
              className="hover:text-white transition-all duration-300 hover:translate-y-[-1px] animated-underline"
              onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
