import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { from, lastValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth';
import { StorageService } from './storage';
import { AppConstants } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private storage: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const token = await this.storage.get(AppConstants.TOKEN_KEY);
    console.log('Interceptor token:', token); // Debug log to check the token value
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return lastValueFrom(next.handle(req));
  }
}
