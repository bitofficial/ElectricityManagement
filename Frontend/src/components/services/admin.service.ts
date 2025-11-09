import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  // Get existing customer by ID (mock or real)
  getCustomerById(customerId: string): Observable<any> {
    // Mock
    if (customerId === 'CUST1001') {
      return of({
        id: 'CUST1001',
        name: 'Akash Yadav',
        email: 'akash@example.com',
        phone: '9876543210',
        address: 'Lucknow, India',
        connectionType: 'domestic',
        status: 'active'
      });
    } else {
      return throwError(() => new Error('Customer not found'));
    }

    /*
    // Real API call
    return this.http.get<any>(`${this.apiUrl}/${customerId}`);
    */
  }

  // Update customer details
  updateCustomer(customerData: any): Observable<any> {
    // Mock
    return of({ message: 'Updated successfully' });

    /*
    // Real API call
    return this.http.put<any>(`${this.apiUrl}/${customerData.id}`, customerData);
    */
  }
}
