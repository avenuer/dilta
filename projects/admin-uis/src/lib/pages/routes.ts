import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentBioProfileComponent } from './parent-bio-profile/parent-bio-profile.component';
import { ParentFormEditorComponent } from './parent-form-editor/parent-form-editor.component';
import { StudentBioFormEditorComponent } from './student-bio-form-editor/student-bio-form-editor.component';
import { StudentBioProfileComponent } from './student-bio-profile/student-bio-profile.component';
import { UserBiodataProfileComponent } from './user-biodata-profile/user-biodata-profile.component';
import { UserBioDataFormPageComponent } from './user-biodata-setup/admin-biodata.component';
import { SchoolDataFormComponent } from './school-biodata-form/school.component';
import { ManagerDataFormComponent } from './managers-biodata-form/AdminSetup.component';

const school: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'school/:id',
        component: SchoolDataFormComponent
      },
      {
        path: 'manager/:id',
        component: ManagerDataFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(school)],
  exports: [RouterModule]
})
export class SchoolRouteModule {}

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [],
//   declarations: []
// })
// export class Module {}
// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [],
//   declarations: []
// })
// export class Module {}
