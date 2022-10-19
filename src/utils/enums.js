/**
 * 系统默认
 * @readonly
 * @enum {number}
 */
export const SystemDefault = {
  /** 否 */
  NO: 0,
  /** 是 */
  YES: 1
};

/**
 * 系统状态
 * @readonly
 * @enum {number}
 */
 export const SystemState = {
  /** 停用 */
  DISABLED: 0,
  /** 启用 */
  ENABLED: 1
};

/**
 * 角色类型
 * @readonly
 * @enum {number}
 */
export const Role = {
  /** 超级管理员 */
  ADMIN: 1,
  /** 区域管理员 */
  REGION_MANAGER: 2,
  /** 区域编辑 */
  REGION_EDITOR: 3
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
