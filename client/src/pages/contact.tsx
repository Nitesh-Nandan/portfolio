import { useEffect } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Linkedin, Github, Mail, Twitter, MessageCircle } from "lucide-react";
import { useContactContent } from "@/hooks/use-data-queries";
import { DataLoadingState, DataErrorState } from "@/components/ui/loading-states";

export default function ContactPage() {
  const [location] = useLocation();
  const { data: contactContent, loading: contactContentLoading, error: contactContentError } = useContactContent();
  
  // Scroll to top when component mounts
  useEffect(() => {
    if (location === '/contact') {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  }, [location]);
  
  const scrollToContactForm = () => {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Personal Introduction */}
      <section className="pt-40 pb-16">
        <div className="container-width">
          {contactContentLoading ? (
            <div className="text-center mb-16">
              <DataLoadingState message="Loading contact information..." />
            </div>
          ) : contactContentError ? (
            <div className="text-center mb-16">
              <DataErrorState 
                message="Unable to load contact information. Please try again later."
                onRetry={() => window.location.reload()}
              />
            </div>
          ) : (
            <div className="text-center mb-16 animate-fade-in">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8"
                dangerouslySetInnerHTML={{ 
                  __html: contactContent?.heading || "Let's Connect" 
                }}
              />
              <div className="max-w-3xl mx-auto space-y-6">
                <div 
                  className="text-xl text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: contactContent?.subheading || "Hi there! I'm a passionate <strong>Backend Engineer</strong> specializing in scalable distributed systems, microservices architecture, and GenAI solutions." 
                  }}
                />
                <div 
                  className="text-lg text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: contactContent?.statusMessage || "Whether you want to collaborate on exciting projects, discuss technology, or just say hello - I'd love to hear from you!" 
                  }}
                />
              
                {/* Social Icons */}
                <div className="flex items-center justify-center gap-6 pt-6">
                  <a
                    href="https://www.linkedin.com/in/niteshnandan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 group"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
                    title="GitHub"
                  >
                    <Github className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 transition-all duration-200 group"
                    title="Twitter"
                  >
                    <Twitter className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                  <a
                    href="mailto:niteshnitp5686@gmail.com"
                    className="p-3 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200 group"
                    title="Email"
                  >
                    <Mail className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                  <button
                    onClick={scrollToContactForm}
                    className="p-3 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-all duration-200 group"
                    title="Send Message"
                  >
                    <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                </div>
                
                <div 
                  className="text-lg text-foreground font-medium pt-4"
                  dangerouslySetInnerHTML={{ 
                    __html: contactContent?.formTitle || "Drop me a message below!" 
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact-form">
        <ContactSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 