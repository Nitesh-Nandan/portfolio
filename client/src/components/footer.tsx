import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { usePersonalInfo, useFooterContent } from "@/hooks/use-data-queries";

export default function Footer() {
  const { data: personalInfo, loading: personalInfoLoading, error: personalInfoError } = usePersonalInfo();
  const { data: footerContent, isLoading: footerContentLoading, error: footerContentError } = useFooterContent();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show loading state while fetching data
  const isLoading = personalInfoLoading || footerContentLoading;
  if (isLoading) {
    return (
      <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-300">
            Loading footer content...
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
            Unable to load footer content. Please try again later.
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
  const bio = contactInfo.bio || 'Backend Engineer & GenAI Expert at Wayfair, passionate about building highly scalable distributed systems and AI-powered solutions.';
  const email = contactInfo.email || 'niteshnitp5686@gmail.com';
  const phone = contactInfo.phone || '+91 9955328756';
  const location = contactInfo.location || 'Bengaluru, Karnataka, India';

  // Footer content with fallbacks
  const footer = footerContent || {
    quickLinksTitle: 'Quick Links',
    contactTitle: 'Get In Touch',
    copyrightText: 'All rights reserved.',
    quickLinks: [
      { label: 'Home', sectionId: 'home' },
      { label: 'My Projects', sectionId: 'projects' },
      { label: 'BookShelf', sectionId: 'bookshelf' },
      { label: 'Contact', sectionId: 'contact' }
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/niteshnandan',
      github: '#',
      twitter: '#',
      email: `mailto:${email}`
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">{fullName}</h3>
            <p className="text-gray-300 mb-4">
              {bio}
            </p>
            <div className="flex space-x-4">
              {footer.socialLinks?.linkedin && (
                <a 
                  href={footer.socialLinks.linkedin} 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  title="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
              {footer.socialLinks?.github && (
                <a 
                  href={footer.socialLinks.github} 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  title="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}
              {footer.socialLinks?.twitter && (
                <a 
                  href={footer.socialLinks.twitter} 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  title="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              )}
              <a 
                href={`mailto:${email}`} 
                className="text-gray-300 hover:text-white transition-colors duration-200"
                title="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{footer.quickLinksTitle}</h4>
            <ul className="space-y-2">
              {footer.quickLinks?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{footer.contactTitle}</h4>
            <div className="space-y-2">
              <p className="text-gray-300 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {email}
              </p>
              {phone && (
                <p className="text-gray-300 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {phone}
                </p>
              )}
              {location && (
                <p className="text-gray-300 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {location}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 {fullName}. {footer.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
