import { Injectable } from '@angular/core';
import { TransportService } from '@dilta/electron-client';
import {
  Student,
  EntityNames,
  ModelOperations,
  FindQueryParam,
  SearchFindRequest,
  FindResponse,
  Record
} from '@dilta/shared';

@Injectable()
export class AcademicService {
  constructor(private transport: TransportService) {}

  findStudents(query: SearchFindRequest<Student>, params?: FindQueryParam) {
    return this.transport.modelAction<FindResponse<Student>>(
      EntityNames.Student,
      ModelOperations.Find,
      query,
      params
    );
  }

  findRecords(query: SearchFindRequest<Student>, params?: FindQueryParam) {
    return this.transport.modelAction<FindResponse<Record>>(
      EntityNames.Record,
      ModelOperations.Find,
      query,
      params
    );
  }
}
