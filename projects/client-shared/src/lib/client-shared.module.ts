import { RouterDirection } from './services/direction.service';
import { RouterState } from './services/router-state.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
  providers: [RouterDirection, RouterState]
})
export class ClientSharedModule {}
