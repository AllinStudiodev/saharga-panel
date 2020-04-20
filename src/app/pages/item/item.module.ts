import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { NbCardModule, NbSelectModule, NbCheckboxModule, NbInputModule, NbDatepickerModule, NbIconModule, NbButtonModule, NbToastrModule, NbPopoverModule, NbListModule, NbSpinnerModule, NbDialogModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemComponent],
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbCardModule, NbSelectModule, NbCheckboxModule, NbInputModule, NbDatepickerModule, NbIconModule, NbButtonModule, NbToastrModule, NbPopoverModule, NbListModule, NbSpinnerModule, NbDialogModule
  ]
})
export class ItemModule { }
