import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AdminGridPageComponent,
  AdminGridPageModule,
  UserBiodataProfileComponent,
  UserBiodataProfileModule,
  UserBioDataFormPageComponent,
  UserBioDataFormPageModule
} from 'model-pages';

const routes: Routes = [
  {
    path: 'staffs',
    component: AdminGridPageComponent,
    children: [
      {
        path: 'details/:id',
        component: UserBiodataProfileComponent
      },
      {
        path: 'edit',
        component: UserBioDataFormPageComponent
      },
      {
        path: 'edit/authId',
        component: UserBioDataFormPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AdminGridPageModule,
    UserBiodataProfileModule,
    UserBioDataFormPageModule
  ],
  exports: [],
  declarations: []
})
export class AdminRouterModule {}
