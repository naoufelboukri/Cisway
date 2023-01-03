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
  user: User;
  constructor (
    protected _authService: AuthService,
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  logout() {
    this._authService.logout();
  }
}
