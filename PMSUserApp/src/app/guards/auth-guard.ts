import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * AuthGuard constructor
   * @param authService AuthService for checking authentication status
   * @param router Router for navigation
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Determines if a route can be activated
   * @returns boolean indicating if the route can be activated
   */
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
