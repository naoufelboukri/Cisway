import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './container/user/user.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './common/jwt.interceptor';
import { CommonModule } from '@angular/common';
import { ProductModule } from './container/product/product.module';
import { PageNotFoundComponent } from './container/page-not-found/page-not-found.component';
import { NavComponent } from './container/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    UserModule,
    ProductModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
