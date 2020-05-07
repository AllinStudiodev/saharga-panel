import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SatuanComponent } from "./satuan.component";
import {
  NbCardModule,
  NbLayoutModule,
  NbRadioModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbCheckboxModule,
  NbToastrModule,
  NbSpinnerModule,
  NbDialogModule,
  NbDialogRef,
} from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SatuanFormComponent } from "./satuan-form/satuan-form.component";

@NgModule({
  declarations: [SatuanComponent, SatuanFormComponent],
  imports: [
    CommonModule,
    NbCardModule,
    ThemeModule,
    NbCardModule,
    NbLayoutModule,
    NbRadioModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NbToastrModule,
    NbSpinnerModule,
    NbDialogModule,
  ],
  providers: [
    {
      provide: NbDialogRef,
    },
  ],
})
export class SatuanModule {}
