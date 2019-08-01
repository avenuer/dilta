import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { schoolTerms, schoolClasses, Record, TermPreset, schoolClassValue } from '@dilta/shared';

@Component({
  selector: 'acada-academic-report',
  templateUrl: './academic-report.component.html',
  styleUrls: ['./academic-report.component.scss']
})
export class AcademicReportComponent implements OnInit {

  reportForm: FormGroup;

  public schoolTerms = schoolTerms;
  public schoolClasses = schoolClasses;

  @Output()
  load = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  createForm() {
    return this.fb.group({
      class: ['', Validators.required],
      term: ['', Validators.required],
      session: ['', Validators.required]
    });
  }

  remapAndClean($event: Record) {
    ($event as any).level = schoolClassValue($event.class);
    ($event as any).term = TermPreset[$event.term];
    delete $event.class;
    return $event;
  }

  ngOnInit() {
    this.reportForm = this.createForm();
  }
}
