import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{

  product: Product;

  ngOnInit() {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      image1: '',
      image2: '',
      image3: '',
      username: ''
    };
  }
}
