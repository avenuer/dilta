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
import { Manager, CommonwebuiModule } from '@dilta/commonwebui';
import { UtilService } from '@dilta/util';
import {
  EntityServiceBase,
  EntityServiceFactory,
  NgrxDataModule
} from 'ngrx-data';
import { AdminSetupComponent } from './AdminSetup.component';
import { cold } from 'jasmine-marbles';
import { CommonModule } from '@angular/common';

@Injectable()
class ManagerService extends EntityServiceBase<Manager> {
  constructor(esF: EntityServiceFactory) {
    super('Manager', esF);
  }
}

describe('AdminSetupComponent', () => {
  const params = { id: 'schoolId' };
  let component: AdminSetupComponent;
  let fixture: ComponentFixture<AdminSetupComponent>;
  let managerSvc: ManagerService;
  let utilSvc: UtilService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AdminSetupComponent],
        imports: [
          RouterTestingModule,
          CommonwebuiModule,
          NgrxDataModule.forRoot({ entityMetadata: { Manager: {} } })
        ],
        providers: [UtilService, ManagerService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSetupComponent);
    managerSvc = TestBed.get(ManagerService);
    utilSvc = TestBed.get(UtilService);
    activatedRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    // mock schoolId
    activatedRoute.snapshot.params = params as any;
    fixture.detectChanges();
  });

  it('should set schoolId and start listener on ngOnInit lifecycle', () => {
    const listenerSpy = spyOn(component, 'listener');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.schoolId).toMatch(params.id);
    expect(listenerSpy).toHaveBeenCalled();
  });

  it('should call destroyListeners during ngOnDestroy', () => {
    const destroySpy = spyOn(component, 'destroyListeners');
    component.ngOnDestroy();
    fixture.detectChanges();
    expect(destroySpy).toHaveBeenCalled();
  });

  it('should not change route for invalid manager', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.changeRoute(undefined);
    fixture.detectChanges();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should change route for valid manager', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const manager = { id: 'myId', school: 'myschool' };
    component.changeRoute(manager as any);
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['signup', manager.school]);
  });

  it('should call changeRoute on value received and create subscription', () => {
    const changeRouteSpy = spyOn(component, 'changeRoute');
    const subscription = component.onValue();
    managerSvc.entities$ = cold('-a', { a: [] });
    fixture.detectChanges();
    expect(changeRouteSpy).toHaveBeenCalled();
    (expect(subscription) as any).toHaveSubscriptions();
  });

  it(
    'should display error and later nullify the error',
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

  it('should call display error onError ', () => {
    const displayErrorSpy = spyOn(component, 'displayError');
    const error = new Error('manager entity error');
    managerSvc.errors$ = cold('-e-', { e: { payload: { error } } }) as any;
    const _sub = component.onError();
    fixture.detectChanges();
    expect(displayErrorSpy).toHaveBeenCalledWith(error);
    (expect(_sub) as any).toHaveSubscriptions();
  });

  it('should start listen to store events', () => {
    component.listener();
    fixture.detectChanges();
    expect(component.localSubscription.length).toEqual(2);
  });

  it('should destroy listeners', () => {
    // mocks
    const spy = { unsubscribe: jasmine.createSpy() } as any;
    const errSpy = spyOn(component.err$, 'unsubscribe');
    component.onError = spy;
    component.onValue = spy;
    // setup listeners
    component.listener();
    component.destroyListeners();
    // asserts
    expect(errSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('attempt to save manager into entity collection', () => {
    const addSpy = spyOn(managerSvc, 'add');
    component.saveManagers(undefined);
    fixture.detectChanges();
    expect(addSpy).toHaveBeenCalled();
  });
});
