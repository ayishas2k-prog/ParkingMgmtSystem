import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Payment {
  id: number;
  vehicleNumber: string;
  amount: number;
  status: string;
  duration?: string;
  inTime?: string;
  outTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/user/payments`;

  /**
   * PaymentService constructor
   * @param http HttpClient for making API requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets auth headers for API requests
   * @returns HttpHeaders with authorization token
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Gets all pending payments for vehicles owned by the logged-in user
   * @returns Observable of an array of pending payments
   */
  getPendingPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  /**
   * Updates payment information for the selected payment ID
   * @param id The ID of the payment
   * @param paymentDetails The updated payment details
   * @returns Observable of the update response
   */
  updatePayment(id: number, paymentDetails: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, paymentDetails, { headers: this.getHeaders() });
  }

  /**
   * Initiates Google Pay transaction (placeholder)
   * @param amount The amount to pay
   * @returns Observable of the transaction result
   */
  initiateGooglePay(amount: number): Observable<any> {
    // In a real app, this would use Capacitor Google Pay plugin
    console.log(`Initiating Google Pay for amount: ${amount}`);
    return of({ success: true, transactionId: 'GPay_' + Math.random().toString(36).substr(2, 9) });
  }
}
