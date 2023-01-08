import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { User } from 'src/app/Models/User';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
  products: Product[] = [];
  user: User;

  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this._userService.me().subscribe(
      data => {
        this.user = data;
        this._productService.getProductsFromUser(this.user.id).subscribe(
          (data) => {
            for (const product of data) {
              let currentProduct: Product = product;
              this.products.push(currentProduct);
            }
          }
        )
      }
    )
  }

  goToProduct(product: Product) {
    this.router.navigate(['product/edit', product.id]);
  }

  newProduct() {
    this.router.navigate(['product/create']);
  }
}
