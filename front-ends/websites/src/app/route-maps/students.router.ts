import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  StudentBioProfileComponent,
  StudentBioProfileModule,
  StudentBioFormEditorComponent,
  StudentBioFormEditorModule
} from 'model-pages';

const routes: Routes = [
  {
    path: 'profile/:id',
    component: StudentBioProfileComponent
  },
  {
    path: 'edit',
    component: StudentBioFormEditorComponent
  },
  {
    path: 'edit/:id',
    component: StudentBioFormEditorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StudentBioProfileModule,
    StudentBioFormEditorModule
  ],
  exports: [],
  declarations: []
})
export class StudentsRouterModule {}
