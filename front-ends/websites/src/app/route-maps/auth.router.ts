import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthUserLoginComponent, AuthUserLoginPageModule } from 'auth-pages';

const routes: Routes = [
  {
    path: 'login',
    component: AuthUserLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthUserLoginPageModule],
  exports: [],
  declarations: []
})
export class AuthRouterModule {}
