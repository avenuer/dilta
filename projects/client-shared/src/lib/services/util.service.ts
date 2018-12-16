import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import printJs from 'print-js';

const md = require('@angular/material/prebuilt-themes/deeppurple-amber.css');

@Injectable()
export class ClientUtilService {
  constructor(private snotify: SnotifyService) {}

  error(error: Error) {
    this.snotify.error(error.message, error.message);
  }

  success(title: string, message: string) {
    this.snotify.success(message, title);
  }

  addScript(viewId: string) {
    const printElement = document.getElementById(viewId);
    const script = new HTMLScriptElement();
    script.src = 'styles.js';
  }

  printHtml(uniqViewId: string, styles?: string) {
    printJs({
      type: 'html',
      showModal: true,
      printable: uniqViewId,
      onError: this.error,
      honorColor: true,
      style: `
      ${ md }
      ${ (typeof styles) === 'string' ? styles : '' }
      html,
      body {
          height: 96%;
          // width: 80%;
      }

      .container {
          display: flex;
          flex-direction: column;
      }

      .spacer-full {
        /* This fills the remaining space, by using flexbox.
           Every toolbar row uses a flexbox row layout. */
        flex: 1 1 auto;
      }

      .tabled-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .striped {
        background-color: rgb(199, 193, 193);
        border-color: rgb(199, 193, 193);
      }
      .striped  hr {
            font: bolder;
          }



      .dyn-cell {
        align-self: center!important;
        justify-self: center!important;
      }

      td span {
        margin-left: 30px;
      }

      .school {
        display: flex;
        flex-direction: column;
        align-items: center;

      }

      .school.logo {
        height: 128px;
        width: 128px;
        // border-radius: 50%;
      }
  `
    });
  }
}
