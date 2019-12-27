import { AuthEffects } from './auth.effect';
import { authReducer } from './auth.reducer';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, createFeatureSelector } from '@ngrx/store';
import { ClientAuthService } from './auth.service';
import { Authsuccess } from 'client-shared';

export const AuthenticationFeatureName = 'Auth';
/** feature selector for selecting process state section fro the store */
export const AuthFeature = createFeatureSelector<Authsuccess>(
  AuthenticationFeatureName
);

@NgModule({
  imports: [
    StoreModule.forFeature(AuthenticationFeatureName, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [],
  providers: [ClientAuthService]
})
export class AuthenticationFeatureModule {}
