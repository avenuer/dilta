import { ScoreSheet } from './score-sheet';
import { RecordOperations } from './subject-records';
import { Injectable, Module } from '@dilta/core';
import { DatabaseModule } from '@dilta/database';

@Module({
  imports: [DatabaseModule],
  providers: [RecordOperations, ScoreSheet]
})
@Injectable()
export class AcademicModules {
  constructor() {}
}
