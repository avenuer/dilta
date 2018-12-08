import * as gen from './school.data';
import { electronDatabase } from '@dilta/emdb';
import {
  Parent,
  Receipt,
  Student,
  User
  } from '@dilta/shared';
import { Logger } from '@dilta/util';
import { RxCollection, RxDatabase } from 'rxdb';

async function generate() {
  let db: RxDatabase;
  const data = script();
  db = await electronDatabase();
  await uploadData(db.school, data.school, 'school');
  await uploadData(db.manager, data.manager, 'manager');
  await uploadData(db.user, data.teachers, 'teachers');
  await uploadData(db.parent, data.parents, 'parents');
  await uploadData(db.student, data.students, 'students');
}

function exit() {
  console.log('finished');
  process.exit(0);
}

generate()
  // .then(() => exit())
  .catch(console.error);

async function uploadData<T>(
  kol: RxCollection<T>,
  data: T[] | T,
  name = 'default'
) {
  try {
    if ((data as T[]).length) {
      const localArray: T[] = data as any;
      localArray.forEach(d => saver(kol, d, name));
      return;
    }
    const local: T = data as any;
    saver(kol, local, name);
  } catch (e) {
    throw e;
  }
}

async function saver<T>(koll: RxCollection<T>, data: T, name = 'defalt') {
  return await koll.upsert(data);
}

function script() {
  const school = gen.school();
  const manager = gen.manager();
  manager.school = school.id;
  const parents: Parent[] = [];
  const receipts: Receipt[] = [];
  const teachers = gen
    .list<User>(gen.admin, 30)
    .map(t => Object.assign({}, t, { school: school.id }));
  const students = gen.list<Student>(gen.student, 800).map(stud => {
    const parent = gen.parent();
    const studentReceipt = gen.list<Receipt>(gen.receipt, 8).map(receipt => {
      const busary = gen.select(teachers);
      receipt.name = stud.name;
      receipt.school = school.id;
      receipt.teacherId = busary.id;
      receipt.studentId = stud.id;
      return receipt;
    });
    receipts.concat(studentReceipt);
    parent.school = school.id;
    stud.school = school.id;
    stud.parentPhone = parent.phoneNo;
    parents.push(parent);
    return stud;
  });
  return { school, manager, parents, receipts, teachers, students };
}
