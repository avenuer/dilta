import { SchoolEncryptedBaseInfo, Boque, LiensceSubscription } from '@dilta/shared';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class SchoolEncryptedDBData implements SchoolEncryptedBaseInfo {

  /**
   * unique id to identify individual liensces
   *
   * @type {string}
   * @memberof SchoolEncryptedDBData
   */
  @PrimaryColumn()
  id: string;

  /**
   * the id of school which owns the liensce.
   *
   * @type {string}
   * @memberof SchoolEncryptedDBData
   */
  @Column()
  school: string;

  /**
   * a unique apikey for the school
   *
   * @type {string}
   * @memberof SchoolEncryptedDBData
   */
  @Column()
  apikey: string;

  /**
   * boque signed up for
   *
   * @type {string}
   * @memberof SchoolEncryptedDBData
   */
  @Column()
  boque: string;

  /**
   * date the liensce expires
   *
   * @type {number}
   * @memberof SchoolEncryptedDBData
   */
  @Column()
  expiretimestamp: number;
}

@Entity()
export class BoqueDBData implements Boque {

  /**
   * the primaryId
   *
   * @type {string}
   * @memberof BoqueDBData
   */
  @PrimaryColumn()
  id: string;

  /**
   * students maximum allowed
   *
   * @type {number}
   * @memberof BoqueDBData
   */
  @Column()
  allowed: number;

  /**
   * actual students paid for
   *
   * @type {number}
   * @memberof BoqueDBData
   */
  @Column()
  paid: number;

  /**
   * subscription type
   *
   * @type {LiensceSubscription}
   * @memberof BoqueDBData
   */
  @Column()
  subscription: LiensceSubscription;
}
