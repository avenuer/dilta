import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student, defaultKeys, schoolClasses, schoolClassValue } from '@dilta/shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export const objStudentKeys = [
  'name',
  'class',
  'bloodgroup',
  'age',
  'gender',
  'prevschool',
  'parentPhone'
];

@Component({
  selector: 'admin-ui-student-biodata-form',
  templateUrl: './student-biodata-editor.html',
  styleUrls: ['./student-biodata-editor.component.scss']
})
export class StudentBiodataEditorComponent {
  public static inputError = new Error(`expected a valid School Object as input for
  StudentBiodataFormBase <app-student-biodata-form></app-student-biodata-form>`);

  @Input()
  public student: Student = {} as any;
  @Output()
  public emitter = new EventEmitter();

  public studentForm: FormGroup;

  public classes: string[] = schoolClasses;


  constructor(private fb: FormBuilder) {
    this.studentForm = this.form(this.student);
  }

  /**
   * initalize new forms from the input provided or
   * initalize new default forms if there is no input
   */
  public form(student?: Student) {
    const { required } = Validators;
    if (!student) {
      student = defaultKeys(student, objStudentKeys);
    }
    if (typeof student !== 'object') {
      throw StudentBiodataEditorComponent.inputError;
    }
    return this.fb.group({
      name: [student.name, required],
      class: [student.class, required],
      bloodgroup: [student.bloodgroup],
      dob: [student.dob, required],
      gender: [student.gender, required],
      prevschool: [student.prevschool, required],
      parentPhone: [student.parentPhone, required]
    });
  }

  /**
   * emits the student value has an output binding
   * @param value student form value
   */
  public emit(value: Student) {
    (value as any).class = schoolClassValue(value.class);
    this.emitter.emit(value);
  }
}
