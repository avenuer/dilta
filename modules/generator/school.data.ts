import { getDate } from 'date-fns';
import * as faker from 'faker';
import { pick } from 'shuffle-array';
import { BaseModel, School, Manager, Student, Parent, Receipt, User } from '@dilta/shared';

/**
 * creates an array with amount-count elements from
 * the function result passed
 *
 * @export
 * @template T
 * @param {Function} method
 * @param {number} [amount=5]
 * @returns {T[]}
 */
export function list<T>(method: Function, amount: number = 5): T[] {
  const _list = [];
  for (let i = 0; i < amount; i++) {
    _list.push(method());
  }
  return _list;
}

/**
 * returns an item from the array
 *
 * @export
 * @template T
 * @param {Array<T>} array
 * @returns {(T | T[])}
 */
export function select<T>(array: Array<T>): T {
  return pick(array) as any;
}

function baseModel(): BaseModel {
  return {
    id: faker.random.uuid(),
    updatedAt: getDate(faker.date.past()),
    createdAt: getDate(faker.date.past()),
    hash: faker.random.uuid(),
    school: faker.company.companyName()
  };
}

export function school(): School {
  const skul = baseModel();
  delete skul.school;
  return {
    name: faker.company.companyName(),
    email: faker.internet.email(),
    description: faker.random.words(45),
    category: select(['primary', 'secondary']) as any,
    address: faker.address.streetAddress(),
    town: faker.address.city(),
    state: faker.address.state(),
    logo: faker.image.dataUri(100, 200),
    ...skul
  };
}

export const schoolList = (amount?: number) => list<School>(school, amount);

export function manager(): Manager {
  return {
    school: faker.company.companyName(),
    motto: faker.lorem.lines(1),
    propEmail: faker.internet.email(),
    propName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    propPhone: faker.phone.phoneNumber(),
    sMEmail: faker.internet.email(),
    sMName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    sMPhone: faker.phone.phoneNumber(),
    ...baseModel()
  };
}

export const managerList = (amount?: number) => list<Manager>(manager, amount);

export const classes = [
  'pry1',
  'pry2',
  'pry3',
  'pry4',
  'pry5',
  'pry6',
  'nus1',
  'nus2',
  'nus3'
];
export const genders = ['Male', 'Female'];
export const bloodgroups = ['A', 'B', 'AB', 'O'];

export function student(): Student {
  return {
    dob: getDate(faker.date.past(3)),
    school: faker.random.uuid(),
    class: select(classes),
    bloodgroup: select(bloodgroups),
    gender: select(genders),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    parentPhone: faker.phone.phoneNumber(),
    prevschool: faker.company.companyName(),
    ...baseModel()
  };
}

export const studentList = (amount?: number) => list<Student>(student, amount);

export const relationships = ['Guardian', 'Parent'];

export function parent(): Parent {
  return {
    school: faker.random.uuid(),
    email: faker.internet.email(),
    homeAddress: faker.address.streetAddress(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNo: faker.phone.phoneNumber(),
    profession: faker.name.jobDescriptor(),
    relationship: select(relationships) as any,
    state: faker.address.state(),
    town: faker.address.city(),
    workAddress: faker.address.secondaryAddress(),
    workcategory: faker.name.jobType(),
    ...baseModel()
  };
}

export const parentList = (amount?: number) => list<Parent>(parent, amount);

export const terms = ['first term', 'second term', 'third term'];
export const sessions = ['2016/2017', '2018/2019', '2015/2016'];

export function receipt(): Receipt {
  return {
    school: faker.random.uuid(),
    name: faker.name.findName(),
    class: select(classes) as any,
    createdAt: getDate(Date()),
    date: getDate(Date()),
    session: select(sessions) as any,
    studentId: faker.random.alphaNumeric(8),
    teacherId: faker.random.uuid(),
    term: select(terms) as any,
    updatedAt: Date(),
    items: [
      {
        name: 'school fee',
        value: faker.random.number({ max: 60000, min: 10000 })
      },
      {
        name: 'transportation',
        value: faker.random.number({ max: 10000, min: 2000 })
      }
    ],
    ...baseModel()
  };
}

export const receiptList = (amount = 5) => list<Receipt>(receipt, amount);

export const subjects = [
  'english',
  'chemistry',
  'biology',
  'mathematics',
  'physics',
  'economics',
  'geography',
  'government',
  'literature'
];
export const levels = ['owner', 'manager', 'busar', 'teacher'];

export function admin(): User {
  return {
    authId: faker.internet.userName(),
    school: faker.random.uuid(),
    address: faker.address.streetAddress(),
    class: select(classes) as any,
    subject: select(subjects) as any,
    email: faker.internet.email(),
    gender: faker.helpers.randomize(genders)[0],
    image: faker.image.dataUri(100, 200),
    name: faker.name.findName(),
    phoneNo: faker.phone.phoneNumber(),
    phoneNos: faker.phone.phoneNumber(),
    ...baseModel()
  };
}

export const adminsList = (amount = 5) => list<User>(admin, amount);

export interface Score extends Partial<BaseModel> {
  student: string;
  fa: number;
  sa: number;
  exam: number;
  id: string;
  session: string;
  subject: string;
  class: string;
  term: string;
}

export function scoreGen(): Score {
  return {
    class: select(classes) as any,
    subject: select(subjects) as any,
    student: faker.random.uuid(),
    fa: faker.random.number({ min: 0, max: 15 }),
    sa: faker.random.number({ min: 0, max: 15 }),
    exam: faker.random.number({ min: 0, max: 70 }),
    session: select(sessions) as any,
    term: select(terms) as any,
    ...baseModel()
  };
}
// ...baseModel()

export const examList = (no = 5) => list<Score>(scoreGen, no);
// accounts doesnt use erasers...methodlogy
interface SchoolMetaData {
  personal_ID: string;
  school_ID: string;
}

export function teacher() {
  return {
    universalId: faker.random.uuid(),
    name: faker.name.findName()
  };
}

// export const managerList = (amount?: number) => list(manager, amount);

// export function busarRevenueSummary() {
//   return <BusarRevenueSummary>{
//     currentMonthHighestCategory: faker.commerce.product(),
//     currentMonthHighestCategoryRevenue: faker.random.number(500000),
//     currentMonthHighestClass: select(classes) as any,
//     currentMonthLowestClass: select(classes) as any,
//     currentMonthHighestRevenue: faker.random.number(2000000),
//     currentMonthLowestRevenue: faker.random.number(20000),
//     currentMonthPercentage: faker.random.number(90),
//     currentMonthRevenue: faker.random.number(20000),
//     expectedTermSchoolFees: faker.random.number(20000000),
//     highestMonthPercentage: faker.random.number(70),
//     previousMonthRevenue: faker.random.number(20000),
//     totalTermSchoolFees: faker.random.number(20000000)
//   };
// }

// export function busarExpenseSummary() {
//   return <BusarExpenseSummary>{
//     currentMonth: faker.random.number(500000),
//     currentMonthCapital: faker.random.number(300000),
//     currentMonthHighestCategory: faker.commerce.product(),
//     currentMonthHighestCategoryExpense: faker.random.number(300000),
//     currentMonthLowestCategory: faker.commerce.product(),
//     currentMonthLowestCategoryExpense: faker.random.number(90000),
//     currentMonthRecurrent: faker.random.number(60000),
//     preivousMonth: faker.random.number(30000),
//     totalTerm: faker.random.number(20000000)
//   };
// }
