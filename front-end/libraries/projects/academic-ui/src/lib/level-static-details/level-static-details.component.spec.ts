import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelStaticDetailsComponent } from './level-static-details.component';

describe('LevelStaticDetailsComponent', () => {
  let component: LevelStaticDetailsComponent;
  let fixture: ComponentFixture<LevelStaticDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelStaticDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelStaticDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
