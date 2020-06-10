import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from "./user/user-form/user-form.component";
import { GroupComponent } from "./group/group.component";
import { GroupFormComponent } from "./group/group-form/group-form.component";
import { CategoryComponent } from "./category/category.component";
import { CategoryFormComponent } from "./category/category-form/category-form.component";
import { ItemComponent } from "./item/item.component";
import { ItemImportComponent } from "./item/item-import/item-import.component";
import { ItemFormComponent } from "./item/item-form/item-form.component";
import { SatuanComponent } from "./satuan/satuan.component";
import { SatuanFormComponent } from "./satuan/satuan-form/satuan-form.component";
import { UsulanComponent } from "./usulan/usulan.component";
import { UsulanFormComponent } from "./usulan/usulan-form/usulan-form.component";
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },

      {
        path: "user",
        component: UserComponent,
      },
      {
        path: "user-form/:id",
        component: UserFormComponent,
      },

      {
        path: "group",
        component: GroupComponent,
      },
      {
        path: "group-form/:id",
        component: GroupFormComponent,
      },
      {
        path: "usulan",
        component: UsulanComponent,
      },
      {
        path: "usulan-form/:id",
        component: UsulanFormComponent,
      },
      {
        path: "category",
        component: CategoryComponent,
      },
      {
        path: "category-form/:id",
        component: CategoryFormComponent,
      },
      {
        path: "items-form/:params/:categori_id",
        component: ItemFormComponent,
      },
      {
        path: "items-import/:categori_id",
        component: ItemImportComponent,
      },
      {
        path: "items/:id",
        component: ItemComponent,
      },
      {
        path: "satuan",
        component: SatuanComponent,
      },
      {
        path: "satuan-form/:id",
        component: SatuanFormComponent,
      },
      {
        path: "change-password",
        component: ChangePasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
