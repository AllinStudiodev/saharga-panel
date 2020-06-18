import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TypeSshComponent } from "./type-ssh.component";
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
import { TypeSshFormComponent } from "./type-ssh-form/type-ssh-form.component";

@NgModule({
  declarations: [TypeSshComponent, TypeSshFormComponent],
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
export class TypeSshModule {}
