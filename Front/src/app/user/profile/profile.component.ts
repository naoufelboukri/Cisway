import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor (
    private _authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this._authService.logout();
    this.router.navigateByUrl('/');
  }
}
