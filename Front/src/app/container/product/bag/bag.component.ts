import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/services/product.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products = this._productService.getBag();
    let price = 0;
    for (let product of this.products) {
      price += product.price;
    }
    this.total = +price.toFixed(2);
  }

  buy() {
    this.router.navigate(['']);
  }
}
