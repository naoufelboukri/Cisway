import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  
  private API_URL: string = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { email: email, password: password });
  }
}
