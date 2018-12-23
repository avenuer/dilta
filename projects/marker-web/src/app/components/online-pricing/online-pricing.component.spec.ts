import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePricingComponent } from './online-pricing.component';

describe('OnlinePricingComponent', () => {
  let component: OnlinePricingComponent;
  let fixture: ComponentFixture<OnlinePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
