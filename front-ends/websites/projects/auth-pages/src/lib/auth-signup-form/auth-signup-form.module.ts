import { AuthSignupFormComponent } from './auth-signup-editor.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'client-shared';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule],
  declarations: [ AuthSignupFormComponent],
  exports: [AuthSignupFormComponent, MaterialModule]
})
export class AuthSignupFormModule {}
