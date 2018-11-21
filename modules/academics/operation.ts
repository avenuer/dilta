import { Injectable } from '@dilta/core';
import { ScoreService } from '@dilta/database';
import { FindQueryParam } from '@dilta/shared';

@Injectable()
class RecordOperations {
  constructor(private ScoreService: ScoreService) {

  }

  findRecord(teacherId: string,  params: FindQueryParam) {

  }
}
