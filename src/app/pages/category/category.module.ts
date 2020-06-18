import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryComponent } from "./category.component";
import { CKEditorModule } from 'ng2-ckeditor';
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
import { CategoryFormComponent } from "./category-form/category-form.component";

@NgModule({
  declarations: [CategoryComponent, CategoryFormComponent],
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
    NbProgressBarModule,
    CKEditorModule
  ],
  providers: [
    {
      provide: NbDialogRef,
    },
  ],
})
export class CategoryModule {}
