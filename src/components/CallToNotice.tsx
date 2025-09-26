import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle, MessageCircle } from "lucide-react";

const CallToNotice = () => {
  return (
    <section className="py-12 bg-secondary/10">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-2 border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5 shadow-lg">
          <CardContent className="p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex-shrink-0 self-center sm:self-start">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">Important Notice</h3>
                </div>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  <span className="font-semibold text-accent">👉</span> <em className="font-medium">Please note: If you would like our team to collect samples from your home, office, or any other location, there will be an extra charge. Charges are determined by distance and will be discussed in person before confirmation.</em>
                </p>
                <Button 
                  onClick={() => window.open('https://wa.me/2347033600770', '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  👉 Contact Us on WhatsApp to Discuss Charges
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToNotice;