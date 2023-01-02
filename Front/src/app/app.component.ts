import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { User } from './user/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public username: string;
  constructor(
    protected _authService: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    if (this._authService.loggedIn) {
      this._userService.me().subscribe(
        (data) => {
          this.username = data.username;
        }
      )
    }
  }

}
