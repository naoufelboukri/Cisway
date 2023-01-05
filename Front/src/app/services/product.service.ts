import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { env } from 'src/environments/environment';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = env.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.API_URL}/products`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.API_URL}/product/${id}`);
  }

  getProductsFromUser(id: number) {
    return this.http.get<Product[]>(`${this.API_URL}/products/${id}`);
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
