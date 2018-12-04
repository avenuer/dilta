import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicReportCardGridComponent } from './academic-report-card-grid.component';

describe('AcademicReportCardGridComponent', () => {
  let component: AcademicReportCardGridComponent;
  let fixture: ComponentFixture<AcademicReportCardGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicReportCardGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicReportCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
