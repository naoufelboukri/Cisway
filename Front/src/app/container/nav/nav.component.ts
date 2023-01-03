import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  user: User | null;

  constructor (
    protected _authService: AuthService
  ) { }

  ngOnInit(): void {
    
  }

  goToProfile() {

  }

  logout() {
    this._authService.logout();
  }
}
