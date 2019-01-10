import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflinePricingComponent } from './offline-pricing.component';

describe('OfflinePricingComponent', () => {
  let component: OfflinePricingComponent;
  let fixture: ComponentFixture<OfflinePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflinePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflinePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
