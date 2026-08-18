import trainingImage from "@/assets/training-facility.jpg";

const AboutSection = () => {
  return (
    <section className="py-2 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 text-foreground">
              Leading Aviation Excellence Since{" "}
              <span className="text-gradient">2008</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              <strong>Indo Air Aviation Academy</strong> stands as a beacon of excellence in aviation education in <strong>Indore, Madhya Pradesh</strong>, 
              committed to shaping the future of the aviation industry. Our state-of-the-art 
              facilities at Sayaji Plaza and industry-expert instructors provide comprehensive training that 
              meets international standards.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              <strong className="text-primary">Our Mission:</strong> To empower aspiring aviation 
              professionals with world-class training, practical experience, and the confidence 
              to excel in their chosen aviation careers.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-foreground font-semibold">IATA Certified Programs</span>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-foreground font-semibold">Expert Industry Faculty</span>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-foreground font-semibold">Modern Training Facilities</span>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-foreground font-semibold">Guaranteed Job Placement</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={trainingImage}
              alt="Modern aviation training facility with flight simulators"
              className="rounded-2xl shadow-elegant w-full"
            />
            <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 bg-white rounded-2xl p-3 md:p-6 shadow-card border-2 border-transparent hover:border-yellow-400/30 transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-gradient-gold mb-1 md:mb-2">15+</div>
              <div className="text-sm md:text-base text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;