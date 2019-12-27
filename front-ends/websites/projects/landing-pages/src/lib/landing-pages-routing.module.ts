import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPagesModule } from './landing-pages.module';
import { FramePageComponent } from './pages/frame-page/frame-page.component';
import { AuthUserLoginPageModule, AuthUserLoginComponent } from 'auth-pages';

const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'auth/login', component: AuthUserLoginComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LandingPagesModule,
    AuthUserLoginPageModule
  ],
  exports: [RouterModule]
})
export class LandingPagesRoutingModule {}
