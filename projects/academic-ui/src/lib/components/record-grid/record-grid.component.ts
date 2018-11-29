import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { GridConfig, Record } from '@dilta/shared';

@Component({
  selector: 'acada-record-grid',
  templateUrl: './record-grid.component.html',
  styleUrls: ['./record-grid.component.scss']
})
export class RecordGridComponent implements OnInit {

  displayedColumns: string[] = ['no', 'class', 'subject', 'term', 'session', 'action'];

  @Input() records: Record[] = [];
  @Input() config: GridConfig = {};

  @Output() paginator = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() record = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
