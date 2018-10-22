/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PreferenceSelectListComponent } from './preference-select-list.component';

describe('PreferenceSelectListComponent', () => {
  let component: PreferenceSelectListComponent;
  let fixture: ComponentFixture<PreferenceSelectListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PreferenceSelectListComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
