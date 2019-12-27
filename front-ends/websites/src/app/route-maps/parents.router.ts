import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ParentBioProfileComponent,
  ParentBioProfileModule,
  ParentFormEditorModule,
  ParentFormEditorComponent
} from 'model-pages';

const routes: Routes = [
  {
    path: 'profile/:phoneNo',
    component: ParentBioProfileComponent
  },
  {
    path: 'edit/:id',
    component: ParentFormEditorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ParentBioProfileModule,
    ParentFormEditorModule
  ],
  exports: [RouterModule],
})
export class ParentRouterModule {}
