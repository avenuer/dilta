import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersHomeDashboardComponent } from './users-home-dashboard.component';

describe('UsersHomeDashboardComponent', () => {
  let component: UsersHomeDashboardComponent;
  let fixture: ComponentFixture<UsersHomeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersHomeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersHomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
