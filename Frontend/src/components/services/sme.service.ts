import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmeService {
  private apiUrl = 'http://localhost:8085/api/complaints'; // backend endpoint

  constructor(private http: HttpClient) {}
  

  getComplaintById(searchKey: string,consumerNumber:string): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/${consumerNumber}/${searchKey}`);
    /*
    // Real backend call example:
    */
  }
}
