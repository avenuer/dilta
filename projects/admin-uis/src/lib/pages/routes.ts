import { AdminGridPageComponent } from './admin-grid-page/admin-grid-page.component';
import { ManagerDataFormComponent } from './managers-biodata-form/AdminSetup.component';
import { SchoolDataFormComponent } from './school-biodata-form/school.component';
import { StudentBioFormEditorComponent } from './student-bio-form-editor/student-bio-form-editor.component';
import { StudentBioProfileComponent } from './student-bio-profile/student-bio-profile.component';
import { UserBiodataProfileComponent } from './user-biodata-profile/user-biodata-profile.component';
import { UserBioDataFormPageComponent } from './user-biodata-setup/admin-biodata.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const user: Routes = [
  {
    path: 'user',
    children: [
      { path: 'biodata/:authId', component: UserBioDataFormPageComponent },
      { path: 'profile/:id', component: UserBiodataProfileComponent },
      {
        path: 'list',
        component: AdminGridPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(user)],
  exports: [RouterModule]
})
export class UserRouteModule {}

const student: Routes = [
  { path: 'admin', children: [
    { path: 'student', component:  StudentBioFormEditorComponent},
    { path: 'students/:id', component: StudentBioProfileComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(student)],
  exports: [RouterModule],
  declarations: []
})
export class StudentRouteModule {}


// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [],
//   declarations: []
// })
// export class Module {}
