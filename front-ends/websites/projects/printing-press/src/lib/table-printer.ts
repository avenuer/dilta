import {
  PrintData,
  KeysConfig,
  PrintDataConfig,
  PrinterDocHeader
} from '@dilta/shared';

/**
 * increments the inner intial value with the passed value
 *
 * @param inital the starting number for printing
 */
export function setHeight(inital: number) {
  return (increaseBy: number) => {
    inital += increaseBy;
    return inital;
  };
}

/**
 * it takes the data and add an index number to it and also
 * maps it to the right formats
 *
 * @param config the keys to print
 * @param data the object to print
 */
export function tableFormat<T>(
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

/**
 * adds a table to the document
 *
 * @param param0 the documentprinterheader
 * @param keys the keys to print
 * @param data the object to print
 * @param config the configuration for printing
 */
export function addTable<T>(
  { height, doc }: PrinterDocHeader,
  keys: KeysConfig[],
  data: T[],
  config: PrintDataConfig
) {
  const { columns, rows } = tableFormat(keys, data);
  if (config.map) {
    const mapped = config.map(doc, height);
    doc = mapped.doc;
    height = mapped.height;
  }
  doc.autoTable(columns, rows, {
    startY: config.startY || height,
    margin: config.margin || 10
  });
  return doc;
}

// TODO: Open pdf in electron pdf plugin and display the pdf preview before printing
/**
 *
 * @param doc the document to print
 * @param config the configuration for printing
 */
export function printPdf(doc: any, config: PrintDataConfig) {
  // this.printPdfUrl(await fileBase64(doc.output('blob') as any));
  doc.autoPrint();
  doc.save(`${config.filename}.pdf`);
}
