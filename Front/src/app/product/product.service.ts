import { Injectable } from '@angular/core';
import { PRODUCTS } from './mock-products';
import { Product } from './product';

@Injectable()

export class ProductService {

  getProductList(): Product[] {
    return PRODUCTS;
  }
  
}
