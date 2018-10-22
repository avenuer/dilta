/* tslint:disable:no-unused-variable */
import { Injectable } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NgrxDataModule,
  EntityServiceFactory,
  EntityServiceBase
} from 'ngrx-data';

import { CommonwebuiModule } from '@dilta/commonwebui';
import { Auth } from '@dilta/models';
import { UtilService } from '@dilta/util';

import { AdminSignupComponent } from './AdminSignup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { cold } from 'jasmine-marbles';

@Injectable()
class AuthService extends EntityServiceBase<Auth> {
  constructor(esF: EntityServiceFactory) {
    super('Auth', esF);
  }
}

describe('AdminSignupComponent', () => {
  const params = { id: 'schoolId' };
  let component: AdminSignupComponent;
  let fixture: ComponentFixture<AdminSignupComponent>;
  let utilSvc: UtilService;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let authSvc: AuthService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AdminSignupComponent],
        imports: [
          RouterTestingModule,
          CommonwebuiModule,
          NgrxDataModule.forRoot({ entityMetadata: { Auth: {} } })
        ],
        providers: [UtilService, AuthService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSignupComponent);
    authSvc = TestBed.get(AuthService);
    utilSvc = TestBed.get(UtilService);
    activatedRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    // mock schoolId
    activatedRoute.snapshot.params = params as any;
    fixture.detectChanges();
  });

  it('should set schoolId and start listener on ngOnInit lifecycle', () => {
    const listenerSpy = spyOn(component, 'storeListen');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.schoolId).toMatch(params.id);
    expect(listenerSpy).toHaveBeenCalled();
  });

  it('should not change route for invalid auth', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.changeRoute(undefined);
    fixture.detectChanges();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should change route for valid auth', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const auth = { username: 'myusername', id: 'auth_id' };
    component.changeRoute(auth as any);
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(`/biodata/${auth.id}`);
  });

  it('should call changeRoute on value received and create subscription', () => {
    const changeRouteSpy = spyOn(component, 'changeRoute');
    const subscription = component.onValue();
    authSvc.entities$ = cold('-a', { a: [] });
    fixture.detectChanges();
    expect(changeRouteSpy).toHaveBeenCalled();
    (expect(subscription) as any).toHaveSubscriptions();
  });

  it(
    'should display & send error and later nullify the error',
    fakeAsync(() => {
      const nextSpy = spyOn(component.err$, 'next');
      const error = new Error('the new display error');
      component.sendError(error);
      fixture.detectChanges();
      expect(nextSpy).toHaveBeenCalledWith(error.message);
      tick(3001);
      expect(nextSpy).toHaveBeenCalledWith(undefined);
    })
  );

  it('should call display error onError ', () => {
    const displayErrorSpy = spyOn(component, 'sendError');
    const error = new Error('auth entity error');
    authSvc.errors$ = cold('-e-', { e: { payload: { error } } }) as any;
    const _sub = component.onError();
    fixture.detectChanges();
    expect(displayErrorSpy).toHaveBeenCalledWith(error);
    (expect(_sub) as any).toHaveSubscriptions();
  });

  it('should start listen to store events', () => {
    component.storeListen();
    fixture.detectChanges();
    expect(component.localSubscription.length).toEqual(2);
  });

  it('should destroy listeners during ngOnDestroy lifecycle', () => {
    // mocks
    const spy = { unsubscribe: jasmine.createSpy() } as any;
    const errSpy = spyOn(component.err$, 'unsubscribe');
    component.onError = spy;
    component.onValue = spy;
    // setup listeners
    component.storeListen();
    component.ngOnDestroy();
    // asserts
    expect(errSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('attempt to save Auth details into entity collection', () => {
    const addSpy = spyOn(authSvc, 'add');
    const randSpy = spyOn(utilSvc, 'randomuuid');
    randSpy.and.returnValue('random-id');
    component.signUp(undefined);
    fixture.detectChanges();
    expect(randSpy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalled();
  });
});
