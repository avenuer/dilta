import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGridPageComponent } from './student-grid-page.component';

describe('StudentGridPageComponent', () => {
  let component: StudentGridPageComponent;
  let fixture: ComponentFixture<StudentGridPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGridPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
