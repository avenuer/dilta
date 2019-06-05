import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelStaticDetailsPageComponent } from './level-static-details-page.component';

describe('LevelStaticDetailsPageComponent', () => {
  let component: LevelStaticDetailsPageComponent;
  let fixture: ComponentFixture<LevelStaticDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelStaticDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelStaticDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
