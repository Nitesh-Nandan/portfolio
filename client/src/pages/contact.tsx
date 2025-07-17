import Navigation from "@/components/navigation";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Contact Section */}
      <section className="pt-24 pb-16">
        <div className="container-width">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm always interested in discussing new opportunities, 
              exciting projects, or just having a chat about technology.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 