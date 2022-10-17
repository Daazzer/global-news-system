/**
 * 区域
 * @readonly
 * @enum {number}
 */
export const Region = {
  GLOBAL: 1,
  ASIA: 2,
  EUROPE: 3,
  NORTH_AMERICA: 4,
  SHOUTH_AMERICA: 5,
  AFRICA: 6,
  OCEANIA: 7,
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
