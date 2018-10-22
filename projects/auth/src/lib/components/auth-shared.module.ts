import { AuthLoginFormComponent } from './auth-login-form/auth-login-editor.component';
import { AuthSignupFormComponent } from './auth-signup-form/auth-signup-editor.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dilta/client-shared';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule],
  declarations: [AuthLoginFormComponent, AuthSignupFormComponent],
  exports: [AuthLoginFormComponent, AuthSignupFormComponent, MaterialModule]
})
export class AuthSharedModule {}
