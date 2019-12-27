import { Component, DebugElement } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthSignupEditorModule } from './auth-signup-editor.module';
import { AuthSignupEditorComponent } from './auth-signup-editor.component';

describe(`AuthSignUpEditorComponent: unit tests`, () => {
  let fixture: ComponentFixture<AuthSignupEditorComponent>;
  let editor: AuthSignupEditorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthSignupEditorModule]
    });

    fixture = TestBed.createComponent(AuthSignupEditorComponent);
    editor = fixture.componentInstance;
    // classNameEl  = fixture.debugElement.query(By.css('.className')); // find the element
  });

  it(`should create empty form which is invalid`, () => {
    fixture.detectChanges();
    expect(editor.signupForm.valid).toBe(false);
    expect(editor.signupForm.value).toEqual({
      username: null,
      password: null,
      level: null,
      clogin_password: null
    });
  });

  it(`should be valid a valid form with inputs provided`, () => {
    const signup = {
      username: 'username',
      password: 'password',
      level: 'level',
      clogin_password: 'password'
    };
    fixture.detectChanges();
    editor.signupForm.setValue(signup);
    fixture.detectChanges();
    expect(editor.signupForm.valid).toBe(true);
    expect(editor.signupForm.value).toEqual(signup);
  });
});

const dynamic = document ? describe : fdescribe;

import { OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-signup-test',
  template: `<app-auth-signup-editor (emitter)="log($event)" [err]="err" ></app-auth-signup-editor>`
})
export class TAuthSignUpEditorComponent implements OnInit {
  public err;
  constructor() {}

  public log($event) {
    console.log($event);
  }

  ngOnInit() {}
}

dynamic(`AuthSignupEditorComponent: integration tests`, () => {
  let fixture: ComponentFixture<TAuthSignUpEditorComponent>;
  let editor: TAuthSignUpEditorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthSignupEditorModule],
      declarations: [TAuthSignUpEditorComponent]
    });

    fixture = TestBed.createComponent(TAuthSignUpEditorComponent);
    editor = fixture.componentInstance;
  });

  it(`should have create an empty form with disable btn`, () => {
    fixture.detectChanges();
    const _username = fixture.debugElement.query(
      By.css('input[formcontrolname=username]')
    ).nativeElement.value;
    const _password = fixture.debugElement.query(
      By.css('input[formcontrolname=password]')
    ).nativeElement.value;
    const _level = fixture.debugElement.query(
      By.css('select[formcontrolname=level]')
    ).nativeElement.value;
    const _btn = fixture.debugElement.query(By.css('form.login button.btn'))
      .nativeElement.disabled;
    console.log(_username, _password, _level, _btn);
    expect(_username).toEqual(_password);
    expect(_btn).toBe(true);
  });

  xit(
    `should display an error for mismatched password`,
    fakeAsync(() => {
      fixture.detectChanges();
      const username = 'username';
      const password = 'password';
      const level = 'level';
      // setting user input
      const userInpt = fixture.debugElement.query(
        By.css('input[formcontrolname=username]')
      ).nativeElement;
      userInpt.value = username;
      userInpt.dispatchEvent(new Event('input'));
      tick(2000);
      // setting password input
      const passInpt = fixture.debugElement.query(
        By.css('input[formcontrolname=password]')
      ).nativeElement;
      passInpt.value = password;
      passInpt.dispatchEvent(new Event('input'));
      passInpt.dispatchEvent(new Event('touch'));
      // setting password confirmation
      const cuserInpt = fixture.debugElement.query(
        By.css('input[formcontrolname=clogin_password]')
      ).nativeElement;
      cuserInpt.value = username;
      cuserInpt.dispatchEvent(new Event('input'));
      cuserInpt.dispatchEvent(new Event('touch'));
      // setting level input
      const levelInpt = fixture.debugElement.query(
        By.css('select[formcontrolname=level]')
      ).nativeElement;
      levelInpt.value = level;
      levelInpt.dispatchEvent(new Event('input'));
      console.log(passInpt.value, cuserInpt.value);
      //  selecting button
      const btn = fixture.debugElement.query(By.css('form.login button.btn'))
        .nativeElement;
      // expect(btn.disabled).toBe(true);
      expect(
        fixture.debugElement.query(By.css(`div#mismatch`)).nativeElement
      ).toMatch(/password mismatch/);
    })
  );

  it(`should be a valid form and enabled button and emit`, () => {
    const spy = spyOn(editor, 'log');
    const level = 'Administrator';
    const username = 'username';
    const password = 'password';
    // setting user input
    const userInpt = fixture.debugElement.query(
      By.css('input[formcontrolname=username]')
    ).nativeElement;
    userInpt.value = username;
    userInpt.dispatchEvent(new Event('input'));
    // setting password input
    const passInpt = fixture.debugElement.query(
      By.css('input[formcontrolname=password]')
    ).nativeElement;
    passInpt.value = password;
    passInpt.dispatchEvent(new Event('input'));
    // setting password confirmation
    const cuserInpt = fixture.debugElement.query(
      By.css('input[formcontrolname=clogin_password]')
    ).nativeElement;
    cuserInpt.value = password;
    cuserInpt.dispatchEvent(new Event('input'));
    // setting level input
    const levelInpt = fixture.debugElement.query(
      By.css('select[formcontrolname=level]')
    ).nativeElement;
    levelInpt.value = level;
    levelInpt.dispatchEvent(new Event('input'));
    //  selecting button
    const btn = fixture.debugElement.query(By.css('form.login button.btn'))
      .nativeElement;
    btn.dispatchEvent(new Event('click'));
    expect(btn.disabled).toBe(false);
  });
});
