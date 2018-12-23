import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageFlowComponent } from './usage-flow.component';

describe('UsageFlowComponent', () => {
  let component: UsageFlowComponent;
  let fixture: ComponentFixture<UsageFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
