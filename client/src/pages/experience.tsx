import Navigation from "@/components/navigation";
import WorkExperienceSection from "@/components/work-experience-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Work Experience Section */}
      <section className="pt-24 pb-16">
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
          <WorkExperienceSection />
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 