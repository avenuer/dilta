import {
  KeysConfig,
  MathExp
} from '../../components/dynamic-datagrid/dynamic-datagrid.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransportService } from '@dilta/electron-client';
import {
  AcademicActions,
  AcademicSubject,
  Record,
  Subject,
  SubjectRecords
} from '@dilta/shared';
import { exhaustMap, first } from 'rxjs/operators';
import { AcademicService } from '../../services/academic.service';

@Component({
  selector: 'acada-subject-grid-page',
  templateUrl: './subject-grid-page.component.html',
  styleUrls: ['./subject-grid-page.component.scss']
})
export class SubjectGridPageComponent implements OnInit {
  /**
   * record details
   *
   * @type {Record}
   * @memberof SubjectGridPageComponent
   */
  public record: Record;

  /**
   * subject datas that matched
   *
   * @memberof SubjectGridPageComponent
   */
  public data: AcademicSubject[];

  /**
   * mathematical expression for evaluation
   *
   * @type {MathExp}
   * @memberof SubjectGridPageComponent
   */
  public expression: MathExp = 'firstCa + secondCa + exam';

  /**
   * Keys config for table header
   *
   * @type {KeysConfig[]}
   * @memberof SubjectGridPageComponent
   */
  public keys: KeysConfig[] = [
    { key: 'name', send: true, editable: false, type: 'string' },
    {
      key: 'firstCa',
      send: false,
      editable: true,
      type: 'number',
      config: {
        max: 15,
        min: 0
      }
    },
    {
      key: 'secondCa',
      send: false,
      editable: true,
      type: 'number',
      config: {
        max: 15,
        min: 0
      }
    },
    {
      key: 'exam',
      send: false,
      editable: true,
      type: 'number',
      config: {
        max: 70,
        min: 0
      }
    },
    {
      key: 'total',
      send: false,
      editable: false,
      type: 'number',
      evaluated: true
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private transport: TransportService,
    private acada: AcademicService
  ) {}

  /**
   * Updates the action to update the particular record
   *
   * @param {Subject} data
   * @memberof SubjectGridPageComponent
   */
  updateSubjectRecord({
    index,
    data
  }: {
    data: AcademicSubject;
    index: number;
  }) {
    this.acada
      .teacherAndSchoolId()
      .pipe(
        exhaustMap(Ids => {
          return this.transport.execute<AcademicSubject>(
            AcademicActions.UpdateSubjectRecord,
            { ...data, ...Ids }
          );
        })
      )
      .pipe(first())
      .subscribe(subject => {
        this.data[index] = subject;
      });
  }

  emitted(data: Subject) {}

  /**
   * retrieve the student details and records
   *
   * @memberof SubjectGridPageComponent
   */
  retriveRecords() {
    this.route.params
      .pipe(
        exhaustMap(param =>
          this.transport.execute<SubjectRecords>(
            AcademicActions.SubjectRecord,
            param.id
          )
        ),
        first()
      )
      .subscribe(resp => {
        this.data = resp.data;
        this.record = resp.record;
      });
  }

  ngOnInit() {
    this.retriveRecords();
  }
}
