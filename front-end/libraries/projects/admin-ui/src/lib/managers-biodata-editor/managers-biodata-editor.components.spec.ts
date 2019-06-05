import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { manager } from '@dilta/generator/src/lib/school.data';
import * as compose from '@dilta/screwbox';
import {
  ManagersBiodataEditorComponent,
  ManagersBiodataEditorModule,
  objMangKeys
} from './';

// <---- action based testing; ---->

describe('MangerBiodataEditorComponent: unit tests', () => {
  let fixture: ComponentFixture<ManagersBiodataEditorComponent>;
  let editor: ManagersBiodataEditorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ManagersBiodataEditorModule]
    });

    fixture = TestBed.createComponent(ManagersBiodataEditorComponent);
    editor = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should have created from with empty inputs', () => {
    fixture.detectChanges();
    expect(editor.managersForm.valid).toBe(false);
    const value = compose.defaultKeys({}, [
      'propName',
      'propPhone',
      'propEmail',
      'sMName',
      'sMPhone',
      'sMEmail',
      'motto'
    ]);
    expect(editor.managersForm.value).toEqual(value);
  });

  it('should create a new form with old data', () => {
    const managers = manager(); //
    editor.managersForm = editor.form(managers);
    fixture.detectChanges();
    console.log(editor.managersForm.value, editor.managersForm.value, managers);
    expect(editor.managersForm.valid).toBe(true);
  });

  it('should throw an error if invalid primitive type is passed', () => {
    fixture.detectChanges();
    expect(() => editor.form('string' as any)).toThrowError(
      ManagersBiodataEditorComponent.inputError.message
    );
  });
});

// <---- dom based testing; ---->

// conditional
@Component({
  template: `<app-managers-biodata-editor (emitter)="bindAction($event)"></app-managers-biodata-editor>`,
  selector: `app-test-manager-editor`
})
class TestManagerEditorComponent {
  public emitedValue;

  public bindAction(value) {
    this.emitedValue = value;
  }
}

const dynamic = document ? describe : xdescribe;

dynamic('MangerBiodataEditorComponent: integration Test', () => {
  let fixture: ComponentFixture<TestManagerEditorComponent>;
  let editor: TestManagerEditorComponent;
  let el;
  const cssBtn = 'form div button#saver';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManagersBiodataEditorModule],
      declarations: [TestManagerEditorComponent]
    });

    fixture = TestBed.createComponent(TestManagerEditorComponent);
    editor = fixture.componentInstance;
    fixture.autoDetectChanges(true);
  });

  it('should hide the save button if form is invalid', () => {
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css(cssBtn)).nativeElement;
    // expects that the save button is disabled for an invalid form
    expect((el as any).disabled).toBe(true);
  });

  xit(
    'should fill in the forms with the values',
    fakeAsync(() => {
      fixture.detectChanges();
      const _manager = manager();
      objMangKeys.forEach(e => {
        const _ = fixture.debugElement.query(
          By.css(`div .form-group > input[formcontrolname=${e}]`)
        ).nativeElement;
        _.value = _manager[e];
        _.dispatchEvent(new Event('input'));
      });
      fixture.detectChanges();
      flush();
      el = fixture.debugElement.query(By.css(cssBtn)).nativeElement;
      console.log(el.disabled);
      expect(el.disabled).toBe(false);
      fixture.detectChanges();
      flush();
      el.click();
      fixture.detectChanges();
      // not triggering output event
      expect(spyOn(editor, 'bindAction')).toHaveBeenCalledWith(_manager);
    })
  );
});
