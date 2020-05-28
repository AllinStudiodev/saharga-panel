import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { NbContextMenuModule, NbProgressBarModule, NbCardModule, NbSelectModule, NbCheckboxModule, NbInputModule, NbDatepickerModule, NbIconModule, NbButtonModule, NbToastrModule, NbPopoverModule, NbListModule, NbSpinnerModule, NbDialogModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemImportComponent } from './item-import/item-import.component';
import { ItemFormComponent } from './item-form/item-form.component';

@NgModule({
  declarations: [ItemComponent, ItemImportComponent, ItemFormComponent],
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbProgressBarModule,
    NbContextMenuModule,
    NbCardModule, NbSelectModule, NbCheckboxModule, NbInputModule, NbDatepickerModule, NbIconModule, NbButtonModule, NbToastrModule, NbPopoverModule, NbListModule, NbSpinnerModule, NbDialogModule
  ]
})
export class ItemModule { }
