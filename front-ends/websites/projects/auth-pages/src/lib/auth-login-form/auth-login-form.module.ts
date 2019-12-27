import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'client-shared';

import { AuthLoginFormComponent } from './auth-login-editor.component';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule],
  declarations: [AuthLoginFormComponent],
  exports: [AuthLoginFormComponent, MaterialModule]
})
export class AuthLoginFormModule {}
