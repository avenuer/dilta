import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LienscePageComponent } from './liensce-page.component';

const routes: Routes = [{
  path: 'liensce-page',
  component: LienscePageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class WebLienscePageRouteModule { }
