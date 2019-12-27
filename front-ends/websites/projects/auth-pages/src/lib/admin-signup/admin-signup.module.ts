import { NgModule } from '@angular/core';
import { ClientSharedModule, MaterialModule } from 'client-shared';
import { SchoolFeatureNgrxModule } from 'school-pages';
import { AuthenticationFeatureModule } from 'auth-store';

import { AuthUserSignupComponent } from './admin-signup.component';
import { AuthSignupFormModule } from '../auth-signup-form/auth-signup-form.module';

@NgModule({
  imports: [
    MaterialModule,
    AuthenticationFeatureModule,
    SchoolFeatureNgrxModule,
    AuthSignupFormModule,
    ClientSharedModule,
  ],
  declarations: [
    AuthUserSignupComponent,
  ],
  providers: [],
  exports: [
    AuthUserSignupComponent,
  ]
})
export class AuthUserSignupPageModule {}
