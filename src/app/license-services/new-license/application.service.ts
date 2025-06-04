import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://localhost:3000/submit-application';

  constructor(private http: HttpClient) {}

  submitApplication(data: FormData) {
    return this.http.post('http://localhost:3000/submit-application', data);
  }
  getLearnerLicenseByUserId(userId: number): Observable<any> {
  return this.http.get(`http://localhost:3000/api/learner-license/${userId}`);
}
}
