import { Component } from "@angular/core";

import { MENU_ITEMS } from "./pages-menu";
import { APIService } from "../api.service";
import { NbMenuItem } from "@nebular/theme";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  menuAdministrator = [
    {
      title: "DASHBOARD",
      icon: "home-outline",
      link: "/pages/dashboard",
      home: true,
    },
    {
      title: "PENGELOLAAN USER",
      icon: "people-outline",
      home: true,
      children: [
        {
          title: 'MASTER USER',
          icon: "people-outline",
          link: '/pages/user',
        },
        {
          title: 'PENGELOLAAN TIPE USER',
          icon: "people-outline",
          link: '/pages/type-user',
        },
      ]
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
      title: "PENGATURAN ITEMS",
      icon: "settings-outline",
      children: [
        {
          title: "PENGELOLAAN SATUAN",
          icon: "pantone-outline",
          link: "/pages/satuan",
          home: true,
        },
        {
          title: "PENGELOLAAN TAHUN",
          icon: "calendar-outline",
          link: "/pages/tahun",
          home: true,
        },
        {
          title: "PENGELOLAAN TIPE SSH",
          icon: "people-outline",
          link: "/pages/type-ssh",
          home: true,
        },
      ]
    },
    {
      title: "LAPORAN",
      group: true,
    },
    {
      title: "LAPORAN UPLOAD DATA",
      icon: "file-text-outline",
      link: "/pages/laporan-upload-data",
      home: true,
    },
    {
      title: "LAPORAN UPLOAD BUKTI SURVEY",
      icon: "file-text-outline",
      link: "/pages/laporan-upload-bukti-survey",
      home: true,
    },
    {
      title: "MAIN GOLONGAN",
      group: true,
    },
    {
      title: "PENGELOLAAN GALLERY",
      icon: "camera-outline",
      link: "/pages/gallery",
      home: true,
    },
    {
      title: "PENGELOLAAN NASKAH PDF",
      icon: "file-outline",
      link: "/pages/naskah",
      home: true,
    },
    {
      title: "PENGELOLAAN USULAN",
      icon: "paper-plane-outline",
      link: "/pages/usulan",
      home: true,
    },
  ];

  menuUser = [
    {
      title: "DASHBOARD",
      icon: "home-outline",
      link: "/pages/dashboard",
      home: true,
    },
    {
      title: "LAPORAN",
      group: true,
    },
    {
      title: "LAPORAN UPLOAD DATA",
      icon: "file-text-outline",
      link: "/pages/laporan-upload-data",
      home: true,
    },
    {
      title: "LAPORAN UPLOAD BUKTI SURVEY",
      icon: "file-text-outline",
      link: "/pages/laporan-upload-bukti-survey",
      home: true,
    },
    {
      title: "MAIN GOLONGAN",
      group: true,
    },
    {
      title: "PENGELOLAAN NASKAH PDF",
      icon: "file-outline",
      link: "/pages/naskah",
      home: true,
    },
    {
      title: "PENGELOLAAN USULAN",
      icon: "paper-plane-outline",
      link: "/pages/usulan",
      home: true,
    },
  ];

  menu =[];

  loading = false;

  constructor(private service: APIService) {
    this.service
      .getMenu()
      .then((result) => {
        console.log(JSON.parse(localStorage.getItem('USER_INFO')).position)
        if (JSON.parse(localStorage.getItem('USER_INFO')).position == 'administrator') {
          this.menu = this.menuAdministrator;
        } else {
          this.menu = this.menuUser;
        }

        result.forEach((element) => {
          this.menu.push(element);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
