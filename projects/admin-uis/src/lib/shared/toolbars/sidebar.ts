import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingPreference, Settings } from '@dilta/models';
import { toPairs } from 'lodash';

interface SiderBarView {
  /**
   * original key for the directory
   *
   * @type {string}
   * @memberof SiderBarView
   */
  key: string;

  /**
   * value for the key in original object
   *
   * @type {SettingPreference}
   * @memberof SiderBarView
   */
  value: SettingPreference;

  /**
   * nested submenus in the object
   *
   * @type {SiderBarView[]}
   * @memberof SiderBarView
   */
  subMenus: SiderBarView[];
}

export class SideBarBase implements OnInit {
  @Input() settings: Settings;
  @Output() emitter = new EventEmitter();

  constructor() {}

  /**
   * remap view object to an array for view
   *
   * @param {Settings<any>} [settings={}]
   * @returns {SiderBarView[]}
   * @memberof SideBarBase
   */
  remap(settings: Settings = {}): SiderBarView[] {
    return toPairs(settings).map(([key, value]) => {
      let subMenus = [];
      if (value.submenus) {
        subMenus = this.remap(value.submenus) as SiderBarView[];
      }
      return { key, value, subMenus };
    });
  }

  /**
   * emit to child view
   *
   * @param {SiderBarView} menu
   * @memberof SideBarBase
   */
  emit(menu: SiderBarView) {
    if (menu.value.enabled) {
      this.emitter.emit(menu.value);
    }
  }

  /**
   * Setups and retrive menulist
   *
   * @readonly
   * @memberof SideBarBase
   */
  public get menuList() {
    return this.remap(this.settings);
  }

  ngOnInit() {}
}
