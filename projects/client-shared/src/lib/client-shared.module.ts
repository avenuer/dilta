import { RouterDirection } from './services/direction.service';
import { RouterState } from './services/router-state.service';
import { ClientUtilService } from './services/util.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
  providers: [RouterDirection, RouterState, ClientUtilService]
})
export class ClientSharedModule {}
