import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { APIService } from '../../api.service';
import { NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: ChangePassword = {};
  loading = false;

  constructor(
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected apiService: APIService,
    protected cd: ChangeDetectorRef,
    private router: Router
  ) {

    this.user.username = JSON.parse(localStorage.getItem('USER_INFO')).name;

    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');
  }

  ngOnInit() {
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  resetPass(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.apiService.updatePassword(this.user).then(
      (res) => {
        this.submitted = false;
        this.messages.push(res.message)
        this.router.navigate(["auth/login"]);
        this.cd.detectChanges();
      }
      , err => {
        this.submitted = false;
        this.errors.push(err.error.message)
        this.cd.detectChanges();
      }
    )
  }
}

export interface ChangePassword {
  username?;
  oldPassword?;
  password?;
  confirmationPassword?;
}

