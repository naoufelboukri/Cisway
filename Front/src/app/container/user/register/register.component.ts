import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
const validator = require('validator');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  address: string = '';
  password1: string = '';
  password2: string = '';

  errUsername: boolean = false;
  errEmail: boolean = false;
  errAddress: boolean = false;
  errPassword: boolean = false;

  errorMessageUsername: string = "Le nom d'utilisateur est requis (4-255).";
  errorMessageEmail: string = "Merci d'entrer une adresse email valide.";
  errorMessageAddress: string = "L'adresse est requis (5-255).";
  errorMessagePassword: string;

  serveurError: string = '';

  constructor (
    private _authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    const controlUsername = this.controlUsername();
    const controlEmail = this.controlEmail();
    const controlAddress = this.controlAddress();
    const controlPassword = this.controlPassword();

    if (controlUsername && controlEmail && controlAddress && controlPassword) {
      this._authService.register(this.username, this.password1, this.email, this.address).subscribe(
        (data) => {
          this.router.navigateByUrl('/');
        }, 
        (error) => {
          this.serveurError = error.error.message;
        }
        );
      }
  }

  private controlUsername(): boolean {
    if (this.username.length < 4 || this.username.length >= 255) {
      this.errUsername = true;
      return false;
    }
    this.errUsername = false;
    return true;
  }

  private controlEmail(): boolean {
    if (!validator.isEmail(this.email)) {
      this.errEmail = true;
      return false;
    }
    this.errEmail = false;
    return true;
  }

  private controlAddress(): boolean {
    if (this.address.length < 5 || this.address.length >= 255) {
      this.errAddress = true;
      return false;
    }
    this.errAddress = false;
    return true;
  }

  private controlPassword(): boolean {
    if (!validator.isStrongPassword(this.password1)) {
      this.errPassword = true;
      this.errorMessagePassword = 'Le mot de passe doit contenir un chiffre, un symbole, une lettre majuscule et minuscule et doit être supérieur à 8 caractères.';
      return false;
    }

    if (this.password1 !== this.password2) {
      this.errPassword = true;
      this.errorMessagePassword = 'Les mots de passe ne correspondent pas.';
      return false;
    }
    this.errPassword = false;
    this.errorMessagePassword = '';
    return true;
  }
}
