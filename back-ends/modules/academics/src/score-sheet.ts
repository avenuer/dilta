import { Action, Injectable } from '@dilta/core';
import {
  StudentReportSheet,
  AcadmicRecordSheet,
  RecordSheet,
  StudentSheet,
  ClassSheet,
  StudentRecordSheet,
  Subject,
  AcademicActions,
  Record,
  StudentRecordMergeSheet,
  TermPreset,
  StudentRecordMergeTermSheet,
  CumulativeRecordData,
  SchoolClass,
  GradingConfig,
  cummulativeAverage,
  Student,
  EntityNames,
  ModelOperations,
  AcademicSetting,
  FindResponse
} from '@dilta/shared';
import { gradePreset, classPositionPreset } from '@dilta/presets';
import { NetworkDroneService } from '@dilta/network';

/***
 * 1. Collates all records that matches the class and session
 * 2. do a search for student records that match collated record.
 * 3. Seperate the student that match student_Id and collate class max,
 * min, average and grade for each subject
 * 4. return student_details + academic_records_mapped.
 */

@Injectable()
export class ScoreSheet {
  constructor(private net: NetworkDroneService) {}

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
    const student = await this.net.modelActionFormat<Student>(
      EntityNames.Student,
      ModelOperations.Retrieve
    )({ id: sheet.studentId });
    const settings = await this.net.modelActionFormat<AcademicSetting>(
      EntityNames.academic_setting,
      ModelOperations.Retrieve
    )({ school: student.school });
    const recordScoreSheets = await Promise.all(
      records.map(async rec =>
        this.mergeRecordScores(sheet, rec, settings.grade)
      )
    );

    const scoreSheet = this.differentTermScores(
      sheet,
      recordScoreSheets,
      settings.grade
    );
    const cumulative = this.studentCumulativeRecord(scoreSheet, settings.grade);
    const allTerms = this.studentCumulativeRecord(
      recordScoreSheets,
      settings.grade,
      'cumAvg'
    );
    const totalStudents = await this.studentCounts(sheet.level);
    return {
      scoreSheet,
      cumulative,
      biodata: student,
      ...sheet,
      totalStudents,
      allTerms,
      settings
    };
  }

  async classRecords({ term, session, level }: AcadmicRecordSheet) {
    const { data } = await this.net.modelActionFormat<FindResponse<Record>>(
      EntityNames.Record,
      ModelOperations.Find
    )({ class: level, session });
    return data;
  }

  async studentCounts(level: SchoolClass) {
    const { total } = await this.net.modelActionFormat<FindResponse<Student>>(
      EntityNames.Student,
      ModelOperations.Find
    )({ class: level });
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
    rec: Record,
    grading: GradingConfig
  ): Promise<StudentRecordMergeSheet> {
    const recordScore = await this.RecordScores(
      rec.id,
      sheet.studentId,
      grading
    );
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
    studentId: string,
    grading: GradingConfig
  ): Promise<RecordSheet> {
    const student = await this.studentRecordSheet(recordId, studentId, grading);
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
    const { data } = await this.net.modelActionFormat<FindResponse<Subject>>(
      EntityNames.Student,
      ModelOperations.Find
    )({ recordId: recordId });
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
    const avg = sorted.length > 0 ? Math.round(sum.total / sorted.length) : 0;
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
    studentId: string,
    grading: GradingConfig
  ): Promise<StudentRecordSheet> {
    let score: Subject = await this.net.modelActionFormat<Subject>(
      EntityNames.Student,
      ModelOperations.Retrieve
    )({
      recordId,
      studentId
    });
    score = score
      ? score
      : {
          total: 0,
          firstCa: 0,
          exam: 0,
          secondCa: 0,
          recordId,
          studentId,
          teacherId: ''
        };
    const grade = gradePreset(grading, score.total);
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
    scoreSheet: StudentRecordMergeSheet[],
    grading: GradingConfig
  ): StudentRecordMergeSheet[] {
    const map = this.mapSheetSubject(studentSheet, scoreSheet, grading);
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
    scoreSheet: StudentRecordMergeSheet[],
    grading: GradingConfig
  ) {
    const map = new Map<string, StudentRecordMergeTermSheet>();
    scoreSheet.forEach(sheet => {
      console.log(
        `term ${sheet.term} subject: ${sheet.subject} total: ${sheet.total}`
      );
      if (map.has(sheet.subject)) {
        const report = map.get(sheet.subject);
        map.set(
          sheet.subject,
          this.mapSheetToTermScores(report, sheet, term, grading)
        );
      } else {
        map.set(
          sheet.subject,
          this.mapSheetToTermScores({ ...sheet }, sheet, term, grading)
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
  studentCumulativeRecord(
    sheets: StudentRecordMergeTermSheet[],
    grading: GradingConfig,
    key: keyof StudentRecordMergeTermSheet = 'total'
  ): CumulativeRecordData {
    let total = 0;
    for (let i = 0; i < sheets.length; i++) {
      total += sheets[i][key] as number;
    }
    const average =
      total !== 0
        ? Math.round(sheets.length > 1 ? total / sheets.length : total)
        : total;
    const grade = gradePreset(grading, average).grade;
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
    currentTerm: TermPreset,
    grading: GradingConfig
  ) {
    const { Lesson, First, Second, Third } = TermPreset;
    if (sheet.term === currentTerm) {
      report = { ...report, ...sheet };
    }
    const calcumAvgs = cummulativeAverage(currentTerm);
    if (sheet.term === First) {
      report.firstTerm = sheet.total;
    }
    if (sheet.term === Second) {
      report.secondTerm = sheet.total;
    }
    if (sheet.term === Third) {
      report.thirdTerm = sheet.total;
    }
    report.cumAvg = calcumAvgs(report);
    report.cumGrade = gradePreset(grading, report.cumAvg).grade;
    return report;
  }
}
