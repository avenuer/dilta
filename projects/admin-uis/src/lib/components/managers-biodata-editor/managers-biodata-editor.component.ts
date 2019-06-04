import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges
  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manager } from '@dilta/shared';

export const objMangKeys = [
  'propName',
  'propPhone',
  'propEmail',
  'sMName',
  'sMPhone',
  'sMEmail',
  'motto'
];

/**
 * School Biodata Component for displaying school
 * data and editing them simulatenoulsy
 */
@Component({
  selector: 'admin-ui-managers-biodata-form',
  templateUrl: './managers-biodata-editor.component.html',
  styleUrls: ['./managers-biodata-editor.component.scss']
})
export class ManagersBiodataEditorComponent implements OnInit, OnChanges {
  public static inputError = new Error(`expected an object of type Manager
  for ManagersBiodataFormBase <admin-ui-managers-biodata-form></admin-ui-managers-biodata-form>`);

  public managersForm: FormGroup;

  @Input() public managers: Manager = {} as any;
  @Input() public notEditable = false;
  @Output() public emitter = new EventEmitter();

  constructor(private fb: FormBuilder) {
    // this.managersForm = this.form(this.managers);
  }

  /**
   * initalize new default forms if there is no input or
   * initalize new forms from the input provided
   */
  public form(value?: Manager) {
    const { required } = Validators;
    // confirming manager
    value = !value ? ({} as any) : value;
    //  checking managerType
    if (typeof value !== 'object') {
      throw ManagersBiodataEditorComponent.inputError;
    }
    return this.fb.group({
      propName: [value.propName, required],
      propPhone: [value.propPhone, required],
      propEmail: [value.propEmail || ''],
      sMName: [value.sMName, required],
      sMPhone: [value.sMPhone, required],
      sMEmail: [value.sMEmail || ''],
      motto: [value.motto, required]
    });
  }

  /**
   * emits the managers value has an output binding
   * @param value managers form value
   */
  public emit(value) {
    if (this.managers) {
      value = { ...this.managers, ...value };
    }
    this.emitter.emit(value);
  }

  ngOnInit() {
    this.managersForm = this.form(this.managers);
  }


  ngOnChanges() {
    if (this.managers && (typeof this.managers === 'object')) {
      Object.keys(this.managers).forEach((key) => {
        const control = this.managersForm.get(key);
        if (control) {
          control.setValue(this.managers[key]);
        }
      });
    }
    if (this.notEditable && this.managersForm) {
      this.managersForm.disable();
    }
  }

}
