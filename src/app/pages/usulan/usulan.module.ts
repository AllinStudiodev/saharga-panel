import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagInputModule } from 'ngx-chips';

import {
  NbProgressBarModule,
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

import { UsulanComponent } from './usulan.component';
import { UsulanFormComponent } from './usulan-form/usulan-form.component';

@NgModule({
  declarations: [UsulanComponent, UsulanFormComponent],
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
    TagInputModule,
    NbProgressBarModule
  ],
  providers: [
    {
      provide: NbDialogRef,
    },
  ],
})
export class UsulanModule { }
