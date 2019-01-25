import { AcademicService } from '../../services/academic.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientUtilService, PrinterService } from '@dilta/client-shared';
import { TransportService } from '@dilta/electron-client';
import {
  AcademicActions,
  AcademicSubject,
  Record,
  Subject,
  SubjectRecords,
  MathExp,
  KeysConfig,
  DateFormat,
  schoolClassValueToKey,
  schoolTermValueToKey,
  SubjectGridConfig
} from '@dilta/shared';
import { exhaustMap, first } from 'rxjs/operators';
import { format } from 'date-fns';

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
  public keys: KeysConfig[] = SubjectGridConfig;

  constructor(
    private route: ActivatedRoute,
    private transport: TransportService,
    private acada: AcademicService,
    private printer: PrinterService,
    public util: ClientUtilService
  ) {}

  /**
   * Updates the action to update the particular record
   *
   * @param {Subject} data
   * @memberof SubjectGridPageComponent
   */
  updateSubjectRecord({
    index,
    view
  }: {
    view: AcademicSubject & { no: number };
    index: number;
  }) {
    const { no, ...data } = view;
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
      .subscribe(
        subject => {
          this.data[index] = subject;
        },
        err => this.util.error(err)
      );
  }

  emitted(data: Subject) {}

  error(error: Error) {
    this.util.error(error);
  }

  /**
   * retrieve the student details and records
   *
   * @memberof SubjectGridPageComponent
   */
  retriveRecords() {
    return this.route.params.pipe(
      exhaustMap(param =>
        this.transport.execute<SubjectRecords>(
          AcademicActions.SubjectRecord,
          param.id
        )
      ),
      first()
    );
  }

  formatPrint(record: Record) {
    return doc => {
      doc.setFontSize(12);
      doc
        .text(`Subject: ${record.subject}`, 10, 87)
        .text(`Term: ${schoolTermValueToKey(record.term)}`, 130, 87);
      doc.line(10, 89, 200, 89);
      doc
        .text(`Class:  ${schoolClassValueToKey(record.class)}`, 10, 94)
        .text(`Session:  ${record.session}`, 130, 94);
      doc.line(10, 96, 200, 96);
      return doc;
    };
  }

  dataToIndex(records: AcademicSubject[]) {
    return records.map((rec, index) => Object.assign(rec, { no: index + 1 }));
  }

  print() {
    this.retriveRecords().subscribe(
      ({ data, record }) => {
        this.printer.printTable(SubjectGridConfig, this.dataToIndex(data), {
          filename: `${record.subject}  ${record.class} ${
            record.term
          } term ${format(Date.now(), DateFormat)}`,
          map: this.formatPrint(record),
          startY: 105
        });
      },
      err => this.util.error(err)
    );
  }

  ngOnInit() {
    this.retriveRecords().subscribe(
      resp => {
        this.data = this.dataToIndex(resp.data);
        this.record = resp.record;
      },
      err => this.util.error(err)
    );
  }
}
