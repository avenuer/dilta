import { NgModule } from '@angular/core';
import {
  AdminUiSharedModule,
  ParentUiSharedModule,
  SchoolUiSharedModule,
} from './components/modules';
import {
  ParentPageModule,
  SchoolPageModule,
  StudentPageModule,
  UserPageModule
} from './pages/modules';

@NgModule({
  imports: [
    SchoolUiSharedModule,
    SchoolPageModule,
    AdminUiSharedModule,
    UserPageModule,
    ParentUiSharedModule,
    ParentPageModule,
    StudentPageModule,
  ],
  declarations: [],
  exports: [
    SchoolPageModule,
    UserPageModule,
    ParentPageModule,
    StudentPageModule,
  ]
})
export class AdminUisModule {}
