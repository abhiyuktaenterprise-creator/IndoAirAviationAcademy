import cabinCrewImage from "@/assets/cabin-crew-training.jpg";
import groundServicesImage from "@/assets/ground-services.jpg";
import aviationManagementImage from "@/assets/aviation-management.jpg";
import customerServiceImage from "@/assets/customer-service-training.jpg";
import pilotTrainingImage from "@/assets/pilot-training.jpg";
import aviationSecurityImage from "@/assets/aviation-security.jpg";

const programs = [
  {
    title: "Aviation Management",
    description: "Comprehensive program covering airport operations, airline management, and aviation business strategies.",
    duration: "12 Months",
    image: aviationManagementImage,
    features: ["Airport Operations", "Airline Economics", "Aviation Safety", "Leadership Skills"]
  },
  {
    title: "Cabin Crew Training",
    description: "Professional training for flight attendants covering safety procedures, customer service, and emergency protocols.",
    duration: "6 Months",
    image: cabinCrewImage,
    features: ["Safety Procedures", "First Aid Training", "Customer Service", "Emergency Response"]
  },
  {
    title: "Ground Services Training",
    description: "Specialized training for airport ground operations including baggage handling, aircraft marshalling, and cargo operations.",
    duration: "4 Months",
    image: groundServicesImage,
    features: ["Aircraft Handling", "Cargo Operations", "Safety Protocols", "Equipment Training"]
  },
  {
    title: "Customer Service Training",
    description: "Essential skills for aviation customer service including communication, problem-solving, and cultural awareness.",
    duration: "3 Months",
    image: customerServiceImage,
    features: ["Communication Skills", "Problem Solving", "Cultural Awareness", "Service Excellence"]
  },
  {
    title: "Pilot Training",
    description: "Professional pilot training from private pilot license to airline transport pilot license with flight simulators.",
    duration: "18 Months",
    image: pilotTrainingImage,
    features: ["Flight Theory", "Simulator Training", "Navigation", "Aviation Weather"]
  },
  {
    title: "Aviation Security",
    description: "Comprehensive security training covering aviation security protocols, threat assessment, and emergency procedures.",
    duration: "5 Months",
    image: aviationSecurityImage,
    features: ["Security Protocols", "Threat Assessment", "Emergency Response", "Legal Compliance"]
  }
];

const ProgramsSection = () => {
  return (
    <section className="py-4 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 text-foreground">
            Our <span className="text-gradient">Training Programs</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive aviation training programs designed to prepare you for success 
            in the dynamic aviation industry with hands-on experience and industry-relevant curriculum.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <div key={index} className="program-card group stagger-animation bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              {program.image && (
                <div className="mb-4 md:mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={program.image}
                    alt={`${program.title} training session`}
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className="mb-3 md:mb-4 program-card-content transition-transform duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {program.title}
                  </h3>
                  <span className="bg-primary/10 text-primary px-2 md:px-3 py-1 rounded-full text-xs font-semibold self-start">
                    {program.duration}
                  </span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
                  {program.description}
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm md:text-base font-semibold text-foreground">Key Features:</h4>
                <ul className="space-y-1 md:space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 md:space-x-3">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
                <button 
                  className="w-full bg-primary/5 hover:bg-primary hover:text-primary-foreground text-primary font-semibold py-2 md:py-3 px-4 md:px-6 rounded-xl transition-all duration-300 group-hover:shadow-md text-sm md:text-base"
                  onClick={() => window.open(`mailto:Indoairaviation107@gmail.com?subject=Inquiry%20about%20${encodeURIComponent(program.title)}%20Program&body=Hi,%0A%0AI%20am%20interested%20in%20learning%20more%20about%20the%20${encodeURIComponent(program.title)}%20program%20at%20Indo%20Air%20Aviation%20Academy.%0A%0APlease%20send%20me%20details%20about:%0A-%20Course%20curriculum%0A-%20Duration%20and%20schedule%0A-%20Fees%20and%20payment%20options%0A-%20Placement%20assistance%0A-%20Next%20batch%20dates%0A%0AThank%20you!`)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;