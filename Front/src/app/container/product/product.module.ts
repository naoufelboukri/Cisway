import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { AuthGuard } from '../../common/guard/auth.guard';
import { NavComponent } from '../nav/nav.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormProductComponent } from './form-product/form-product.component';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';

const routesProduct: Routes = [
  { path: 'products', component: ListProductsComponent },
  { path: 'product/create', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'product/edit/:id', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'product/:id' , component: DetailProductComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    ListProductsComponent,
    DetailProductComponent,
    CreateProductComponent,
    FormProductComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(routesProduct),
    FormsModule
  ],
  providers: [
  ]
})
export class ProductModule { }
