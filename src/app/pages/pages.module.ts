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
import { UsulanModule } from "./usulan/usulan.module";
import { UserModule } from "./user/user.module";
import { TypeUserModule } from "./type-user/type-user.module";
import { ChangePasswordModule } from './change-password/change-password.module';
import { LaporanUploadDataModule } from './laporan-upload-data/laporan-upload-data.module';
import { LaporanUploadDataDetailModule } from './laporan-upload-data-detail/laporan-upload-data-detail.module';
import { LaporanUploadBuktiSurveyModule } from './laporan-upload-bukti-survey/laporan-upload-bukti-survey.module';
import { NaskahModule } from './naskah/naskah.module';

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
    UsulanModule,
    UserModule,
    ChangePasswordModule,
    LaporanUploadDataModule,
    LaporanUploadDataDetailModule,
    LaporanUploadBuktiSurveyModule,
    NaskahModule
  ],
  declarations: [PagesComponent],
})
export class PagesModule {}
