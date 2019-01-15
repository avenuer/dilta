import { Injectable } from '@angular/core';
import {
  School,
  StudentReportSheet,
  schoolTermValueToKey,
  schoolClassValueToKey,
  PrintData,
  AcademicReportCardGridConfig,
  EntityNames,
  ModelOperations,
  Manager,
  KeysConfig,
  DateFormat,
  PrintDataConfig
} from '@dilta/shared';
import * as Jspdf from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { Store } from '@ngrx/store';
import { schoolFeature } from '../ngrx/school';
import { map, first, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { TransportService } from '@dilta/electron-client';

@Injectable()
export class PrinterService {
  constructor(private store: Store<any>, private transport: TransportService) {}

  school$() {
    return this.store.select(schoolFeature).pipe(
      first(),
      map(school => school.details)
    );
  }

  schoolHeader$() {
    return this.school$().pipe(
      exhaustMap(school =>
        this.transport.modelAction<Manager>(
          EntityNames.Manager,
          ModelOperations.Retrieve,
          { school: school.id }
        )
      ),
      withLatestFrom(this.school$()),
      map(([manager, school]) => this.generateDocumentHeader(school, manager))
    );
  }

  generateDocumentHeader(school: School, manager: Manager) {
    const doc = new Jspdf();

    doc.addImage(school.logo, 'JPEG', 90, 10, 32, 32);
    doc.setFontSize(15).text(school.name, 100, 60, {
      align: 'center',
      maxWidth: 100
    });
    doc
      .setFontSize(10)
      .text([`${school.address}, ${school.town}, ${school.state}.`], 100, 67, {
        align: 'center',
        maxWidth: 100
      });

    return doc;
  }

  printTable<T>(keys: KeysConfig[], data: T[], config: PrintDataConfig) {
    this.schoolHeader$().subscribe(doc => {
      const { columns, rows } = this.tableFormat(keys, data);
      if (config.map) {
        doc = config.map(doc);
      }
      doc.autoTable(columns, rows, {
        startY: config.startY || 86,
        margin: config.margin || 10
      });
      doc.autoPrint();
      doc.save(`${config.filename}.pdf`);
    });
  }

  reportCard(sheet: StudentReportSheet) {
    this.schoolHeader$()
      .pipe(first())
      .subscribe(doc => {
        doc.setFontSize(15).text('SCORE CARD', 10, 85);
        doc
          .setFontSize(12)
          .text(
            `${schoolTermValueToKey(sheet.term)} Term  of ${
              sheet.session
            } Academic Year`,
            10,
            92
          );
        doc.setFontSize(10).text(`Pupil's information`, 10, 97);
        doc.line(10, 100, 200, 100);
        doc.setFontSize(12);
        doc
          .text(`Name: ${sheet.biodata.name}`, 10, 107)
          .text(`Admission No: ${sheet.biodata.admissionNo}`, 130, 107);
        doc.line(10, 110, 200, 110);
        doc
          .text(`Sex: ${sheet.biodata.gender}`, 10, 117)
          .text(`Number In Class: ${sheet.totalStudents}`, 130, 117);
        doc.line(10, 120, 200, 120);
        doc
          .text(
            `Date of Birth: ${format(sheet.biodata.dob, DateFormat)}`,
            10,
            127
          )
          .text(`Class:  ${schoolClassValueToKey(sheet.level)}`, 130, 127);
        doc.line(10, 130, 200, 130);
        doc
          .text(`Cumulative Total:  ${sheet.cumulative.total}`, 10, 137)
          .text(`Cumulative Grade:  ${sheet.cumulative.grade}`, 65, 137)
          .text(`Class Average: ${sheet.cumulative.average}`, 130, 137);
        doc.line(10, 140, 200, 140);

        // append table-with spacing
        // doc
        //   .line(148, 251, 180, 251)
        //   .text([`Mrs Akinde S.T`, `Adminstrator`], 150, 250);
        const { columns, rows } = this.tableFormat(
          AcademicReportCardGridConfig,
          sheet.scoreSheet
        );
        doc.autoTable(columns, rows, {
          startY: 143,
          margin: 10,
          showHeader: 'firstPage'
        });
        doc.autoPrint();
        doc.save(
          `${sheet.biodata.name}_${schoolTermValueToKey(sheet.term)}_Term.pdf`
        );
      });
  }

  tableFormat<T>(
    config: KeysConfig[],
    data: T[]
  ): PrintData<T & { no: number }> {
    return {
      columns: config.map(e =>
        Object.assign({}, { title: e.title, dataKey: e.key })
      ),
      rows: data.map((v, index) => Object.assign(v, { no: index + 1 }))
    };
  }
}
