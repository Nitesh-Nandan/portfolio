import Navigation from "@/components/navigation";
import FeaturedProjects from "@/components/featured-projects";
import RecentReads from "@/components/recent-reads";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Server, Database, Brain, Cloud, Settings, ChevronDown } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen text-foreground">
      <Navigation />
      
      {/* Hero Section with Profile Photo and About Me */}
      <section id="home" className="bg-gradient-to-br from-muted/50 via-background to-accent/40 pt-24 pb-12">
        <div className="container-width">
          <div className="flex flex-col lg:flex-row items-center justify-center py-12 gap-12 lg:gap-20">
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
                  I'm a passionate Backend Engineer and GenAI Expert with expertise in building highly scalable 
                  distributed systems, microservices architecture, and AI-powered applications that serve millions of users. 
                  I specialize in creating robust backend solutions that handle high traffic and complex business requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center lg:justify-start">
                  <Link href="/projects">
                    <Button 
                      size="lg"
                      style={{ backgroundColor: 'hsl(234, 89%, 74%)', color: 'white' }}
                      className="group hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                    >
                      View My Work
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 px-8 py-4 text-lg font-semibold"
                    >
                      Get In Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center pb-8">
            <div className="animate-bounce">
              <ChevronDown className="h-6 w-6 text-muted-foreground/70" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-width">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills & Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I specialize in building highly scalable backend systems, microservices architecture, and AI-powered applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: skill.delay }}
              >
                <div className="text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
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
      </section>

      {/* Section 1: My Projects - Green Background */}
      <section className="py-20" style={{ backgroundColor: '#dcfce7' }}>
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-6">My Projects</h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto leading-relaxed">
              Top projects showcasing my expertise in backend engineering, microservices architecture, and AI integration.
            </p>
          </div>
          <FeaturedProjects />
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Learning & Development - Purple Background */}
      <section className="py-20" style={{ backgroundColor: '#581c87' }}>
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Learning & Development</h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Books I'm actively reading to stay updated with the latest technologies and best practices in software engineering.
            </p>
          </div>
          <RecentReads />
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-purple-800">
                View All Readings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Get In Touch - White Background */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
