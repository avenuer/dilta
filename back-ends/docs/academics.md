#### AcademicsModule

This module contains the business logic for the academic operations like result and recording of subjects

```typescript
import {
  AcademicActions,
  Record,
  StudentSheet,
  AcademicSubject
} from '@dilta/shared';

/** Collates Class statics  of the whole school **/
app.execute(AcademicActions.ClassStatDetails): Promise<ClassDetailedStat>;

/** Collate the student report card for the term  **/
const sheet: StudentSheet = {...};
app.execute(AcademicActions.StudentReportSheet, sheet): Promise<StudentReportSheet>;

/** retrieves the subject and student academic records mapped **/
const recordId: string = '';
app.execute(AcademicActions.SubjectRecord, recordId): Promise<SubjectRecords>;

/** updates a student acadmeic record **/
const record: AcademicSubject = {..};
app.execute(AcademicActions.UpdateSubjectRecord, record): Promise<AcademicSubject>;
```
