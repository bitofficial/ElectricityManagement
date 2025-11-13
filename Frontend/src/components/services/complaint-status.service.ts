import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintStatusService {
  private baseUrl = 'http://localhost:8085/api/complaints';

  constructor(private http: HttpClient) {}

  getComplaintById(skey: number,cusNo:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${cusNo}/${skey}`);
  }

  getComplaintsByConsumer(consumerNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/consumer/${consumerNumber}`);
  }
}