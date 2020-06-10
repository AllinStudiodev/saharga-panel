import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { NbAuthModule } from '@nebular/auth';
import { NbSpinnerModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbLayoutModule, NbInputModule, NbDialogModule, NbDialogRef } from '@nebular/theme';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbAuthModule,
    NbSpinnerModule,
    NbAlertModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbDialogModule.forChild()
  ],
  providers: [
    {
      provide: NbDialogRef,
    },
  ],
})
export class ChangePasswordModule { }
