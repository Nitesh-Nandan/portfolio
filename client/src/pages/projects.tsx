import Navigation from "@/components/navigation";
import ProjectsSection from "@/components/projects-section";
import LearningSection from "@/components/learning-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Projects Section */}
      <section className="pt-32 pb-16">
        <div className="container-width">
          <div className="text-center mb-20 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              My Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A collection of projects showcasing my expertise in backend development, 
              microservices architecture, and AI-powered solutions.
            </p>
          </div>
          <ProjectsSection showAllProjects={true} />
        </div>
      </section>

      {/* Learning Section */}
      <LearningSection />

      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 