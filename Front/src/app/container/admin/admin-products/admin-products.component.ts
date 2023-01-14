import { Component, OnInit } from '@angular/core';
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

  }

  goToProduct(product: Product) {
    
  }

}
