import { UpdateLiensceKey } from '../../process/process.actions';
import { processFeature, ProcessState } from '../../process/process.reducer';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientUtilService } from '@dilta/client-shared';
import { reader, SchoolEncryptedData } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { to } from 'await-to-js';
import { UploadFile } from 'ngx-uploader';

/**
 * ui for selecting the liensce key for the app
 *
 * @export
 * @class LiensceKeyComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'setup-liensce-key',
  templateUrl: './LiensceKey.component.html',
  styleUrls: ['./LiensceKey.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LiensceKeyComponent implements OnInit, OnDestroy {
  public logo = '/assets/logo.svg';

  public uploadOptions = {};

  /**
   * holds and display the liensce key path
   *
   * @type {string}
   * @memberof LiensceKeyComponent
   */
  public path: string;

  /**
   * holds the read lienscekey
   *
   * @public
   * @type {string}
   * @memberof LiensceKeyComponent
   */
  public key: string;

  /**
   * formControl for liensce file path
   *
   * @memberof LiensceKeyComponent
   */
  public pathFormControl = new FormControl('');

  constructor(
    private store: Store<ProcessState>,
    private router: Router,
    private util: ClientUtilService
  ) {}

  /**
   * fil(event)
   * @param event an uploading event containing
   * image file to be uploaded
   */
  async fil(event?: UploadFile) {
    const evnt: File = event ? event.nativeFile : undefined;
    const [err, key] = await to<string, Error>(reader(evnt, 'readAsText'));
    this.path = (evnt as any).path;
    this.displayError(err);
    this.key = key;
    this.pathFormControl.setValue((evnt as any).path);
  }

  /**
   * displays an error to the user
   *
   * @param {Error} err
   * @memberof LiensceKeyComponent
   */
  displayError(err: Error) {
    if (!err) {
      return;
    }
    this.util.error(err);
  }

  /**
   * verifys the the key
   *
   * @param {string} key liensce key string test
   * @memberof LiensceKeyComponent
   */
  verify(key: string) {
    this.store.dispatch(new UpdateLiensceKey(key));
  }

  /**
   * navigates to the page and setup school details
   *
   * @param {SchoolEncryptedData} schoolId the school id
   * @memberof LiensceKeyComponent
   */
  setupSchoolDetails(schoolData: SchoolEncryptedData) {
    this.router.navigate(['admin', 'school', schoolData.school.id]);
  }

  ngOnInit() {
    this.store.select(processFeature).subscribe(({ error, schoolData }) => {
      if (error) {
        return this.displayError(new Error(error.message));
      }
      if (schoolData) {
        this.util.success('Liensce', 'Liensce Successfully Verified');
        this.setupSchoolDetails(schoolData);
      }
    });
  }

  /**
   * ends the subscription of the listener events
   *
   * @memberof LiensceKeyComponent
   */
  ngOnDestroy() {}
}
