import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'client-shared';
import { MarkerPagesModule, AcademicHomeComponent } from 'marker-pages';
import {
  UsersHomeDashboardComponent,
  UserHomeDashboardPageModule
} from 'overview-pages';

// routes for the overview page modules
const overview: Routes = [
  {
    path: 'levels-stats',
    loadChildren: () =>
      import('./level-stats.router').then(md => md.LevelStatRouterModule)
  },
  {
    path: 'record-subjects',
    loadChildren: () =>
      import('./record-subjects.router').then(
        md => md.RecordSubjectsRouteModule
      )
  },
  {
    path: 'students-list',
    loadChildren: () =>
      import('./students-list.router').then(md => md.StudentListRouterModule)
  }
];

// routes for model-pages module
const models: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admins.router').then(md => md.AdminRouterModule)
  },
  {
    path: 'managers',
    loadChildren: () =>
      import('./managers.router').then(md => md.ManagersRouterModule)
  },
  {
    path: 'parents',
    loadChildren: () =>
      import('./parents.router').then(md => md.ParentRouterModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings.router').then(md => md.SettingsRouterModule)
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students.router').then(md => md.StudentsRouterModule)
  }
];

const routes: Routes = [
  {
    path: '',
    component: AcademicHomeComponent,
    // redirect it to the home
    children: [
      { path: 'home', component: UsersHomeDashboardComponent },
      ...overview,
      ...models
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    RouterModule.forChild(routes),
    MarkerPagesModule,
    UserHomeDashboardPageModule
  ]
})
export class MarkerAppPagesModule {}
