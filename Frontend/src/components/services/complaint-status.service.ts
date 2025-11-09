import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintStatusService {

  private baseUrl = 'http://localhost:8080/api/complaints'; // Spring Boot endpoint

  constructor(private http: HttpClient) {}

  getComplaintById(complaintId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${complaintId}`);
  }
}
