import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDataFormModule, ManagerDataFormComponent } from 'model-pages';

const routes: Routes = [
  {
    path: 'edit',
    component: ManagerDataFormComponent
  },
  {
    path: 'edit/:id', // the id params is meant for the schoolId
    component: ManagerDataFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ManagerDataFormModule],
  exports: [RouterModule],
  declarations: []
})
export class ManagersRouterModule {}
