import { SchoolDataFormComponent } from './school-biodata-form/school.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const school: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'school/:id',
        component: SchoolDataFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(school)],
  exports: [RouterModule]
})
export class SchoolRouteModule {}
