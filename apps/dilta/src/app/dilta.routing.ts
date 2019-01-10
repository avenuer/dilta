import { NgModule } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { AppliationOutputDir } from '@dilta/shared'

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: AppliationOutputDir.program, redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiltaAppRoutingModule { }
