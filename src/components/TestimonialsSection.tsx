import React, { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Award, 
  CheckCircle2, 
  Quote
} from "lucide-react";
import gamyaImage from "@/assets/alumni/gamya-mishra.jpg";
import rohanImage from "@/assets/alumni/rohan-verma.jpg";
import ananyaImage from "@/assets/alumni/ananya-deshmukh.jpg";
import rajeshImage from "@/assets/alumni/rajesh-kumar.jpg";
import nehaImage from "@/assets/alumni/neha-sharma.jpg";
import ahmedImage from "@/assets/alumni/ahmed-hassan.jpg";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  airline: string;
  airlineBadgeColor: string;
  course: string;
  batch: string;
  image: string;
  rating: number;
  content: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Gamya Mishra",
    role: "Senior Flight Attendant",
    airline: "Emirates Airline (Dubai)",
    airlineBadgeColor: "bg-red-500/10 text-red-700 border-red-200",
    course: "Cabin Crew & In-Flight Hospitality",
    batch: "Class of 2023",
    image: gamyaImage,
    rating: 5,
    highlight: "Cleared Emirates Global Selection in Dubai",
    content: "Indo Air Aviation Academy was the turning point in my career. The mock cabin drills, grooming masterclasses, and international aviation etiquette gave me the polish and confidence to clear Emirates' international recruitment on my very first attempt!",
  },
  {
    id: 2,
    name: "Capt. Rohan Verma",
    role: "First Officer (Airbus A320)",
    airline: "IndiGo Airlines",
    airlineBadgeColor: "bg-blue-500/10 text-blue-700 border-blue-200",
    course: "Commercial Pilot License (CPL Ground & Sim)",
    batch: "Class of 2022",
    image: rohanImage,
    rating: 5,
    highlight: "Cleared All DGCA Exams in Single Attempt",
    content: "The ground school training for Air Navigation, Meteorology, and Air Regulations is second to none. The senior flight instructors make complex flight mechanics simple, and their pathway guidance for flying hours was invaluable.",
  },
  {
    id: 3,
    name: "Ananya Deshmukh",
    role: "In-Flight Cabin Supervisor",
    airline: "Air India",
    airlineBadgeColor: "bg-amber-500/10 text-amber-800 border-amber-200",
    course: "Cabin Crew Excellence & Safety Drills",
    batch: "Class of 2024",
    image: ananyaImage,
    rating: 5,
    highlight: "Placed in Campus Placement Drive",
    content: "The career pathway consulting at Indo Air is genuinely student-focused. They guided my posture, speech fluency, and safety mindset. The direct airline placement drives at Sayaji Plaza landed me my dream wings with Air India.",
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    role: "Airport Duty Manager",
    airline: "Delhi International Airport (IGI)",
    airlineBadgeColor: "bg-emerald-500/10 text-emerald-800 border-emerald-200",
    course: "Aviation Management & Airport Operations",
    batch: "Class of 2021",
    image: rajeshImage,
    rating: 5,
    highlight: "Fast-Track Leadership Promotion",
    content: "The practical training in terminal operations, ramp control, and crisis management gave me a massive head start over peers. Within 3 years I was promoted to Duty Manager at one of the busiest airports in Asia.",
  },
  {
    id: 5,
    name: "Neha Sharma",
    role: "Junior First Officer Cadet",
    airline: "SpiceJet",
    airlineBadgeColor: "bg-orange-500/10 text-orange-800 border-orange-200",
    course: "Pilot Ground School & Navigation",
    batch: "Class of 2023",
    image: nehaImage,
    rating: 5,
    highlight: "From Zero Aviation Background to Cockpit",
    content: "Coming from a non-aviation family, I had no clue about DGCA Class 1 medicals or flying clubs. Indo Air's consultants mapped out my entire path, guided my DGCA theory papers, and supported me every step of the way.",
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    role: "Senior Ramp Operations Officer",
    airline: "Qatar Airways (Hamad Int'l Airport)",
    airlineBadgeColor: "bg-purple-500/10 text-purple-800 border-purple-200",
    course: "Ground Services & Airport Operations",
    batch: "Class of 2022",
    image: ahmedImage,
    rating: 5,
    highlight: "Global Placement at 5-Star International Airline",
    content: "The hands-on aircraft marshalling drills and airside safety protocols matched strict IATA guidelines. When Qatar Airways interviewed me for ramp operations, I answered every technical and safety scenario with ease.",
  },
];

const TestimonialsSection: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive items count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxTestimonialIndex = Math.max(0, testimonials.length - itemsPerPage);

  // Auto-play for Success Stories
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev >= maxTestimonialIndex ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, maxTestimonialIndex]);

  const handleNext = () => {
    setTestimonialIndex((prev) => (prev >= maxTestimonialIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setTestimonialIndex((prev) => (prev <= 0 ? maxTestimonialIndex : prev - 1));
  };

  return (
    <section 
      className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Slider Navigation Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-400/15 text-amber-900 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Verified Alumni Placements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Alumni <span className="text-gradient">Success Stories</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mt-2 leading-relaxed">
              Meet our graduates now flying and managing operations across 50+ leading domestic and international airlines.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center space-x-3 self-end md:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div 
          className="overflow-hidden"
          onTouchStart={(e) => { touchStartX.current = e.targetTouches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (diff > 50) handleNext();
            else if (diff < -50) handlePrev();
            touchStartX.current = null;
          }}
        >
          <div 
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{
              transform: `translateX(-${testimonialIndex * (100 / itemsPerPage)}%)`
            }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="px-3 shrink-0"
                style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
              >
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1 relative">
                  {/* Top Quote Icon Watermark */}
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 group-hover:text-amber-100 transition-colors pointer-events-none" />

                  <div>
                    {/* Natural Human Student Portrait & Info */}
                    <div className="flex items-center space-x-3.5 mb-4 relative z-10">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-md shrink-0 ring-2 ring-amber-400/40 border border-slate-200 bg-slate-100">
                        <img 
                          src={testimonial.image} 
                          alt={`${testimonial.name} - ${testimonial.airline}`}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {testimonial.role}
                        </p>
                        <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md border mt-1 ${testimonial.airlineBadgeColor}`}>
                          ✈️ {testimonial.airline}
                        </span>
                      </div>
                    </div>

                    {/* 5-Star Rating */}
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs text-slate-500 ml-1.5 font-semibold">5.0 Verified</span>
                    </div>

                    {/* Highlight Tag */}
                    <div className="bg-slate-50 rounded-xl px-3 py-1.5 border border-slate-100 text-xs font-semibold text-slate-700 mb-3.5">
                      <span className="text-primary font-bold">Placement: </span>
                      {testimonial.highlight}
                    </div>

                    {/* Quote Content */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic line-clamp-4 mb-4">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Bottom Accreditation Tag */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[180px] font-medium">{testimonial.course}</span>
                    <span className="flex items-center text-emerald-600 font-bold shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                      Alumni Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {Array.from({ length: maxTestimonialIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setTestimonialIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
                idx === testimonialIndex 
                  ? 'w-7 bg-primary shadow-sm' 
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;