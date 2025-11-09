import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmeService {
  private apiUrl = 'http://localhost:8080/api/complaints'; // backend endpoint

  constructor(private http: HttpClient) {}

  getComplaintById(searchKey: string): Observable<any> {
    // Mock data — replace with real API call later
    if (searchKey === 'CMP202510') {
      return of({
        id: 'CMP202510',
        consumerId: 'CUST1001',
        type: 'Billing Issue',
        description: 'Bill amount seems incorrect for October 2025.',
        dateFiled: new Date('2025-10-25'),
        status: 'Pending',
        assignedTo: 'Akash (SME)',
        resolution: null,
        resolvedDate: null
      });
    } else if (searchKey === 'CMP202509') {
      return of({
        id: 'CMP202509',
        consumerId: 'CUST1010',
        type: 'Service Interruption',
        description: 'Power outage reported in Lucknow sector 9.',
        dateFiled: new Date('2025-09-12'),
        status: 'Resolved',
        assignedTo: 'Raghav (SME)',
        resolution: 'Fault fixed by field team within 24 hours.',
        resolvedDate: new Date('2025-09-13')
      });
    } else {
      return throwError(() => new Error('Complaint not found'));
    }

    /*
    // Real backend call example:
    return this.http.get<any>(`${this.apiUrl}/search/${searchKey}`);
    */
  }
}
