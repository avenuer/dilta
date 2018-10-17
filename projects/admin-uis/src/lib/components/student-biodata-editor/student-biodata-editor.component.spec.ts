import {
  StudentBiodataEditorComponent,
  objStudentKeys
} from './student-biodata-editor.component';
import { StudentBiodataEditorModule } from './student-biodata-editor.module';
import { student, Student } from '@dilta/screwbox/src/gen.faker';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  TestBed,
  ComponentFixture,
  inject,
  ComponentFixtureAutoDetect,
  getTestBed
} from '@angular/core/testing';
import * as compose from '@dilta/screwbox';

// <---- action based testing; ---->

describe('ParentBiodataEditorComponent: unit tests', () => {
  let fixture: ComponentFixture<StudentBiodataEditorComponent>;
  let editor: StudentBiodataEditorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [StudentBiodataEditorModule]
    });

    fixture = TestBed.createComponent(StudentBiodataEditorComponent);
    editor = fixture.componentInstance;
  });

  it('should have created from with empty inputs', () => {
    fixture.detectChanges();
    // should be false untouched
    expect(editor.studentForm.valid).toBe(false);
    const value = compose.defaultKeys({}, objStudentKeys);
    expect(editor.studentForm.value).toEqual(value);
  });

  it('should create a new form with old data', () => {
    const sMang = student() as any;
    delete sMang.id;
    editor.studentForm = editor.form(sMang);
    fixture.detectChanges();
    // inputed input is expected to be valid
    expect(editor.studentForm.valid).toBe(true);
    expect(editor.studentForm.value).toEqual(sMang);
  });

  it('should throw an error if invalid primitive type is passed', () => {
    fixture.detectChanges();
    expect(() => editor.form('string' as any)).toThrow(
      StudentBiodataEditorComponent.inputError
    );
  });
});

// <---- dom based testing; ---->

// conditional
@Component({
  template: `<app-student-biodata-editor [student]="studentBio" ></app-student-biodata-editor>`,
  selector: `app-test-school-editor`
})
class TestStudentBiodataEditorComponent {
  public studentBio: Student;
  public emitedValue;

  public bindAction(value) {
    this.emitedValue = value;
  }
}

const dynamic = document ? describe : xdescribe;

dynamic('StudentBiodataEditorComponent: intergration tests', () => {
  let fixture: ComponentFixture<TestStudentBiodataEditorComponent>;
  let editor: TestStudentBiodataEditorComponent;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentBiodataEditorModule],
      declarations: [TestStudentBiodataEditorComponent]
    });

    fixture = TestBed.createComponent(TestStudentBiodataEditorComponent);
    editor = fixture.componentInstance;
  });

  it('should disable the save button if form is invalid', () => {
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('#save')).nativeElement;
    // `expects that the save button is hidden for an invalid form`
    expect((el as any).disabled).toBe(true);
  });

  //   it('should fill in the forms with the values and emit', async () => {

  //     let recSpy = spy(editor, 'bindAction');
  //     let _smBio = student();
  //     editor.studentBio = _smBio;
  //     fixture.detectChanges();
  //     el = fixture.debugElement.query(By.css('#save')).nativeElement;
  //     assert.isTrue(!el.hidden, `expects that the save button is visible`);
  //     el.click();
  //     fixture.detectChanges();
  //     assert.isTrue(recSpy.calledWith(_smBio), `expected that the
  // emitted to match the form value`);
  //   });
});
