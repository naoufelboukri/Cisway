import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html'
})
export class FormLoginComponent implements OnInit{
  message: string = 'Vous etes deconnecté.';
  email: string;
  password: string;

  constructor (
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  login() {
    console.log('connexion...')
    // this.dbService.login(this.email, this.password)
    // .subscribe((data) => {
    //   localStorage.setItem('UserToken', data.toString());
    // },);
    // this.message = "Tentative de connexion en cours";
    // this.auth.login(this.name, this.password)
    //   .subscribe((isLoggedIn: boolean) => {
    //     this.setMessage();
    //     if (isLoggedIn) {
    //       this.router.navigate(['/products']);
    //     } else {
    //       this.password = '';
    //       this.router.navigate(['/login']);
    //     }
    //   });
  }

  logout() {
    this.message = 'Déconnexion...';
  }
}
