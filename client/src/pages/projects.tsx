import Navigation from "@/components/navigation";
import ProjectsSection from "@/components/projects-section";
import LearningSection from "@/components/learning-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Code2, Briefcase } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Projects Section */}
      <section className="pt-40 pb-16">
        <div className="container-width">
          <div className="text-center mb-20 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                <Briefcase className="h-6 w-6 text-gray-900" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
                My Projects
              </h1>
            </div>
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