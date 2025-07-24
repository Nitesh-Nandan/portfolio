import { useEffect } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import WorkExperienceSection from "@/components/work-experience-section";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function ExperiencePage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    if (location === '/experience') {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  }, [location]);
  const { data: testimonials } = useQuery({
    queryKey: ['/api/testimonials'],
    queryFn: api.getTestimonials,
  });

  // Check if there are any testimonials
  const hasTestimonials = testimonials && testimonials.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Work Experience Section */}
      <section className="pt-40 pb-16">
        <div className="container-width">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Work Experience
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              My professional journey in backend development, microservices architecture, 
              and leading teams to build scalable solutions.
            </p>
          </div>
          
          {/* Dynamic Layout based on testimonials availability */}
          {hasTestimonials ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Work Experience - 75% width */}
              <div className="lg:col-span-3">
                <WorkExperienceSection />
              </div>
              
              {/* Testimonials - 25% width */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <TestimonialsSection />
                </div>
              </div>
            </div>
          ) : (
            /* Work Experience - Full width when no testimonials */
            <div className="max-w-4xl mx-auto">
              <WorkExperienceSection />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 