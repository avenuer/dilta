import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordGridPageComponent } from './record-grid-page.component';

describe('RecordGridPageComponent', () => {
  let component: RecordGridPageComponent;
  let fixture: ComponentFixture<RecordGridPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordGridPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
