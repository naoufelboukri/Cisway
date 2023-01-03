import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from '../../common/guard/customer.guard';

const userRoutes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [CustomerGuard] },
  { path: 'login', component: LoginComponent, canActivate: [CustomerGuard] },
]

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    LoginComponent,
    ProfileComponent
  ]
})
export class UserModule { }
