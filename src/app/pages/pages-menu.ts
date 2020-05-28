import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "home-outline",
    link: "/pages/dashboard",
    home: true,
  },
  {
    title: "Group",
    icon: "home-outline",
    link: "/pages/group",
    home: true,
  },
  {
    title: "Category",
    icon: "home-outline",
    link: "/pages/category",
    home: true,
  },
  {
    title: "Satuan",
    icon: "home-outline",
    link: "/pages/satuan",
    home: true,
  },
  {
    title: "MAIN GOLONGAN",
    group: true,
  },
  {
    title: "Usulan",
    icon: "home-outline",
    link: "/pages/usulan",
    home: true,
  },

  // {
  //   title: 'Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
