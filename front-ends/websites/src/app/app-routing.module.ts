import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPagesRoutingModule } from 'landing-pages';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./route-maps/auth.router').then(
        md => md.AuthRouterModule
      )
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./route-maps/marker.router').then(md => md.MarkerAppPagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LandingPagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
