import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmeComplaintService {
  private baseUrl = 'http://localhost:8085/api/sme/'; // backend endpoint

  constructor(private http: HttpClient) {}

  getAllComplaints(smeId:String): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + smeId+'/dashboard');
  }
}
