import { Component, ChangeDetectionStrategy, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService, ContactMessage } from './services/supabase.service';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'contact-section',
    'role': 'region',
    'aria-label': 'Contact Information'
  },
  imports: [CommonModule, FormsModule],
  template: `
    <div [class]="'contact-container' + (inView() ? ' in-view' : '')" #contactSection >
      <h2 class="contact-title">Get In Touch</h2>
      <div class="contact-grid">
        <!-- Send Message Form -->
        <div class="contact-card">
          <div class="card-header">
            <div class="header-left">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-icon lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <h3 class="card-title">Send Message</h3>
            </div>
            <div class="online-status">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi-icon lucide-wifi"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>
              <span class="status-text">ONLINE</span>
            </div>
          </div>
          <form class="contact-form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
            <div class="form-group">
              <label class="form-label">NAME</label>
              <input 
                type="text" 
                class="form-input" 
                placeholder="Enter your name"
                [(ngModel)]="formData.name"
                name="name"
                required
                [disabled]="isSubmitting()"
              />
            </div>
            <div class="form-group">
              <label class="form-label">EMAIL</label>
              <input 
                type="email" 
                class="form-input" 
                placeholder="your@email.com"
                [(ngModel)]="formData.email"
                name="email"
                required
                [disabled]="isSubmitting()"
              />
            </div>
            <div class="form-group">
              <label class="form-label">SUBJECT</label>
              <input 
                type="text" 
                class="form-input" 
                placeholder="Project discussion"
                [(ngModel)]="formData.subject"
                name="subject"
                required
                [disabled]="isSubmitting()"
              />
            </div>
            <div class="form-group">
              <label class="form-label">MESSAGE</label>
              <textarea 
                class="form-textarea" 
                placeholder="Tell me about your project..."
                [(ngModel)]="formData.message"
                name="message"
                rows="4"
                required
                [disabled]="isSubmitting()"
              ></textarea>
            </div>
            <button 
              type="submit" 
              class="send-button"
              [disabled]="isSubmitting() || !contactForm.form.valid"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
              {{ isSubmitting() ? 'SENDING...' : 'SEND MESSAGE' }}
            </button>
          </form>
          
          <!-- Success/Error Messages -->
          @if (submitStatus()) {
            <div class="submit-message" [class]="'submit-message-' + submitStatus()">
              <i [class]="submitStatus() === 'success' ? 'pi pi-check-circle' : 'pi pi-exclamation-triangle'"></i>
              <span>{{ submitMessage() }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-section {
      width: 100%;
      background: #000;
      padding: 4rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .contact-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: radial-gradient(circle, #00c6ff22 1px, transparent 1px);
      background-size: 20px 20px;
      opacity: 0.3;
      pointer-events: none;
    }
    .contact-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      z-index: 1;
      background-color: #000000;
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.7s cubic-bezier(0.4,0,0.6,1), transform 0.7s cubic-bezier(0.4,0,0.6,1);
    }
    .contact-container.in-view {
      opacity: 1;
      transform: none;
    }
    .contact-title {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-align: center;
      margin: 0;
    }
    .contact-grid {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 1300px;
      margin: 0 auto;
    }
    .contact-card {
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid #06b6d433;
      border-radius: 16px;
      padding: 2rem;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      max-width: 500px;
      width: 100%;
    }
    .contact-card:hover {
      border-color:rgba(5, 197, 231, 0.7);
      box-shadow: 0 0 20px rgba(5, 197, 231, 0.2);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .header-icon {
      font-size: 1.5rem;
      color: #00c6ff;
    }
    .card-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }
    .online-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.3rem 0.8rem;
    }
    .status-icon {
      font-size: 0.8rem;
      color: #22c55e;
    }
    .status-text {
      font-size: 0.7rem;
      font-weight: 600;
      color: #22c55e;
      letter-spacing: 0.5px;
    }
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #00c6ff;
      letter-spacing: 0.5px;
    }
    .form-input, .form-textarea {
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid #8b5cf6;
      border-radius: 8px;
      padding: 0.8rem 1rem;
      color: #ffffff;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    .form-input:focus, .form-textarea:focus {
      outline: none;
      border-color: #a855f7;
      box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
    }
    .form-input::placeholder, .form-textarea::placeholder {
      color: #6b7280;
    }
    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }
    .send-button {
      background: linear-gradient(90deg, #00c6ff 0%, #8b5cf6 100%);
      border: none;
      border-radius: 8px;
      padding: 1rem 2rem;
      color: #ffffff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      margin-top: 1rem;
    }
    .send-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 198, 255, 0.3);
    }
    .send-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    .send-button:disabled:hover {
      transform: none;
      box-shadow: none;
    }
    .form-input:disabled, .form-textarea:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .submit-message {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
    }
    .submit-message-success {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid #22c55e;
      color: #22c55e;
    }
    .submit-message-error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid #ef4444;
      color: #ef4444;
    }
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .info-item:hover {
      background: rgba(0, 0, 0, 0.5);
      transform: translateX(5px);
    }
    .info-icon {
      font-size: 1.2rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
    }
    .info-content {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .info-label {
      font-size: 0.8rem;
      color: #6b7280;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .info-value {
      font-size: 1rem;
      color: #ffffff;
      font-weight: 500;
    }
    @media (max-width: 768px) {
      .contact-section {
        padding: 3rem 1rem;
      }
      .contact-title {
        font-size: 2rem;
      }
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      .contact-card {
        padding: 1.5rem;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = signal(false);
  submitStatus = signal<'success' | 'error' | null>(null);
  submitMessage = signal('');

  constructor(private supabaseService: SupabaseService) {}

  onSubmit() {
    if (this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set(null);
    this.submitMessage.set('');

    const contactMessage: ContactMessage = {
      name: this.formData.name,
      email: this.formData.email,
      subject: this.formData.subject,
      message: this.formData.message
    };

    this.supabaseService.submitContactFormObservable(contactMessage).subscribe({
      next: (response: any) => {
        this.submitStatus.set('success');
        this.submitMessage.set('Message sent successfully!');
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      },
      error: (error: any) => {
        this.submitStatus.set('error');
        this.submitMessage.set('Failed to send message. Please try again later.');
        console.error('Error sending email:', error);
      },
      complete: () => {
        this.isSubmitting.set(false);
      }
    });
  }
  inView = signal(false);
  @ViewChild('contactSection', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (this.sectionRef) {
      const observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          // Only trigger if user has scrolled at least 50px
          if (entry.isIntersecting && window.scrollY > 400) {
            console.log('[ExperienceComponent] Experience section is in view! Adding .in-view class.');
            this.inView.set(true);
            observer.disconnect(); // Only trigger once
          }
        });
      }, { threshold: 0.4 });
      observer.observe(this.sectionRef.nativeElement);
    }
  }
} 