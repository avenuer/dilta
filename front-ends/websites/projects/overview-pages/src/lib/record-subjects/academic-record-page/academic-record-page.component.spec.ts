import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicRecordPageComponent } from './academic-record-page.component';

describe('AcademicRecordPageComponent', () => {
  let component: AcademicRecordPageComponent;
  let fixture: ComponentFixture<AcademicRecordPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicRecordPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicRecordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
