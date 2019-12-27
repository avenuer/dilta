import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicSettingModule, AcademicSettingComponent } from 'model-pages';

const routes: Routes = [
  {
    path: '/:id',
    component: AcademicSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), AcademicSettingModule],
  exports: [RouterModule],
})
export class SettingsRouterModule {}
