import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { usePersonalInfo, useFooterContent } from "@/hooks/use-data-queries";
import { DataLoadingState, DataErrorState } from "@/components/ui/loading-states";
import { Link } from "wouter";

export default function Footer() {
  const { data: personalInfo, loading: personalInfoLoading, error: personalInfoError } = usePersonalInfo();
  const { data: footerContent, loading: footerContentLoading, error: footerContentError } = useFooterContent();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Show loading state while fetching data
  const isLoading = personalInfoLoading || footerContentLoading;
  if (isLoading) {
    return (
      <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-300">
            <DataLoadingState message="Loading footer content..." />
          </div>
        </div>
      </footer>
    );
  }

  // Show error state if data fails to load
  const hasError = personalInfoError || footerContentError;
  if (hasError) {
    return (
      <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-300">
            <DataErrorState 
              message="Unable to load footer content. Please try again later."
              onRetry={() => {
                // Refetch both data sources
                window.location.reload();
              }}
            />
          </div>
        </div>
      </footer>
    );
  }

  // Extract data with fallbacks
  const contactInfo = personalInfo || {};
  const firstName = contactInfo.firstName || 'Nitesh';
  const lastName = contactInfo.lastName || 'Nandan';
  const fullName = `${firstName} ${lastName}`;
  const bio = contactInfo.title || 'Backend Engineer & GenAI Expert at Wayfair, passionate about building highly scalable distributed systems and AI-powered solutions.';
  const email = contactInfo.email || 'niteshnitp5686@gmail.com';
  const phone = contactInfo.phone || '+91 9955328756';
  const location = contactInfo.location || 'Bengaluru, Karnataka, India';

  // Footer content with fallbacks
  const footer = footerContent || {
    quickLinksTitle: 'Quick Links',
    contactTitle: 'Get In Touch',
    copyrightText: 'All rights reserved.',
    quickLinks: [
      { label: 'Home', path: '/' },
      { label: 'My Projects', path: '/projects' },
      { label: 'Work Experience', path: '/experience' },
      { label: 'Contact', path: '/contact' }
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/niteshnandan',
      github: '#',
      twitter: '#',
      email: `mailto:${email}`
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
                {fullName}
              </h3>
              <p className="text-gray-300 leading-relaxed text-base lg:text-lg max-w-lg">
                {bio}
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {footer.socialLinks?.linkedin && (
                <a 
                  href={footer.socialLinks.linkedin} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white transition-all duration-300 p-2.5 rounded-lg hover:scale-105"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {footer.socialLinks?.github && (
                <a 
                  href={footer.socialLinks.github} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white transition-all duration-300 p-2.5 rounded-lg hover:scale-105"
                  title="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {footer.socialLinks?.twitter && (
                <a 
                  href={footer.socialLinks.twitter} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white transition-all duration-300 p-2.5 rounded-lg hover:scale-105"
                  title="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              <a 
                href={`mailto:${email}`} 
                className="bg-white/10 hover:bg-white/20 text-white transition-all duration-300 p-2.5 rounded-lg hover:scale-105"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {footer.quickLinksTitle}
            </h4>
            <ul className="space-y-3">
              {footer.quickLinks?.map((link, index) => (
                <li key={index}>
                  <Link href={link.path}>
                    <span className="text-gray-300 hover:text-white transition-colors duration-200 text-left w-full cursor-pointer block">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {footer.contactTitle}
            </h4>
            <div className="space-y-3">
              <a 
                href={`mailto:${email}`}
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
              >
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="break-all text-sm">{email}</span>
              </a>
              {phone && (
                <a 
                  href={`tel:${phone}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">{phone}</span>
                </a>
              )}
              {location && (
                <div className="text-gray-300 flex items-start">
                  <MapPin className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 {fullName}. {footer.copyrightText}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Built with ❤️</span>
              <span>React + TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
