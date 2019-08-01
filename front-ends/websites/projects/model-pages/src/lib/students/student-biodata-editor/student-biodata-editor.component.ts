import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student, defaultKeys, schoolClassValue, schoolClasses } from '@dilta/shared';

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
export class StudentBiodataEditorComponent implements OnChanges {
  public static inputError = new Error(`expected a valid School Object as input for
  StudentBiodataFormBase <app-student-biodata-form></app-student-biodata-form>`);

  @Input()
  public student: Student = {} as any;
  @Input()
  public notEditable = false;
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
      admissionNo: [student.admissionNo, required],
      parentPhone: [student.parentPhone, required]
    });
  }

  /**
   * emits the student value has an output binding
   * @param value student form value
   */
  public emit(value: Student) {
    console.log(value);
    if (typeof value.class !== 'number') {
      (value as any).class = schoolClassValue(value.class);
    }
    if (this.student) {
      value = { ...this.student, ...value };
    }
    this.emitter.emit(value);
  }

  ngOnChanges() {
    if (this.student && (typeof this.student === 'object')) {
      Object.keys(this.student).forEach((key) => {
        const control = this.studentForm.get(key);
        if (control) {
          control.setValue(this.student[key]);
        }
      });
    }
    if (this.notEditable) {
      this.studentForm.disable();
    }
  }
}
