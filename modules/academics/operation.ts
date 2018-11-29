import { Action, Injectable } from '@dilta/core';
import { RecordService, StudentService, SubjectService } from '@dilta/database';
import {
  AcademicActions,
  AcademicSubject,
  Student,
  Subject,
  SubjectRecords
  } from '@dilta/shared';
import * as uuidRandom from 'uuid/v4';

@Injectable()
export class RecordOperations {
  constructor(
    private record: RecordService,
    private subject: SubjectService,
    private student: StudentService
  ) {}

  /**
   * cleans and update the student record when it's done
   *
   * @param {AcademicSubject} record
   * @returns
   * @memberof RecordOperations
   */
  @Action(AcademicActions.UpdateSubjectRecord)
  async updateSubjectRecord(record: AcademicSubject) {
    const { name, ...details } = record;
    if (!record.id) {
      return this.subject.create$(details);
    }
    return this.subject.update$(record.id, details);
  }

  /**
   * retrieves the subject and student academic records mapped
   *
   * @param {string} recordId
   * @returns {Promise<SubjectRecords>}
   * @memberof RecordOperations
   */
  @Action(AcademicActions.SubjectRecord)
  async subjectRecord(recordId: string): Promise<SubjectRecords> {
    const record = await this.record.retrieve$({ id: recordId });
    if (record) {
      const records = await this.subject.find$({ recordId });
      const students = await this.student.find$({ class: record.class });
      const data = this.mapAcademicSubject(
        this.recordIDMap(records.data),
        students.data
      );
      return { record, data };
    }
    throw recordNeverExist;
  }

  /**
   * maps the student name to their id
   *
   * @memberof RecordOperations
   */
  mapAcademicSubject(
    recordMap: Map<string, Subject>,
    students: Student[]
  ): AcademicSubject[] {
    return students.map(e => {
      const record: Subject = recordMap.has(e.id)
        ? recordMap.get(e.id)
        : {
            exam: 0,
            firstCa: 0,
            secondCa: 0,
            total: 0,
            studentId: e.id,
            recordId: uuidRandom()
          };
      return Object.assign({}, { name: e.name }, record);
    });
  }

  /**
   * create student Id_maps
   *
   * @memberof RecordOperations
   */
  recordIDMap(records: Subject[]) {
    const map = new Map<string, Subject>();
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      map.set(record.studentId, record);
    }
    return map;
  }
}

const recordNeverExist = new Error('Record Requested doesnt exist');
