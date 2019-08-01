import { setHeight, tableFormat } from './table-printer';
import {
  StudentReportSheet,
  schoolTermValueToKey,
  schoolClassValueToKey,
  AcademicReportCardGridConfig,
  DateFormat,
  PrinterDocHeader,
  updateReportKeys
} from '@dilta/shared';
import { format } from 'date-fns';

/**
 * prints the report card
 * 
 * @param headerDoc the document header
 * @param sheet the student report sheet to print
 */
export function reportCard(
  headerDoc: PrinterDocHeader,
  sheet: StudentReportSheet
) {
  const { doc, height } = datagramField(headerDoc, sheet);
  const startheight = setHeight(height);
  doc
    .setFontSize(8)
    .text(`Cognitive, Affective and Psychomotor`, 10, startheight(3));
  const { columns, rows } = tableFormat(
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
}

/**
 * adds the details field to the report card
 *
 * @param param0 the document header to add to
 * @param sheet the student report sheet
 */
export function datagramField(
  { doc, height }: PrinterDocHeader,
  sheet: StudentReportSheet
): PrinterDocHeader {
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
    .text(`Date of Birth: ${format(sheet.biodata.dob, DateFormat)}`, 10, line)
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
  return {
    doc,
    height: line
  };
}
