import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{

  ngOnInit() {
    // this.product = {
    //   id: 1,
    //   name: 'Saisir un nom',
    //   price: 0,
    //   description: 'Saisir une description',
    //   image1: '',
    //   image2: '',
    //   image3: ''
    // }
  }
}
