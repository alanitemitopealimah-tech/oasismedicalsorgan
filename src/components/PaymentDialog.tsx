import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PaystackPayment from './PaystackPayment';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  servicePrice: number;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  serviceName,
  servicePrice,
}) => {
  const handleSuccess = (reference: string) => {
    console.log('Payment successful:', reference);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Medical Service</DialogTitle>
          <DialogDescription>
            Complete your payment to book this service
          </DialogDescription>
        </DialogHeader>
        <PaystackPayment
          serviceName={serviceName}
          servicePrice={servicePrice}
          onSuccess={handleSuccess}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;