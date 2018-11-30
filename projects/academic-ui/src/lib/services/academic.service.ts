import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from '@dilta/electron-client';
import { student } from '@dilta/gen';
import {
  EntityNames,
  FindQueryParam,
  FindResponse,
  ModelOperations,
  Record,
  SearchFindRequest,
  Student,
  StudentSheet,
  AcademicActions,
  StudentReportSheet
} from '@dilta/shared';
import { first } from 'rxjs/operators';

@Injectable()
export class AcademicService {
  constructor(private transport: TransportService, private router: Router) {}

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

  viewRecord(rec: Record) {
    this.router.navigate(['academics', 'subjects', rec.id]);
  }

  studentReportSheet(sheet: StudentSheet) {
    return this.transport.execute<StudentReportSheet>(
      AcademicActions.StudentReportSheet,
      sheet
    );
  }

  count(no: number) {
    for (let i = 0; i < no; i++) {
      this.transport
        .modelAction<Student>(
          EntityNames.Student,
          ModelOperations.Create,
          student()
        )
        .pipe(first())
        .subscribe(console.log);
    }
  }
}
