import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'cluster';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  username: string;
  email: string;
  address: Address;

  constructor (
    private _authService: AuthService,
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this._authService.loggedIn) {
      this._userService.me().subscribe(
        data => {
          this.username = data.username;
          this.email = data.email;
          this.address = data.address;
        }
      )
    }
  }

  logout() {
    this._authService.logout();
    this.router.navigateByUrl('/');
  }
}
