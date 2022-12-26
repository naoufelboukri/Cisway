import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { RouterModule, Routes } from '@angular/router';

const productRoutes: Routes = [
  { path: 'products', component: ListProductsComponent },
  { path: 'product/:id', component: DetailProductComponent},
]

@NgModule({
  declarations: [
    ListProductsComponent,
    DetailProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes)
  ]
})
export class ProductModule { }