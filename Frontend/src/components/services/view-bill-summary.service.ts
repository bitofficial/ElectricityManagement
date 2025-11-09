import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillSummaryService {
  private apiUrl = 'http://localhost:8080/api/bills'; // backend endpoint

  constructor(private http: HttpClient) {}

  // Replace mock with API call later
  getBillSummary(consumerId: string): Observable<any> {
    // Mock data
    return of({
      consumerId: consumerId,
      billNumber: 'BILL202511',
      billingMonth: 'October 2025',
      unitsConsumed: 356,
      amount: 1200,
      dueDate: new Date('2025-11-15'),
      status: 'Unpaid'
    });

    /*
    // Real API call
    return this.http.get<any>(`${this.apiUrl}/summary/${consumerId}`);
    */
  }
}
