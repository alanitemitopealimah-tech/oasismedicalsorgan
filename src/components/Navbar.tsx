import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigationWithLoading } from "@/hooks/useNavigationWithLoading";
import { useState } from "react";
import PremiumLoadingScreen from "./PremiumLoadingScreen";

const Navbar = () => {
  const { user } = useAuth();
  const { navigateWithLoading, isNavigating, targetSection } = useNavigationWithLoading();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openWhatsApp = () => {
    window.open('https://wa.me/2348058135226', '_blank');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path: string, section: string) => {
    navigateWithLoading(path, section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo - Responsive sizing */}
          <button 
            onClick={() => handleNavigation('/', 'Home')}
            className="flex items-center space-x-2 sm:space-x-3 group"
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/fc70eb34-882e-4a20-9da3-39a20773fb7c.png" 
                alt="O.A.S.I.S MEDICALS" 
                className="h-8 sm:h-10 w-auto transition-transform duration-300 group-hover:animate-logo-spin filter drop-shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-medical-cyan/20 to-medical-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">O.A.S.I.S. MEDICALS</h1>
              <p className="text-xs text-muted-foreground hidden md:block">...Your Health is our concern.</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/', 'Home')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/services', 'Services')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('/pricing', 'Pricing')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavigation('/about', 'About')}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('/contact', 'Contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavigation('/gallery', 'Gallery')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Gallery
            </button>
          </div>

          {/* Mobile & Desktop Actions */}
          <div className="flex items-center space-x-2">
            {/* Desktop Call Button */}
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Phone className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Call Now</span>
            </Button>
            
            {/* User Actions */}
            {user ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('/dashboard', 'Dashboard')}
                  className="hidden sm:flex"
                >
                  Dashboard
                </Button>
                <Button onClick={openWhatsApp} size="sm" className="bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90">
                  <MessageCircle className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Book Test</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('/auth', 'Patient Login')}
                  className="hidden sm:flex"
                >
                  Patient Login
                </Button>
                <Button onClick={openWhatsApp} size="sm" className="bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90">
                  <MessageCircle className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Book Test</span>
                </Button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMobileMenu}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-sm border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <button 
                onClick={() => handleNavigation('/', 'Home')}
                className="block w-full text-left py-2 px-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('/services', 'Services')}
                className="block w-full text-left py-2 px-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => handleNavigation('/pricing', 'Pricing')}
                className="block w-full text-left py-2 px-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavigation('/about', 'About')}
                className="block w-full text-left py-2 px-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('/contact', 'Contact')}
                className="block w-full text-left py-2 px-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              >
                Contact
              </button>
              <button 
                onClick={() => handleNavigation('/gallery', 'Gallery')}
                className="block w-full text-left py-2 px-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              >
                Gallery
              </button>
              
              {/* Mobile-only actions */}
              <div className="pt-3 border-t border-border space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open('tel:+2348058135226', '_self')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                {user ? (
                  <Button 
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleNavigation('/dashboard', 'Dashboard')}
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleNavigation('/auth', 'Patient Login')}
                  >
                    Patient Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <PremiumLoadingScreen 
        isVisible={isNavigating}
        message={`Navigating to ${targetSection}`}
      />
    </>
  );
};

export default Navbar;