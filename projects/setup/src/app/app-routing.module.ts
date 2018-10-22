import { LiensceKeyComponent } from './pages/LiensceKey';
import { SetupDoneComponent } from './pages/setup-done';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LiensceKeyComponent },
  { path: 'done', component: SetupDoneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
