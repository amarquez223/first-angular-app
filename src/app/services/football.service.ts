import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionsDTO } from '../models/positions';
import { GoalsByCountryDTO } from '../models/goals_by_country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballService {

  private apiUrl = 'http://localhost:3006/v1/';

  constructor(private http:HttpClient) { }

  getPositions(id: number): Observable<PositionsDTO[]> {

    const headers = new HttpHeaders({
      'X-User-Email': 'anderson.marquez@gmail.com',
      'X-User-Token': 'C-uQ1YPNksVqTdJwa9RM',
    })

    return this.http.get<PositionsDTO[]>(this.apiUrl + 'positions/' + id, { headers })
  }

  getGoalsByCountry(id: number): Observable<GoalsByCountryDTO[]> {

    const headers = new HttpHeaders({
      'X-User-Email': 'anderson.marquez@gmail.com',
      'X-User-Token': 'C-uQ1YPNksVqTdJwa9RM',
    })

    return this.http.get<GoalsByCountryDTO[]>(this.apiUrl + 'goals_by_country/' + id, { headers })
  }
}
