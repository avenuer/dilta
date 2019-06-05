import { AuthUserLoginComponent } from './admin-login/admin-login.component';
import { AuthUserSignupComponent } from './admin-signup/admin-signup.component';
import { ClientAuthWebRoutingModule } from './auth.routing';
import { AuthSharedModule } from '../components';
import { AuthenticationFeatureModule } from '../ngrx';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientSharedModule, SchoolFeatureNgrxModule } from '@dilta/client-shared';

@NgModule({
  imports: [
    CommonModule,
    AuthSharedModule,
    ClientAuthWebRoutingModule,
    AuthenticationFeatureModule,
    SchoolFeatureNgrxModule,
    ClientSharedModule
  ],
  providers: [],
  declarations: [AuthUserSignupComponent, AuthUserLoginComponent],
  exports: [AuthSharedModule]
})
export class AuthPagesModule {}
