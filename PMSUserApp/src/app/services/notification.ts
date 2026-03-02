import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Notification {
  id: number;
  IsRead: boolean;
  EmailId: string;
  VehicleNumber: string;
  Message: string;
  CreatedDateTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/user/notifications`;

  /**
   * NotificationService constructor
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
   * Gets all unread notifications of the logged-in user
   * @returns Observable of an array of unread notifications
   */
  getUnreadNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  /**
   * Updates a notification as read
   * @param id The ID of the notification
   * @returns Observable of the update response
   */
  markAsRead(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { isRead: true }, { headers: this.getHeaders() });
  }
}
