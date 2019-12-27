import { NgModule } from '@angular/core';
import { ClientSharedModule, MaterialModule } from 'client-shared';

import { AuthUserLoginComponent } from './admin-login.component';
import { SchoolFeatureNgrxModule } from 'school-pages';
import { AuthenticationFeatureModule } from 'auth-store';
import { AuthLoginFormModule } from '../auth-login-form/auth-login-form.module';

@NgModule({
  imports: [
    MaterialModule,
    AuthenticationFeatureModule,
    SchoolFeatureNgrxModule,
    AuthLoginFormModule,
    ClientSharedModule,
  ],
  declarations: [
    AuthUserLoginComponent,
  ],
  providers: [],
  exports: [
    AuthUserLoginComponent,
  ]
})
export class AuthUserLoginPageModule {}
