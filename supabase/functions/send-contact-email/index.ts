import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

interface EmailRequest {
  to: string;
  from: string;
  subject: string;
  html: string;
}

serve(async (req) => {
  try {
    const { to, from, subject, html }: EmailRequest = await req.json();

    // Option 1: Using Resend (recommended)
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from,
        to: to,
        subject: subject,
        html: html,
      }),
    });

    if (!resendResponse.ok) {
      throw new Error(`Resend API error: ${resendResponse.statusText}`);
    }

    // Option 2: Using SendGrid (alternative)
    /*
    const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: from },
        subject: subject,
        content: [{ type: 'text/html', value: html }],
      }),
    });

    if (!sendgridResponse.ok) {
      throw new Error(`SendGrid API error: ${sendgridResponse.statusText}`);
    }
    */

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send email' 
      }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
}) 