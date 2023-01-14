import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor (
    private _userService: UserService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
  
    return new Observable(
      (observer) => {
        return new Observable<boolean>(
          profile => {
            this._userService.me().subscribe(
              data => {
                if (data.role_id === 1) {
                  profile.next(true);
                } else {
                  profile.error(false);
                }
                profile.complete();
              }
            )
          }
        ).subscribe(
          profile => {
            observer.next(profile);
          },
          err => {
            this.router.navigate(['']);
            console.log(err);
          }
        )
      }
    );
  
  }
  
}
