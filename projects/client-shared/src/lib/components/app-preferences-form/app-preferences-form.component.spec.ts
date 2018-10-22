/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppPreferencesFormComponent } from './app-preferences-form.component';

describe('AppPreferencesFormComponent', () => {
  let component: AppPreferencesFormComponent;
  let fixture: ComponentFixture<AppPreferencesFormComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppPreferencesFormComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPreferencesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
