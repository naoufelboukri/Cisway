import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = env.API_URL;

  public user: Observable<string>;
  public userSubject: BehaviorSubject<string>;
  // public loggedIn: boolean = (localStorage.getItem('UserToken') !== null) ?? true;
  public User: User | null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private _userService: UserService
  ) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('UserToken') || '');
    this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { email: email, password: password });
    // .pipe(
    //   tap((response) => {
    //     this.loggedIn = true;
    //      this.log(response)
    //   }),
    //   catchError((error) => this.handleError(error, undefined))
    // );
  }

  logout() {
    localStorage.removeItem('UserToken');
    this.router.navigate(['']);
    this.User = null;
    // this.loggedIn = false;
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

  setUser() {
    this._userService.me().subscribe(
      data => {
        this.User = data;
      }
    )
  }


  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

}