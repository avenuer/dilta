import { NgModule } from '@angular/core';
import { EntityNames } from '@dilta/models';
import { UtilService } from '@dilta/util';
import { ApolloModule } from 'apollo-angular';
import { EntityDataService, NgrxDataModule } from 'ngrx-data';
import { UserEntityGQLService, UserEntityService } from './dream-users.entity';
import { DreamUserService } from './dream-users.service';


@NgModule({
  imports: [NgrxDataModule, ApolloModule],
  providers: [DreamUserService, UserEntityService, UserEntityGQLService, UtilService]
})
export class DreamUserNgrxModule {
  constructor(eds: EntityDataService, userQql: UserEntityGQLService) {
    eds.registerService(EntityNames.User, userQql);
  }
}
