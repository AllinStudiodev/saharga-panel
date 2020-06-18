/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import { NbAuthService } from '../../services/auth.service';
import { NbAuthResult } from '../../services/auth-result';
import { AuthService } from '../../auth.service'

@Component({
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRegisterComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];

  jenisKelamins = [
    { id: "Bapak", name: "Pria" },
    { id: "Ibu", name: "Wanita" }
  ];

  jenisTokos = [
    { id: "Elektronik", name: "Elektronik" },
    { id: "Bangunan", name: "Bangunan" },
    { id: "Pecah Belah", name: "Pecah Belah" },
    { id: "Alat-alat listrik", name: "Alat-alat listrik" },
    { id: "Saniter", name: "Saniter" },
    { id: "Lain-Lain", name: "Lain-Lain" }
  ];

  provinsis = [];

  vals = [];

  constructor(protected service2: AuthService,
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router) {


    this.user.jenisKelamin = this.jenisKelamins[0].id
    this.user.jenisToko = this.jenisTokos[0].id
    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  ngOnInit() {
    // this.service2.getProvinsi().then(res => {
    //   this.provinsis = res

    //   this.user.provinsi = this.provinsis[0].Kd_Provinsi
    //   this.cd.detectChanges();
    // }, err => {
    //   console.log(err);
    // });
  }

  register(): void {
    this.vals = []
    this.errors = this.messages = [];
    this.submitted = true;
    // console.log(this.user)
    if (this.user.provinsi) {
      this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
        this.submitted = false;
        if (result.isSuccess()) {
          this.messages = result.getMessages();
        } else {
          if (result.getResponse().status == 403) {
            this.vals.push(result.getResponse().error.message)
            this.errors = this.vals
          } else {
            this.errors = result.getErrors();
          }
          console.log(result)
        }

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      });
    } else {
      alert('Silahkan isi Provinsi terlebih dahulu')
    }

  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
