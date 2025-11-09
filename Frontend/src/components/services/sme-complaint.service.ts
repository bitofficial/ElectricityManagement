import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmeComplaintService {
  private baseUrl = 'http://localhost:8080/api/sme/complaints'; // backend endpoint

  constructor(private http: HttpClient) {}

  getAllComplaints(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
