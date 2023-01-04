import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { AuthGuard } from '../../common/guard/auth.guard';
import { NavComponent } from '../nav/nav.component';

const routesProduct: Routes = [
  { path: 'products', component: ListProductsComponent },
  { path: 'product/:id' , component: DetailProductComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    ListProductsComponent,
    DetailProductComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(routesProduct)
  ],
  providers: [
  ]
})
export class ProductModule { }
