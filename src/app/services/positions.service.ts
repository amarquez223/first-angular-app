import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionsDTO } from '../models/positions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  private apiUrl = 'http://localhost:3006/v1/positions/';

  constructor(private http:HttpClient) { }

  getPositions(id: number): Observable<PositionsDTO[]> {

    const headers = new HttpHeaders({
      'X-User-Email': 'anderson.marquez@gmail.com',
      'X-User-Token': 'C-uQ1YPNksVqTdJwa9RM',
    })

    return this.http.get<PositionsDTO[]>(this.apiUrl + id, { headers })
  }
}
