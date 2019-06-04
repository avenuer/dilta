import { Injectable, Action } from '@dilta/core';
import { StudentService } from '@dilta/database';
import {
  Student,
  ClassDetailedStat,
  schoolClassValueToKey,
  GenderDistrubution,
  AcademicActions
} from '@dilta/shared';

@Injectable()
export class ClassStaticsDetails {
  constructor(private student: StudentService) {}

  @Action(AcademicActions.ClassStatDetails)
  async collateDetails() {
    const { data } = await this.student.find({  });
    return this.remapClassToText(this.classTotal(data));
  }

  classTotal(students: Student[]) {
    const map = new Map<number, GenderDistrubution>();
    students.forEach(student => {
      if (map.has(student.class)) {
        map.set(student.class, this.operateStat(student, map.get(student.class)));
      } else {
        const stats: GenderDistrubution = { female: 0, male: 0, total: 0 };
        map.set(student.class, this.operateStat(student, stats));
      }
    });
    return map;
  }

  remapClassToText(studentMap: Map<number, GenderDistrubution>) {
    const details: ClassDetailedStat[] = [];
    studentMap.forEach((stat, key) => {
      details.push({ ...stat, value: key, name: schoolClassValueToKey(key) });
    });
    return details;
  }

  operateStat(student: Student, stat: GenderDistrubution) {
    if (student.gender.toLowerCase() === 'male') {
      stat.male += 1;
    } else {
      stat.female += 1;
    }
    stat.total += 1;
    return stat;
  }
}
