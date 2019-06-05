import {
  PromotionSheet,
  Promotion,
  levelPromotion,
  ClassPromotion,
  AcademicActions
} from '@dilta/shared';
import { PromotionService, StudentService } from '@dilta/database';
import { Injectable, Action } from '@dilta/core';

@Injectable()
export class AcademicPromotion {
  constructor(
    private promotion: PromotionService,
    private student: StudentService
  ) {}

  @Action(AcademicActions.PromoteClass)
  async promoteClass(sheet: ClassPromotion) {
    const { data } = await this.student.find$({ class: sheet.level });
    const histroys = await Promise.all(
      data.map(
        async student =>
          await this.promoteStudent({ ...sheet, studentId: student.id })
      )
    );
    return histroys;
  }

  @Action(AcademicActions.PromoteStudent)
  async promoteStudent(sheet: PromotionSheet) {
    const newLevel = sheet.newLevel || levelPromotion(sheet.level).nextLevel;
    let history = await this.retrieveSessionPromotion(sheet);
    if (history.newLevel !== newLevel) {
      history = await this.promotion.update$(history.id, {
        ...history,
        newLevel
      });
      const student = this.student.update$(sheet.studentId, {
        class: history.newLevel
      });
    }
    return history;
  }

  @Action(AcademicActions.StudentPromotion)
  async retrieveSessionPromotion({
    level,
    session,
    studentId
  }: PromotionSheet) {
    let history: Promotion = await this.promotion.retrieve$({
      level,
      session,
      studentId
    });
    if (!history) {
      history = await this.promotion.create$({
        level,
        session,
        studentId,
        newLevel: level
      });
    }
    return history;
  }
}
