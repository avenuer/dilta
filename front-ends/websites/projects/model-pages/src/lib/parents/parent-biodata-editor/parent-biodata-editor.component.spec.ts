import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  TestBed,
  ComponentFixture,
  inject,
  fakeAsync,
  flush,
  ComponentFixtureAutoDetect,
  tick
} from '@angular/core/testing';
import * as compose from '@dilta/screwbox';
import { parent, Parent } from '@dilta/screwbox/src/gen.faker';

import { ParentBiodataEditorModule } from './parent-biodata-editor.module';
import { ParentBiodataEditorComponent, objParentKeys } from './';

// <---- action based testing; ---->

describe('ParentBiodataEditorComponent: unit tests', () => {
  let fixture: ComponentFixture<ParentBiodataEditorComponent>;
  let editor: ParentBiodataEditorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ParentBiodataEditorModule]
    });

    fixture = TestBed.createComponent(ParentBiodataEditorComponent);
    editor = fixture.componentInstance;
  });

  it('should have created from with empty inputs', () => {
    fixture.detectChanges();
    // should be false untouched
    expect(editor.parentForm.valid).toBe(false);
    const value = compose.defaultKeys({}, objParentKeys);
    expect(editor.parentForm.value).toEqual(value);
  });

  it('should create a new form with old data', () => {
    fixture.detectChanges();
    const parentBio = parent() as any;
    editor.parentForm = editor.form(parentBio);
    fixture.detectChanges();
    // inputed input is expected to be valid
    expect(editor.parentForm.valid).toBe(true);
    expect(editor.parentForm.value).toEqual(parentBio);
  });

  it('should throw an error if invalid primitive type is passed', () => {
    fixture.detectChanges();
    expect(() => editor.form('string' as any)).toThrowError(
      ParentBiodataEditorComponent.inputError.message
    );
  });
});

// <---- dom based testing; ---->

// conditional
@Component({
  template: `<app-parent-biodata-editor [parent]="parentBiodata" ></app-parent-biodata-editor>`,
  selector: `app-test-parent-editor`
})
class TestParentBiodataEditorComponent {
  public parentBiodata: Parent;
  public emitedValue;

  public bindAction(value) {
    this.emitedValue = value;
  }
}

const dynamic = document ? describe : xdescribe;

dynamic('ParentBiodataEditorComponent: integration tests', () => {
  let fixture: ComponentFixture<TestParentBiodataEditorComponent>;
  let editor: TestParentBiodataEditorComponent;
  let el;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ParentBiodataEditorModule],
      declarations: [TestParentBiodataEditorComponent]
    });

    fixture = TestBed.createComponent(TestParentBiodataEditorComponent);
    editor = fixture.componentInstance;
  });

  it('should hide the save button if form is invalid', () => {
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('#save')).nativeElement;
    // expects that the save button is hidden for an invalid form
    expect(el.disabled).toBe(true);
  });

  xit(
    'should fill in the forms with the values and emit',
    fakeAsync(() => {
      const _parentBio = parent();
      editor.parentBiodata = _parentBio;
      fixture.detectChanges();
      tick(1000);
      el = fixture.debugElement.query(By.css('button#save')).nativeElement;
      expect(el.disabled).toBe(false);
      el.click();
      fixture.detectChanges();
      tick(1000);
      // expect(spyOn(editor, 'bindAction')).toHaveBeenCalledWith(_parentBio);
    })
  );
});
