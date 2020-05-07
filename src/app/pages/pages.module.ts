import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PagesRoutingModule } from "./pages-routing.module";

import { ItemModule } from "./item/item.module";
import { GroupModule } from "./group/group.module";
import { CategoryModule } from "./category/category.module";
import { SatuanModule } from "./satuan/satuan.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ItemModule,
    GroupModule,
    CategoryModule,
    SatuanModule,
  ],
  declarations: [PagesComponent],
})
export class PagesModule {}
