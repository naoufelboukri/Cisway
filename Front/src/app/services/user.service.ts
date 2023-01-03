import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { env } from 'src/environments/environment';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = env.API_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  me() {
    return this.http.get<User>(`${this.API_URL}/me`)
    // .pipe(
    //   tap ((response) => {
    //     console.log(response);
    //   })
    // );
    this.router.navigate(['/']);
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
