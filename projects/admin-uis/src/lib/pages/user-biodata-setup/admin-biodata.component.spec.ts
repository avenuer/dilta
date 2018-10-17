/* tslint:disable:no-unused-variable */
import { Injectable } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { School, User } from '@dilta/models';
import { UtilService } from '@dilta/util';
import { cold } from 'jasmine-marbles';
import {
  EntityServiceBase,
  EntityServiceFactory,
  NgrxDataModule
} from 'ngrx-data';
import { AdminBiodataComponent } from './admin-biodata.component';

@Injectable()
class SchoolService extends EntityServiceBase<School> {
  constructor(esF: EntityServiceFactory) {
    super('School', esF);
  }
}

@Injectable()
class AdminService extends EntityServiceBase<User> {
  constructor(esF: EntityServiceFactory) {
    super('Admin', esF);
  }
}

describe('AdminBiodataComponent', () => {
  const schoolId = 'id';
  let component: AdminBiodataComponent;
  let fixture: ComponentFixture<AdminBiodataComponent>;
  let utilSvc: UtilService;
  let schoolSvc: SchoolService;
  let adminSvc: AdminService;
  let activatedSvc: ActivatedRoute;
  let router: Router;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AdminBiodataComponent],
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
    fixture = TestBed.createComponent(AdminBiodataComponent);
    utilSvc = TestBed.get(UtilService);
    schoolSvc = TestBed.get(SchoolService);
    adminSvc = TestBed.get(AdminService);
    activatedSvc = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    // mock params
    activatedSvc.queryParams = cold('-a', { a: { id: schoolId } });
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBiodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should listenStore from ngOnit', () => {
    const listenStoreSpy = spyOn(component, 'storeListen');
    component.ngOnInit();
    fixture.detectChanges();
    expect(listenStoreSpy).toHaveBeenCalled();
  });

  it('should add three subscriptions to the local subscriptions', () => {
    const spys = [
      spyOn(component, 'onErrors'),
      spyOn(component, 'onValue'),
      spyOn(component, 'schoolDetails')
    ];
    component.storeListen();
    fixture.detectChanges();
    spys.forEach(_spy => expect(_spy).toHaveBeenCalled());
  });

  it('should call setupView with value', () => {
    const viewSetupSpy = spyOn(component, 'setupView');
    component.schoolDetails();
    fixture.detectChanges();
    expect(viewSetupSpy).toHaveBeenCalled();
  });

  it('should call changeRoute when onValue is subscribed', () => {
    const changeRouteSpy = spyOn(component, 'changeRoute');
    adminSvc.entities$ = cold('-a', {
      a: []
    });
    const subscription = component.onValue();
    fixture.detectChanges();
    (expect(subscription) as any).toHaveSubscriptions();
    expect(changeRouteSpy).toHaveBeenCalledWith();
  });

  it('should not change route for invalid admin details', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.changeRoute(undefined);
    fixture.detectChanges();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should change route for valid admin', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const admin = { username: 'myusername', id: 'auth_id' };
    component.changeRoute(admin as any);
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(`finished`);
  });

  it(
    'should display & send error and later nullify the error',
    fakeAsync(() => {
      const nextSpy = spyOn(component.err$, 'next');
      const error = new Error('the new display error');
      component.displayError(error);
      fixture.detectChanges();
      expect(nextSpy).toHaveBeenCalledWith(error.message);
      tick(3001);
      expect(nextSpy).toHaveBeenCalledWith(undefined);
    })
  );

  it('should call displayerror onErrors ', () => {
    const displayErrorSpy = spyOn(component, 'displayError');
    const error = new Error('admin entity error');
    adminSvc.errors$ = cold('-e-', { e: { payload: { error } } }) as any;
    const _sub = component.onErrors();
    fixture.detectChanges();
    expect(displayErrorSpy).toHaveBeenCalledWith(error);
    (expect(_sub) as any).toHaveSubscriptions();
  });

  it('should destroy listeners during ngOnDestroy lifecycle', () => {
    // mocks
    const spy = { unsubscribe: jasmine.createSpy() } as any;
    const errSpy = spyOn(component.err$, 'unsubscribe');
    component.onErrors = spy;
    component.onValue = spy;
    component.schoolDetails = spy;
    // setup listeners
    component.storeListen();
    component.ngOnDestroy();
    // asserts
    expect(errSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('attempt to save admin biodata details into entity collection', () => {
    const addSpy = spyOn(adminSvc, 'add');
    component.saveBiodata({} as any);
    fixture.detectChanges();
    expect(addSpy).toHaveBeenCalled();
  });
});
