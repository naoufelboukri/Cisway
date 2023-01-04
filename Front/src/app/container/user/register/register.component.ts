import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
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

  errorMessageUsername: string = "Le nom d'utilisateur est requis (4-255).";
  errorMessageEmail: string = "Merci d'entrer une adresse email valide.";
  errorMessageAddress: string = "L'adresse est requis (5-255).";
  errorMessagePassword: string = '';

  serveurError: string = '';

  constructor (
    private _authService: AuthService,
    private _userService: UserService,
    private router: Router
  ) { }

  onSubmit() {
    this.errUsername = this._userService.usernameIsValid(this.username);
    this.errEmail = this._userService.emailIsValid(this.email);
    this.errAddress = this._userService.addressIsValid(this.address);
    this.errorMessagePassword = this._userService.passwordIsValid(this.password1, this.password2);

    if (!this.errUsername && !this.errEmail && !this.errAddress && this.errorMessagePassword === '') {
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
}
