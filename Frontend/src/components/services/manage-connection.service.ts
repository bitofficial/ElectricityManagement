import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageConnectionService {

  private baseUrl = 'http://localhost:8080/api/admin/connection';

  constructor(private http: HttpClient) {}

  // Get consumer by ID
  getConsumerById(consumerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/consumer/${consumerId}`);
  }

  // Disconnect consumer
  disconnectConsumer(consumerId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/disconnect/${consumerId}`, {});
  }

  // Reconnect consumer
  reconnectConsumer(consumerId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/reconnect/${consumerId}`, {});
  }
}
