import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicReportComponent } from './academic-report.component';

describe('AcademicReportComponent', () => {
  let component: AcademicReportComponent;
  let fixture: ComponentFixture<AcademicReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
