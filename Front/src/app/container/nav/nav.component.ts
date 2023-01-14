import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  isAdmin: boolean | null = false;

  constructor (
    protected _authService: AuthService,
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('dxdc');
    this._userService.me().subscribe(
      data => {
        if (data.role_id === 1) {
          this.isAdmin = true;
        }
      },
      err => {
        this.isAdmin = null;
      }
    )
  }

  goToProfile() {

  }

  goToBag() {
    this.router.navigate(['/panier']);
  }
  
  goToAccount() {
    // this._userService.me().subscribe(
    //   data => { 
    //     this.router.navigate(['/profile'], { state: {data: data} })
    //   }
    // )
    this.router.navigate(['/profile']);
  }

  goToAdmin() {
    this.router.navigate(['admin']);
  }

  logout() {
    this.router.navigate(['']);
    this._authService.logout();
  }
}
