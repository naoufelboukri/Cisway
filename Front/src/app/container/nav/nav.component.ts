import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  constructor (
    protected _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  goToProfile() {

  }

  goToBag() {
    console.log('added')
  }
  
  goToAccount() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this._authService.logout();
  }
}
