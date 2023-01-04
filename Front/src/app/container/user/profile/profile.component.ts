import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'cluster';
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
    this.themeColor = this.getThemeColor();
    this.picturePath = this.getRandomPicture()
    this._userService.me()
      .subscribe(
        data => {
          this.user = data;
          this.role = this.setRoleText(data.role_id);
        }
      )
  }

  goToEditProfile(user: User) {
    this.router.navigate(['profile/edit', user.id]);
  }

  logout() {
    this._authService.logout();
  }

  private getRandomPicture(): string {
    return `/assets/profile-pictures/pp-${this.themeColor}.png`;
  }

  private getThemeColor(): string {
    const colors = ['green', 'red', 'blue', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private setRoleText(roleId: number): string {
    if (roleId === 0)
      return 'Admin';
    else 
      return 'Guest';
  }
}
