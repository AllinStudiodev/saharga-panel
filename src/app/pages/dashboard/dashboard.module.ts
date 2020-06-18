import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbCardModule,
    ThemeModule,
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
    ChartModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
