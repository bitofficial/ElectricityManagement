import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BackendProfile {
  fullName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  mobile: string;
  customerType: string;
  electricalSection: string;
  userId: string;
  consumerNumber: string;
  // backend may or may not include password fields — usually not returned
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  // adjust baseUrl to your backend
  private baseUrl = 'http://localhost:8085/api/register';
  private updateUrl = 'http://localhost:8085/api/users';

  constructor(private http: HttpClient) {}

  // GET /api/profile/{userId}
  getProfile(userId: string): Observable<BackendProfile> {
    return this.http.get<BackendProfile>(`${this.baseUrl}/getbyid/${userId}`);
  }

  // PUT /api/profile/{userId}
  updateProfile(consumerNumber: string, payload: Partial<BackendProfile & { newPassword?: string ,confirmPassword:string }>): Observable<any> {
    return this.http.put(`${this.updateUrl}/${consumerNumber.substring(2)}/profile`, payload);
  }
}
