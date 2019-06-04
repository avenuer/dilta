import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicRecordConfigComponent } from './academic-record-config.component';

describe('AcademicRecordConfigComponent', () => {
  let component: AcademicRecordConfigComponent;
  let fixture: ComponentFixture<AcademicRecordConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicRecordConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicRecordConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
