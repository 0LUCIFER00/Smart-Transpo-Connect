import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DrivingSchool {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  website: string;
  ratings: number;
  instructors: number;
  licensesOffered: string[];
  hours: string;
  fees: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DrivingSchoolService {

  private apiUrl = 'http://localhost:3000/api/driving-schools';

  constructor(private http: HttpClient) {}

  getDrivingSchools(): Observable<DrivingSchool[]> {
    return this.http.get<DrivingSchool[]>(this.apiUrl);
  }
}
