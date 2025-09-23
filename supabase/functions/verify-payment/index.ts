import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { reference, payment_id } = await req.json();
    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');

    if (!paystackSecretKey) {
      throw new Error('Paystack secret key not configured');
    }

    console.log('Verifying payment:', { reference, payment_id });

    // Verify payment with Paystack
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const verifyData = await verifyResponse.json();
    console.log('Paystack verification response:', verifyData);

    if (!verifyData.status || verifyData.data.status !== 'success') {
      throw new Error('Payment verification failed');
    }

    // Update payment record in database
    const { error: updateError } = await supabaseClient
      .from('payments')
      .update({
        status: 'success',
        paystack_transaction_id: verifyData.data.id,
        metadata: verifyData.data,
        updated_at: new Date().toISOString()
      })
      .eq('id', payment_id);

    if (updateError) {
      console.error('Database update error:', updateError);
      throw new Error('Failed to update payment record');
    }

    // Create booking record
    const paymentMetadata = verifyData.data.metadata;
    const { error: bookingError } = await supabaseClient
      .from('bookings')
      .insert({
        user_id: paymentMetadata.user_id,
        service_name: paymentMetadata.service_name,
        service_price: verifyData.data.amount / 100, // Convert from kobo
        booking_date: new Date().toISOString(),
        payment_status: 'completed',
        status: 'confirmed',
        notes: `Payment completed via ${verifyData.data.channel} - Reference: ${reference}`
      });

    if (bookingError) {
      console.error('Booking creation error:', bookingError);
      // Don't throw error here as payment is already successful
    }

    console.log('Payment verification completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Payment verified successfully',
        transaction: verifyData.data
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Payment verification error:', error);
    
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