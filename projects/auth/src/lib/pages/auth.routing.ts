import { AuthUserLoginComponent } from './admin-login/admin-login.component';
import { AuthUserSignupComponent } from './admin-signup/admin-signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'auth', children: [
    { path: 'signup', component: AuthUserSignupComponent },
    { path: 'login', component: AuthUserLoginComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientAuthWebRoutingModule { }

export const authRoutedComponents = [AuthUserSignupComponent, AuthUserLoginComponent];
