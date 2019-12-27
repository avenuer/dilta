import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicGradingConfigComponent } from './academic-grading-config.component';

describe('AcademicGradingConfigComponent', () => {
  let component: AcademicGradingConfigComponent;
  let fixture: ComponentFixture<AcademicGradingConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicGradingConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicGradingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
