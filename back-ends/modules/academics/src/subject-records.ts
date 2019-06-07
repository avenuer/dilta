import { Action, Injectable } from '@dilta/core';
import {
  AcademicActions,
  AcademicSubject,
  Student,
  Subject,
  SubjectRecords,
  SubjectRecordDeletedStatus,
  EntityNames,
  ModelOperations,
  FindResponse,
  Record,
  AcademicSetting
} from '@dilta/shared';
import { sortBy } from 'lodash';
import { NetworkDroneService } from '@dilta/network';

@Injectable()
export class RecordOperations {
  constructor(private net: NetworkDroneService) {}

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
    const resp = !record.id
      ? await this.net.modelActionFormat<Subject>(
          EntityNames.Subject,
          ModelOperations.Create
        )(details)
      : await this.net.modelActionFormat<Subject>(
          EntityNames.Subject,
          ModelOperations.Update
        )(record.id, details);
    return { name, ...resp };
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
    const record = await this.net.modelActionFormat<Record>(
      EntityNames.Record,
      ModelOperations.Retrieve
    )({ id: recordId });
    if (record) {
      const records = await this.net.modelActionFormat<FindResponse<Subject>>(
        EntityNames.Subject,
        ModelOperations.Find
      )({ recordId });
      const students = await this.net.modelActionFormat<FindResponse<Student>>(
        EntityNames.Student,
        ModelOperations.Find
      )({ class: record.class });
      const setting = await this.net.modelActionFormat<AcademicSetting>(
        EntityNames.academic_setting,
        ModelOperations.Retrieve
      )({ school: record.school });
      if (!setting) {
        throw academicSettingNeverExist;
      }
      const data = this.mapAcademicSubject(
        recordId,
        this.recordIDMap(records.data),
        students.data
      );
      return { record, data, config: setting.record };
    }
    throw recordNeverExist;
  }

  /**
   * maps the student name to their id
   *
   * @memberof RecordOperations
   */
  mapAcademicSubject(
    recordId: string,
    recordMap: Map<string, Subject>,
    students: Student[]
  ): AcademicSubject[] {
    const mappedStudents = students.map(e => {
      const record: Subject = recordMap.has(e.id)
        ? recordMap.get(e.id)
        : ({
            exam: 0,
            firstCa: 0,
            secondCa: 0,
            total: 0,
            studentId: e.id,
            recordId: recordId
          } as any);
      return Object.assign({}, { name: e.name }, record);
    });
    return sortBy(mappedStudents, 'name');
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

  /**
   * deletes both the records and the sub subjects
   *
   * @param {string} recordId
   * @returns
   * @memberof RecordOperations
   */
  @Action(AcademicActions.DeleteSubjectRecord)
  async deleteSubjectRecordS(
    recordId: string
  ): Promise<SubjectRecordDeletedStatus> {
    const isRecordDeleted = await this.deleteRecord(recordId);
    const allSubjectDeletedStatus = await this.deleteSubjects(recordId);
    return {
      isRecordDeleted,
      isAllSubjectDeleted: allSubjectDeletedStatus.every(
        deleteStatus => deleteStatus === true
      )
    };
  }

  /**
   * delete the subject record
   *
   * @param {string} recordId
   * @returns
   * @memberof RecordOperations
   */
  async deleteRecord(recordId: string) {
    return this.net.modelActionFormat<boolean>(
      EntityNames.Record,
      ModelOperations.Delete
    )({ id: recordId });
  }

  /**
   * deletes the subject scores of the record
   *
   * @param {string} recordId
   * @returns
   * @memberof RecordOperations
   */
  async deleteSubjects(recordId: string) {
    const { data } = await this.net.modelActionFormat<FindResponse<Subject>>(
      EntityNames.Subject,
      ModelOperations.Find
    )({ recordId });
    const results = await Promise.all(
      data.map(sub =>
        this.net.modelActionFormat<boolean>(
          EntityNames.Subject,
          ModelOperations.Delete
        )({ id: sub.id, recordId: sub.recordId })
      )
    );
    return results;
  }
}

const recordNeverExist = new Error('Record Requested doesnt exist');
const academicSettingNeverExist = new Error(
  `School academic settting doesn't exist`
);
