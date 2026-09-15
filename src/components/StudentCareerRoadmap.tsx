import React from 'react';
import { Compass, BookOpenCheck, PlaneTakeoff, Award, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: "01",
    icon: Compass,
    title: "1. Career Pathway Consulting",
    subtitle: "Profile & Eligibility Assessment",
    description: "Personalized 1-on-1 counseling with aviation consultants to assess eligibility, height, education stream, DGCA Class 1/2 medical guidance, and map your optimal career path.",
    tag: "Pathway Consulting",
  },
  {
    step: "02",
    icon: BookOpenCheck,
    title: "2. DGCA Ground Training",
    subtitle: "Air Navigation, Law & Meteorology",
    description: "Comprehensive ground school training covering DGCA examination modules, air regulations, aviation law, meteorology, and technical general with certified mentors.",
    tag: "Foundational Training",
  },
  {
    step: "03",
    icon: PlaneTakeoff,
    title: "3. Practical Simulators & Drills",
    subtitle: "Cockpit Hours & Cabin Drills",
    description: "Intensive practical training with flight simulators, mock aircraft cabin safety drills, professional grooming masterclasses, and airport tarmac operations.",
    tag: "Practical Training",
  },
  {
    step: "04",
    icon: Award,
    title: "4. Placement Consulting & Wings",
    subtitle: "Direct Airline Recruitment",
    description: "End-to-end recruitment preparation including resume enhancement, airline HR interview simulations, GD drills, and direct placement drives with leading carriers.",
    tag: "Career Placement",
  },
];

export const StudentCareerRoadmap: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative ambient glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4">
            <span>🧭 Career Pathway Consulting & Hands-on Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            How We Guide You: <span className="text-gradient-gold">Pathway Consulting & Training</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            As your dedicated aviation career consultants, we don't just teach courses — we map your personalized path into the airline industry and deliver certified practical training at every stage.
          </p>
        </div>

        {/* 4 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 border border-white/10 hover:border-amber-400/40 rounded-3xl p-6 relative flex flex-col justify-between backdrop-blur-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group"
              >
                <div>
                  {/* Top Bar with Step Number and Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-slate-900 border border-white/10 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-white/15 font-mono tracking-tighter group-hover:text-amber-400/30 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full mb-3">
                    {step.tag}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-400 mb-3">
                    {step.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Process</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StudentCareerRoadmap;
