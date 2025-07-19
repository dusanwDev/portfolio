import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly apiUrl = 'https://your-backend-api.com/api/send-email'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  sendEmail(emailData: EmailData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any authentication headers if needed
      // 'Authorization': 'Bearer your-api-key'
    });

    return this.http.post(this.apiUrl, emailData, { headers });
  }
} 