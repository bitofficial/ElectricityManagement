import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminComplaintService {
  private apiUrl = 'http://localhost:8080/api/admin/complaints';

  constructor(private http: HttpClient) {}

  getAllComplaints(): Observable<any[]> {
    // Mock Data — replace with Spring Boot endpoint
    return of([
      {
        complaintId: 'CMP1001',
        consumerId: 'CUST123',
        category: 'Billing Issue',
        description: 'High bill amount for last month.',
        status: 'Pending',
        registeredDate: new Date('2025-11-01')
      },
      {
        complaintId: 'CMP1002',
        consumerId: 'CUST456',
        category: 'Power Outage',
        description: 'No power since 3 days.',
        status: 'Resolved',
        registeredDate: new Date('2025-10-28')
      }
    ]);

    /*
    // Real API call:
    return this.http.get<any[]>(`${this.apiUrl}`);
    */
  }
}
