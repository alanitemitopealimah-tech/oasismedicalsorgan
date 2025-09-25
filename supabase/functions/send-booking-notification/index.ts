import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

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
  selectedTests?: Array<{
    name: string;
    price: number;
    category: string;
  }>;
  totalCost?: number;
  serviceName?: string;
  servicePrice?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerData, selectedTests, totalCost, serviceName, servicePrice }: BookingData = await req.json();

    console.log('Sending booking notification:', { customerData, selectedTests, totalCost });

    let testsHtml = '';
    if (selectedTests && selectedTests.length > 0) {
      testsHtml = `
        <h3>Selected Tests:</h3>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Test Name</th>
              <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Category</th>
              <th style="border: 1px solid #dee2e6; padding: 8px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${selectedTests.map(test => `
              <tr>
                <td style="border: 1px solid #dee2e6; padding: 8px;">${test.name}</td>
                <td style="border: 1px solid #dee2e6; padding: 8px;">${test.category}</td>
                <td style="border: 1px solid #dee2e6; padding: 8px; text-align: right;">₦${test.price.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h4 style="color: #0066cc;">Total Cost: ₦${totalCost?.toLocaleString() || '0'}</h4>
      `;
    } else if (serviceName && servicePrice) {
      testsHtml = `
        <h3>Service Details:</h3>
        <ul>
          <li><strong>Service:</strong> ${serviceName}</li>
          <li><strong>Price:</strong> ₦${servicePrice.toLocaleString()}</li>
        </ul>
      `;
    }

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
      
      ${testsHtml}
      
      <p><em>This customer has filled the booking form and will proceed to payment.</em></p>
    `;

    const subject = selectedTests && selectedTests.length > 0 
      ? `New Medical Tests Booking - ${customerData.fullName} (₦${totalCost?.toLocaleString()})`
      : `New Booking: ${serviceName || 'Medical Service'} - ${customerData.fullName}`;

    const { error } = await resend.emails.send({
      from: 'O.A.S.I.S. MEDICALS <onboarding@resend.dev>',
      to: ['oasismedicals@gmail.com'],
      subject: subject,
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
        error: (error as Error).message || 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});