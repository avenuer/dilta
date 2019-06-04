import { SchoolService } from '@dilta/database';
import {
  School,
  Boque,
  SchoolEncryptedData,
  ServerActions,
  SchoolEncryptedDBDataPlusLiensce
} from '@dilta/shared';
import { Connection } from 'typeorm';
import { Logger } from '@dilta/util';
import { SchoolEncryptedDBData, BoqueDBData } from './school-liensce.entity';
import * as uuidRandom from 'uuid/v4';
import { format, addYears } from 'date-fns';
import { LiensceSecurity } from '@dilta/security';
import { Injectable, Action, Inject } from '@dilta/core';

export const TypeOrmToken = Symbol('typeormconnection');

@Injectable()
export class LiensceDatabase {
  constructor(
    @Inject(TypeOrmToken) private connection: Promise<Connection>,
    private schSvc: SchoolService,
    private lscSvc: LiensceSecurity,
    private logger: Logger
  ) {}

  @Action(ServerActions.GenerateEncryptedLiensce)
  async generateEncryptedLiensce(school: School, boque: Boque) {
    const savedDetails = await this.schSvc.create$(school);
    const boqueRepo = await this.connection.then(cont =>
      cont.getRepository(BoqueDBData)
    );
    const liensceRepo = await this.connection.then(cont =>
      cont.getRepository(SchoolEncryptedDBData)
    );
    const savedBoq = boqueRepo.create({ ...boque, id: uuidRandom() });
    const encryptedInfo: SchoolEncryptedData = {
      apikey: uuidRandom(),
      expiretimestamp: format(addYears(Date.now(), 1), 'x') as any,
      school: savedDetails,
      boque: savedBoq
    };
    const savedLiensce = liensceRepo.create({
      ...encryptedInfo,
      school: savedDetails.id,
      boque: savedBoq.id
    });
    return encryptedInfo;
  }
  @Action(ServerActions.GenerateEncryptedLienscePlusData)
  async generateEncryptedLienscePlusData(school: School, boque: Boque) {
    const savedInfo = await this.generateEncryptedLiensce(school, boque);
    const encrypted = await this.lscSvc.encryptLiensce(savedInfo);
    return {
      data: savedInfo,
      liensce: encrypted
    } as SchoolEncryptedDBDataPlusLiensce;
  }

  @Action(ServerActions.RetrieveLiensceDetails)
  async retrieveLiensceDetails(id: string) {
    const boqueRepo = await this.connection.then(cont =>
      cont.getRepository(BoqueDBData)
    );
    const liensceRepo = await this.connection.then(cont =>
      cont.getRepository(SchoolEncryptedDBData)
    );
    const SavedLiensce = await liensceRepo.findOne(id);
    const savedSchoolDetails = await this.schSvc.retrieve$({
      id: SavedLiensce.school
    });
    const savedBoque = await boqueRepo.findOne(SavedLiensce.boque);
    return {
      ...SavedLiensce,
      boque: savedBoque,
      school: savedSchoolDetails
    } as SchoolEncryptedData;
  }

  @Action(ServerActions.RetrieveEncryptedLiensce)
  async retrieveEncryptedLiensce(id: string) {
    const encryptedDetails = await this.retrieveLiensceDetails(id);
    return await this.lscSvc.encryptLiensce(encryptedDetails);
  }
}
