import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Work Experience' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b-2 border-border/40 shadow-lg shadow-black/10 z-50 transition-all duration-300">
      <div className="container-width">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors">
                Nitesh Nandan
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-10">
              {navItems.map(item => (
                <Link key={item.path} href={item.path}>
                  <span
                    className={`relative font-semibold text-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                      location === item.path 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {location === item.path && (
                      <div className="absolute -bottom-2 left-0 right-0 h-px bg-primary rounded-full transition-all duration-300" />
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 h-12 w-12"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t-2 border-border/40 shadow-lg animate-fade-in">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <Link key={item.path} href={item.path}>
                <span
                  className={`block w-full text-left px-4 py-4 font-semibold text-lg rounded-lg transition-all duration-300 cursor-pointer ${
                    location === item.path 
                      ? 'text-primary bg-primary/15 border border-primary/30' 
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
