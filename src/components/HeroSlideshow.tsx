import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Calendar, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
// Using client's professional medical facility photos
const heroImage = "/lovable-uploads/4cf12c56-a1eb-44b5-a99a-2518e2e2faa6.png";
const slideUltrasound = "/lovable-uploads/6012a936-a727-4f53-844d-5db87131386b.png";  
const slideLaboratory = "/lovable-uploads/8960ec25-3a43-493a-8dd2-da5b605beca0.png";
const slideXray = "/lovable-uploads/a8f39a80-491f-4105-ba93-59e1e8e84f10.png";

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      image: heroImage,
      title: "Your Health is our concern.",
      subtitle: "Professional diagnostic services with state-of-the-art equipment",
      cta: "Book a Test Now"
    },
    {
      image: slideUltrasound,
      title: "Advanced Ultrasound Imaging",
      subtitle: "Comprehensive scans from ₦2,500 - Expert sonographers available 24/7",
      cta: "View Ultrasound Services"
    },
    {
      image: slideLaboratory,
      title: "Complete Laboratory Services",
      subtitle: "Accurate diagnostics with same-day results - Over 100+ tests available",
      cta: "Explore Lab Tests"
    },
    {
      image: slideXray,
      title: "Digital X-Ray & ECG",
      subtitle: "Modern imaging technology with detailed radiological reports",
      cta: "Learn More"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const openWhatsApp = () => {
    window.open('https://wa.me/2348058135226', '_blank');
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 sm:pt-20 overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          <div className="space-y-6 sm:space-y-8 text-white max-w-4xl w-full">
            <div className="space-y-4 sm:space-y-6">
              {/* Logo - Responsive sizing */}
              <div className="mb-4 sm:mb-8 mt-2 sm:mt-4">
                <div className="relative inline-block">
                  <img 
                    src="/lovable-uploads/fc70eb34-882e-4a20-9da3-39a20773fb7c.png" 
                    alt="O.A.S.I.S MEDICALS" 
                    className="h-32 sm:h-40 md:h-56 lg:h-64 xl:h-72 mx-auto mb-2 sm:mb-4 animate-fade-in hover:animate-premium-spin transition-all duration-300 filter drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-medical-cyan/20 to-medical-magenta/20 opacity-0 hover:opacity-100 transition-opacity duration-300 animate-premium-glow"></div>
                </div>
              </div>
              
              {/* Title - Responsive typography */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-2">
                <span className="text-white">{slides[currentSlide].title.split(' ').slice(0, -3).join(' ')} </span>
                <span className="bg-gradient-to-r from-medical-cyan to-medical-magenta bg-clip-text text-transparent">
                  {slides[currentSlide].title.split(' ').slice(-3).join(' ')}
                </span>
              </h1>
              
              {/* Subtitle - Responsive typography */}
              <p className="text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto px-4">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* Action buttons - Responsive layout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button 
                onClick={openWhatsApp}
                size="lg" 
                className="bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6 w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {slides[currentSlide].cta}
              </Button>
              <Button 
                onClick={scrollToServices}
                variant="outline" 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">View All </span>Services
              </Button>
            </div>

            {/* Stats cards - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 max-w-3xl mx-auto px-4">
              <Card className="p-4 sm:p-6 text-center border border-white/20 bg-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">10,000+</div>
                <div className="text-xs sm:text-sm text-white/80">Tests Conducted</div>
              </Card>
              <Card className="p-4 sm:p-6 text-center border border-white/20 bg-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Available</div>
                <div className="text-xs sm:text-sm text-white/80">During Working Hours</div>
              </Card>
              <Card className="p-4 sm:p-6 text-center border border-white/20 bg-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-sm text-white/80">Trusted Results</div>
              </Card>
            </div>
          </div>

          {/* Slideshow Controls - Responsive layout */}
          <div className="space-y-4 sm:space-y-6 px-4">
            {/* Navigation Buttons */}
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary w-10 h-10 sm:w-12 sm:h-12"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              
              <Button
                onClick={togglePlayPause}
                variant="outline"
                size="icon"
                className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary w-10 h-10 sm:w-12 sm:h-12"
              >
                {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
              </Button>
              
              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary w-10 h-10 sm:w-12 sm:h-12"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-medical-cyan to-medical-magenta' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Slide Info - Hidden on very small screens */}
            <Card className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm border border-white/20 hidden xs:block">
              <div className="text-center text-white">
                <div className="text-xs sm:text-sm opacity-80 mb-1">
                  Slide {currentSlide + 1} of {slides.length}
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {slides[currentSlide].title.split(' ').slice(0, 2).join(' ')}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlideshow;