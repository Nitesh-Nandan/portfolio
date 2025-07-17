import Navigation from "@/components/navigation";
import FeaturedProjects from "@/components/featured-projects";
import RecentReads from "@/components/recent-reads";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Server, Database, Brain, Cloud, Settings } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-width">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20">
            <div className="order-2 lg:order-1">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" 
                  alt="Nitesh Nandan - Professional"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center lg:text-left max-w-2xl order-1 lg:order-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Hi, I'm Nitesh Nandan
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Backend Engineer & GenAI Expert at Wayfair
              </p>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                I build highly scalable distributed systems, microservices architecture, and AI-powered applications that serve millions of users.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/projects">
                  <Button 
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 w-full sm:w-auto"
                  >
                    View My Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 w-full sm:w-auto"
                  >
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized in building scalable backend systems and AI-powered applications
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Backend Development Card */}
              <div className="bg-blue-50/50 p-12 rounded-2xl border border-blue-100/50 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-gray-900 text-sm font-normal rounded-full">Java</span>
                  <span className="px-3 py-1 bg-blue-100 text-gray-900 text-sm font-normal rounded-full">Spring Boot</span>
                  <span className="px-3 py-1 bg-blue-100 text-gray-900 text-sm font-normal rounded-full">Python</span>
                  <span className="px-3 py-1 bg-blue-100 text-gray-900 text-sm font-normal rounded-full">Node.js</span>
                  <span className="px-3 py-1 bg-blue-100 text-gray-900 text-sm font-normal rounded-full">Microservices</span>
                  <span className="px-3 py-1 bg-blue-100 text-gray-900 text-sm font-normal rounded-full">REST APIs</span>
                </div>
              </div>

              {/* Database & Cloud Card */}
              <div className="bg-green-50/50 p-12 rounded-2xl border border-green-100/50 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Database & Cloud</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-gray-900 text-sm font-normal rounded-full">AWS</span>
                  <span className="px-3 py-1 bg-green-100 text-gray-900 text-sm font-normal rounded-full">MySQL</span>
                  <span className="px-3 py-1 bg-green-100 text-gray-900 text-sm font-normal rounded-full">MongoDB</span>
                  <span className="px-3 py-1 bg-green-100 text-gray-900 text-sm font-normal rounded-full">Kubernetes</span>
                  <span className="px-3 py-1 bg-green-100 text-gray-900 text-sm font-normal rounded-full">Docker</span>
                  <span className="px-3 py-1 bg-green-100 text-gray-900 text-sm font-normal rounded-full">Redis</span>
                  <span className="px-3 py-1 bg-green-100 text-gray-900 text-sm font-normal rounded-full">Kafka</span>
                </div>
              </div>

              {/* Generative AI Card */}
              <div className="bg-purple-50/50 p-12 rounded-2xl border border-purple-100/50 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Generative AI</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-gray-900 text-sm font-normal rounded-full">LangChain</span>
                  <span className="px-3 py-1 bg-purple-100 text-gray-900 text-sm font-normal rounded-full">GenAI</span>
                  <span className="px-3 py-1 bg-purple-100 text-gray-900 text-sm font-normal rounded-full">Machine Learning</span>
                  <span className="px-3 py-1 bg-purple-100 text-gray-900 text-sm font-normal rounded-full">AI Integration</span>
                  <span className="px-3 py-1 bg-purple-100 text-gray-900 text-sm font-normal rounded-full">Prompt Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Projects showcasing my expertise in backend engineering, microservices architecture, and AI integration.
            </p>
          </div>
          <FeaturedProjects />
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Learning</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Books I'm actively reading to stay updated with the latest technologies and best practices.
            </p>
          </div>
          <RecentReads />
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3">
                View All Readings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
