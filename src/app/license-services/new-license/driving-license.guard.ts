import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrivingLicenseGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}

  canActivate(): Observable<boolean> {
    const userId = parseInt(localStorage.getItem('userId') || '', 10);
    if (!userId) {
      this.router.navigate(['/login']);
      return of(false);
    }
    return this.http
      .get(`http://localhost:3000/api/dl-applications/${userId}`)
      .pipe(
        map(() => {
          const result = confirm(
            'You have already applied for a Driving License. Go to dashboard?'
          );
          if (result) {
            this.router.navigate(['/home/dashboard']);
          }
          return false;
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of(true); // allow access if not applied
          }
          console.error('DL check error:', err);
          return of(false);
        })
      );
  }
}
