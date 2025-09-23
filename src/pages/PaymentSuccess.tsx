import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName, servicePrice, customerData, reference } = location.state || {};

  useEffect(() => {
    // Redirect to home if no data
    if (!serviceName || !servicePrice || !customerData || !reference) {
      navigate('/');
    }
  }, [serviceName, servicePrice, customerData, reference, navigate]);

  if (!serviceName || !servicePrice || !customerData || !reference) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-600">
                  Payment Successful!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Your booking has been confirmed. We have sent the details to our clinic.
                </p>
                
                <div className="bg-muted p-6 rounded-lg text-left space-y-3">
                  <h3 className="font-semibold text-lg">Booking Details:</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Service:</strong> {serviceName}</p>
                    <p><strong>Amount Paid:</strong> ₦{servicePrice.toLocaleString()}</p>
                    <p><strong>Reference:</strong> {reference}</p>
                    <p><strong>Customer:</strong> {customerData.fullName}</p>
                    <p><strong>Email:</strong> {customerData.email}</p>
                    <p><strong>Phone:</strong> {customerData.phoneNumber}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-left">
                  <h4 className="font-semibold text-blue-800 mb-2">What's Next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• We will contact you within 24 hours to confirm your appointment</li>
                    <li>• Please keep your reference number for our records</li>
                    <li>• Bring a valid ID when you visit our clinic</li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/')} variant="default">
                    Back to Home
                  </Button>
                  <Button onClick={() => navigate('/contact')} variant="outline">
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;