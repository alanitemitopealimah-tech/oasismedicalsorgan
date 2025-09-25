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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ChevronDown } from 'lucide-react';

// Test categories and tests data - Matching exactly with official price list
const TEST_CATEGORIES = {
  'Fever Packages': [
    { name: 'Basic Package (Full Blood Count, Malaria (Thick and Thin Films), Widal (Typhoid Test), Urinalysis)', price: 15000 },
    { name: 'Comprehensive Package (Erythrocyte Sedimentation Rate, Full Blood Count, Malaria (Thick and Thin Films), Widal (Typhoid Test), Stool Microscopy, Urinalysis, Sputum AFB – Tuberculosis test)', price: 30000 }
  ],
  'Men Packages': [
    { name: 'Full Body Checkup (Opal)', price: 45000 },
    { name: 'Full Body Checkup (Ruby)', price: 80000 },
    { name: 'Full Body Checkup (Diamond)', price: 180000 },
    { name: 'Fertility/Hormonal Tests (Basic)', price: 15000 },
    { name: 'Fertility/Hormonal Tests (Standard)', price: 60000 },
    { name: 'Erectile Dysfunction Package', price: 100000 }
  ],
  'Women Packages': [
    { name: 'Full Body Checkup (Opal)', price: 45000 },
    { name: 'Full Body Checkup (Ruby)', price: 70000 },
    { name: 'Full Body Checkup (Diamond)', price: 200000 },
    { name: 'Fertility/Hormonal Tests (Basic)', price: 40000 },
    { name: 'Fertility/Hormonal Tests (Standard)', price: 55000 },
    { name: 'Fertility/Hormonal Tests (Comprehensive)', price: 150000 }
  ],
  'Domestic Staff Screening': [
    { name: 'Basic Screening Package', price: 20000 },
    { name: 'Standard Screening Package', price: 30000 }
  ],
  'Pre-marital Screening': [
    { name: 'Pre-marital Test (Basic) - Male and Female', price: 12000 },
    { name: 'Pre-marital Test (Standard) - Female', price: 20000 },
    { name: 'Pre-marital Test (Comprehensive) - Female', price: 100000 },
    { name: 'Pre-marital Test (Comprehensive) - Male', price: 120000 }
  ],
  'Ultrasound Scan': [
    { name: 'Pelvic/ Obstetrics', price: 3000 },
    { name: 'Abdominal', price: 7000 },
    { name: 'Abdominopelvic', price: 10000 },
    { name: 'Upper Abdominal', price: 5000 },
    { name: 'Lower Abdominal', price: 5000 },
    { name: 'Breast', price: 7000 },
    { name: 'Neck/Thyroid', price: 10000 },
    { name: 'Transvaginal Pelvic Scan (TVS)', price: 10000 },
    { name: 'Prostate scan (Transrectal)', price: 10000 },
    { name: 'Folliculometry', price: 30000 },
    { name: 'Scrotal Scan', price: 7000 }
  ],
  'Haematology': [
    { name: 'Full Blood count (Automation)', price: 7000 },
    { name: 'Haemoglobin (HB)', price: 2000 },
    { name: 'Pack cell volume (PCV)', price: 2000 },
    { name: 'WBC (Total)', price: 3000 },
    { name: 'WBC (Differential)', price: 4000 },
    { name: 'Platelet Count', price: 5000 },
    { name: 'E.S.R', price: 3000 },
    { name: 'HB Genotype', price: 2000 },
    { name: 'Bleeding time (BT)', price: 5000 },
    { name: 'Clotting Time', price: 5000 },
    { name: 'Thrombin time (TT)', price: 10000 },
    { name: 'Prothrombin time (PT)', price: 10000 },
    { name: 'Blood Grouping (ABO & Rh)', price: 2000 }
  ],
  'Chemistry': [
    { name: 'Fasting blood sugar', price: 2000 },
    { name: 'Random blood sugar', price: 2000 },
    { name: '2Hr Post-P blood sugar', price: 5000 },
    { name: 'Glucose tolerance test G.T.T', price: 10000 },
    { name: 'HbA1c', price: 10000 },
    { name: 'E/U/Cr', price: 18000 },
    { name: 'Urea', price: 5000 },
    { name: 'Full electrolytes', price: 10000 },
    { name: 'Creatinine', price: 5000 },
    { name: 'Liver Function Test (LFT)', price: 18000 },
    { name: 'Total Billirubin', price: 5000 },
    { name: 'Direct Billirubin', price: 5000 },
    { name: 'Full Lipid Profile', price: 18000 },
    { name: 'Total Cholesterol', price: 5000 }
  ],
  'Microbiology & Serology': [
    // STOOL
    { name: 'STOOL: Microscopy', price: 3000 },
    { name: 'STOOL: M/C/S', price: 7000 },
    { name: 'STOOL: Occult Blood', price: 7000 },
    // BLOOD
    { name: 'BLOOD: Malaria Parasites', price: 2000 },
    { name: 'BLOOD: Widal Reaction', price: 2000 },
    { name: 'BLOOD: V.D.R.L', price: 2000 },
    { name: 'BLOOD: Culture & Sensitivity', price: 12000 },
    { name: 'BLOOD: H.Pylori', price: 5000 },
    { name: 'BLOOD: TB (Serum)', price: 5000 },
    { name: 'BLOOD: Microfilaria', price: 5000 },
    { name: 'BLOOD: Trypanosome', price: 5000 },
    { name: 'BLOOD: Leishmania', price: 5000 },
    // URINE
    { name: 'URINE: Microscopy for Shistosoma oval', price: 3000 },
    { name: 'URINE: Urinalysis', price: 2000 },
    { name: 'URINE: M/C/S', price: 7000 },
    // SPUTUM
    { name: 'SPUTUM: ZN Stain (A-AFB) x 1', price: 5000 },
    { name: 'SPUTUM: M/C/S', price: 10000 },
    { name: 'SPUTUM: GenXpert', price: 7000 },
    // SEMINAL FLUID
    { name: 'SEMINAL FLUID: Analysis', price: 10000 },
    { name: 'SEMINAL FLUID: M/C/S', price: 15000 },
    // SKIN
    { name: 'SKIN: Snips For Microfilaria', price: 10000 },
    { name: 'SKIN: Fungal Element', price: 10000 },
    // SWAB
    { name: 'SWAB: HVS M/C/S', price: 6000 },
    { name: 'SWAB: Urethral M/C/S', price: 8000 },
    { name: 'SWAB: OTHERS M/C/S', price: 10000 },
    // SCREENING TESTS
    { name: 'HIV Screening test', price: 4000 },
    { name: 'Hepatitis \'A\' Screening', price: 5000 },
    { name: 'Hepatitis \'B\' Screening', price: 2000 },
    { name: 'Hepatitis \'C\' Screening', price: 3000 },
    // PREGNANCY TEST
    { name: 'PREGNANCY TEST: Blood (for early detection)', price: 2000 }
  ],
  'Hormonal/Endocrine Profiles': [
    { name: 'Male Infertility/erectile dysfunction (FSH, LH, PRL, Test/Prog, E2)', price: 50000 },
    { name: 'Female Infertility/Hirsutism (FSH, LH, PRL, Test/Prog, E2)', price: 50000 },
    { name: 'FSH', price: 10000 },
    { name: 'LH', price: 10000 },
    { name: 'PROL', price: 10000 },
    { name: 'TEST.', price: 10000 },
    { name: 'PROG', price: 10000 },
    { name: 'E2', price: 10000 },
    { name: 'PSA', price: 10000 },
    { name: 'TFT', price: 50000 },
    { name: 'TSH', price: 15000 }
  ],
  'Histology & Cytology': [
    { name: 'Histology studies (Small)', price: 30000 },
    { name: 'Histology studies (Medium)', price: 35000 },
    { name: 'Histology studies (Large)', price: 40000 },
    { name: 'Histology studies (Complex)', price: 45000 }
  ],
  'Electrocardiograph (ECG)': [
    { name: 'Pre & Post Exercise', price: 12000 }
  ],
  'X-Ray with Radiological Report': [
    // Head and Neck
    { name: 'HEAD & NECK: Skull (AP & Lat)', price: 12000 },
    { name: 'HEAD & NECK: Skull (All views)', price: 15000 },
    { name: 'HEAD & NECK: Mandibles', price: 10000 },
    { name: 'HEAD & NECK: Mastoids', price: 10000 },
    { name: 'HEAD & NECK: Sinuses', price: 10000 },
    { name: 'HEAD & NECK: Post Nasal Space', price: 10000 },
    { name: 'HEAD & NECK: Cervical Spine (AP & lat)', price: 10000 },
    { name: 'HEAD & NECK: Cervical Spine (with Obliges)', price: 10000 },
    // Trunk
    { name: 'TRUNK: Chest (PA)', price: 10000 },
    { name: 'TRUNK: Chest (AP & Lat)', price: 12000 },
    { name: 'TRUNK: Thoracic Inlet', price: 12000 },
    { name: 'TRUNK: Clavicle', price: 10000 },
    { name: 'TRUNK: Abdomen (AP & Lat)', price: 15000 },
    { name: 'TRUNK: Pelvis', price: 15000 },
    { name: 'TRUNK: Hips', price: 15000 },
    { name: 'TRUNK: Lumbosacral (AP & Lat)', price: 15000 },
    { name: 'TRUNK: Thoracic Spine (AP & Lat)', price: 15000 },
    { name: 'TRUNK: Abdomen for missing ICUD', price: 15000 },
    // Upper and Lower Limbs
    { name: 'LIMBS: Shoulder joint (AP & lat)', price: 10000 },
    { name: 'LIMBS: Arm (Humerus) (AP & Lat)', price: 10000 },
    { name: 'LIMBS: Elbow Joint (AP & lat)', price: 10000 },
    { name: 'LIMBS: Forearm (Radius & Ulna)', price: 10000 },
    { name: 'LIMBS: Wrist Joint', price: 10000 },
    { name: 'LIMBS: Hands/Fingers & Palm', price: 10000 },
    { name: 'LIMBS: Knee (AP & Lat)', price: 10000 },
    { name: 'LIMBS: Leg (Tibia & fibular)(AP & Lat)', price: 10000 },
    { name: 'LIMBS: Ankle Joint', price: 10000 },
    { name: 'LIMBS: Foot (AP & Oblique)', price: 10000 },
    { name: 'LIMBS: Femur or Thigh (AP & Lat)', price: 12000 }
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
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});

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

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
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
            <div className="space-y-6">
              {Object.entries(TEST_CATEGORIES).map(([category, tests]) => {
                const isOpen = openCategories[category];
                
                return (
                  <div key={category} className="border rounded-lg">
                    <Collapsible open={isOpen} onOpenChange={() => toggleCategory(category)}>
                      <CollapsibleTrigger asChild>
                        <div className="w-full p-4 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer border-b">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg text-primary">{category}</h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">
                                {tests.length} tests available
                              </span>
                              <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="p-4 space-y-3">
                          {tests.map((test) => (
                            <div key={test.name} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
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
                                <span className="font-medium text-sm">{test.name}</span>
                                <span className="font-bold text-primary whitespace-nowrap ml-2">₦{test.price.toLocaleString()}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                );
              })}
              
              {/* Selected Tests Summary - Sticky on mobile */}
              {selectedTests.length > 0 && (
                <div className="p-4 bg-primary/5 border-2 border-primary/20 rounded-lg sticky bottom-4 z-10 shadow-lg">
                  <h4 className="font-semibold text-primary mb-3">Selected Tests Summary</h4>
                  <div className="max-h-32 overflow-y-auto space-y-2 mb-4">
                    {selectedTests.map((test, index) => (
                      <div key={index} className="flex justify-between items-start text-sm gap-2">
                        <span className="flex-1">{test.name}</span>
                        <span className="font-medium text-primary whitespace-nowrap">₦{test.price.toLocaleString()}</span>
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
              <div className="space-y-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-accent">⚠️</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    Home/Office sample collection attracts extra charges based on distance. Kindly contact us first before placing an order.
                  </p>
                </div>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;