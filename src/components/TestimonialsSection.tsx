const testimonials = [
  {
    name: "Gamya Mishra",
    role: "Senior Flight Attendant at Emirates",
    image: "👩‍✈️",
    content: "Indo Air Aviation Academy provided me with exceptional training that prepared me for a successful career with Emirates. The practical training and industry connections were invaluable.",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    role: "Airport Operations Manager at Delhi Airport",
    image: "👨‍💼",
    content: "The aviation management program gave me comprehensive knowledge of airport operations. I secured a leadership position immediately after graduation thanks to their industry partnerships.",
    rating: 5
  },
  {
    name: "Neha Sharma",
    role: "Commercial Pilot at IndiGo",
    image: "👩‍✈️",
    content: "The pilot training program with state-of-the-art simulators and experienced instructors helped me achieve my dream of becoming a commercial pilot. Highly recommended!",
    rating: 5
  },
  {
    name: "Ahmed Hassan",
    role: "Ground Services Supervisor at Qatar Airways",
    image: "👨‍🔧",
    content: "Excellent practical training in ground services. The hands-on experience and safety protocols training prepared me well for international airline operations.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-4 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 text-foreground">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from our graduates who have built successful careers in the aviation industry 
            with leading airlines and airports worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="text-3xl md:text-4xl mr-3 md:mr-4">{testimonial.image}</div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm md:text-base text-primary font-semibold">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
        
        {/* Industry Experience Section */}
        <div className="mt-12 md:mt-16 lg:mt-20 text-center">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 text-foreground">
            Practical Training Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-card">
              <div className="text-primary text-5xl mb-4">✈️</div>
              <h4 className="text-xl font-bold mb-3 text-foreground">Flight Simulations</h4>
              <p className="text-muted-foreground">
                Advanced flight simulators providing realistic training experience for aspiring pilots.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-card">
              <div className="text-primary text-5xl mb-4">🏢</div>
              <h4 className="text-xl font-bold mb-3 text-foreground">Industry Internships</h4>
              <p className="text-muted-foreground">
                Direct placement in leading airlines and airports for hands-on professional experience.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-card">
              <div className="text-primary text-5xl mb-4">🏆</div>
              <h4 className="text-xl font-bold mb-3 text-foreground">Certification Support</h4>
              <p className="text-muted-foreground">
                Complete guidance for industry certifications and licensing requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;