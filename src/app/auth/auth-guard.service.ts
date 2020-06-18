import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from './services';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }else{
            this.authService.getToken().subscribe((value) => {
              // console.log(value,'1')
              // this.authService.refreshToken('username', { token: value['token'] }).subscribe((message) => {
                // console.log(message)
              // });
            });
          }
        }),
      );
  }
}