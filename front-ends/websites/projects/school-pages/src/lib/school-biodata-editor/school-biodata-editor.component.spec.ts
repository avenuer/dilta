import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  TestBed,
  ComponentFixture,
  tick,
  ComponentFixtureAutoDetect,
  fakeAsync
} from '@angular/core/testing';
import { address } from 'faker';

import * as compose from '@dilta/screwbox';
import { school, School } from '@dilta/screwbox/src/gen.faker';

import {
  SchoolBiodataEditorComponent,
  objSchoolKeys
} from './school-biodata-editor.component';
import { SchoolBiodataEditorModule } from './school-biodata-editor.module';

xdescribe('SchoolBiodataEditorComponent: unit tests', () => {
  let fixture: ComponentFixture<SchoolBiodataEditorComponent>;
  let editor: SchoolBiodataEditorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [SchoolBiodataEditorModule]
    });

    fixture = TestBed.createComponent(SchoolBiodataEditorComponent);
    editor = fixture.componentInstance;
  });

  it('should have created from with empty inputs', () => {
    fixture.detectChanges();
    // should be false untouched
    expect(editor.schoolForm.valid).toBe(false);
    const value = compose.defaultKeys({}, objSchoolKeys);
    expect(editor.schoolForm.value).toEqual(value);
  });

  it('should create a new form with old data', () => {
    fixture.detectChanges();
    const sMang = school() as any;
    editor.schoolForm = editor.form(sMang);
    fixture.detectChanges();
    // inputed input is expected to have no errors
    expect(editor.schoolForm.errors).toBeNull();
    expect(editor.schoolForm.value).toEqual(sMang);
  });

  it('should throw an error if invalid primitive type is passed', () => {
    fixture.detectChanges();
    expect(() => editor.form('string' as any)).toThrow(
      SchoolBiodataEditorComponent.inputError
    );
  });
});

// <---- dom based testing; ---->

// conditional
@Component({
  template: `<app-school-biodata-editor [school]="schoolBiodata" ></app-school-biodata-editor>`,
  selector: `app-test-school-editor`
})
class TestSchoolBiodataEditorComponent {
  public schoolBiodata: School;
  public emitedValue;

  public bindAction(value) {
    this.emitedValue = value;
  }
}

const dynamic = document ? describe : xdescribe;

dynamic('SchoolBiodataEditorComponent: intergration tests', () => {
  let fixture: ComponentFixture<TestSchoolBiodataEditorComponent>;
  let editor: TestSchoolBiodataEditorComponent;
  let el: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SchoolBiodataEditorModule],
      declarations: [TestSchoolBiodataEditorComponent]
    });

    fixture = TestBed.createComponent(TestSchoolBiodataEditorComponent);
    editor = fixture.componentInstance;
  });

  xit('should disable the save button if form is invalid', () => {
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('#save')).nativeElement;
    // expects that the save button is hidden for an invalid form
    expect(el.disabled).toBe(true);
  });

  it(
    'should fill in the forms with the values',
    fakeAsync(() => {
      const _smBio = school();
      editor.schoolBiodata = _smBio;
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('button#save')).nativeElement;
      expect(el.disabled).toBe(false);
      el.click();
    })
  );
});
