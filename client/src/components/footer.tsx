import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">John Doe</h3>
            <p className="text-gray-300 mb-4">
              Full-Stack Developer & UI/UX Designer passionate about creating beautiful, functional digital experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  My Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('bookshelf')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  BookShelf
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2">
              <p className="text-gray-300 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                john.doe@example.com
              </p>
              <p className="text-gray-300 flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </p>
              <p className="text-gray-300 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                San Francisco, CA
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 John Doe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
