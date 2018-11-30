import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  schoolClasses,
  schoolTerms,
  Record,
  schoolTermValueToKey,
  schoolClassValue,
  TermPreset
} from '@dilta/shared';

@Component({
  selector: 'acada-academic-record',
  templateUrl: './academic-record.component.html',
  styleUrls: ['./academic-record.component.scss']
})
export class AcademicRecordComponent implements OnInit {
  recordForm: FormGroup;

  public schoolTerms = schoolTerms;
  public schoolClasses = schoolClasses;

  @Output()
  create = new EventEmitter();
  @Output()
  load = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  createForm() {
    return this.fb.group({
      class: ['', Validators.required],
      subject: ['', Validators.required],
      term: ['', Validators.required],
      session: ['', Validators.required]
    });
  }

  remapAndClean($event: Record) {
    ($event as any).class = schoolClassValue($event.class);
    ($event as any).term = TermPreset[$event.term];
    return $event;
  }

  ngOnInit() {
    this.recordForm = this.createForm();
  }
}
