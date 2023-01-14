import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  @Input() product: Product;

  isAdmin: boolean;
  isNew: boolean;
  errorMessageServeur: string = '';

  file1: any;
  file2: any;
  file3: any;


  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.route.snapshot.url[0].path === 'admin';
    this.isNew = this.product.id === 0;
  }

  onSubmit(): void {
    let dataForm = new FormData();
    dataForm.set('name', 'hello');
    dataForm.set('file', this.file1);
    if (this.product) {
      let productReceipt = {
        name: this.product.name,
        price: this.product.price.toString(),
        description: this.product.description,
        image1: this.product.image1,
        image2: this.product.image2,
        image3: this.product.image3,
      }
      if (this.isNew) {
        this._productService.create(productReceipt).subscribe(
          data => {
            this.redirect();
          },
          error => {
            this.errorMessageServeur = error.error.message;
          }
        )
      } else {
        this._productService.update(this.product.id, productReceipt).subscribe(
          data => {
            this.redirect();
          },
          error => {
            this.errorMessageServeur = error.error.message;
          }
        )
      }
    }
  }

  deleteProduct (product: Product) {
    this._productService.delete(product.id).subscribe(
      data => {
        this.redirect();
      }
    )
  }

  private redirect() {
    if (this.isAdmin) {
      this.router.navigate(['/admin/products']);
    } else {
      this.router.navigate(['/profile/products']);
    }
  }
}
