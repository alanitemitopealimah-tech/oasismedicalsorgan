import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, TestTube, Activity, X, ArrowRight, Star, Users, Thermometer, UserCheck, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const services = [
    {
      icon: Heart,
      title: "Ultrasound Scans",
      description: "Advanced ultrasound imaging for comprehensive diagnostic assessment",
      features: ["Pelvic & Obstetrics", "Abdominal Scans", "Breast Ultrasound", "Thyroid Scan"],
      priceRange: "₦2,500 - ₦50,000",
      popular: true
    },
    {
      icon: TestTube,
      title: "Laboratory Tests",
      description: "Complete laboratory services with accurate and timely results",
      features: ["Blood Chemistry", "Microbiology", "Hormonal Profiles", "Histology"],
      priceRange: "Varies by test",
      popular: false
    },
    {
      icon: Thermometer,
      title: "Fever Packages",
      description: "Know the cause of your reoccurring fever and get proper treatment",
      features: ["Basic Package", "Standard Package", "Malaria Testing", "Typhoid Testing"],
      priceRange: "₦15,000 - ₦30,000",
      popular: true
    },
    {
      icon: Users,
      title: "Full Body Checkup",
      description: "Comprehensive health screening for men and women",
      features: ["Opal Package", "Ruby Package", "Diamond Package", "Complete Health Assessment"],
      priceRange: "₦45,000 - ₦200,000",
      popular: true
    },
    {
      icon: Heart,
      title: "Fertility/Hormonal Tests",
      description: "Know, track and understand your fertility status",
      features: ["Basic Testing", "Standard Testing", "Comprehensive Testing", "Hormone Profiling"],
      priceRange: "₦15,000 - ₦150,000",
      popular: false
    },
    {
      icon: UserCheck,
      title: "Pre-marital Screening",
      description: "Essential health evaluations before your wedding day",
      features: ["Basic Testing", "Standard Testing", "Comprehensive Testing", "Genotype Testing"],
      priceRange: "₦12,000 - ₦120,000",
      popular: false
    },
    {
      icon: Stethoscope,
      title: "Domestic Staff Screening",
      description: "Health screening for household employees",
      features: ["Basic Package", "Standard Package", "HIV Testing", "Hepatitis Screening"],
      priceRange: "₦20,000 - ₦30,000",
      popular: false
    },
    {
      icon: Activity,
      title: "ECG Services",
      description: "Electrocardiogram testing for heart health assessment",
      features: ["Pre & Post Exercise", "Heart Monitoring", "Cardiac Assessment", "Professional Reports"],
      priceRange: "₦12,000",
      popular: false
    },
    {
      icon: X,
      title: "X-Ray Imaging",
      description: "Digital X-ray services with detailed reporting",
      features: ["Head & Neck", "Chest & Abdomen", "Limbs & Joints", "Special Investigations"],
      priceRange: "Varies by area",
      popular: false
    }
  ];

  const handleBookNow = (serviceName: string, priceRange: string) => {
    // Extract a reasonable base price from the price range for payment
    let servicePrice = 0;
    if (priceRange.includes('₦')) {
      const numbers = priceRange.match(/₦[\d,]+/g);
      if (numbers && numbers.length > 0) {
        // Take the first price as the base price
        servicePrice = parseInt(numbers[0].replace('₦', '').replace(/,/g, ''));
      }
    }
    
    navigate('/booking', {
      state: {
        serviceName,
        servicePrice: servicePrice || 10000, // Default fallback price
      },
    });
  };

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Our <span className="bg-gradient-to-r from-medical-cyan to-medical-magenta bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Comprehensive diagnostic services with state-of-the-art equipment and experienced medical professionals
          </p>
          
          {/* Service Information Images - Responsive layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8">
            <Card className="overflow-hidden">
              <img 
                src="/lovable-uploads/4d43166a-faad-4a5e-a548-255e51070483.png" 
                alt="Laboratory technician using microscope at OASIS Medical Center"
                className="w-full h-36 sm:h-48 object-cover"
              />
            </Card>
            <Card className="overflow-hidden">
              <img 
                src="/lovable-uploads/3f2ea8ce-8e6d-4383-9fce-900ffef57f89.png" 
                alt="Patient consultation and service at OASIS Medical Center reception"
                className="w-full h-36 sm:h-48 object-cover"
              />
            </Card>
          </div>
        </div>

        {/* Services Grid - Responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                {service.popular && (
                  <Badge className="absolute -top-2 sm:-top-3 left-2 sm:left-4 bg-gradient-to-r from-medical-cyan to-medical-magenta text-white text-xs sm:text-sm">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-medical-cyan to-medical-magenta rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl mb-2">{service.title}</CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">{service.description}</p>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  <div className="space-y-1 sm:space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs sm:text-sm">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-medical-cyan to-medical-magenta rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                        <span className="break-words">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-3 sm:pt-4 border-t">
                    <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Starting from</div>
                    <div className="text-base sm:text-lg font-bold text-primary mb-3 sm:mb-4">{service.priceRange}</div>
                    <Button 
                      onClick={() => handleBookNow(service.title, service.priceRange)}
                      className="w-full bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90 text-sm sm:text-base py-2 sm:py-3"
                    >
                      Book Now
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section - Responsive layout */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto p-4 sm:p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 items-center">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">Same Day</div>
                <div className="text-sm sm:text-base text-muted-foreground">Results Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1 sm:mb-2">Expert</div>
                <div className="text-sm sm:text-base text-muted-foreground">Medical Team</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-success mb-1 sm:mb-2">Accurate</div>
                <div className="text-sm sm:text-base text-muted-foreground">Diagnostics</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;