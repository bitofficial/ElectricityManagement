import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseUrl = 'http://localhost:8080/api/bills';

  constructor(private http: HttpClient) {}

  getBillByCustomerId(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${customerId}`);
  }

  addBill(bill: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, bill);
}

getAllBills(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}`);
}


}
