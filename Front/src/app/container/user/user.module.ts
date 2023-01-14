import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from '../../common/guard/customer.guard';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
import { EditComponent } from './edit/edit.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { AdminUsersComponent } from '../admin/admin-users/admin-users.component';
import { AdminGuard } from 'src/app/common/guard/admin.guard';
import { EditProductComponent } from '../product/edit-product/edit-product.component';

const userRoutes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [CustomerGuard] },
  { path: 'login', component: LoginComponent, canActivate: [CustomerGuard] },
  { path: 'profile/edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'profile/products', component: MyProductsComponent, canActivate: [AuthGuard]},
  { path: 'admin/product/edit/:id', component: EditProductComponent, canActivate: [AdminGuard]},
]

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    EditComponent,
    MyProductsComponent,
    AdminUsersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    LoginComponent,
    ProfileComponent
  ],
})
export class UserModule { }
