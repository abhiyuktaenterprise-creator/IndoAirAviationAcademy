import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export const CertificateVerificationBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-primary to-slate-950 p-6 sm:p-10 md:p-12 shadow-2xl border border-white/10 text-white">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-amber-300 mb-4 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Official Student & Certificate Registry</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Verify Academy Credentials Online
            </h2>

            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              Employers, airlines, and students can instantly authenticate any certificate issued by Indo Air Aviation Academy against our official institutional database.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Anti-fraud Protection
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Instant Registry Search
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                100% Privacy Protected
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <Button
              size="lg"
              onClick={() => {
                navigate('/verify');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-6 text-base rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center space-x-2"
            >
              <Award className="w-5 h-5 text-slate-950" />
              <span>Verify a Certificate</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerificationBanner;
