/**
 * 默认账户
 * @readonly
 * @enum {number}
 */
export const DefaultUser = {
  /** 否 */
  NO: 0,
  /** 是 */
  YES: 1
};

/**
 * 区域
 * @readonly
 * @enum {number}
 */
export const Region = {
  /** 全球 */
  GLOBAL: 1,
  /** 亚洲 */
  ASIA: 2,
  /** 欧洲 */
  EUROPE: 3,
  /** 北美洲 */
  NORTH_AMERICA: 4,
  /** 南美洲 */
  SHOUTH_AMERICA: 5,
  /** 非洲 */
  AFRICA: 6,
  /** 大洋洲 */
  OCEANIA: 7,
  /** 南极洲 */
  ANTARCTICA: 8,
  get options() {
    return [
      {
        label: '全球',
        value: this.GLOBAL
      },
      {
        label: '亚洲',
        value: this.ASIA
      },
      {
        label: '欧洲',
        value: this.EUROPE
      },
      {
        label: '北美洲',
        value: this.NORTH_AMERICA
      },
      {
        label: '南美洲',
        value: this.SHOUTH_AMERICA
      },
      {
        label: '非洲',
        value: this.AFRICA
      },
      {
        label: '大洋洲',
        value: this.OCEANIA
      },
      {
        label: '南极洲',
        value: this.ANTARCTICA
      }
    ];
  }
};
