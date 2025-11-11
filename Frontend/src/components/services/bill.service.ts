import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BillService {
  // Example: userId stored like "u-1234567890123"
  private readonly rawUserId = localStorage.getItem('userId') ?? '';
  private readonly consumerNumber = this.parseConsumerNumber(this.rawUserId);

  // e.g. GET http://localhost:8080/api/dashboard/1234567890123/bills
  private readonly baseUrl = `http://localhost:8085/api/dashboard/${this.consumerNumber}/bills`;
  private readonly customerUrl = 'http://localhost:8085/api/customers';

  constructor(private http: HttpClient) {}

  private parseConsumerNumber(userId: string): string {
    // If your userId is "u-<number>", remove the first 2 chars ("u-")
    if (!userId) return '';
    return userId.startsWith('u-') ? userId.slice(2) : userId;
  }

  /** Get all bills for the currently logged-in user */
  getAllBillsForCurrentUser(): Observable<any[]> {
    if (!this.consumerNumber) {
      return throwError(() => new Error('Missing consumer number in localStorage (userId).'));
    }
    return this.http.get<any[]>(this.baseUrl);
  }

  /** Customer details (optional) */
  getCustomerDetails(consumerNumber: number): Observable<any> {
    return this.http.get<any>(`${this.customerUrl}/${consumerNumber}`);
  }

  /** By customerId (separate use-case) */
  getAllBills(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${'all'}`);
  }

  addBill(bill: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, bill);
  }

  /** Dummy fallback */
  getBillByConsumerNumber(consumerNumber: number): Observable<any[]> {
    const dummyBills = [
      { billNumber: 'BILL1001', billPeriod: 'Aug 2025', billDate: '2025-08-10', dueDate: '2025-08-25', payableAmount: 1250 },
      { billNumber: 'BILL1002', billPeriod: 'Sep 2025', billDate: '2025-09-10', dueDate: '2025-09-25', payableAmount: 980 },
      { billNumber: 'BILL1003', billPeriod: 'Oct 2025', billDate: '2025-10-10', dueDate: '2025-10-25', payableAmount: 1120 }
    ];
    return of(consumerNumber ? dummyBills : []);
  }
}
