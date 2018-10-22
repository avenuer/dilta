import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
// import { catchError, exhaustMap, map } from 'rxjs/operators';
// import { RetrieveSchoolAction, SchoolActionFailure, SchoolActions, SchoolActionSuccess } from './school.actions';
// import { of } from 'rxjs';
import { TransportService } from '@dilta/electron-client';

@Injectable()
export class SchoolEffect {

  constructor(private action: Actions, private transport: TransportService) {}
}
