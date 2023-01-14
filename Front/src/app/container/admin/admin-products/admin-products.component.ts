import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent implements OnInit {

  products: Product[] = [];

  constructor (
    private _productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      data => {
        for (const product of data) {
          this.products.push(product);
        }
      }
    )
  }

  newProduct() {
    this.router.navigate(['product/create']);
  }

  goToProduct(product: Product) {
    this.router.navigate(['admin/product/edit', product.id]);
  }
}
