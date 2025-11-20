import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BackendBill {
  billId: number;
  billingMonth: string;   // e.g. "OCT-2025"
  unitsConsumed: number;
  pricePerUnit: number;
  amount: number;
  dueDate: string;        // ISO or yyyy-mm-dd
  status: string;  
  generated_at:string       // e.g. "Paid"
}

@Injectable({
  providedIn: 'root'
})
export class BillHistoryService {
  private baseUrl = 'http://localhost:8085/api/dashboard'; // Spring Boot endpoint

  constructor(private http: HttpClient) {}

  // return typed Observable
  getBillHistory(customerId: string): Observable<BackendBill[]> {
    return this.http.get<BackendBill[]>(`${this.baseUrl}/${customerId}/billhistory`);
  }
}
