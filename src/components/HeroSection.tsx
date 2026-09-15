import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-aviation.jpg";
import pilotImage from "@/assets/pilot-training.jpg";
import cabinCrewImage from "@/assets/cabin-crew-training.jpg";
import facilityImage from "@/assets/training-facility.jpg";

interface SlideData {
  id: number;
  image: string;
  badge: string;
  badgeIcon: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const slides: SlideData[] = [
    {
      id: 1,
      image: heroImage,
      badge: "✈️ Aviation Career Consultancy & Certified Training",
      badgeIcon: "✈️",
      titlePrefix: "Complete Career Pathway with ",
      titleHighlight: "Indo Air Aviation Academy",
      subtitle: "Premier aviation career consultants and training academy in Indore. We map your personalized path into the aviation industry and provide world-class training from day one to placement.",
    },
    {
      id: 2,
      image: cabinCrewImage,
      badge: "🌟 Cabin Crew Pathway & Grooming Training",
      badgeIcon: "🌟",
      titlePrefix: "Guiding Your Path to Wings as ",
      titleHighlight: "Cabin Crew & Flight Attendant",
      subtitle: "Comprehensive career counseling, in-flight safety drills, professional grooming, and direct recruitment drives with premier domestic and international airlines.",
    },
    {
      id: 3,
      image: pilotImage,
      badge: "👨‍✈️ Pilot Career Consultancy & DGCA Ground Training",
      badgeIcon: "👨‍✈️",
      titlePrefix: "Your Clear Pathway to the Cockpit: ",
      titleHighlight: "Commercial Pilot Training & Consulting",
      subtitle: "From DGCA Class 1 & 2 medical counseling to ground school theory, simulator training, and flying club admissions in India and abroad.",
    },
    {
      id: 4,
      image: facilityImage,
      badge: "🏛️ Airport Career Consultancy & Operations Training",
      badgeIcon: "🏛️",
      titlePrefix: "End-to-End Guidance & Training for ",
      titleHighlight: "Airport Operations & Ground Services",
      subtitle: "Practical training in passenger handling, ramp supervision, and airline security paired with dedicated career path consulting and interview prep.",
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden pt-28 pb-8 sm:pt-32 sm:pb-10 lg:pt-36 lg:pb-12 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with authentic real photography */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transform transition-transform duration-7000 ease-out`}
          >
            <img
              src={slide.image}
              alt={slide.titleHighlight}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Natural, authentic dark overlay to ensure readability without looking artificial */}
            <div className="absolute inset-0 bg-slate-950/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/85" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Desktop) */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 lg:left-8 z-30 w-10 h-10 rounded-full items-center justify-center bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 lg:right-8 z-30 w-10 h-10 rounded-full items-center justify-center bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Slide Content - Compact & Focused */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        {/* Category / Trust Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold text-amber-300 mb-3 sm:mb-4 shadow-sm">
          <span>{slides[currentSlide].badgeIcon}</span>
          <span>{slides[currentSlide].badge}</span>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 max-w-4xl tracking-tight leading-tight drop-shadow-md">
          <span>
            {slides[currentSlide].titlePrefix}
            <span className="text-gradient-gold">
              {slides[currentSlide].titleHighlight}
            </span>
          </span>
        </h1>

        {/* Dynamic Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-slate-200/90 mb-4 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
          {slides[currentSlide].subtitle}
        </p>

        {/* Slide Pagination Indicator Dots */}
        <div className="flex items-center justify-center space-x-2 my-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
                idx === currentSlide 
                  ? 'w-8 bg-amber-400 shadow-sm shadow-amber-400/50' 
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Key Academy Statistics Counter Bar */}
        <div className="mt-4 sm:mt-6 w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 text-white max-w-4xl">
          <div className="bg-slate-900/70 backdrop-blur-md py-2.5 px-3 rounded-xl border border-white/10 text-center hover:border-amber-400/30 transition-colors">
            <div className="text-lg sm:text-2xl font-black text-amber-300">500+</div>
            <div className="text-[11px] sm:text-xs text-slate-300 font-medium">Graduates Placed</div>
          </div>
          <div className="bg-slate-900/70 backdrop-blur-md py-2.5 px-3 rounded-xl border border-white/10 text-center hover:border-amber-400/30 transition-colors">
            <div className="text-lg sm:text-2xl font-black text-amber-300">15+</div>
            <div className="text-[11px] sm:text-xs text-slate-300 font-medium">Years of Excellence</div>
          </div>
          <div className="bg-slate-900/70 backdrop-blur-md py-2.5 px-3 rounded-xl border border-white/10 text-center hover:border-amber-400/30 transition-colors">
            <div className="text-lg sm:text-2xl font-black text-amber-300">95%</div>
            <div className="text-[11px] sm:text-xs text-slate-300 font-medium">Placement Rate</div>
          </div>
          <div className="bg-slate-900/70 backdrop-blur-md py-2.5 px-3 rounded-xl border border-white/10 text-center hover:border-amber-400/30 transition-colors">
            <div className="text-lg sm:text-2xl font-black text-amber-300">50+</div>
            <div className="text-[11px] sm:text-xs text-slate-300 font-medium">Airline Partners</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;