import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { RecordSheetConfig } from '@dilta/shared';

@Component({
  selector: 'shared-academic-record-config',
  templateUrl: './academic-record-config.component.html',
  styleUrls: ['./academic-record-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicRecordConfigComponent implements OnInit, OnChanges {
  @Input() recordConfig: RecordSheetConfig;
  @Output() emitter = new EventEmitter();

  public notEditable = false;
  public allowSecond_Ca = true;
  public recordForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  createForm(config: RecordSheetConfig) {
    const view = this.mapConfigtoView(config);
    const fb = this.fb.group({});
    Object.entries(view).forEach(([key, value]) => {
      fb.addControl(
        key,
        new FormControl(
          value,
          key.includes('secondCa_') ? [] : Validators.required
        )
      );
    });
    return fb;
  }

  mapConfigtoView(config: RecordSheetConfig): RecordConfigView {
    if (!config) {
      return defaultConfigView;
    }
    const { exam, firstCa, secondCa } = config;
    this.allowSecond_Ca = typeof secondCa === 'object';
    return {
      exam_max_range: exam.max,
      exam_title: exam.title,
      firstCa_max_range: firstCa.max,
      firstCa_title: firstCa.title,
      secondCa_max_range: this.allowSecond_Ca
        ? secondCa.max
        : defaultConfigView.secondCa_max_range,
      secondCa_title: this.allowSecond_Ca
        ? secondCa.title
        : defaultConfigView.secondCa_title
    };
  }

  emit(formView: RecordConfigView) {
    this.emitter.emit(this.viewToConfig(formView));
  }

  viewToConfig(view: RecordConfigView): RecordSheetConfig {
    const {
      exam_title,
      firstCa_max_range,
      firstCa_title,
      secondCa_max_range,
      exam_max_range,
      secondCa_title
    } = view;
    const config: RecordSheetConfig = {
      exam: {
        max: exam_max_range,
        title: exam_title
      },
      firstCa: {
        max: firstCa_max_range,
        title: firstCa_title
      }
    };
    if (this.allowSecond_Ca) {
      config.secondCa = {
        max: secondCa_max_range,
        title: secondCa_title
      };
    } else {
      config.secondCa = undefined;
    }
    return config;
  }

  ngOnInit() {
    this.recordForm = this.createForm(this.recordConfig);
  }

  ngOnChanges() {
    if (this.recordConfig && typeof this.recordConfig === 'object') {
      Object.entries(this.recordConfig).forEach(([key, value]) => {
        const form = this.recordForm.get(key);
        if (form) {
          form.setValue(value);
        }
      });
    }
  }
}

interface RecordConfigView {
  firstCa_max_range: number;
  firstCa_title: string;
  secondCa_max_range?: number;
  secondCa_title?: string;
  exam_max_range: number;
  exam_title: string;
}

const defaultConfigView: RecordConfigView = {
  firstCa_max_range: 15,
  firstCa_title: '1st C.A',
  secondCa_title: '2nd C.A',
  secondCa_max_range: 15,
  exam_max_range: 70,
  exam_title: 'Examination'
};
