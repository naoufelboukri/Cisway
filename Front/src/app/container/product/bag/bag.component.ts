import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss']
})
export class BagComponent implements OnInit{
  
  products: Product[] = [];
  total: number = 0;

  constructor (
    private _productService: ProductService,
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.products = this._productService.getBag();
    // let price = 0;
    // for (let product of this.products) {
    //   price += product.price;
    // }
    // this.total = +price.toFixed(2);
    this._userService.getPanier().subscribe(
      data => {
        console.log(data);
        for (const product of data) {
          this.products.push(product);
        }
      }
    )
  }

  buy() {
    this.router.navigate(['']);
  }
}
