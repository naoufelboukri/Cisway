import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../Models/Product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent /*implements OnInit*/{

  products: Product[] = [];
  constructor(
    private _productService: ProductService,
    private router: Router,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this._productService.getProducts().subscribe(
      (data) => {
        for (const product of data) {
          let currentProduct: Product = product;
          this.products.push(currentProduct);
        }
      }
    )
  }

  goToProduct(product: Product): void {
    this.router.navigate(['/product', product.id])
  }
}
