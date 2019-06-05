import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicSettingComponent } from './academic-setting.component';

const routes: Routes = [
  { path: 'academic-config', component: AcademicSettingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicSettingRoutingModule { }
