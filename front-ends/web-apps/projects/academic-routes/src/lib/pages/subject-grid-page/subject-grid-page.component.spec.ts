import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectGridPageComponent } from './subject-grid-page.component';

describe('SubjectGridPageComponent', () => {
  let component: SubjectGridPageComponent;
  let fixture: ComponentFixture<SubjectGridPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectGridPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
