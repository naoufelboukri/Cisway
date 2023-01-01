import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = env.API_URL;

  public user: Observable<string>;
  public userSubject: BehaviorSubject<string>;
  public loggedIn: boolean = (localStorage.getItem('UserToken') !== null) ?? true;

  constructor(
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('UserToken') || '');
    this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { email: email, password: password }).pipe(
      tap((response) => {
        this.loggedIn = true;
        this.log(response)
      }),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  logout() {
    localStorage.removeItem('UserToken');
    this.loggedIn = false;
  }
  
  register(username: string, password: string, email: string, address: string, role_id: number = 2) {
    return this.http.post(`${this.API_URL}/register`, {
      username: username,
      password: password,
      email: email,
      address: address,
      role_id: role_id
    });
  }


  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

}