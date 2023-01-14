import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { User } from 'src/app/Models/User';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit{
  user: User;
  products: Product[] = [];
  constructor (
    private _productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
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
