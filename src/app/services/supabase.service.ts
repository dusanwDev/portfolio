import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Use environment variables for better security
    this.supabase = createClient(
      'https://etlntwlhdfoovjvlsyls.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bG50d2xoZGZvb3ZqdmxzeWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc4ODgsImV4cCI6MjA2ODUxMzg4OH0.Uahzl_9jgNbPwtbfBZtkB-_QsUb0PeLilvYo9-Qks0Q'
    );
  }

  async submitContactForm(message: ContactMessage): Promise<any> {
    try {
      // Insert the message into the contact_messages table
      const { data, error } = await this.supabase
        .from('contact_messages')
        .insert([message])
        .select();

      if (error) {
        throw error;
      }

      // Temporarily disable email notification to avoid CORS issues
      // TODO: Deploy Edge Function later for email functionality
      // await this.triggerEmailNotification(message);

      return { success: true, data };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }

  private async triggerEmailNotification(message: ContactMessage): Promise<void> {
    try {
      // Call a Supabase Edge Function to send email
      const { error } = await this.supabase.functions.invoke('send-contact-email', {
        body: {
          to: 'dusan.business99@gmail.com',
          from: 'noreply@yourdomain.com',
          subject: `New Contact Form Submission: ${message.subject}`,
          html: this.generateEmailHTML(message)
        }
      });

      if (error) {
        console.error('Error sending email notification:', error);
      }
    } catch (error) {
      console.error('Error triggering email notification:', error);
    }
  }

  private generateEmailHTML(message: ContactMessage): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${message.name}</p>
          <p><strong>Email:</strong> ${message.email}</p>
          <p><strong>Subject:</strong> ${message.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${message.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
        </p>
      </div>
    `;
  }

  // Observable wrapper for better Angular integration
  submitContactFormObservable(message: ContactMessage): Observable<any> {
    return from(this.submitContactForm(message));
  }
} 