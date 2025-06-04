import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LicenseGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(): Observable<boolean> {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    this.router.navigate(['/login']);
    return of(false);
  }

  // Step 1: Get llNumber by userId
  return this.http.get<{ llNumber: number }>(`http://localhost:3000/api/llnumber/${userId}`).pipe(
    // Step 2: Use llNumber to check test status
    switchMap(response => {
      const llNumber = response.llNumber;
      return this.http.get<{ status: string }>(`http://localhost:3000/api/test-result-status/${llNumber}`).pipe(
        map(testResult => {
          if (testResult.status === 'Pass') {
            return true;
          } else {
            const result = confirm('You must pass the test to access this section. Do you want to take the test now?');
            if (result) this.router.navigate(['/online-test']);
            else this.router.navigate(['/home/dashboard']);
            return false;
          }
        }),
        catchError(err => {
          if (err.status === 404) {
            const result = confirm('You have not taken the test yet. Do you want to take the test now?');
            if (result) this.router.navigate(['/online-test']);
            else this.router.navigate(['/home/dashboard']);
            return of(false);
          }
          console.error('Error checking test status:', err);
          this.router.navigate(['/home/dashboard']);
          return of(false);
        })
      );
    }),
    catchError(err => {
      console.error('Error getting llNumber:', err);
      this.router.navigate(['/home/dashboard']);
      return of(false);
    })
  );
}

}
