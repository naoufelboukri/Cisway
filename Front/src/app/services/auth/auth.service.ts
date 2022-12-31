import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = env.API_URL;

  public user: Observable<string>;
  public userSubject: BehaviorSubject<string>;

  constructor(
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('UserToken') || '');
    this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { email: email, password: password });
  }
}
