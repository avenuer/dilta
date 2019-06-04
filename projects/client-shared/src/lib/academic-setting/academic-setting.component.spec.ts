import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSettingComponent } from './academic-setting.component';

describe('AcademicSettingComponent', () => {
  let component: AcademicSettingComponent;
  let fixture: ComponentFixture<AcademicSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
