import { Injectable, Inject, Action } from '@dilta/core';
import { Embededb } from '@dilta/emdb';
import { DatabaseActions } from '@dilta/shared';
import { EmbededDatabaseToken } from '@dilta/database';
import { EmbededLiensceService } from '@dilta/security';
import { generateDBdata } from '@dilta/gen';

@Injectable()
export class ElectronDatabaseUtilService {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>,
    private liensce: EmbededLiensceService
  ) {}

  @Action(DatabaseActions.GenerateData)
  async generator() {
    const { school } = await this.liensce.currentLiensce();
    return generateDBdata(school.id, await this.database);
  }
}
