import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit{
  user: User;

  constructor (
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this._userService.me().subscribe(
      data => {
        this.user = data;
        if (this.user.role_id !== 1) {
          this.router.navigate(['']);
        }
      }
    )
  }
}
