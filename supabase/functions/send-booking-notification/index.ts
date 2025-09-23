import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingData {
  customerData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    homeAddress: string;
    state: string;
  };
  serviceName: string;
  servicePrice: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerData, serviceName, servicePrice }: BookingData = await req.json();

    console.log('Sending booking notification:', { customerData, serviceName, servicePrice });

    const emailContent = `
      <h2>New Booking Request - O.A.S.I.S. MEDICALS</h2>
      
      <h3>Customer Information:</h3>
      <ul>
        <li><strong>Full Name:</strong> ${customerData.fullName}</li>
        <li><strong>Phone Number:</strong> ${customerData.phoneNumber}</li>
        <li><strong>Email:</strong> ${customerData.email}</li>
        <li><strong>Home Address:</strong> ${customerData.homeAddress}</li>
        <li><strong>State:</strong> ${customerData.state}</li>
      </ul>
      
      <h3>Service Details:</h3>
      <ul>
        <li><strong>Service:</strong> ${serviceName}</li>
        <li><strong>Price:</strong> ₦${servicePrice.toLocaleString()}</li>
      </ul>
      
      <p><em>This customer has filled the booking form and will proceed to payment.</em></p>
    `;

    const { error } = await resend.emails.send({
      from: 'O.A.S.I.S. MEDICALS <onboarding@resend.dev>',
      to: ['oasismedicals@gmail.com'],
      subject: `New Booking: ${serviceName} - ${customerData.fullName}`,
      html: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email notification');
    }

    console.log('Booking notification sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking notification sent successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Booking notification error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});