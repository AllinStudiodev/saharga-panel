import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { ThemeModule } from "../../@theme/theme.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GalleryComponent } from './gellery.component';
import { GalleryFormComponent } from './gellery-form/gellery-form.component';

@NgModule({
  declarations: [GalleryComponent, GalleryFormComponent],
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
export class GalleryModule { }
