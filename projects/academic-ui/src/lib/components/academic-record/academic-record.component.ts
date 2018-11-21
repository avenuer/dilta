import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'acada-academic-record',
  templateUrl: './academic-record.component.html',
  styleUrls: ['./academic-record.component.scss']
})
export class AcademicRecordComponent implements OnInit {
  recordForm: FormGroup;

  @Output() emitter = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  create() {
    return this.fb.group({
      class: ['', Validators.required],
      subject: ['', Validators.required],
      term: ['', Validators.required],
      session: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.recordForm = this.create();
  }
}
