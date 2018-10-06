import { first, last } from 'lodash';
import { RxError } from 'rxdb';

export class EmbeddedRxDBError extends Error {

  /** Error field splitter for error cleaning */
  static fieldDelimiter = '.';

  /** formats RxDBErrors to a single  meanfull Error */
  static cleanError(err: RxError) {
    const { cleanField } = EmbeddedRxDBError;
    const errMgs = err.parameters.errors
      .map(e => `${cleanField(e.field)}: ${e.message}`)
      .reduce((p, c) => `${p} \n ${c}`);
    return errMgs;
  }

  /**
   * removes data prefix text from rdberror field
   *
   * @static
   * @param {string} field
   * @returns
   * @memberof EmbeddedRxDBError
   */
  static cleanField(field: string) {
    const { fieldDelimiter } = EmbeddedRxDBError;
    const splited = field.split(fieldDelimiter);
    if (splited.length > 1) {
      return last(splited);
    }
    return first(splited);
  }

  constructor(err: RxError) {
    super(EmbeddedRxDBError.cleanError(err));
  }
}

export const noIdError = new Error(`id argument is required for update operation`);

