import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html'
})
export class ListProductsComponent implements OnInit{
  productList: Product[];
  row: number;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.productList = this.productService.getProductList();
    this.row = this.productList.length;
  }

  goToProduct(product: Product) {
    this.router.navigate(['/product', product.id])
  }
}
