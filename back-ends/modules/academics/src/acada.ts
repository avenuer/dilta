import { ScoreSheet } from './score-sheet';
import { RecordOperations } from './subject-records';
import { Injectable, Module } from '@dilta/core';
import { DroneNetworkModule } from '@dilta/network';
import { ClassStaticsDetails } from './class-statics-details';
import { AcademicPromotion } from './promotion';

@Module({
  imports: [DroneNetworkModule],
  providers: [RecordOperations, ScoreSheet, ClassStaticsDetails, AcademicPromotion]
})
@Injectable()
export class AcademicModules {
  constructor() {}
}
