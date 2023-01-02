import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = env.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get(`${this.API_URL}/products`).pipe(
      tap((response) => {
        this.log(response);
      }),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}