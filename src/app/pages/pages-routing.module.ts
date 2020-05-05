import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemComponent } from "./item/item.component";
import { GroupComponent } from './group/group.component';
import { ItemImportComponent } from './item/item-import/item-import.component';
import { ItemFormComponent } from './item/item-form/item-form.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'group',
      component: GroupComponent,
    },
    {
      path: 'items-form/:params/:categori_id',
      component: ItemFormComponent,
    },
    {
      path: 'items-import/:categori_id',
      component: ItemImportComponent,
    },
    {
      path: 'items/:id',
      component: ItemComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
