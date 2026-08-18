const partners = [
  { name: "Emirates", type: "Airline Partner" },
  { name: "IndiGo", type: "Training Partner" },
  { name: "Air India", type: "Placement Partner" },
  { name: "Qatar Airways", type: "Recruitment Partner" },
  { name: "Delhi Airport", type: "Training Facility" },
  { name: "Mumbai Airport", type: "Internship Partner" },
  { name: "Bangalore Airport", type: "Placement Partner" },
  { name: "SpiceJet", type: "Industry Partner" }
];

const IndustryPartnersSection = () => {
  return (
    <section className="pt-0 pb-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 text-foreground">
            Industry <span className="text-gradient">Partnerships</span>
          </h2>
          <p className="md:text-xl text-base text-muted-foreground max-w-3xl mx-auto">
            Strong partnerships with leading airlines and airports ensure excellent job placement 
            opportunities and industry-relevant training for our students.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partners.map((partner, index) => (
            <div key={index} className="bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 border border-border/50 text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">{partner.name}</h3>
              <p className="text-primary text-sm font-semibold">{partner.type}</p>
            </div>
          ))}
        </div>
        
        {/* Job Placement Stats */}
        <div className="bg-gradient-to-r from-primary to-primary-glow rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-8">
            Exceptional Job Placement Record
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl md:text-3xl lg:text-5xl font-bold mb-3">95%</div>
              <div className="text-lg md:text-xl text-white/90">Job Placement Rate</div>
              <p className="text-sm md:text-base text-white/80 mt-2">Within 6 months of graduation</p>
            </div>
            
            <div>
              <div className="text-2xl md:text-3xl lg:text-5xl font-bold mb-3">₹4.5L</div>
              <div className="text-lg md:text-xl text-white/90">Average Starting Salary</div>
              <p className="text-sm md:text-base text-white/80 mt-2">For our graduates</p>
            </div>
            
            <div>
              <div className="text-2xl md:text-3xl lg:text-5xl font-bold mb-3">50+</div>
              <div className="text-lg md:text-xl text-white/90">Partner Organizations</div>
              <p className="text-sm md:text-base text-white/80 mt-2">Across airlines and airports</p>
            </div>
          </div>
          
          <div className="mt-6 md:mt-12">
            <h4 className="text-xl md:text-2xl font-bold mb-6">Career Opportunities Include:</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h5 className="font-semibold mb-2">✈️ Flight Operations</h5>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>• Commercial Pilot</li>
                  <li>• Flight Engineer</li>
                  <li>• Air Traffic Controller</li>
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h5 className="font-semibold mb-2">👥 Cabin Services</h5>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>• Flight Attendant</li>
                  <li>• Cabin Supervisor</li>
                  <li>• In-flight Manager</li>
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h5 className="font-semibold mb-2">🏢 Airport Operations</h5>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>• Airport Manager</li>
                  <li>• Ground Operations</li>
                  <li>• Customer Service</li>
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h5 className="font-semibold mb-2">💼 Aviation Management</h5>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>• Aviation Consultant</li>
                  <li>• Airline Manager</li>
                  <li>• Aviation Safety Officer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryPartnersSection;