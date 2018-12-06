import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGridPageComponent } from './admin-grid-page.component';

describe('AdminGridPageComponent', () => {
  let component: AdminGridPageComponent;
  let fixture: ComponentFixture<AdminGridPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGridPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
