import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  private isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      const result = confirm('Please Login to access this page');
      if (result) {
        this.router.navigate(['/login-register']);
        return false;
      } else {
        this.router.navigate(['/home'])
        return false;
      }
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      const result = confirm('Please Login to access this page');
      if (result) {
        this.router.navigate(['/login-register']);
        return false;
      } else {
        return false;
      }
    }
  }
}
