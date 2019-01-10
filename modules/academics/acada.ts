import { ScoreSheet } from './score-sheet';
import { RecordOperations } from './subject-records';
import { Injectable, Module } from '@dilta/core';
import { DatabaseModule } from '@dilta/database';
import { ClassStaticsDetails } from './class-statics-details';
import { AcademicPromotion } from './promotion';

@Module({
  imports: [DatabaseModule],
  providers: [RecordOperations, ScoreSheet, ClassStaticsDetails, AcademicPromotion]
})
@Injectable()
export class AcademicModules {
  constructor() {}
}
