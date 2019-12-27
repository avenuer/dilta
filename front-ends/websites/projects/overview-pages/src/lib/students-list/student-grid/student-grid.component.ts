import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Student, GridConfig } from '@dilta/shared';

@Component({
  selector: 'acada-student-grid',
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.scss']
})
export class StudentGridComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'gender', 'parentNo'];

  @Input() students: Student[] = [];
  @Input() config: GridConfig = {};

  @Output() paginator = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() student = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
