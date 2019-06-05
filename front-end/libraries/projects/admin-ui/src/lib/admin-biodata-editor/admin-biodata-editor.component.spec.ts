import { Component } from '@angular/core';
import {
  TestBed,
  fakeAsync,
  ComponentFixture,
  async,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AdminBiodataEditorModule } from './admin-biodata-editor.module';
import {
  AdminBiodataEditorComponent,
  adminKeys
} from './admin-biodata-editor.component';
import { defaultKeys } from '@dilta/screwbox';
import { admin } from '@dilta/generator/src/school.data';

describe(`AdminBiodataEditorComponent: unit tests`, () => {
  describe(`internal opterations`, () => {
    const adminComp = AdminBiodataEditorComponent;
    let fixture: ComponentFixture<AdminBiodataEditorComponent>;
    let editor: AdminBiodataEditorComponent;

    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          imports: [AdminBiodataEditorModule]
        });

        // mocking validate Input to pass ngOnit
        adminComp.prototype.validateInput = () => {};

        fixture = TestBed.createComponent(adminComp);
        editor = fixture.componentInstance;
      })
    );

    it(`should create empty form`, () => {
      fixture.detectChanges();
      expect(editor.adminForm.valid).toBe(false);
      expect(editor.adminForm.value).toEqual(defaultKeys({}, adminKeys));
    });

    it(`should create from from admin input`, () => {
      const _admin = admin();
      editor.admin = _admin;
      fixture.detectChanges();
      expect(editor.adminForm.valid).toBe(true);
      expect(editor.adminForm.value).toEqual(_admin);
    });

    it(
      `should set form image from passed input`,
      fakeAsync(() => {
        const _img = admin().image;
        editor.adminForm = editor.form(admin());
        tick(1000);
        fixture.detectChanges();
        editor.setImg(_img);
        tick(1000);
        fixture.detectChanges();
        expect(editor.adminForm.get('image').value).toEqual(_img);
      })
    );

    it(`should throw error if invalid admin is passed`, () => {
      expect(() => editor.form('string' as any)).toThrowError(
        AdminBiodataEditorComponent.AdminInputError.message
      );
    });
  });
});

// describe(`error testings`, () => {
//   let fixture: ComponentFixture<AdminBiodataEditorComponent>;
//   let editor: AdminBiodataEditorComponent;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [AdminBiodataEditorModule]
//     })

//     fixture = TestBed.createComponent(AdminBiodataEditorComponent);
//     editor = fixture.componentInstance;
//   }));

//       it(`should throw error for empty class list inputs`, () => {
//     editor.validateInput = AdminBiodataEditorComponent.prototype.validateInput;
//     const _spy = spyOn(editor, 'validateInput')
//     fixture.detectChanges();
//     editor.validateInput();
//     expect(_spy).toHaveBeenCalled()
//     // expect(() => { editor.validateInput()})
//     //   .toThrow(AdminBiodataEditorComponent.ClassListInputError.message);
//   });

//   it(`should throw error for empty subjects list inputs`, fakeAsync(() => {
//     editor.classes = ['pry1', 'pry2'];
//     fixture.detectChanges();
//     tick(200);
//     editor.ngOnInit();
//     tick(200);
//     fixture.detectChanges();
//     expect(() => editor.validateInput())
//       .toThrow(AdminBiodataEditorComponent.SubjectListInputError.message);
//   }));

//   it(`should throw error for empty levels list inputs`, fakeAsync(() => {
//     editor.classes = ['pry1', 'pry2'];
//     editor.subjects = ['admin', 'teacher'];
//     fixture.detectChanges();
//     tick(3000);
//     expect(() => editor.validateInput())
//       .toThrow(AdminBiodataEditorComponent.LevelsListInputError.message);
//   }));

// })

// // <app-biodata-editor [levels]="levels" [classes]="classes" [subjects]="subjects"> </app-biodata-editor>
