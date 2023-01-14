import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, OnInit {

  isAdmin: boolean = false;

  constructor (
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._userService.me().subscribe(
      data => {
        this.isAdmin = data.role_id === 1;
      }
    )
  }

  canActivate(): boolean {
    if (this.isAdmin) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
  
}
