import { Card, CardContent } from "@/components/ui/card";
import { MapPin, AlertCircle } from "lucide-react";

const CallToNotice = () => {
  return (
    <section className="py-12 bg-secondary/10">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-2 border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-bold text-foreground">Important Notice</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-accent">👉</span> <em className="font-medium">Please note: If you would like our team to collect samples from your home, office, or any other location, there will be an extra charge. Charges are determined by distance and will be discussed in person before confirmation.</em>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToNotice;