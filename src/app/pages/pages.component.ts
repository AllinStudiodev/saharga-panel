import { Component } from "@angular/core";

import { MENU_ITEMS } from "./pages-menu";
import { APIService } from "../api.service";
import { NbMenuItem } from "@nebular/theme";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu =  [
    {
      title: "DASHBOARD",
      icon: "home-outline",
      link: "/pages/dashboard",
      home: true,
    },
    {
      title: "PENGELOLAAN USER",
      icon: "people-outline",
      link: "/pages/user",
      home: true,
    },
    {
      title: "PENGELOLAAN GROUP",
      icon: "grid-outline",
      link: "/pages/group",
      home: true,
    },
    {
      title: "PENGELOLAAN CATEGORY",
      icon: "keypad-outline",
      link: "/pages/category",
      home: true,
    },
    {
      title: "PENGELOLAAN SATUAN",
      icon: "pantone-outline",
      link: "/pages/satuan",
      home: true,
    },
    {
      title: "MAIN GOLONGAN",
      group: true,
    },
    {
      title: "PENGELOLAAN USULAN",
      icon: "paper-plane-outline",
      link: "/pages/usulan",
      home: true,
    },
  ];

  loading = false;

  constructor(private service: APIService) {
      this.service
      .getMenu()
      .then((result) => {
        result.forEach((element) => {
          this.menu.push(element);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
