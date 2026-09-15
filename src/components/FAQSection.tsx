import React, { useState } from "react";
import { 
  HelpCircle, 
  Phone, 
  MessageCircle, 
  Award,
  ChevronRight
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  category: "all" | "pathway" | "pilot" | "cabincrew" | "placement";
  question: string;
  answer: string;
  badge: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "item-1",
    category: "pathway",
    badge: "Career Pathway",
    question: "What makes Indo Air Aviation Academy different from regular flight schools?",
    answer: "As a dedicated Aviation Career Consultancy & Training Academy in Indore, we provide complete pathway guidance rather than just isolated classroom lectures. We evaluate each student's profile, guide DGCA Class 1 & 2 medical clearances, deliver certified DGCA ground training, conduct simulator and mock cabin drills, and facilitate direct campus recruitment drives with major domestic and international airlines.",
  },
  {
    id: "item-2",
    category: "pilot",
    badge: "Pilot Training",
    question: "What is the eligibility criteria for the Commercial Pilot License (CPL) ground training program?",
    answer: "Candidates must have completed 10+2 with Physics and Mathematics (or equivalent through NIOS/recognized boards) with a minimum of 50% marks. The minimum entry age is 17 years. Additionally, candidates must obtain a DGCA Class 2 medical fitness certificate before beginning ground school and a Class 1 medical certificate prior to active flight hours.",
  },
  {
    id: "item-3",
    category: "cabincrew",
    badge: "Cabin Crew",
    question: "What are the age, height, and qualification requirements to become a Cabin Crew / Flight Attendant?",
    answer: "Aspirants must have passed 10+2 in any stream (Arts, Commerce, or Science). Age requirement is 17 to 26 years. Minimum height criteria is 155 cm (approx 5 ft 1 in) for females and 170 cm (approx 5 ft 7 in) for males, with proportionate weight (BMI index), clear skin without visible tattoos in uniform, and fluent communication in English and Hindi.",
  },
  {
    id: "item-4",
    category: "placement",
    badge: "Placements",
    question: "Does Indo Air Aviation Academy offer airline placement assistance?",
    answer: "Yes. We maintain an active Corporate Placement Cell with a proven 95% placement track record. Our graduates fly and manage operations across leading airlines including IndiGo, Air India, Emirates, Qatar Airways, SpiceJet, Vistara, and Akasa Air. We conduct grooming masterclasses, resume enhancement, mock HR interview panels, and direct campus recruitment drives.",
  },
  {
    id: "item-5",
    category: "pathway",
    badge: "Indore Campus",
    question: "Where is the Indore training campus located, and can parents visit for counseling?",
    answer: "Our central campus is located at 1st Floor, Sayaji Plaza, In front of Bhandari Hospital, Near Sayaji Hotel, Indore, Madhya Pradesh - 452001. Parents and students are welcome to visit Monday to Saturday (9:00 AM to 7:00 PM) and Sunday (10:00 AM to 3:00 PM) for free one-on-one counseling with senior flight captains and career consultants.",
  },
  {
    id: "item-6",
    category: "placement",
    badge: "Verification",
    question: "How can airlines, recruiters, and students verify certificates issued by the academy?",
    answer: "All course completion certificates issued by Indo Air Aviation Academy can be verified 24/7 through our official online verification portal at /verify. Recruiters and students simply enter the student's unique Registration Number and Date of Birth to view the authenticated institutional certificate record.",
  },
  {
    id: "item-7",
    category: "pilot",
    badge: "Simulators",
    question: "What practical flight simulator and mock cabin training is provided on campus?",
    answer: "Our Sayaji Plaza facility houses high-fidelity commercial cockpit flight simulators (Boeing 737 / Airbus A320) for instrument flight rules (IFR) and approach procedures, a full-scale passenger cabin mock-up for real emergency slide evacuation drills and in-flight hospitality, and airside ramp equipment for aircraft marshalling practice.",
  },
  {
    id: "item-8",
    category: "pathway",
    badge: "Hostel & Outstation",
    question: "Can students from outside Indore or other states enroll? Is hostel facility available?",
    answer: "Yes, students regularly join us from across Madhya Pradesh (Bhopal, Ujjain, Gwalior, Jabalpur), Rajasthan, Gujarat, Maharashtra, and other parts of India. We offer comprehensive outstation student support, including verified safe hostel / PG recommendations near the Sayaji Plaza campus and flexible morning/evening batch schedules.",
  },
];

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "pathway" | "pilot" | "cabincrew" | "placement">("all");

  const filteredFAQs = activeCategory === "all" 
    ? FAQ_DATA 
    : FAQ_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-3 leading-relaxed">
            Everything you and your parents need to know about aviation career pathways, eligibility, DGCA exams, training facilities, and airline placements in Indore, MP.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            {[
              { id: "all", label: "All Questions" },
              { id: "pathway", label: "🧭 Pathway & Campus" },
              { id: "pilot", label: "👨‍✈️ Pilot Training" },
              { id: "cabincrew", label: "🌟 Cabin Crew" },
              { id: "placement", label: "🏆 Placements & Verify" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-3xl p-4 sm:p-8 shadow-md">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-3">
            {filteredFAQs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 px-4 sm:px-6 shadow-sm data-[state=open]:border-primary/40 data-[state=open]:shadow-md transition-all"
              >
                <AccordionTrigger className="text-left py-4 sm:py-5 hover:no-underline group">
                  <div className="flex items-start sm:items-center space-x-3 pr-4">
                    <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 shrink-0 mt-0.5 sm:mt-0">
                      {faq.badge}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 pb-5 border-t border-slate-100 mt-2">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Quick Contact Assistance Strip */}
        <div className="mt-10 bg-gradient-to-r from-slate-900 via-primary to-slate-900 rounded-3xl p-6 sm:p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Still Have Questions?
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              Speak with a Senior Aviation Career Consultant
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Get personalized guidance on DGCA medicals, admission eligibility, course fees, and career roadmaps directly from experienced instructors.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+918233787629"
              className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all transform hover:scale-105"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>+91 8233787629</span>
            </a>

            <a
              href="https://wa.me/918233787629?text=Hi%20Indo%20Air%20Aviation!%20I%20have%20questions%20about%20aviation%20training%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
