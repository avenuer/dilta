import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AcademicRecordPageComponent,
  AcademicPageModule,
  RecordGridPageComponent,
  RecordGridPageModule,
  SubjectGridPageComponent,
  SubjectGridPageModule
} from 'overview-pages';

const routes: Routes = [
  {
    path: 'record',
    component: AcademicRecordPageComponent
  },
  {
    path: 'records',
    component: RecordGridPageComponent
  },
  {
    path: 'subjects/:id',
    component: SubjectGridPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AcademicPageModule,
    RecordGridPageModule,
    SubjectGridPageModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class RecordSubjectsRouteModule {}
