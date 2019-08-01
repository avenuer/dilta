import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AbstractTransportService } from 'transport';

@Injectable()
export class SchoolEffect {
  constructor(
    private action: Actions,
    private transport: AbstractTransportService
  ) {}
}
