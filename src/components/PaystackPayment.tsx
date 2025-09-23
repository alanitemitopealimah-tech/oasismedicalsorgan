import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Building2, Smartphone, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface PaystackPaymentProps {
  serviceName: string;
  servicePrice: number;
  onSuccess?: (reference: string) => void;
  onClose?: () => void;
}

const PaystackPayment: React.FC<PaystackPaymentProps> = ({
  serviceName,
  servicePrice,
  onSuccess,
  onClose
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('card');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: CreditCard,
      description: 'Pay with your debit or credit card'
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Transfer directly from your bank account'
    },
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'Pay with mobile money wallets'
    }
  ];

  const handlePayment = async (method: string) => {
    if (!user) {
      toast.error('Please login to make payment');
      return;
    }

    setLoading(true);
    
    try {
      // Check if Paystack is loaded
      if (!window.PaystackPop) {
        toast.error('Payment system not loaded. Please refresh the page.');
        setLoading(false);
        return;
      }

      // Create payment record in database
      const paymentData = {
        user_id: user.id,
        service_name: serviceName,
        service_price: servicePrice,
        payment_method: method,
        paystack_reference: `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending'
      };

      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert(paymentData)
        .select()
        .single();

      if (paymentError) {
        console.error('Payment creation error:', paymentError);
        toast.error('Failed to create payment record');
        setLoading(false);
        return;
      }

      // Configure channels - show all available payment methods
      let channels: string[] = ['card', 'bank', 'ussd', 'mobile_money', 'opay'];
      
      // Keep the same channels regardless of selected method to show all options
      // Paystack will handle the UI based on what's available for your account

      // Initialize Paystack payment
      const handler = window.PaystackPop.setup({
        key: 'pk_live_aaf0968d8bb41faadb8cbbb65f02a59e4f037e45',
        email: user.email,
        amount: servicePrice * 100, // Convert to kobo
        currency: 'NGN',
        ref: payment.paystack_reference,
        channels: channels,
        metadata: {
          service_name: serviceName,
          payment_id: payment.id,
          user_id: user.id
        },
        onSuccess: async (transaction: any) => {
          // Verify payment on server
          const { error: verifyError } = await supabase.functions.invoke('verify-payment', {
            body: { 
              reference: transaction.reference,
              payment_id: payment.id 
            }
          });

          if (verifyError) {
            console.error('Payment verification error:', verifyError);
            toast.error('Payment verification failed');
            return;
          }

          toast.success('Payment successful!');
          onSuccess?.(transaction.reference);
        },
        onCancel: () => {
          toast.info('Payment cancelled');
          onClose?.();
        }
      });

      handler.openIframe();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(`Payment initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Please login to make payment</p>
            <Button onClick={() => window.location.href = '/auth'}>
              Login to Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Complete Payment
        </CardTitle>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{serviceName}</p>
          <p className="text-2xl font-bold text-primary">₦{servicePrice.toLocaleString()}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium">Select Payment Method</h4>
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{method.name}</span>
                      {method.id === 'card' && (
                        <Badge variant="secondary" className="text-xs">
                          Instant
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === method.id
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {selectedMethod === method.id && (
                      <div className="w-full h-full rounded-full bg-background scale-50" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          onClick={() => handlePayment(selectedMethod)}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CreditCard className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Processing...' : `Pay ₦${servicePrice.toLocaleString()}`}
        </Button>

        <div className="text-center text-xs text-muted-foreground">
          <p>Secured by Paystack • Your payment information is encrypted</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaystackPayment;