import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicToolBarComponent } from './academic-tool-bar.component';

describe('AcademicToolBarComponent', () => {
  let component: AcademicToolBarComponent;
  let fixture: ComponentFixture<AcademicToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
