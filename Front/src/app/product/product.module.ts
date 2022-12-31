import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth.guard';
import { FormsModule } from '@angular/forms';
import { BorderCardDirective } from './border-card.directive';

const productRoutes: Routes = [
  { path: 'products', component: ListProductsComponent},
  { path: 'product/:id', component: DetailProductComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [
    ListProductsComponent,
    DetailProductComponent,
    BorderCardDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(productRoutes)
  ],

  providers: [ProductService]
})
export class ProductModule { }
