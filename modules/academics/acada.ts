import { RecordOperations } from './operation';
import { Injectable, Module } from '@dilta/core';
import { DatabaseModule } from '@dilta/database';

@Module({
  imports: [DatabaseModule],
  providers: [RecordOperations]
})
@Injectable()
export class AcademicModules {
  constructor() {}
}
