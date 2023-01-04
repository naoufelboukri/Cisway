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
  reference: string;
  constructor (
    private route: ActivatedRoute, 
    private _productService: ProductService
  ) { }

    ngOnInit(): void {
      const productId: string|null = this.route.snapshot.paramMap.get('id');
      this.reference = this.setReference(12);
      if (productId) {
        this._productService.getProductById(+productId).subscribe(
          data => {
            this.product = data;
          }
        )
      }
    }

    private setReference(size: number): string {
      let reference: string = '';
      const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (let i = 0; i < size; i++) {
        reference += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      return reference;
    }

    addToBag() {
      console.log('added')
    }
}
