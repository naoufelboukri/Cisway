import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'cluster';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../Models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user: User | null;
  picturePath: string;
  themeColor: string;
  role: string;
  
  constructor (
    private _authService: AuthService,
    private _userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.themeColor = this._userService.getThemeColor();
    this.picturePath = this._userService.getRandomPicture(this.themeColor);
    this._userService.me()
    .subscribe(
      data => {
        this.user = data;
        this.role = this._userService.setRoleText(data.role_id);
      },
      err => {

      }
    )
  }

  goToEditProfile(user: User) {
    this.router.navigate(['profile/edit', user.id]);
  }

  goToMyProducts() {
    this.router.navigate(['profile/products']);
  }

  logout() {
    this._authService.logout();
  }
}
