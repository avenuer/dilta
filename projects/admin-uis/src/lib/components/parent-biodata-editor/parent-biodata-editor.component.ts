import { EventEmitter, Input, OnInit, Output, Component, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parent, defaultKeys, parentRelationships, workingCategories } from '@dilta/shared';

export const objParentKeys = [
  'name',
  'email',
  'homeAddress',
  'phoneNo',
  'profession',
  'town',
  'relationship',
  'state',
  'workAddress',
  'workcategory'
];

@Component({
  selector: 'admin-ui-parent-biodata-form',
  templateUrl: './parent-biodata-editor.component.html',
  styleUrls: ['./parent-biodata-editor.component.scss']
})
export class ParentBiodataEditorComponent implements OnInit, OnChanges {
  public static inputError = new Error(`expected a valid object type of Parent
  <app-parent-biodata-form > </app-parent-biodata-form>`);

  @Input() public parent: Parent = {} as any;
  @Input() public states: string[] = [];
  @Input() public lgas: string[] = [];
  @Input() public notEditable = false;

  @Output() public emitter = new EventEmitter();

  public relationships: string[] = parentRelationships;
  public workCategories = workingCategories;
  public parentForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  /**
   *  form(parent)
   *  @param parent a valid parent or not defined object
   * initalize new forms from the input provided or
   * initalize new default forms if there is no input
   */
  public form(parent?: Parent) {
    const { required } = Validators;
    // constructing form groups
    return this.fb.group({
      name: [parent.name, required],
      email: [parent.email || ''],
      homeAddress: [parent.homeAddress, required],
      phoneNo: [parent.phoneNo, required],
      profession: [parent.profession, required],
      town: [parent.town, required],
      relationship: [parent.relationship, required],
      state: [parent.state, required],
      workAddress: [parent.workAddress],
      workcategory: [parent.workcategory, required]
    });
  }

  /**
   * emits the parent value has an output binding
   * @param value parent form value
   */
  public emit(value: Parent) {
    this.emitter.emit({ ...this.parent, ...value });
  }

  ngOnInit() {
    // for external inputs which has now been resolved
    this.parentForm = this.form(this.parent || {} as any);
  }

  ngOnChanges() {
    if (this.parent && typeof this.parent === 'object') {
      Object.keys(this.parent).forEach((key) => {
        const control = this.parentForm.get(key);
        if (control) {
         control.setValue(this.parent[key]);
        }
      });
    }
    if (this.notEditable && this.parentForm) {
      this.parentForm.disable();
    }
  }
}
