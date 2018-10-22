/* tslint:disable:no-unused-variable */
import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ProcessReducer, VerifyLiensceKey } from '@dilta/process';
import { coreInitialState } from '@dilta/process/src/process.ngrx/reducer/process.reducer';
import * as screwbox from '@dilta/screwbox';
import { LoggerService } from '@dilta/util';
import { Store, StoreModule } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { NgUploaderModule } from 'ngx-uploader';
import { of } from 'rxjs/observable/of';
import { LiensceKeyComponent } from './LiensceKey.component';

describe('LiensceKeyComponent', () => {
  let component: LiensceKeyComponent;
  let fixture: ComponentFixture<LiensceKeyComponent>;
  let store: Store<ProcessReducer>;
  let router: Router;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LiensceKeyComponent],
        imports: [
          StoreModule.forRoot(coreInitialState as any),
          RouterTestingModule,
          NgUploaderModule,
          FormsModule
        ],
        providers: [LoggerService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LiensceKeyComponent);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    spyOn(store, 'select').and.returnValue(
      of({ error: undefined, schoolId: undefined })
    );
    fixture.detectChanges();
  });

  it(
    'should call reader function and throw error',
    fakeAsync(() => {
      // mockings
      const errResponse = new Error(`custom error from backend verification`);
      const displaySpy = spyOn(component, 'displayError');
      const readerSpy = spyOn(screwbox, 'reader').and.returnValue(
        Promise.reject(errResponse)
      );
      const eventArg = { nativeFile: { file: 'undefined', path: 'path' } };
      // testing
      component.fil(eventArg);
      fixture.detectChanges();
      tick(2000);
      // asserting
      expect(readerSpy).toHaveBeenCalledWith(eventArg.nativeFile, 'readAsText');
      expect(component.path).toMatch(eventArg.nativeFile.path);
      expect(displaySpy).toHaveBeenCalledWith(errResponse);
      expect(component.key).toBeUndefined();
    })
  );

  it(
    'should call reader function and return key',
    fakeAsync(() => {
      // mockings
      const keyResponse = `random key from the back end`;
      const readerSpy = spyOn(screwbox, 'reader').and.returnValue(
        Promise.resolve(keyResponse)
      );
      const eventArg = { nativeFile: { file: 'undefined', path: 'path' } };
      // testing
      component.fil(eventArg);
      fixture.detectChanges();
      tick(2000);
      // asserting
      expect(readerSpy).toHaveBeenCalledWith(eventArg.nativeFile, 'readAsText');
      expect(component.path).toMatch(eventArg.nativeFile.path);
      expect(component.key).toMatch(keyResponse);
    })
  );

  it(
    'should not change err if invalid',
    fakeAsync(() => {
      // mockings
      const err = undefined;
      // testing
      component.displayError(err);
      fixture.detectChanges();
      // asserting
      expect(component.err).toBeFalsy();
      expect(component.key).toBeFalsy();
    })
  );

  it(
    'should change err message if valid',
    fakeAsync(() => {
      // mockings
      const eventArg = new Error('any random error');
      // testing
      component.displayError(eventArg);
      fixture.detectChanges();
      // asserting
      tick(1000);
      expect(component.err).toMatch(eventArg.message);
      expect(component.key).toBeFalsy();
      tick(3000);
      expect(component.err).toBeFalsy();
    })
  );

  it(
    'should dispatch verification action with key',
    fakeAsync(() => {
      // mockings
      const dispatchSpy = spyOn(store, 'dispatch');
      const keyArg = 'i am the key';
      // testing
      component.verify(keyArg);
      fixture.detectChanges();
      // asserting
      expect(dispatchSpy).toHaveBeenCalledWith(new VerifyLiensceKey(keyArg));
    })
  );

  it(
    'should return if no school details',
    fakeAsync(() => {
      // mockings
      const navigationSpy = spyOn(router, 'navigateByUrl');
      // testing
      component.setupSchoolDetails(undefined);
      fixture.detectChanges();
      // asserting
      expect(navigationSpy).not.toHaveBeenCalled();
    })
  );

  it(
    'should navigate to school bio setup url',
    fakeAsync(() => {
      // mockings
      const navigationSpy = spyOn(router, 'navigateByUrl');
      const schoolIdArg = 'xyz-id';
      // testing
      component.setupSchoolDetails(schoolIdArg);
      fixture.detectChanges();
      // asserting
      expect(navigationSpy).toHaveBeenCalledWith(`school/${schoolIdArg}`);
    })
  );

  it(
    'should display error from the store',
    fakeAsync(async () => {
      // mockings
      const error = new Error('store error');
      spyOn(store, 'select').and.returnValue(
        cold('-e', { e: { error: error.message } })
      );
      const displaySpy = spyOn(component, 'displayError');
      // testing
      component.ngOnInit();
      fixture.detectChanges();
      tick(3000);
      // asserting
      expect(displaySpy).toHaveBeenCalledWith([error]);
    })
  );

  it(
    'should call setup school details with schoolId from the store',
    fakeAsync(async () => {
      // mockings
      const schoolId = 'schoolId';
      spyOn(store, 'select').and.returnValue(cold('-v', { v: { schoolId } }));
      const schoolDetailSpy = spyOn(component, 'setupSchoolDetails');
      // testing
      component.ngOnInit();
      fixture.detectChanges();
      tick(3000);
      // asserting
      expect(schoolDetailSpy).toHaveBeenCalledWith(schoolId);
    })
  );
});
