import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayBillService {
  private apiUrl = 'http://localhost:8080/api/payments'; // your Spring Boot endpoint

  constructor(private http: HttpClient) {}

  processPayment(paymentData: any): Observable<any> {
    // Mock response — replace with this.http.post(...) when backend ready
    return of({
      status: 'SUCCESS',
      transactionId: 'TXN' + Math.floor(Math.random() * 1000000)
    });
    /*
    // Uncomment below for real API call
    return this.http.post<any>(this.apiUrl, paymentData).pipe(
      map(response => response),
      catchError(err => {
        console.error('Error in processPayment:', err);
        throw err;
      })
    );
    */
  }
}
