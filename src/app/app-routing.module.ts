import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

// import {
//   NbAuthComponent,
//   NbLoginComponent,
//   NbLogoutComponent,
//   NbRegisterComponent,
//   NbRequestPasswordComponent,
//   NbResetPasswordComponent,
// } from "@nebular/auth";

import { NbAuthComponent } from './auth/components/auth.component';
import { NbLoginComponent } from './auth/components/login/login.component';
import { NbRegisterComponent } from './auth/components/register/register.component';
import { NbLogoutComponent } from './auth/components/logout/logout.component';
import { NbRequestPasswordComponent } from './auth/components/request-password/request-password.component';
import { NbResetPasswordComponent } from './auth/components/reset-password/reset-password.component';

import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: "pages",
    canActivate: [AuthGuardService],
    loadChildren: './pages/pages.module#PagesModule',

  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  // {
  //   path: 'auth',
  //   loadChildren: './auth/auth.module#NgxAuthModule',
  // },
  { path: "", redirectTo: "pages", pathMatch: "full" },
  { path: "**", redirectTo: "pages" },
];

const config: ExtraOptions = {
  useHash: true,
  // onSameUrlNavigation: "reload",
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
