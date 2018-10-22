import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  defaultKeys,
  errorInvalid,
  errorNotAndObject,
  fileBase64,
  User
  } from '@dilta/shared';
import { isEmpty } from 'lodash';
import { UploadInput } from 'ngx-uploader';

export const adminKeys = [
  'name',
  'gender',
  'phoneNo',
  'class',
  'subject',
  'phoneNos',
  'address',
  'image',
  'email'
];

@Component({
  selector: 'admin-ui-user-biodata-form',
  templateUrl: 'admin-biodata-editor.component.html',
  styleUrls: ['./admin-biodata-editor.component.scss']
})
export class AdminBiodataEditorComponent implements OnInit {
  public static AdminInputError = new Error(`invalid admin input object
    passed:<app-user-biodata-form></app-user-biodata-form>`);
  public static ClassListInputError = new Error(`empty or invalid class
    list input passed:<app-user-biodata-form></app-user-biodata-form>`);
  public static SubjectListInputError = new Error(`empty or invalid subject list is
    passed:<app-user-biodata-form></app-user-biodata-form>`);
  public static LevelsListInputError = new Error(`empty or invalid levels list is
    passed:<app-user-biodata-form></app-user-biodata-form>`);

  // primary inputs for the component
  @Input()
  public admin: User = {} as any;
  @Input()
  public classes: string[];
  @Input()
  public subjects: string[];
  @Input()
  public levels: string[];

  @Output()
  public emitter = new EventEmitter();

  // additional configuration for file uploads
  @Input()
  public uploadOptions = {};

  public uploadInput = new EventEmitter<UploadInput>();

  public adminForm: FormGroup;

  public img = '/assets/user-avatar.svg';

  constructor(private fb: FormBuilder) {}

  public form(value?: User) {
    const { required } = Validators;
    // checks if the value is defined if not defaulted
    if (!value) {
      value = defaultKeys(value, adminKeys);
    }
    // checks the value is an object else throw error
    errorNotAndObject(value, AdminBiodataEditorComponent.AdminInputError);
    // constructs the form group value
    return this.fb.group({
      address: [value.address, required],
      class: [value.class || this.classes[0], required],
      email: [value.email || '', ''],
      gender: [value.gender, required],
      image: [value.image, required],
      name: [value.name, required],
      phoneNo: [value.phoneNo, required],
      phoneNos: [value.phoneNos || '', ''],
      subject: [value.subject || this.subjects[0], required]
    });
  }

  /**
   * fil(event)
   * @param event an uploading event containing
   * image file to be uploaded
   */
  async fil(event) {
    const _evnt = event ? event.nativeFile : undefined;
    this.setImg(await fileBase64(_evnt));
  }

  /**
   * setImg(img)
   * @param img base64 of an image
   * sets the img to display to the display
   * and sets the form image value
   */
  setImg(img) {
    this.img = img;
    this.adminForm.get('image').setValue(this.img);
  }

  /**
   * emit(value)
   * @param value a valid admin form value
   * the event is passed to the emmiter to
   * emit
   */

  emit(value: Partial<User>) {
    value = this.cleanValue(value);
    this.emitter.emit(value);
  }

  /**
   * cleans the value by remapping
   *
   * @param {Partial<User>} value
   * @returns
   * @memberof AdminBiodataEditorComponent
   */
  cleanValue(value: Partial<User>) {
    value.phoneNos = !value.phoneNos ? 'none' : value.phoneNos;
    return value;
  }

  /**
   * validateInput()
   * triggers errors when invalid or empty class,
   * subjects and levels array are passed
   */
  validateInput() {
    errorInvalid(
      !isEmpty(this.classes),
      AdminBiodataEditorComponent.ClassListInputError
    );
    errorInvalid(
      !isEmpty(this.subjects),
      AdminBiodataEditorComponent.SubjectListInputError
    );
    errorInvalid(
      !isEmpty(this.levels),
      AdminBiodataEditorComponent.LevelsListInputError
    );
  }

  /**
   * ngOnInit()
   * called by the angular component after view
   * initalization to set the adminform from
   * bounded inputs and validate inputs
   */
  ngOnInit() {
    this.adminForm = this.form(this.admin);
    // this.validateInput();
  }
}
