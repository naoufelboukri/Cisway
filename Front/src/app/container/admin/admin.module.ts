import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/common/guard/admin.guard';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { EditComponent } from '../user/edit/edit.component';
import { EditProductComponent } from '../product/edit-product/edit-product.component';

const adminRoutes: Routes = [
  { path: 'admin', component: MenuComponent, canActivate: [AdminGuard] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard]},
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminGuard]},
  { path: 'admin/user/edit/:id', component: EditComponent, canActivate: [AdminGuard]},
  { path: 'admin/product/edit/:id', component: EditProductComponent, canActivate: [AdminGuard]},
]

@NgModule({
  declarations: [
    MenuComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule { }