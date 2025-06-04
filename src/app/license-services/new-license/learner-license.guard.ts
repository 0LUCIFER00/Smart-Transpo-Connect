import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LearnerLicenseGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(): Observable<boolean> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.http.get(`http://localhost:3000/api/learner-license/${userId}`).pipe(
      map(() => {
        // User has already applied, block access
        const result= confirm('You have already applied for a Learner License.');
        if(result){
          this.router.navigate(['home/dashboard']);
          return false;
        }
        return false
      }),
      catchError((err) => {
        if (err.status === 404) {
          // No license found, allow access
          return of(true);
        }
        console.error('Error checking license status:', err);
        return of(false); // Block on any other error
      })
    );
  }
}
