import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppConstants } from '../app.component';
import { StorageService } from './storage';

interface LoginResponse {
  token: string;
  userId: number;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: StorageService) {
    this.init();

  }

  async init() {

  }

  login(email: string, password: string, gateId?: number, gateName?: string, gateType?: string): Promise<LoginResponse> {
    console.log(gateName);  
    return firstValueFrom(
      this.http.post<LoginResponse>(`${environment.apiUrl}/users/login`, { email, password }).pipe(
        tap(response => {
          console.log('Login response:', response); // Debug log to check the response
          if (response.token && response.userId) {
            console.log('Login successful, storing token and user info');
            this.storage.set(AppConstants.TOKEN_KEY, response.token);
            this.storage.set(AppConstants.USER_ID_KEY, response.userId);
            this.storage.set(AppConstants.GATE_ID_KEY, gateId);
            this.storage.set(AppConstants.GATE_NAME_KEY, gateName);
            this.storage.set(AppConstants.GATE_TYPE_KEY, gateType);
           
          }
        })
      )
    );
  }

  logout(): Promise<any> {
    this.storage.remove(AppConstants.TOKEN_KEY);
    this.storage.remove(AppConstants.USER_ID_KEY);
    this.storage.remove(AppConstants.GATE_ID_KEY);
    this.storage.remove(AppConstants.GATE_NAME_KEY);
    this.storage.remove(AppConstants.GATE_TYPE_KEY);

    return Promise.resolve();

    // if (!this._storage) {
    //   return Promise.resolve();
    // }
    // const tokenRemoval = this._storage.remove(AppConstants.TOKEN_KEY);
    // const userRemoval = this._storage.remove(AppConstants.USER_ID_KEY);
    // const gateRemoval = this._storage.remove(AppConstants.GATE_ID_KEY);
    // return Promise.all([tokenRemoval, userRemoval, gateRemoval]);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.storage.get(AppConstants.TOKEN_KEY);
    return !!token;
  }

  getToken(): Promise<string | null> {
    // if (!this._storage) {
    //   return Promise.resolve(null);
    // }
   // return this._storage.get(AppConstants.TOKEN_KEY);
    return this.storage.get(AppConstants.TOKEN_KEY);
  }

  // getUserId(): Promise<number | null> {
  //   if (!this._storage) {
  //     return Promise.resolve(null);
  //   }
  //   return this._storage.get(AppConstants.USER_ID_KEY);
  // }

  // getGateId(): Promise<number | null> {
  //   if (!this._storage) {
  //     return Promise.resolve(null);
  //   }
  //   return this._storage.get(AppConstants.GATE_ID_KEY);
  // }

  // getGateName(): Promise<string | null> {
  //   if (!this._storage) {
  //     return Promise.resolve(null);
  //   }
  //   return this._storage.get(AppConstants.GATE_NAME_KEY);
  // }

  // getGateType(): Promise<string | null> {
  //   if (!this._storage) {
  //     return Promise.resolve(null);
  //   }
  //   return this._storage.get(AppConstants.GATE_TYPE_KEY);
  // } 
}
