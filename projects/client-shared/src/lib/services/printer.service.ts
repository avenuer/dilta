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
  PrintDataConfig,
  PrinterDocHeader,
  updateReportKeys,
} from '@dilta/shared';
import * as Jspdf from 'jspdf';
import { format } from 'date-fns';
import { Store } from '@ngrx/store';
import 'jspdf-autotable';
import { schoolFeature } from '../ngrx/school';
import { map, first, exhaustMap, withLatestFrom, tap } from 'rxjs/operators';
import { AbstractTransportService } from '../abstract/transport.service';

@Injectable()
export class PrinterService {
  constructor(private store: Store<any>, private transport: AbstractTransportService) {}


  school$() {
    return this.store.select(schoolFeature).pipe(
      first(),
      map(school => school.details)
    );
  }

  schoolHeader$() {
    return this.school$().pipe(
      tap(console.log),
      exhaustMap(school =>
        this.transport.modelAction<Manager>(
          EntityNames.Manager,
          ModelOperations.Retrieve,
          { school: school.id }
        )
      ),
      withLatestFrom(this.school$()),
      tap(console.log),
      map(([manager, school]) => this.generateDocumentHeader(school, manager))
    );
  }

  generateDocumentHeader(school: School, manager: Manager): PrinterDocHeader {
    const moveHeight = setHeight(10);
    const doc = new Jspdf();
    doc.addImage(school.logo, 'JPEG', 90, moveHeight(0), 32, 32);
    doc.setFontSize(16).text(school.name, 100, moveHeight(38), {
      align: 'center',
      maxWidth: 100
    });
    doc
      .setFontSize(8)
      .text(
        [
          `${school.address}, ${school.town}, ${school.state}.\r`,
          `contact: ${manager.sMPhone}, ${manager.propPhone}`
        ],
        100,
        moveHeight(6),
        {
          align: 'center',
          maxWidth: 100
        }
      );

    return { doc, height: moveHeight(10) };
  }

  printTable<T>(keys: KeysConfig[], data: T[], config: PrintDataConfig) {
    this.schoolHeader$().subscribe(async ({ height, doc }) => {
      const { columns, rows } = this.tableFormat(keys, data);
      if (config.map) {
        const mapped = config.map(doc, height);
        doc = mapped.doc;
        height = mapped.height;
      }
      doc.autoTable(columns, rows, {
        startY: config.startY || height,
        margin: config.margin || 10
      });
      // this.printPdfUrl(await fileBase64(doc.output('blob') as any));
      doc.autoPrint();
      doc.save(`${config.filename}.pdf`);
    });
  }

  reportCard(sheet: StudentReportSheet) {
    this.schoolHeader$()
      .pipe(first())
      .subscribe(({ doc, height }) => {
        const startheight = setHeight(height);
        doc.setFontSize(14).text('SCORE CARD', 10, startheight(0));
        doc
          .setFontSize(8)
          .text(
            `${schoolTermValueToKey(sheet.term)} Term  of ${
              sheet.session
            } Academic Year`,
            10,
            startheight(3)
          );
        doc.setFontSize(9).text(`Pupil's information`, 10, startheight(3));
        let line = startheight(3);
        doc.line(10, line, 200, line);
        doc.setFontSize(12);
        line = startheight(5);
        doc
          .text(`Name: ${sheet.biodata.name}`, 10, line)
          .text(`Admission No: ${sheet.biodata.admissionNo}`, 130, line);
        line = startheight(3);
        doc.line(10, line, 200, line);
        line = startheight(5);
        doc
          .text(`Sex: ${sheet.biodata.gender}`, 10, line)
          .text(`Number In Class: ${sheet.totalStudents}`, 130, line);
        line = startheight(3);
        doc.line(10, line, 200, line);
        line = startheight(5);
        doc
          .text(
            `Date of Birth: ${format(sheet.biodata.dob, DateFormat)}`,
            10,
            line
          )
          .text(`Class:  ${schoolClassValueToKey(sheet.level)}`, 130, line);
        line = startheight(3);
        doc.line(10, line, 200, line);
        line = startheight(5);
        doc
          .text(`Cumulative Grade:  ${sheet.cumulative.grade}`, 10, line)
          // .text(`Cumulative Grade:  ${sheet.cumulative.grade}`, 65, line)
          .text(`Cumulative Average: ${sheet.cumulative.average}`, 130, line);
        line = startheight(2);
        doc.line(10, line, 200, line);
        line = startheight(2);
        doc.line(10, line, 200, line);
        doc
          .setFontSize(8)
          .text(`Cognitive, Affective and Psychomotor`, 10, startheight(3));

        // append table-with spacing
        // doc
        //   .line(148, 251, 180, 251)
        //   .text([`Mrs Akinde S.T`, `Adminstrator`], 150, 250);
        const { columns, rows } = this.tableFormat(
          updateReportKeys(sheet.term, AcademicReportCardGridConfig),
          sheet.scoreSheet
        );
        doc.autoTable(columns, rows, {
          startY: startheight(3),
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

  openDialog(link: string): void {
    const dialogRef = this.dialog.open(PdfViewerDialogComponent, {
      data: { link } as DialogData
    });

    dialogRef.afterClosed().subscribe((result: PdfDialogActions) => {
      if (result === PdfDialogActions.Print) {
        this.printPdfUrl(link);
      }
    });
  }

  // TODO: Open pdf in electron pdf plugin and display the pdf preview before printing
  printPdfUrl(url: string) {
    console.log(url);
    const { require, process } = window as any;
    if (require && process) {
      console.log(require && process, 'called');
      const electron = require('electron');
      const { BrowserWindow, getCurrentWindow } = electron.remote;
    const win = new BrowserWindow({ parent: getCurrentWindow(), width: 800, height: 600,  webPreferences: {
      plugins: true
    } });
    win.loadURL(url);
    win.show();
return;
    }
    return window.open(url, '_blank');
  }
}

/**
 * increments the inner intial value with the passed value
 *
 * @export
 * @param {number} inital
 * @returns
 */
export function setHeight(inital: number) {
  return (increaseBy: number) => {
    inital += increaseBy;
    return inital;
  };
}
