import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterDirection } from './direction.service';
import { RouterState } from './router-state.service';
import { ClientUtilService } from './util.service';

@NgModule({
  imports: [RouterModule],
  providers: [RouterDirection, RouterState, ClientUtilService]
})
export class ClientSharedModule {}
