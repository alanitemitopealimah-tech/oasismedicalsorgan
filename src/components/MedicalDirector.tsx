import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Award, Eye, Users, Target, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const MedicalDirector = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-20">
      <h3 className="text-3xl font-bold text-center mb-12">
        Meet Our <span className="text-primary">Medical Director</span>
      </h3>
      
      <Card className="overflow-hidden bg-gradient-to-br from-background to-primary/5 border-2 border-primary/10 shadow-xl">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Medical Director Image */}
            <div className="lg:col-span-2">
              <div className="relative h-full min-h-[600px]">
                <img 
                  src="/lovable-uploads/dr-timothy-olugbode.jpg" 
                  alt="Dr. Timothy Olayemi Olugbode - Medical Director and CEO of OASIS MEDICALS"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10"></div>
              </div>
            </div>
            
            {/* Medical Director Bio */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center lg:text-left">
                  <h4 className="text-3xl font-bold text-foreground mb-2">Dr. Timothy Olugbode (DFILLMD, MAMUPN, AMLSCN, MGMLD)</h4>
                  <p className="text-xl text-primary font-semibold">Medical Director & Chief Executive Officer</p>
                </div>
                
                {/* Preview Text */}
                <div className="text-muted-foreground leading-relaxed">
                  <p className="mb-4">
                    The Medical Director and Chief Executive Officer of O.A.S.I.S. MEDICALS, where he provides strategic leadership and drives the vision of delivering world-class, patient-centered healthcare services. With over a decade of professional experience as a Medical Laboratory Scientist and Medical Sonographer, he has built a strong reputation for excellence in medical diagnostics, imaging, and research.
                  </p>
                </div>

                {/* Expandable Content */}
                <div className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                  <div className="space-y-6 pt-2">
                    <div>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        He holds a professional certificate in Medical Laboratory Technology (MLT), Bachelor's degree in Medical Laboratory Science (BMLS) and a Master's degree in Medical Microbiology, which laid the foundation for his expertise in laboratory medicine, infectious disease management, and diagnostic microbiology. Expanding his professional competence into diagnostic imaging, he obtained Certificate in Obstetrics and Gynecology Medical Sonography from the Centre for Ultrasound and Research Education (CURE) at the Lagos University Teaching Hospital (LUTH) and Postgraduate Diploma in General Sonography from the Radiographers Registration Board of Nigeria (RRBN).
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Dr. Timothy Olugbode is a passionate researcher whose work integrates laboratory science and diagnostic imaging to improve patient outcomes and healthcare delivery. He is currently in the final stages of completing his PhD thesis, further cementing his role as an academic and professional authority in his field. In recognition of his outstanding contributions to medicine, diagnostics, and community healthcare, he has received an Honorary Doctorate degree along with numerous awards of recognition from professional and community-based organizations.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        As a healthcare leader, Dr. Timothy Olugbode combines clinical expertise, research-driven innovation, and visionary leadership to advance medical practice. At O.A.S.I.S. MEDICALS, he remains committed to delivering quality, accessible, and innovative healthcare solutions, while mentoring the next generation of healthcare professionals.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Read More/Less Button */}
                <div className="flex justify-center lg:justify-start">
                  <Button
                    onClick={toggleExpanded}
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        Read Less
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Read More
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalDirector;