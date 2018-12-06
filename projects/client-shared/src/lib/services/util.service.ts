import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import printJs from 'print-js';

@Injectable()
export class ClientUtilService {

  constructor(private snotify: SnotifyService) { }

  error(error: Error) {
    this.snotify.error(error.message, error.message);
  }

  success(title: string, message: string) {
    this.snotify.success(message, title);
  }

  printHtml(uniqViewId: string) {
    printJs({ type: 'html', showModal: true, printable: uniqViewId, onError: this.error });
  }
}
