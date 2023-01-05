import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit{
  @Input() product: Product | null;

  errName: boolean;
  errPrice: boolean;
  errDescription: boolean;
  errFiles: boolean;

  errorMessageName: string = 'Le nom du produit est requis [2-255].';
  errorMessagePrice: string = 'Entrez un nombre.';
  errorMessageDescription: string = 'La description est obligatoire.';
  errorMessageFiles: string = 'Les images doivent être au format JPG ou PNG.';

  errorMessageServeur: string = '';
  
  constructor (
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    
  }

  save(): void {
    console.log('saving');
  }

}
