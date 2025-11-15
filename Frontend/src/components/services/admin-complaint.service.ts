import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminComplaintService {
  private apiUrl = 'http://localhost:8080/api/admin/complaints';

  constructor(private http: HttpClient) {}

    getAllComplaints(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8085/api/complaints/admin/all');
  }
   updateComplaintStatus(payload: { complaintId: number; status: string; notes: string }) {
  const url = `http://localhost:8085/api/complaints/${payload.complaintId}/status`;
  return this.http.put<any>(
    `${url}?status=${payload.status}&notes=${payload.notes}`, 
    {}
  );
}
   updateComplaintSME(complaintId: number, smeId: string): Observable<any> {
  const baseUrl= `http://localhost:8085/api/admin/complaints`;
    return this.http.patch(
      `${baseUrl}/${complaintId}/assign`,
      { smeId: smeId }
    );
  }

  getAllSMEs(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8085/api/admin/sme/all`);
  }
}
