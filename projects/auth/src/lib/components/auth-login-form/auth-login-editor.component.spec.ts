import { Component, OnInit, DebugElement } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthLoginEditorComponent } from './auth-login-editor.component';
import { AuthLoginEditorModule } from './auth-login-editor.module';

describe(`AuthLoginComponent: unit tests`, () => {
  let fixture: ComponentFixture<AuthLoginEditorComponent>;
  let editor: AuthLoginEditorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthLoginEditorModule]
    });

    fixture = TestBed.createComponent(AuthLoginEditorComponent);
    editor = fixture.componentInstance;
  });

  it(`should create empty form which is invalid`, () => {
    fixture.detectChanges();
    expect(editor.loginForm.valid).toBe(false);
    expect(editor.loginForm.value).toEqual({ username: null, password: null });
  });

  it(`should be valid and math the value`, () => {
    const data = {
      username: 'username',
      password: 'password'
    };
    editor.loginForm.setValue(data);
    expect(editor.loginForm.valid).toBe(true);
    expect(editor.loginForm.value).toEqual(data);
  });
});

const dynamic = document ? describe : xdescribe;

@Component({
  selector: 'app-login-editor',
  template: `<app-auth-login-editor (emitter)="log($event)" ></app-auth-login-editor>`
})
export class TAuthLoginEditorComponent implements OnInit {
  constructor() {}

  log($event) {
    console.log($event);
  }

  ngOnInit() {}
}

dynamic(`AuthLoginEditorComponent: intergration tests`, () => {
  let fixture: ComponentFixture<TAuthLoginEditorComponent>;
  let editor: TAuthLoginEditorComponent;
  let elems: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthLoginEditorModule],
      declarations: [TAuthLoginEditorComponent]
    });

    fixture = TestBed.createComponent(TAuthLoginEditorComponent);
    editor = fixture.componentInstance;
    elems = fixture.debugElement;
  });

  it(`should have empty inputs and disabled the login btn`, () => {
    fixture.detectChanges();
    const _username: string = elems.query(
      By.css(`input[formcontrolname=username]`)
    ).nativeElement.value;
    const _password: string = elems.query(
      By.css(`input[formcontrolname=password]`)
    ).nativeElement.value;
    const _isBtn: boolean = elems.query(
      By.css('div.login-group button.btn.btn')
    ).properties.disabled;
    expect(_username).toEqual(_password);
    expect(_isBtn).toBe(true);
  });

  it(`should have valid inputs and enable login btn`, () => {
    const login = {
      username: 'username',
      password: 'password'
    };
    const _spy = spyOn(editor, 'log');
    const _username = elems.query(By.css(`input[formcontrolname=username]`))
      .nativeElement;
    _username.value = login.username;
    _username.dispatchEvent(new Event('input'));
    const _password = elems.query(By.css(`input[formcontrolname=password]`))
      .nativeElement;
    _password.value = login.password;
    _password.dispatchEvent(new Event('input'));
    const _btn = elems.query(By.css('div.login-group button.btn'))
      .nativeElement;

    console.log('_username', _username.value, _btn.disabled);
    _btn.dispatchEvent(new Event('click'));
    // fixture.detectChanges();
    // expect(_spy).toBeCalledWith(login);
  });
});
