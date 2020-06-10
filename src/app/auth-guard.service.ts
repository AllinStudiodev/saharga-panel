import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: NbAuthService, private router: Router) { }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          } else {
            this.authService.getToken();
          }
        }),
      );
  }
}
