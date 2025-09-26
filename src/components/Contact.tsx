import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, MessageCircle, Clock, Navigation } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    testType: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Center",
      details: ["Lagos/Abeokuta Expressway, Iyana Ilogbo Bus Stop", "Ifo LGA, Ogun State"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["08058135226", "07033600770"],
      action: "Call Now"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["Quick booking", "Instant responses"],
      action: "Chat Now"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon-Fri: 7:30am-7:30pm, Sat: 8:00am-7:00pm", "Sun: 1:00pm-6:00pm, Holidays: 9:00am-5:00pm"],
      action: "Book Now"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.fullName || !formData.phone || !formData.testType) {
        toast({
          title: "Missing Information",
          description: "Please fill in your name, phone number, and test type.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Send email via edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      // Reset form and show success message
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        testType: '',
        preferredDate: '',
        preferredTime: '',
        notes: ''
      });

      toast({
        title: "Booking Request Sent!",
        description: "Your message has been sent to OASIS Medical Center. We'll contact you within 30 minutes to confirm your appointment.",
      });

    } catch (error) {
      console.error('Error sending contact form:', error);
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again or contact us directly at 08058135226.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/2348058135226', '_blank');
  };

  const makeCall = () => {
    window.open('tel:+2348058135226', '_self');
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Contact <span className="bg-gradient-to-r from-medical-cyan to-medical-magenta bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Ready to book your test? Get in touch with us for professional diagnostic services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const handleAction = () => {
                if (info.title === "WhatsApp") openWhatsApp();
                else if (info.title === "Call Us") makeCall();
                else if (info.title === "Visit Our Center") {
                  window.open('https://maps.google.com', '_blank');
                }
              };

              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-medical-cyan to-medical-magenta rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-xs sm:text-sm text-muted-foreground break-words">{detail}</p>
                        ))}
                        <Button 
                          onClick={handleAction}
                          variant="outline" 
                          size="sm" 
                          className="mt-3 text-primary border-primary hover:bg-primary hover:text-white text-xs sm:text-sm"
                        >
                          {info.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-2 border-primary/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl flex items-center">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-primary" />
                  Book Your Test Online
                </CardTitle>
                <p className="text-muted-foreground text-sm sm:text-base">Fill out this form and we'll contact you to confirm your appointment</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="fullName" className="text-xs sm:text-sm">Full Name *</Label>
                      <Input 
                        id="fullName" 
                        placeholder="Enter your full name" 
                        required 
                        className="text-sm sm:text-base"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="phone" className="text-xs sm:text-sm">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="08012345678" 
                        required 
                        className="text-sm sm:text-base"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="text-sm sm:text-base"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="testType" className="text-xs sm:text-sm">Test Type *</Label>
                    <Select 
                      required
                      value={formData.testType}
                      onValueChange={(value) => setFormData({...formData, testType: value})}
                    >
                      <SelectTrigger className="text-sm sm:text-base">
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-lg z-50">
                        <SelectItem value="ultrasound">Ultrasound Scans</SelectItem>
                        <SelectItem value="laboratory">Laboratory Tests</SelectItem>
                        <SelectItem value="fever">Fever Packages</SelectItem>
                        <SelectItem value="fullbody">Full Body Checkup</SelectItem>
                        <SelectItem value="fertility">Fertility/Hormonal Tests</SelectItem>
                        <SelectItem value="premarital">Pre-marital Screening</SelectItem>
                        <SelectItem value="domestic">Domestic Staff Screening</SelectItem>
                        <SelectItem value="ecg">ECG Services</SelectItem>
                        <SelectItem value="xray">X-Ray Imaging</SelectItem>
                        <SelectItem value="multiple">Multiple Tests</SelectItem>
                        <SelectItem value="other">Other (Specify in notes)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="preferredDate" className="text-xs sm:text-sm">Preferred Date</Label>
                      <Input 
                        id="preferredDate" 
                        type="date" 
                        className="text-sm sm:text-base"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="preferredTime" className="text-xs sm:text-sm">Preferred Time</Label>
                      <Select
                        value={formData.preferredTime}
                        onValueChange={(value) => setFormData({...formData, preferredTime: value})}
                      >
                        <SelectTrigger className="text-sm sm:text-base">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                          <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="notes" className="text-xs sm:text-sm">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Any specific requirements or questions..."
                      rows={3}
                      className="text-sm sm:text-base"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90 text-sm sm:text-base py-2.5 sm:py-3"
                    >
                      {isSubmitting ? "Sending..." : "Book Appointment"}
                      <Navigation className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                    </Button>
                    <Button 
                      type="button"
                      onClick={openWhatsApp}
                      variant="outline" 
                      className="flex-1 text-sm sm:text-base py-2.5 sm:py-3"
                    >
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Quick WhatsApp
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Section - Responsive layout */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-48 sm:h-64 lg:h-80">
              <img 
                src="/lovable-uploads/8047a331-d422-41ec-9a8a-ca357f059dd9.png" 
                alt="OASIS Medical Center building exterior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                <div className="text-center text-white">
                  <MapPin className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4" />
                  <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Visit Our Diagnostic Center</h3>
                  <p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-base">Located in Ifo, Ogun State</p>
                  <Button 
                    onClick={() => window.open('https://maps.app.goo.gl/QLUwoTxUVJYSWKRdA', '_blank')}
                    className="bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;