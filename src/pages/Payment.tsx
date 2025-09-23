import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaystackPayment from '@/components/PaystackPayment';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName, servicePrice, customerData } = location.state || {};

  // Redirect to home if no service data or customer data
  if (!serviceName || !servicePrice || !customerData) {
    navigate('/');
    return null;
  }

  const handleSuccess = (reference: string) => {
    console.log('Payment successful:', reference);
    navigate('/payment-success', {
      state: {
        serviceName,
        servicePrice,
        customerData,
        reference,
      },
    });
  };

  const handleClose = () => {
    navigate('/booking', {
      state: { serviceName, servicePrice },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Complete Your Payment
              </h1>
              <div className="bg-card p-6 rounded-lg shadow-md border mb-6">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {serviceName}
                </h2>
                <p className="text-2xl font-bold text-primary mb-4">
                  ₦{servicePrice.toLocaleString()}
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Customer:</strong> {customerData.fullName}</p>
                  <p><strong>Email:</strong> {customerData.email}</p>
                  <p><strong>Phone:</strong> {customerData.phoneNumber}</p>
                </div>
              </div>
            </div>
            
            <PaystackPayment
              serviceName={serviceName}
              servicePrice={servicePrice}
              onSuccess={handleSuccess}
              onClose={handleClose}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;