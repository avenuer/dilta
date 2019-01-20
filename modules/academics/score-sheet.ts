import { Action, Injectable } from '@dilta/core';
import { RecordService, StudentService, SubjectService } from '@dilta/database';
import {
  StudentReportSheet,
  AcadmicRecordSheet,
  RecordSheet,
  StudentSheet,
  ClassSheet,
  StudentRecordSheet,
  Subject,
  AcademicActions,
  DifferentTermScores,
  Record,
  StudentRecordMergeSheet,
  TermPreset,
  StudentRecordMergeTermSheet,
  CumulativeRecordData,
  SchoolClass
} from '@dilta/shared';
import { gradePreset, classPositionPreset } from 'modules/presets';

/***
 * 1. Collates all records that matches the class and session
 * 2. do a search for student records that match collated record.
 * 3. Seperate the student that match student_Id and collate class max,
 * min, average and grade for each subject
 * 4. return student_details + academic_records_mapped.
 */

@Injectable()
export class ScoreSheet {
  constructor(
    private record: RecordService,
    private subject: SubjectService,
    private student: StudentService
  ) {}

  /**
   * collates student data and all student records for the session
   *
   * @param {StudentSheet} sheet
   * @returns {Promise<StudentReportSheet>}
   * @memberof ScoreSheet
   */
  @Action(AcademicActions.StudentReportSheet)
  async studentSheet(sheet: StudentSheet): Promise<StudentReportSheet> {
    const records = await this.classRecords(sheet);
    const recordScoreSheets = await Promise.all(
      records.map(async rec => this.mergeRecordScores(sheet, rec))
    );
    const scoreSheet = this.differentTermScores(sheet, recordScoreSheets);
    const cumulative = this.studentCumulativeRecord(scoreSheet);
    const student = await this.student.retrieve$({ id: sheet.studentId });
    const totalStudents = await this.studentCounts(sheet.level);
    return {
      scoreSheet,
      cumulative,
      biodata: student,
      ...sheet,
      totalStudents
    };
  }

  async classRecords({ term, session, level }: AcadmicRecordSheet) {
    const { data } = await this.record.find$({ class: level, term, session });
    return data;
  }

  async studentCounts(level: SchoolClass) {
    const { total } = await this.student.find$({ class: level });
    return total;
  }

  /**
   * merges both the record and their corresponding scores to a single object
   *
   * @param {Record} rec
   * @param {StudentSheet} sheet
   * @returns
   * @memberof ScoreSheet
   */
  async mergeRecordScores(
    sheet: StudentSheet,
    rec: Record
  ): Promise<StudentRecordMergeSheet> {
    const recordScore = await this.RecordScores(rec.id, sheet.studentId);
    return { ...rec, ...recordScore };
  }

  /**
   * collates the student record scores and class records
   *
   * @param {string} id
   * @param {string} studentId
   * @returns {Promise<RecordSheet>}
   * @memberof ScoreSheet
   */
  async RecordScores(
    recordId: string,
    studentId: string
  ): Promise<RecordSheet> {
    const student = await this.studentRecordSheet(recordId, studentId);
    const classSheet = await this.classSheets(recordId, studentId);
    return { ...student, ...classSheet };
  }

  /**
   * subject_ record class sheet
   *
   * @param {string} recordId
   * @returns {Promise<ClassSheet>}
   * @memberof ScoreSheet
   */
  async classSheets(recordId: string, studentId?: string): Promise<ClassSheet> {
    const { data } = await this.subject.find$({ recordId: recordId });
    // this sort from highest to lowest
    const sorted = data.sort((a, b) => b.total - a.total);
    // retrieves the student position
    const classPosition = classPositionPreset(
      data.findIndex(score => score.studentId === studentId)
    );
    const max = sorted[0] ? sorted[0].total : 0;
    const min = sorted[sorted.length - 1] ? sorted[sorted.length - 1].total : 0;
    const sum = (sorted as any[]).reduce(
      (prev, curr) => {
        return {
          total: prev.total + curr.total
        };
      },
      { total: 0 }
    );
    const avg = sorted.length > 0 ? sum.total / sorted.length : 0;
    return { max, min, avg, classPosition };
  }

  /**
   * indiviual Student record sheet
   *
   * @param {string} recordId
   * @param {string} studentId
   * @returns {Promise<StudentRecordSheet>}
   * @memberof ScoreSheet
   */
  async studentRecordSheet(
    recordId: string,
    studentId: string
  ): Promise<StudentRecordSheet> {
    let score: Subject = await this.subject.retrieve$({
      recordId,
      studentId
    });
    score = score
      ? score
      : { total: 0, firstCa: 0, exam: 0, secondCa: 0, recordId, studentId };
    const grade = gradePreset(score.total);
    return { ...grade, ...score };
  }

  /**
   * collates the different term scores
   *
   * @param {StudentSheet} studentSheet
   * @param {StudentRecordMergeSheet[]} scoreSheet
   * @returns {StudentRecordMergeSheet[]}
   * @memberof ScoreSheet
   */
  differentTermScores(
    studentSheet: StudentSheet,
    scoreSheet: StudentRecordMergeSheet[]
  ): StudentRecordMergeSheet[] {
    const map = this.mapSheetSubject(studentSheet, scoreSheet);
    return scoreSheet
      .filter(sheet => sheet.term === studentSheet.term)
      .map(sheet => Object.assign({}, sheet, map.get(sheet.subject) || {}));
  }

  /**
   * map each subject and term to indiviual scores required
   *
   * @param {StudentSheet} { term }
   * @param {StudentRecordMergeSheet[]} scoreSheet
   * @returns
   * @memberof ScoreSheet
   */
  mapSheetSubject(
    { term }: StudentSheet,
    scoreSheet: StudentRecordMergeSheet[]
  ) {
    const map = new Map<string, StudentRecordMergeTermSheet>();
    scoreSheet.forEach(sheet => {
      if (map.has(sheet.subject)) {
        const report = map.get(sheet.subject);
        map.set(sheet.subject, this.mapSheetToTermScores(report, sheet, term));
      } else {
        map.set(
          sheet.subject,
          this.mapSheetToTermScores({ ...sheet }, sheet, term)
        );
      }
    });
    return map;
  }

  /**
   * collates the total student records across all subjects
   *
   * @param {RecordSheet[]} sheets
   * @returns {CumulativeRecordData}
   * @memberof ScoreSheet
   */
  studentCumulativeRecord(sheets: RecordSheet[]): CumulativeRecordData {
    if (sheets.length === 0) {
      return { average: 0, grade: gradePreset(0).grade, total: 0 };
    }
    const total =
      sheets.length === 1
        ? sheets[0].total
        : (sheets as any).reduce((prev, curr) => prev.total + curr.total);
    const average = sheets.length > 1 ? total / sheets.length : total;
    const grade = gradePreset(average).grade;
    return { average, grade, total };
  }

  /**
   * set the various terms total score for each subject.
   *
   * @param {StudentRecordMergeTermSheet} report
   * @param {StudentRecordMergeSheet} sheet
   * @param {TermPreset} currentTerm
   * @returns
   * @memberof ScoreSheet
   */
  mapSheetToTermScores(
    report: StudentRecordMergeTermSheet,
    sheet: StudentRecordMergeSheet,
    currentTerm: TermPreset
  ) {
    const { First, Second, Third } = TermPreset;
    const allowedTerms = [First, Second, Third].filter(
      term => term !== currentTerm
    );

    if (allowedTerms.includes(First) && sheet.term === First) {
      report.firstTerm = sheet.total;
    }
    if (allowedTerms.includes(Second) && sheet.term === Second) {
      report.secondTerm = sheet.total;
    }
    if (allowedTerms.includes(Third) && sheet.term === Third) {
      report.thirdTerm = sheet.total;
    }
    return report;
  }
}
