import Navigation from "@/components/navigation";
import ProjectsSection from "@/components/projects-section";
import ReadingSection from "@/components/reading-section";
import ContactSection from "@/components/contact-section";
import WorkExperienceSection from "@/components/work-experience-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Server, Database, Brain, Cloud, Settings } from "lucide-react";

export default function HomePage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-muted/40 via-background to-accent/30 pt-16">
        <div className="container-width">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-16 lg:gap-24">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-lg border-2 border-white/50">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" 
                    alt="Nitesh Nandan - Professional"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="text-center lg:text-left max-w-2xl order-1 lg:order-2">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1]">
                  <span className="block mb-2">Hi, I'm</span>
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Nitesh Nandan
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Backend Engineer & GenAI Expert at Wayfair
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Building highly scalable distributed systems and AI-powered solutions that impact millions of users
                </p>
                <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center lg:justify-start">
                  <Button 
                    onClick={() => scrollToSection('projects')}
                    size="lg"
                    className="group gradient-subtle text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 px-8 py-4 text-lg"
                  >
                    View My Work
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 px-8 py-4 text-lg"
                  >
                    Get In Touch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-soft section-padding">
          <div className="container-width">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="mb-6">Skills & Expertise</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                I specialize in building highly scalable backend systems, microservices architecture, and AI-powered applications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Code,
                  title: "Backend Development",
                  description: "Java, Spring Boot, Python, C++, System Design",
                  delay: "0s"
                },
                {
                  icon: Server,
                  title: "Microservices & Architecture",
                  description: "Kubernetes, Docker, Redis, Kafka, RabbitMQ",
                  delay: "0.1s"
                },
                {
                  icon: Database,
                  title: "Database & Storage",
                  description: "MySQL, MongoDB, ElasticSearch, S3",
                  delay: "0.2s"
                },
                {
                  icon: Brain,
                  title: "Generative AI",
                  description: "LangChain, GenAI, Machine Learning, Computer Vision",
                  delay: "0.3s"
                },
                {
                  icon: Cloud,
                  title: "Cloud & DevOps",
                  description: "AWS, GCP, EKS, Jenkins, ArgoCD",
                  delay: "0.4s"
                },
                {
                  icon: Settings,
                  title: "Monitoring & Optimization",
                  description: "Prometheus, Grafana, Telegraf, Performance Tuning",
                  delay: "0.5s"
                }
              ].map((skill, index) => (
                <div 
                  key={skill.title}
                  className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: skill.delay }}
                >
                  <div className="text-primary mb-6 transition-transform duration-300 group-hover:scale-110">
                    <skill.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WorkExperienceSection />
      <ProjectsSection />
      <ReadingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
