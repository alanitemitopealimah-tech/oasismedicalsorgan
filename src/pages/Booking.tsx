import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName, servicePrice } = location.state || {};

  // Redirect to home if no service data
  if (!serviceName || !servicePrice) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Book Your Appointment
              </h1>
              <div className="bg-card p-6 rounded-lg shadow-md border mb-6">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {serviceName}
                </h2>
                <p className="text-2xl font-bold text-primary">
                  ₦{servicePrice.toLocaleString()}
                </p>
              </div>
              <p className="text-muted-foreground">
                Please fill in your details to secure your booking before making payment. 
                This helps us confirm and serve you better.
              </p>
            </div>
            
            <BookingForm 
              serviceName={serviceName}
              servicePrice={servicePrice}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;