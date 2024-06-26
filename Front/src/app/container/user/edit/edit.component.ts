import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
  user: User;
  isAdmin: boolean;
  picturePath: string;
  themeColor: string;
  role: string;

  username: string;
  address: string;
  password1: string;
  password2: string;

  errUsername: boolean;
  errAddress: boolean;
  errPassword: string = '';

  errorMessageUsername: string = "Le nom d'utilisateur est requis (4-255).";
  errorMessageAddress: string = "L'adresse est requis (5-255).";
  errorMessagePassword: string = '';

  errorMessageServeur: string = '';

  constructor(
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void{
    this.isAdmin = this.route.snapshot.url[0].path === 'admin';

    this.themeColor = this._userService.getThemeColor();
    this.picturePath = this._userService.getRandomPicture(this.themeColor)
    if (!this.isAdmin) {
      this._userService.me()
      .subscribe(
        data => {
          this.user = data;
          this.role = this._userService.setRoleText(data.role_id);
        }
        )
    } else if (this.isAdmin) {
      let userId: string | null = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this._userService.getUserById(+userId).subscribe(
          data => {
            this.user = data;
            this.role = this._userService.setRoleText(data.role_id);
          }
        )
      }
    }
  }

  save() {
    let userReceipt = {
      username: this.username,
      address: this.address,
      password: this.password1
    }

    let myObject = Object.fromEntries(Object.entries(userReceipt).
      filter(([key, val]) => val !== undefined && val !== '' ));

    Object.entries(myObject).forEach(element => {
      if (element[0] === 'username'){
        this.errUsername = this._userService.usernameIsValid(element[1]);
      }
      if (element[0] === 'address'){
        this.errAddress = this._userService.addressIsValid(element[1]);
      }
      if (element[0] === 'password'){
        this.errPassword = this._userService.passwordIsValid(this.password1, this.password2);
      }
    });

    if (!this.errUsername && !this.errAddress && this.errPassword === '') {
      this._userService.update(this.user.id, myObject).subscribe(
        data => {
          if (this.isAdmin) {
            this.router.navigate(['admin/users']);
          } else {
            this.router.navigate(['profile']);
          }
        },
        error => {
          this.errorMessageServeur = error.error.message;
        }
      )
    }
  }

  cancel() {
    if (this.isAdmin) {
      this.router.navigate(['admin/users']);
    } else {
      this.router.navigate(['profile']);
    }
  }
}
