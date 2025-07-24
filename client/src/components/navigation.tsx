import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { NAVIGATION, UI, COLORS } from "@/lib/constants";

/**
 * Navigation Component
 * Responsive navigation bar with mobile menu support
 */
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b-2 border-border/40 shadow-lg shadow-black/10 z-50 transition-all duration-300">
      <div className={NAVIGATION.CONTAINER_WIDTH}>
        <div className="flex justify-between items-center h-20">
          {/* Brand/Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors">
                {NAVIGATION.BRAND_NAME}
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-10">
              {NAVIGATION.ITEMS.map(item => (
                <NavigationItem 
                  key={item.path} 
                  item={item} 
                  isActive={location === item.path}
                  onClick={closeMenu}
                />
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
        <MobileMenu 
          items={[...NAVIGATION.ITEMS]} 
          currentLocation={location}
          onItemClick={closeMenu}
        />
      )}
    </nav>
  );
}

/**
 * Navigation Item Component
 */
interface NavigationItemProps {
  item: { path: string; label: string };
  isActive: boolean;
  onClick: () => void;
}

function NavigationItem({ item, isActive, onClick }: NavigationItemProps) {
  return (
    <Link href={item.path}>
      <span
        className={`relative font-semibold text-lg transition-all duration-${UI.ANIMATION_DURATION} hover:scale-${UI.HOVER_SCALE} cursor-pointer ${
          isActive 
            ? 'text-primary' 
            : 'text-foreground hover:text-primary'
        }`}
        onClick={onClick}
      >
        {item.label}
        {isActive && (
          <div className="absolute -bottom-2 left-0 right-0 h-px bg-primary rounded-full transition-all duration-300" />
        )}
      </span>
    </Link>
  );
}

/**
 * Mobile Menu Component
 */
interface MobileMenuProps {
  items: Array<{ path: string; label: string }>;
  currentLocation: string;
  onItemClick: () => void;
}

function MobileMenu({ items, currentLocation, onItemClick }: MobileMenuProps) {
  return (
    <div className="md:hidden bg-white/98 backdrop-blur-xl border-t-2 border-border/40 shadow-lg animate-fade-in">
      <div className="px-4 pt-2 pb-3 space-y-1">
        {items.map(item => (
          <Link key={item.path} href={item.path}>
            <span
              className={`block w-full text-left px-4 py-4 font-semibold text-lg rounded-lg transition-all duration-300 cursor-pointer ${
                currentLocation === item.path 
                  ? 'text-primary bg-primary/15 border border-primary/30' 
                  : 'text-foreground hover:text-primary hover:bg-primary/10'
              }`}
              onClick={onItemClick}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
