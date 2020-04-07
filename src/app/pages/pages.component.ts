import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { APIService } from "../api.service";

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  // menu = MENU_ITEMS;

  menu = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/pages/dashboard',
      home: true,
    },
    {
      title: 'MAIN GOLONGAN',
      group: true,
    }
  ];

  constructor(
    private service: APIService,
    ) {
      console.log('ini service', this.service);
      this.service.getMenu().then(
        result => {
          result.forEach(element => {
            this.menu.push(element);
          });
          console.log(this.menu);
        }
      ).catch(
        error => {
          console.log(error);
        }
      )
    }
}
