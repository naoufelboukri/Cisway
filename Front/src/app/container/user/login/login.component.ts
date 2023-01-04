import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private _authService: AuthService,
    private router: Router,
    ) {
      
    }

  login(email: string, password: string) {
    this._authService.login(email, password).subscribe(
      (data) => {
        this.isValid = true;
        localStorage.setItem('UserToken', data.toString());
        this._authService.refreshToken();
        this.router.navigate(['']);
      },
      (err) => {
        this.isValid = false;
      }
    )
  }
}