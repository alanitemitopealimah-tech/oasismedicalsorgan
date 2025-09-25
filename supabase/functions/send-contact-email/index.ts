import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

interface ContactFormData {
  fullName: string
  phone: string
  email?: string
  testType: string
  preferredDate?: string
  preferredTime?: string
  notes?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const contactData: ContactFormData = await req.json()
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }

    // Validate required fields
    if (!contactData.fullName || !contactData.phone || !contactData.testType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: fullName, phone, or testType' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Format the email content
    const emailContent = `
      <h2>New Contact Form Submission - OASIS Medical Center</h2>
      
      <h3>Patient Information:</h3>
      <ul>
        <li><strong>Full Name:</strong> ${contactData.fullName}</li>
        <li><strong>Phone Number:</strong> ${contactData.phone}</li>
        <li><strong>Email:</strong> ${contactData.email || 'Not provided'}</li>
      </ul>
      
      <h3>Appointment Details:</h3>
      <ul>
        <li><strong>Test Type:</strong> ${contactData.testType}</li>
        <li><strong>Preferred Date:</strong> ${contactData.preferredDate || 'Not specified'}</li>
        <li><strong>Preferred Time:</strong> ${contactData.preferredTime || 'Not specified'}</li>
      </ul>
      
      ${contactData.notes ? `
      <h3>Additional Notes:</h3>
      <p>${contactData.notes}</p>
      ` : ''}
      
      <hr>
      <p><small>This message was sent from the OASIS Medical Center website contact form.</small></p>
    `

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'OASIS Medical Center <noreply@yourdomain.com>',
        to: ['Oasismedicals@gmail.com'],
        subject: `New Appointment Request - ${contactData.fullName}`,
        html: emailContent,
        reply_to: contactData.email || undefined,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text()
      console.error('Resend API error:', errorData)
      throw new Error('Failed to send email')
    }

    const result = await emailResponse.json()
    console.log('Email sent successfully:', result)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully',
        emailId: result.id 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error sending contact email:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process contact form submission',
        details: (error as Error).message || 'Unknown error occurred'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})