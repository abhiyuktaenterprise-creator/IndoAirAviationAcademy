import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Briefcase, 
  ArrowRight, 
  Sparkles,
  Plane,
  Award,
  ChevronRight
} from "lucide-react";
import cabinCrewImage from "@/assets/cabin-crew-training.jpg";
import groundServicesImage from "@/assets/ground-services.jpg";
import aviationManagementImage from "@/assets/aviation-management.jpg";
import customerServiceImage from "@/assets/customer-service-training.jpg";
import pilotTrainingImage from "@/assets/pilot-training.jpg";
import aviationSecurityImage from "@/assets/aviation-security.jpg";

interface Program {
  title: string;
  category: string;
  badge: string;
  badgeColor: string;
  description: string;
  duration: string;
  eligibility: string;
  careerRole: string;
  image: string;
  features: string[];
}

const programs: Program[] = [
  {
    title: "Commercial Pilot License (CPL / PPL)",
    category: "pilot",
    badge: "✈️ DGCA Approved",
    badgeColor: "bg-blue-600 text-white",
    description: "Comprehensive flight training program preparing you for commercial airline cockpits with advanced ground school and simulator hours.",
    duration: "18 Months",
    eligibility: "10+2 with Physics & Math",
    careerRole: "Airline Captain, First Officer, Cargo Pilot",
    image: pilotTrainingImage,
    features: [
      "DGCA Ground Classes & Meteorology",
      "Air Navigation & Technical General",
      "Advanced Flight Simulator Sessions",
      "Airline Cadet Prep & Placement Help",
    ]
  },
  {
    title: "Cabin Crew & Flight Attendant",
    category: "cabincrew",
    badge: "⭐ Most Popular",
    badgeColor: "bg-amber-500 text-slate-950 font-bold",
    description: "Elite in-flight hospitality and safety training program designed for international and domestic airline placement.",
    duration: "6 Months",
    eligibility: "10+2 (Any Stream)",
    careerRole: "Flight Attendant, Cabin Supervisor, In-flight Executive",
    image: cabinCrewImage,
    features: [
      "Professional Grooming & Etiquette",
      "In-Flight Emergency Safety Drills",
      "First Aid & Aviation Medicine",
      "Mock Aircraft Cabin Walkthroughs",
    ]
  },
  {
    title: "Ground Services & Airport Operations",
    category: "ground",
    badge: "🚀 High Hiring Demand",
    badgeColor: "bg-emerald-600 text-white",
    description: "Specialized training for critical airport passenger handling, ramp supervision, baggage sorting, and tarmac coordination.",
    duration: "4 Months",
    eligibility: "10+2 or Any Graduate",
    careerRole: "Airport Duty Manager, Ramp Officer, Passenger Executive",
    image: groundServicesImage,
    features: [
      "Aircraft Marshalling & Ramp Control",
      "Airport Baggage Handling Systems",
      "Tarmac Safety & Emergency Protocols",
      "Direct Airport Internship Opportunities",
    ]
  },
  {
    title: "Aviation Management & Airport Business",
    category: "management",
    badge: "💼 Executive Career",
    badgeColor: "bg-indigo-600 text-white",
    description: "Leadership-focused curriculum covering airline fleet management, airport economics, aviation law, and global logistics.",
    duration: "12 Months",
    eligibility: "Any Graduate / Final Year",
    careerRole: "Aviation Operations Executive, Airline Manager, Station Head",
    image: aviationManagementImage,
    features: [
      "Airline Business Economics & Fleet Planning",
      "Airport Terminal Operations & Safety",
      "Global Cargo Logistics Management",
      "Aviation Regulatory Law & Compliance",
    ]
  },
  {
    title: "Aviation Security & Safety Protocols",
    category: "management",
    badge: "🛡️ Certified Program",
    badgeColor: "bg-purple-600 text-white",
    description: "Rigorous training covering civil aviation security protocols, threat assessment, security screening, and emergency crisis management.",
    duration: "5 Months",
    eligibility: "10+2 or Graduate",
    careerRole: "Aviation Security Officer, Surveillance Supervisor, Safety Inspector",
    image: aviationSecurityImage,
    features: [
      "Civil Aviation Security Directives",
      "X-Ray Baggage Inspection & Screening",
      "Crisis Management & Counter-Threats",
      "BCAS Standards Compliance",
    ]
  },
  {
    title: "Airline Customer Service & Hospitality",
    category: "ground",
    badge: "🌟 Quick Placement",
    badgeColor: "bg-teal-600 text-white",
    description: "High-standard hospitality training focused on passenger ticketing, boarding lounge coordination, and VIP protocol management.",
    duration: "3 Months",
    eligibility: "10+2 (Any Stream)",
    careerRole: "Guest Relations Officer, VIP Lounge Coordinator, Ticketing Agent",
    image: customerServiceImage,
    features: [
      "Global Airline Reservation Systems (GDS)",
      "VIP & Business Lounge Handling",
      "Conflict Resolution & Problem Solving",
      "Spoken English & Communication Skills",
    ]
  }
];

export const ProgramsSection: React.FC = () => {
  return (
    <section id="programs" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Industry-Recognized Aviation Certifications</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Find Your Dream <span className="text-gradient">Aviation Career</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
            World-class DGCA-aligned training programs with practical flight simulator hours, uniform grooming, and guaranteed airline interview assistance.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1.5"
            >
              {/* Image & Floating Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={program.image}
                  alt={`${program.title} training`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                {/* Floating Tag */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${program.badgeColor}`}>
                    {program.badge}
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg border border-white/20 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{program.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug mb-2">
                  {program.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {program.description}
                </p>

                {/* Eligibility & Career Target Pill */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 mb-4 space-y-1.5 text-xs">
                  <div className="flex items-center text-slate-700">
                    <GraduationCap className="w-3.5 h-3.5 text-primary mr-1.5 flex-shrink-0" />
                    <span className="font-semibold text-slate-500 mr-1">Eligibility:</span>
                    <span className="font-bold text-slate-800">{program.eligibility}</span>
                  </div>
                  <div className="flex items-center text-slate-700">
                    <Briefcase className="w-3.5 h-3.5 text-amber-500 mr-1.5 flex-shrink-0" />
                    <span className="font-semibold text-slate-500 mr-1">Target Roles:</span>
                    <span className="font-bold text-slate-800 truncate">{program.careerRole}</span>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="space-y-2 mb-6 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Curriculum Highlights:
                  </span>
                  <ul className="space-y-1.5">
                    {program.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA Button */}
                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() =>
                      window.open(
                        `mailto:Indoairaviation107@gmail.com?subject=Inquiry%20about%20${encodeURIComponent(
                          program.title
                        )}%20Program&body=Hi,%0A%0AI%20am%20interested%20in%20learning%20more%20about%20the%20${encodeURIComponent(
                          program.title
                        )}%20program%20at%20Indo%20Air%20Aviation%20Academy.%0A%0APlease%20send%20me%20details%20about:%0A-%20Course%20fees%20and%20scholarships%0A-%20Batch%20start%20dates%0A-%20Hostel%20facilities%0A-%20Placement%20guarantee%0A%0AThank%20you!`
                      )
                    }
                    className="w-full bg-slate-900 hover:bg-primary text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 text-xs sm:text-sm group-hover:shadow-md cursor-pointer"
                  >
                    <span>Apply for this Course</span>
                    <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;