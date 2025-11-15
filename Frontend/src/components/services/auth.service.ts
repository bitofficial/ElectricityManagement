import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8085/api'; // adjust as per backend

  constructor(private http: HttpClient) {}

  // ✅ Login with backend API
  login(credentials: { userId: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }
  verifyPass(credentials: { consumerNumber: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/verification`, credentials);
  }
   adminlogin(credentials:{adminId:string;email:string;password:string}):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/admin/login`,credentials);
  }
   smelogin(credentials:{smeId:string;password:string}):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/sme/login`,credentials);
  }

  // ✅ Register new customer
  register(user: any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}/register/save`, user);
  }

  // ✅ Logout (if backend supports session logout)
  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
  }

  // ✅ Optional: fetch current user info from backend
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile`);
  }
}
