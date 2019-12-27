import {
  PromotionSheet,
  Promotion,
  levelPromotion,
  ClassPromotion,
  AcademicActions,
  FindResponse,
  Student,
  EntityNames,
  ModelOperations
} from '@dilta/shared';
import { Injectable, Action } from '@dilta/core';
import { NetworkDroneService } from '@dilta/network';

@Injectable()
export class AcademicPromotion {
  constructor(private net: NetworkDroneService) {}

  @Action(AcademicActions.PromoteClass)
  async promoteClass(sheet: ClassPromotion) {
    const { data } = await this.net.modelActionFormat<FindResponse<Student>>(
      EntityNames.Student,
      ModelOperations.Find
    )({ class: sheet.level });
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
      history = await this.net.modelActionFormat<Promotion>(
        EntityNames.Promotion,
        ModelOperations.Update
      )(history.id, {
        ...history,
        newLevel
      });
      const student = this.net.modelActionFormat<Student>(
        EntityNames.Student,
        ModelOperations.Update
      )(sheet.studentId, {
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
    let history: Promotion = await this.net.modelActionFormat<Promotion>(
      EntityNames.Promotion,
      ModelOperations.Retrieve
    )({
      level,
      session,
      studentId
    });
    if (!history) {
      history = await this.net.modelActionFormat<Promotion>(
        EntityNames.Promotion,
        ModelOperations.Create
      )({
        level,
        session,
        studentId,
        newLevel: level
      });
    }
    return history;
  }
}
