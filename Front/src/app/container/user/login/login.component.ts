import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
          this.isValid = true;
          localStorage.setItem('UserToken', data.toString());
          this._authService.setUser();
          // this._authService.loggedIn = true;
        } else {
          this.isValid = false;
        }
      },
    )
  }
}