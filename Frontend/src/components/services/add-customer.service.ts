import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCustomerService {

  private baseUrl = 'http://localhost:8085/api/admin/users'; // Spring Boot endpoint

  constructor(private http: HttpClient) {}

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, customer);
  }
}
