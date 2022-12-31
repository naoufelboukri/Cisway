import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isValid: boolean = true;

  constructor (
    private _authService: AuthService
  ) {}

  login(email: string, password: string) {
    this._authService.login(email, password).subscribe(
      (data) => {
        if (data) {
          localStorage.setItem('UserToken', data.toString());
        } else {
          this.isValid = false;
        }
      },
    )
  }
}