import { Component } from '@angular/core';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  redirectDelay: number = 0;
  strategy: string = '';

  constructor(
    private service: NbAuthService,
    protected router: Router) {
      this.logout()
  }

  logout(): void {
    setTimeout(() => {
      localStorage.removeItem('USER_INFO');
      localStorage.removeItem('auth_app_token');
      return this.router.navigate(['auth/login']);
    }, 500);
  }
}
