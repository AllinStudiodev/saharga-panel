import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TypeUserComponent } from "./type-user.component";
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
  NbContextMenuModule,
} from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TypeUserFormComponent } from "./type-user-form/type-user-form.component";

@NgModule({
  declarations: [TypeUserComponent, TypeUserFormComponent],
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
    NbContextMenuModule
  ],
  providers: [
    {
      provide: NbDialogRef,
    },
  ],
})
export class TypeUserModule {}
