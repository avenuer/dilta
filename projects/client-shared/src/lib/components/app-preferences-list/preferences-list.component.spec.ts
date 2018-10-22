/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PreferencesListComponent } from './preferences-list.component';

describe('PreferencesListComponent', () => {
  let component: PreferencesListComponent;
  let fixture: ComponentFixture<PreferencesListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PreferencesListComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
