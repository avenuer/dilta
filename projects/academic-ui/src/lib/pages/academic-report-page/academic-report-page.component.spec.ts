import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicReportPageComponent } from './academic-report-page.component';

describe('AcademicReportPageComponent', () => {
  let component: AcademicReportPageComponent;
  let fixture: ComponentFixture<AcademicReportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicReportPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
