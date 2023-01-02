import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './detail-product/detail-product.component';

const routesProduct: Routes = [
  { path: 'product/:id' , component: DetailProductComponent}
];

@NgModule({
  declarations: [
    ListProductsComponent,
    DetailProductComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(routesProduct)
  ]
})
export class ProductModule { }
