/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SetupDoneComponent } from './setup-done.component';

xdescribe('SetupDoneComponent', () => {
  let component: SetupDoneComponent;
  let fixture: ComponentFixture<SetupDoneComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SetupDoneComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
