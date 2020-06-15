import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaskahComponent } from './naskah.component';
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
  NbProgressBarModule,
} from "@nebular/theme";
import { NaskahFormComponent } from './naskah-form/naskah-form.component';

import { ThemeModule } from "../../@theme/theme.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [NaskahComponent, NaskahFormComponent],
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
    NbProgressBarModule
  ],
  providers: [
    {
      provide: NbDialogRef,
    },
  ],
})
export class NaskahModule { }
