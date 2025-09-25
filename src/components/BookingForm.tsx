import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Test categories and tests data
const TEST_CATEGORIES = {
  'Fever Package': [
    { name: 'Malaria Parasite', price: 1500 },
    { name: 'Widal Test', price: 2000 },
    { name: 'Full Blood Count', price: 3000 },
    { name: 'Typhoid Test', price: 1800 }
  ],
  'Men\'s Health': [
    { name: 'PSA Test', price: 8000 },
    { name: 'Testosterone Level', price: 12000 },
    { name: 'Lipid Profile', price: 5000 },
    { name: 'Liver Function Test', price: 6000 }
  ],
  'Women\'s Health': [
    { name: 'Pregnancy Test', price: 1000 },
    { name: 'Pap Smear', price: 8000 },
    { name: 'Breast Cancer Screening', price: 15000 },
    { name: 'Hormonal Profile', price: 18000 }
  ],
  'Ultrasound': [
    { name: 'Abdominal Ultrasound', price: 8000 },
    { name: 'Pelvic Ultrasound', price: 10000 },
    { name: 'Pregnancy Ultrasound', price: 12000 },
    { name: 'Breast Ultrasound', price: 15000 }
  ],
  'ECG': [
    { name: 'Resting ECG', price: 5000 },
    { name: '24-Hour Holter Monitor', price: 25000 },
    { name: 'Stress ECG', price: 15000 }
  ],
  'X-Ray': [
    { name: 'Chest X-Ray', price: 4000 },
    { name: 'Abdominal X-Ray', price: 5000 },
    { name: 'Bone X-Ray', price: 6000 },
    { name: 'Dental X-Ray', price: 3000 }
  ],
  'Blood Chemistry': [
    { name: 'Blood Sugar (Fasting)', price: 1500 },
    { name: 'Blood Sugar (Random)', price: 1200 },
    { name: 'Creatinine', price: 2000 },
    { name: 'Urea', price: 1800 },
    { name: 'Electrolytes', price: 4500 }
  ]
};

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  homeAddress: z.string().min(5, 'Please enter your home address'),
  state: z.string().min(2, 'Please enter your state'),
  selectedTests: z.array(z.object({
    name: z.string(),
    price: z.number(),
    category: z.string()
  })).min(1, 'Please select at least one test'),
});

type FormData = z.infer<typeof formSchema>;

interface BookingFormProps {
  serviceName?: string;
  servicePrice?: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ serviceName, servicePrice }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTests, setSelectedTests] = useState<Array<{name: string, price: number, category: string}>>([]);
  const [totalCost, setTotalCost] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      homeAddress: '',
      state: '',
      selectedTests: [],
    },
  });

  // Calculate total cost whenever selected tests change
  useEffect(() => {
    const total = selectedTests.reduce((sum, test) => sum + test.price, 0);
    setTotalCost(total);
    form.setValue('selectedTests', selectedTests);
  }, [selectedTests, form]);

  const handleTestSelection = (test: {name: string, price: number}, category: string, checked: boolean) => {
    if (checked) {
      setSelectedTests(prev => [...prev, { ...test, category }]);
    } else {
      setSelectedTests(prev => prev.filter(t => t.name !== test.name));
    }
  };

  const isTestSelected = (testName: string) => {
    return selectedTests.some(test => test.name === testName);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-booking-notification', {
        body: {
          customerData: {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            homeAddress: data.homeAddress,
            state: data.state,
          },
          selectedTests: data.selectedTests,
          totalCost,
        },
      });

      if (emailError) {
        console.error('Email error:', emailError);
        toast.error('Failed to send booking notification. Please try again.');
        return;
      }

      toast.success('Booking details submitted successfully!');
      
      // Navigate to payment with all the data
      navigate('/payment', {
        state: {
          serviceName: 'Medical Tests',
          servicePrice: totalCost,
          customerData: data,
          selectedTests: data.selectedTests,
          totalCost,
        },
      });
    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="homeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your home address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* Test Selection Card */}
      <Card>
        <CardHeader>
          <CardTitle>Select Medical Tests</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose the tests you need from the categories below. You can select multiple tests.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="space-y-8">
              {Object.entries(TEST_CATEGORIES).map(([category, tests]) => (
                <div key={category} className="space-y-4">
                  <h3 className="font-semibold text-lg text-primary">{category}</h3>
                  <div className="grid gap-3">
                    {tests.map((test) => (
                      <div key={test.name} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/5">
                        <Checkbox
                          id={test.name}
                          checked={isTestSelected(test.name)}
                          onCheckedChange={(checked) => 
                            handleTestSelection(test, category, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={test.name}
                          className="flex-1 flex justify-between items-center cursor-pointer"
                        >
                          <span className="font-medium">{test.name}</span>
                          <span className="font-bold text-primary">₦{test.price.toLocaleString()}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <Separator />
                </div>
              ))}
              
              {/* Selected Tests Summary */}
              {selectedTests.length > 0 && (
                <div className="p-4 bg-primary/5 border-2 border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-3">Selected Tests Summary</h4>
                  <div className="space-y-2 mb-4">
                    {selectedTests.map((test, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{test.name} ({test.category})</span>
                        <span className="font-medium">₦{test.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Cost:</span>
                    <span className="text-2xl font-bold text-primary">₦{totalCost.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Form Validation Message */}
              <FormField
                control={form.control}
                name="selectedTests"
                render={() => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || selectedTests.length === 0}
                onClick={form.handleSubmit(onSubmit)}
              >
                {isSubmitting ? 'Processing...' : `Continue to Payment - ₦${totalCost.toLocaleString()}`}
              </Button>
              
              {/* Call-to-notice for sample collection */}
              <div className="flex items-start space-x-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="text-accent">⚠️</span>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Sample collection at home or office attracts an extra charge based on distance. This will be discussed with you before confirmation.
                </p>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;