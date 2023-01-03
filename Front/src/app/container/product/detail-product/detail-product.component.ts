import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../Models/Product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit{
  product: Product|undefined;

  constructor (
    private route: ActivatedRoute, 
    private _productService: ProductService
  ) { }

    ngOnInit(): void {
      const productId: string|null = this.route.snapshot.paramMap.get('id');
      if (productId) {
        this._productService.getProductById(+productId).subscribe(
          data => {
            console.log(data);
          }
          // (data: Product) => {
          //   this.product = data;
          // }
        )
      }
    }
}
