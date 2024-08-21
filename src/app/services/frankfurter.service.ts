import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FrankfurterService {

  private apiUrl = 'https://www.frankfurter.app/latest';

  constructor(private http: HttpClient) { }

  getLatest() {
    return this.http.get(this.apiUrl)
  }
}
