/* tslint:disable:no-unused-variable */
import { Injectable } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { School } from '@dilta/models';
import { UtilService } from '@dilta/util';
import { cold } from 'jasmine-marbles';
import {
  EntityServiceBase,
  EntityServiceFactory,
  NgrxDataModule
} from 'ngrx-data';
import { SchoolComponent } from './school.component';

@Injectable()
class SchoolService extends EntityServiceBase<School> {
  constructor(esF: EntityServiceFactory) {
    super('School', esF);
  }
}

describe('SchoolComponent', () => {
  const schoolId = 'id';
  let component: SchoolComponent;
  let fixture: ComponentFixture<SchoolComponent>;
  let utilSvc: UtilService;
  let schoolSvc: SchoolService;
  let activatedSvc: ActivatedRoute;
  let routeSvc: Router;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SchoolComponent],
        imports: [
          RouterTestingModule,
          CommonwebuiModule,
          NgrxDataModule.forRoot({ entityMetadata: { School: {} } })
        ],
        providers: [UtilService, SchoolService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolComponent);
    utilSvc = TestBed.get(UtilService);
    schoolSvc = TestBed.get(SchoolService);
    activatedSvc = TestBed.get(ActivatedRoute);
    routeSvc = TestBed.get(Router);
    component = fixture.componentInstance;
    // mock params
    activatedSvc.snapshot.params = { id: schoolId };
    fixture.detectChanges();
  });

  it('should listenStore from ngOnit and set schoolId', () => {
    const listenStoreSpy = spyOn(component, 'listenStore');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.schoolId).toMatch(schoolId);
    expect(listenStoreSpy).toHaveBeenCalled();
  });

  it('should dispatch add action when onSubmit', () => {
    const storeSpy = spyOn(schoolSvc, 'add');
    const school = { id: schoolId };
    component.onSubmit(school);
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalled();
  });

  it('should add two subscriptions to the local subscriptions', () => {
    const spys = [spyOn(component, 'onError'), spyOn(component, 'onValue')];
    component.listenStore();
    fixture.detectChanges();
    expect(component.localSubscriptions.length).toEqual(2);
    spys.forEach(_spy => expect(_spy).toHaveBeenCalled());
  });

  it('should call displayErr when onError is subscribed', () => {
    const error = new Error('school Error');
    const displaySpy = spyOn(component, 'displayErr');
    const onErrSpy = (schoolSvc.errors$ = cold('-a', {
      a: { payload: { error } }
    }) as any);
    const subscription = component.onError();
    fixture.detectChanges();
    (expect(subscription) as any).toHaveSubscriptions();
    expect(displaySpy).toHaveBeenCalledWith(error);
  });

  it(
    'should display an error and reset',
    fakeAsync(() => {
      const error = new Error('school Error');
      component.displayErr(error);
      fixture.detectChanges();
      expect(component.err).toMatch(error.message);
      tick(5000);
      expect(component.err).toBeUndefined();
    })
  );

  it('should not call changeRoute when onValue is subscribed', () => {
    const changeRouteSpy = spyOn(component, 'changeRoute');
    schoolSvc.entities$ = cold('-a', {
      a: []
    });
    const subscription = component.onValue();
    fixture.detectChanges();
    (expect(subscription) as any).toHaveSubscriptions();
    expect(changeRouteSpy).not.toHaveBeenCalled();
  });

  it('should call changeRoute when onValue is subscribed', () => {
    const school = { id: 'schoolId' };
    const changeRouteSpy = spyOn(component, 'changeRoute');
    schoolSvc.entities$ = cold('-a', {
      a: [school]
    });
    const subscription = component.onValue();
    fixture.detectChanges();
    (expect(subscription) as any).toHaveSubscriptions();
    expect(changeRouteSpy).toHaveBeenCalledWith(school);
  });
});
