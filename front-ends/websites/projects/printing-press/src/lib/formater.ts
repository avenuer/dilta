import { School, Manager, PrinterDocHeader } from '@dilta/shared';
import { setHeight } from './table-printer';
import * as Jspdf from 'jspdf';
import 'jspdf-autotable';

/**
 * generates the school header to be used
 * before an details is added to the document
 *
 * @export
 * @param school the school details
 * @param manager the school management details
 */
export function schoolHeader(
  school: School,
  manager: Manager
): PrinterDocHeader {
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
