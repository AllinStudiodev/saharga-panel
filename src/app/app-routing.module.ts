import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: "pages",
    canActivate: [AuthGuardService],
    loadChildren: './pages/pages.module#PagesModule',

  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#NgxAuthModule',
  },
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
