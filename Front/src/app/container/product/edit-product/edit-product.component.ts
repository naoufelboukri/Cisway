import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit{
  product: Product;

  constructor (
    private _productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const productId: string|null = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this._productService.getProductById(+productId).subscribe(
        data => {
          this.product = data;
        },
      )
    }

  }
}
