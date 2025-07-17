import Navigation from "@/components/navigation";
import ProjectsSection from "@/components/projects-section";
import BookshelfSection from "@/components/bookshelf-section";
import ContactSection from "@/components/contact-section";
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
    <div className="min-h-screen bg-white text-secondary">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-neutral to-white pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between py-20">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
                Hi, I'm <span className="text-primary">Nitesh Nandan</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted mb-8 leading-relaxed">
                Backend Engineer & GenAI Expert at Wayfair, passionate about building highly scalable distributed systems and AI-powered solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('projects')}
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  variant="outline"
                  className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                <Code className="text-white text-8xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Skills & Expertise</h2>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                I specialize in building highly scalable backend systems, microservices architecture, and AI-powered applications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-neutral p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-primary text-3xl mb-4">
                  <Code className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Backend Development</h3>
                <p className="text-muted">Java, Spring Boot, Python, C++, System Design</p>
              </div>
              <div className="bg-neutral p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-primary text-3xl mb-4">
                  <Server className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Microservices & Architecture</h3>
                <p className="text-muted">Kubernetes, Docker, Redis, Kafka, RabbitMQ</p>
              </div>
              <div className="bg-neutral p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-primary text-3xl mb-4">
                  <Database className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Database & Storage</h3>
                <p className="text-muted">MySQL, MongoDB, ElasticSearch, S3</p>
              </div>
              <div className="bg-neutral p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-primary text-3xl mb-4">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Generative AI</h3>
                <p className="text-muted">LangChain, GenAI, Machine Learning, Computer Vision</p>
              </div>
              <div className="bg-neutral p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-primary text-3xl mb-4">
                  <Cloud className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Cloud & DevOps</h3>
                <p className="text-muted">AWS, GCP, EKS, Jenkins, ArgoCD</p>
              </div>
              <div className="bg-neutral p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-primary text-3xl mb-4">
                  <Settings className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Monitoring & Optimization</h3>
                <p className="text-muted">Prometheus, Grafana, Telegraf, Performance Tuning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />
      <BookshelfSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
