import { AuthEffects } from './auth.effect';
import { authReducer } from './auth.reducer';
import { ClientAuthService } from '../services/auth.service';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

export const AuthenticationFeatureName = 'Auth';

@NgModule({
  imports: [
    StoreModule.forFeature(AuthenticationFeatureName, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [],
  providers: [ClientAuthService]
})
export class AuthenticationFeatureModule {}
