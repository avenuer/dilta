import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  StudentGridPageComponent,
  StudentGridPageModule
} from 'overview-pages';

const routes: Routes = [
  {
    path: 'students',
    component: StudentGridPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), StudentGridPageModule],
  exports: [],
  declarations: []
})
export class StudentListRouterModule {}
