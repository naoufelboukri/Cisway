import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
})
export class AdminUsersComponent implements OnInit{

  users: User[] = [];

  constructor (
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(
      data => {
        for (const user of data) {
          this.users.push(user);
        }
      }
    )
  }

  newUser() {
    this.router.navigate(['user/create']);
  }

  goToUser(user: User) {
    this.router.navigate(['admin/user/edit', user.id]);
  }
}
