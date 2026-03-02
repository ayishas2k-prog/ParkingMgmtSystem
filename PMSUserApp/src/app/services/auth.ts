import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUser: User | null = null;

  /**
   * AuthService constructor
   * @param http HttpClient for making API requests
   */
  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  /**
   * Registers a new user
   * @param user User registration data
   * @returns Observable of the registered user
   */
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

  /**
   * Logs in a user
   * @param credentials User login credentials (email and password)
   * @returns Observable of the logged-in user with token
   */
  login(credentials: { email: string; password?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          //this.currentUser = response.user;
          this.currentUser = response;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  /**
   * Logs out the current user
   */
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  /**
   * Checks if the user is authenticated
   * @returns boolean indicating authentication status
   */
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  /**
   * Gets the current logged-in user
   * @returns The current User object or null
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Placeholder for Google Authentication
   * @returns Observable of the authentication result
   */
  googleAuth(): Observable<any> {
    // In a real app, this would use Capacitor Google Auth plugin
    console.log('Google Auth placeholder');
    return of({ success: true, message: 'Google Auth successful (mock)' });
  }
}
