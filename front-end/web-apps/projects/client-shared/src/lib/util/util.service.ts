import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Injectable()
export class ClientUtilService {
  constructor(private snotify: SnotifyService) {}

  error(error: Error) {
    this.snotify.error(error.message, error.message);
  }

  success(title: string, message: string) {
    this.snotify.success(message, title);
  }

}
