
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageConnectionService {

  private baseUrl = 'http://localhost:8085/api/admin/users';

  constructor(private http: HttpClient) {}

  /** Get consumer by consumerNumber */
  getConsumerById(consumerId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/by-customer/${consumerId}`);
  }

  /** PATCH update connection status (Active / Inactive) */
  updateConsumerStatus(consumerNumber: string, newStatus: string): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/${consumerNumber}/status`,
      { newStatus: newStatus }   // Must match your backend DTO
    );
  }
}
