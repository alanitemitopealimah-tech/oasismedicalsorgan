import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, MessageCircle, Mail, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/2348058135226', '_blank');
  };

  const makeCall = () => {
    window.open('tel:+2348058135226', '_self');
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    "Ultrasound Scans",
    "Laboratory Tests", 
    "ECG Services",
    "X-Ray Imaging"
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-accent/5 border-t">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/lovable-uploads/fc70eb34-882e-4a20-9da3-39a20773fb7c.png" 
                alt="O.A.S.I.S MEDICALS" 
                className="h-8 sm:h-12 w-auto hover-scale"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-xl font-bold text-foreground break-words">O.A.S.I.S. MEDICALS</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">...Your Health is our concern.</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Professional diagnostic services with state-of-the-art equipment and experienced medical professionals. 
              Trusted by healthcare providers across Ogun & Lagos.
            </p>
            <div className="flex space-x-2 sm:space-x-3">
              <Button onClick={makeCall} size="sm" variant="outline" className="text-xs sm:text-sm">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button onClick={openWhatsApp} size="sm" className="bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90 text-xs sm:text-sm">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-center text-muted-foreground">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-medical-cyan to-medical-magenta rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base break-words">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">Contact Information</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-muted-foreground text-sm sm:text-base break-words">Lagos/Abeokuta Expressway, Iyana Ilogbo Bus Stop, Ifo LGA, Ogun State</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Nigeria</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-muted-foreground text-sm sm:text-base">08058135226</p>
                  <p className="text-muted-foreground text-sm sm:text-base">07033600770</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm sm:text-base">24/7 WhatsApp Support</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
            <span className="text-xs sm:text-sm text-center sm:text-left">© 2024 O.A.S.I.S. MEDICALS. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Patient Rights</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;