
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import { sendApplicationEmail, ApplicationData } from "@/services/emailService";

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[0-9+\-\s\(\)]+$/, "Please enter a valid phone number"),
  program: z.string().min(1, "Please select a program"),
});

type FormData = z.infer<typeof formSchema>;

const AdmissionsSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      program: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare application data
      const applicationData: ApplicationData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        program: data.program
      };
      
      // Send email to Indoairaviation107@gmail.com
      const emailSent = await sendApplicationEmail(applicationData);
      
      if (emailSent) {
        setIsSubmitted(true);
        
        toast({
          title: "Application Submitted Successfully! 🎉",
          description: "We've received your application and will contact you within 24 hours.",
          variant: "default",
        });
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          form.reset();
        }, 5000);
      } else {
        throw new Error("Failed to send email");
      }
      
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again or call us at +91-8233787629.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 text-foreground">
            Ready to <span className="text-gradient">Take Flight?</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Start your aviation career journey with Indo Air Aviation Academy. 
            Join thousands of successful graduates who have transformed their passion into profession.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start lg:items-center">
          <div>
            <h3 className="text-3xl font-bold mb-8 text-foreground">Admission Process</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="min-w-8 min-h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">Application Submission</h4>
                  <p className="text-muted-foreground">Complete our online application form with your personal details, educational background, and program preference.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="min-w-8 min-h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">Document Verification</h4>
                  <p className="text-muted-foreground">Submit required documents including educational certificates, identity proof, and medical fitness certificate.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="min-w-8 min-h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">Entrance Assessment</h4>
                  <p className="text-muted-foreground">Attend our entrance assessment including aptitude test and personal interview to evaluate your suitability.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="min-w-8 min-h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">Enrollment Confirmation</h4>
                  <p className="text-muted-foreground">Upon successful assessment, complete your enrollment by paying the course fees and joining orientation.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-elegant">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground">Start Your Application</h3>
              {!isSubmitted && (
                <p className="text-sm text-muted-foreground mt-2">
                  Fill in your details below and we'll contact you within 24 hours
                </p>
              )}
            </div>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-600 mb-2">Application Submitted Successfully!</h4>
                <p className="text-muted-foreground mb-4">
                  Thank you for your interest! We've received your application and will contact you soon.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>Confirmation sent to your email</span>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your first name" 
                              className="px-3 md:px-4 py-2 md:py-3 rounded-xl text-sm md:text-base"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your last name" 
                              className="px-3 md:px-4 py-2 md:py-3 rounded-xl text-sm md:text-base"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="px-3 md:px-4 py-2 md:py-3 rounded-xl text-sm md:text-base"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Enter your phone number" 
                            className="px-3 md:px-4 py-2 md:py-3 rounded-xl text-sm md:text-base"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program of Interest *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="px-4 py-3 rounded-xl">
                              <SelectValue placeholder="Select a program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="aviation-management">Aviation Management</SelectItem>
                            <SelectItem value="cabin-crew-training">Cabin Crew Training</SelectItem>
                            <SelectItem value="ground-services-training">Ground Services Training</SelectItem>
                            <SelectItem value="customer-service-training">Customer Service Training</SelectItem>
                            <SelectItem value="pilot-training">Pilot Training</SelectItem>
                            <SelectItem value="aviation-security">Aviation Security</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-hero"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </Form>
            )}
            
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Need help? Contact our admissions team at{" "}
                <a href="tel:+91-8233787629" className="text-primary font-semibold hover:underline"> +91-8233787629 </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Requirements Section */}
        <div className="mt-20 bg-white rounded-3xl p-12">
          <h3 className="text-3xl font-bold mb-8 text-center text-foreground">Admission Requirements</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3 text-foreground">Educational Qualification</h4>
              <p className="text-muted-foreground">Minimum 12th grade or equivalent from a recognized board</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3 text-foreground">Age Requirements</h4>
              <p className="text-muted-foreground">Between 18-28 years for most programs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3 text-foreground">Medical Fitness</h4>
              <p className="text-muted-foreground">Valid medical certificate from authorized medical examiner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
