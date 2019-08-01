import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LevelStaticDetailsPageComponent,
  LevelStaticDetailsPageModule,
  LevelsStudentComponent,
  LevelsStudentModule
} from 'overview-pages';

const routes: Routes = [
  {
    path: '',
    component: LevelStaticDetailsPageComponent,
  },
  {
    path: 'levels/:id',
    component: LevelsStudentComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LevelStaticDetailsPageModule,
    LevelsStudentModule
  ],
  exports: [],
  declarations: []
})
export class LevelStatRouterModule {}
