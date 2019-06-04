import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsStudentComponent } from './levels-student.component';

describe('LevelsStudentComponent', () => {
  let component: LevelsStudentComponent;
  let fixture: ComponentFixture<LevelsStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelsStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
