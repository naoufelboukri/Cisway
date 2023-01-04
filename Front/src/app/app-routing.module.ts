import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from './common/guard/customer.guard';
import { ErrorComponent } from './container/error/error.component';
import { PageNotFoundComponent } from './container/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'error', component: ErrorComponent, canActivate: [CustomerGuard]},
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
