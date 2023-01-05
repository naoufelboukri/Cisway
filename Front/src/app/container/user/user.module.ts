import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from '../../common/guard/customer.guard';
import { NavComponent } from '../nav/nav.component';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
import { EditComponent } from './edit/edit.component';
import { MyProductsComponent } from './my-products/my-products.component';

const userRoutes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [CustomerGuard] },
  { path: 'login', component: LoginComponent, canActivate: [CustomerGuard] },
  { path: 'profile/edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/products', component: MyProductsComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    EditComponent,
    MyProductsComponent
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
