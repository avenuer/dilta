import { Module, Injectable } from '@dilta/core';
import { databaseServices } from './providers';
import { UtilModule } from '@dilta/util';

@Module({
  imports: [UtilModule],
  providers: databaseServices
})
@Injectable()
export class DatabaseModule {
  constructor() {}
}
