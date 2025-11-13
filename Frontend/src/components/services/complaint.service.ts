import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private baseUrl = 'http://localhost:8085/api/complaints';

  constructor(private http: HttpClient) {}

  registerComplaint(complaint: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/raise`, complaint);
  }
  getComplaintById(id: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${id}/status`);
}

updateComplaint(complaint: any): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/update/${complaint.id}`, complaint);
}

}
