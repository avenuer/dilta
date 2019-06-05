import { createFeatureSelector } from '@ngrx/store';
import { Authsuccess } from './auth.reducer';
import { AuthenticationFeatureName } from './authentication.module';

/** feature selector for selecting process state section fro the store */
export const AuthFeature = createFeatureSelector<Authsuccess>(
  AuthenticationFeatureName
);

export * from './auth.action';
export * from './auth.effect';
export * from './auth.reducer';
export * from './authentication.module';

