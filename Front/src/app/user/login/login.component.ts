import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  
  constructor (
    private _authService: AuthService
  ) {}

  login(email: string, password: string) {
    this._authService.login(email, password).subscribe(
      (data) => {
        localStorage.setItem('UserToken', data.toString());
      }
    )
  }
}
