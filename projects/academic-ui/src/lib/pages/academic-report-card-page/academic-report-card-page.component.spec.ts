import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicReportCardPageComponent } from './academic-report-card-page.component';

describe('AcademicReportCardPageComponent', () => {
  let component: AcademicReportCardPageComponent;
  let fixture: ComponentFixture<AcademicReportCardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicReportCardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicReportCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
