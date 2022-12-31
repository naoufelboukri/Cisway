import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const userRoutes: Routes = [
  { path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
  
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
