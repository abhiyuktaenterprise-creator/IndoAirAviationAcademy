import React from 'react';
import { Plane, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

interface Airline {
  name: string;
  type: string;
  badge: string;
}

const AIRLINES: Airline[] = [
  { name: 'IndiGo Airlines', type: 'Domestic & International', badge: 'Major Recruiter' },
  { name: 'Air India', type: 'Full Service National Carrier', badge: 'Fleet Expansion' },
  { name: 'Emirates', type: 'Global International Fleet', badge: 'Cabin Crew & Ops' },
  { name: 'Qatar Airways', type: '5-Star International Airline', badge: 'Global Placement' },
  { name: 'Vistara', type: 'Tata SIA Airlines', badge: 'In-Flight Crew' },
  { name: 'Akasa Air', type: 'Fastest Growing Airline', badge: 'Ground & Cabin' },
  { name: 'SpiceJet', type: 'Domestic Network', badge: 'Airport Operations' },
  { name: 'Etihad Airways', type: 'Middle East Network', badge: 'International Crew' },
  { name: 'AirAsia India', type: 'Low Cost Network', badge: 'Customer Service' },
  { name: 'Singapore Airlines', type: 'Global Alliance Partner', badge: 'Ground Services' },
];

export const AirlinePartnersMarquee: React.FC = () => {
  return (
    <div className="bg-slate-950 py-10 md:py-14 border-y border-white/10 overflow-hidden relative select-none">
      {/* Subtle Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-20 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-20 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Industry Placement Network</span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Where Our Graduates <span className="text-gradient-gold">Fly & Work</span>
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
          Over 500+ trained pilots, cabin crew, and airport personnel placed across leading airlines.
        </p>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        {/* Double track for seamless infinite loop */}
        <div className="flex space-x-4 animate-marquee py-2 shrink-0">
          {AIRLINES.concat(AIRLINES).map((airline, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3.5 bg-slate-900/90 border border-white/10 hover:border-amber-400/50 rounded-2xl px-5 py-3.5 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-slate-800 flex items-center justify-center text-amber-400 border border-white/10 shadow-sm flex-shrink-0">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm tracking-tight">{airline.name}</span>
                  <span className="text-[10px] bg-amber-400/15 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/20">
                    {airline.badge}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-0.5">{airline.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirlinePartnersMarquee;
