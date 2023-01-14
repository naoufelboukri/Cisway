import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = env.API_URL;

  public user: Observable<string>;
  public userSubject: BehaviorSubject<string>;
  public isLogged: boolean = (localStorage.getItem('UserToken') !== null) ? true : false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('UserToken') || '');
    this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<string>(`${this.API_URL}/login`, { email: email, password: password }).pipe(
      tap((user: string) => {
        if(user){
          this.userSubject.next(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('UserToken');
    window.location.reload();
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

  refreshToken(): void {
    this.isLogged = (localStorage.getItem('UserToken') !== null) ? true : false;
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

}