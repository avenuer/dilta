import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractTransportService } from '@dilta/electron-client';
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
  StudentReportSheet,
  schoolClassValueToKey,
  schoolTermValueToKey,
  ClassDetailedStat
} from '@dilta/shared';
import {  map, combineLatest } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { schoolFeature } from '@dilta/client-shared';
import { AuthFeature } from 'projects/auth/src/lib/ngrx';

@Injectable()
export class AcademicService {
  constructor(
    private transport: AbstractTransportService,
    private router: Router,
    private store: Store<any>
  ) {}

  findStudents(query: SearchFindRequest<Student>, params?: FindQueryParam) {
    return this.transport.modelAction<FindResponse<Student>>(
      EntityNames.Student,
      ModelOperations.Find,
      query,
      params
    );
  }

  findRecords(query: SearchFindRequest<Student>, params?: FindQueryParam) {
    return this.transport
      .modelAction<FindResponse<Record>>(
        EntityNames.Record,
        ModelOperations.Find,
        query,
        params
      )
      .pipe(
        map(res => {
          res.data = res.data.map(rec => {
            (rec as any).term = schoolTermValueToKey(rec.term);
            (rec as any).class = schoolClassValueToKey(rec.class);
            return rec;
          });
          return res;
        })
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

  teacherAndSchoolId() {
    return this.store
      .select(schoolFeature)
      .pipe(combineLatest(this.store.select(AuthFeature)))
      .pipe(
        map(([school, auth]) => {
          return {
            teacherId: auth.details.id,
            school: school.details.id
          };
        })
      );
  }

  levelStatics() {
    return this.transport.execute<ClassDetailedStat[]>(
      AcademicActions.ClassStatDetails
    );
  }

}
