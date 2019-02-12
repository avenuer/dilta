import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { GradingConfig } from '@dilta/shared';

@Component({
  selector: 'shared-academic-grading-config',
  templateUrl: './academic-grading-config.component.html',
  styleUrls: ['./academic-grading-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicGradingConfigComponent implements OnInit, OnChanges {
  public gradingForm: FormGroup;

  public grades: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];

  @Input() gradingConfig: GradingConfig;
  @Output() emitter = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  createForm(config: GradingConfig) {
    const view = this.configView(config);
    const fb = this.formBuilder.group({});
    Object.entries(view).forEach(([key, value]: [string, number]) => {
      fb.addControl(key, new FormControl(value, [Validators.required]));
    });
    return fb;
  }

  configView(config: GradingConfig): GradeView {
    if (!(typeof config === 'object' && config)) {
      return defaultGradeView;
    }
    return {
      a_max: config.A.max,
      a_min: config.A.min,
      b_max: config.B.max,
      b_min: config.B.min,
      c_max: config.C.max,
      c_min: config.C.min,
      d_max: config.D.max,
      d_min: config.D.min,
      e_max: config.E.max,
      e_min: config.E.min,
      f_max: config.F.max,
      f_min: config.F.min
    };
  }

  viewToConfig(view: GradeView): GradingConfig {
    const config: GradingConfig = {} as any;
    Object.entries(view).forEach(([key, value]) => {
      const [parent, child] = key.split('_');
      if (!config.hasOwnProperty(parent.toUpperCase())) {
        config[parent.toUpperCase()] = {};
      }
      config[parent.toUpperCase()][child] = Number(value);
    });
    return config;
  }

  emit(formValue: GradeView) {
    this.emitter.emit(this.viewToConfig(formValue));
  }

  ngOnInit() {
    this.gradingForm = this.createForm(this.gradingConfig);
  }

  ngOnChanges() {
    if (this.gradingConfig && typeof this.gradingConfig === 'object') {
      Object.entries(this.configView(this.gradingConfig)).forEach(
        ([key, value]) => {
          this.gradingForm.get(key).setValue(value);
        }
      );
    }
  }
}

interface GradeView {
  a_max: number;
  a_min: number;
  b_max: number;
  b_min: number;
  c_max: number;
  c_min: number;
  d_max: number;
  d_min: number;
  e_max: number;
  e_min: number;
  f_max: number;
  f_min: number;
}

const defaultGradeView: GradeView = {
  a_max: 100,
  a_min: 70,
  b_max: 69,
  b_min: 60,
  c_max: 59,
  c_min: 50,
  d_max: 49,
  d_min: 45,
  e_max: 44,
  e_min: 40,
  f_max: 39,
  f_min: 0
};
