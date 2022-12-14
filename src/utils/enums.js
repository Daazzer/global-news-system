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
  ANTARCTICA: 8
};

/**
 * 审核状态
 * @readonly
 * @enum {number}
 */
export const AuditState = {
  /** 未审核 */
  UNAUDITED: 0,
  /** 审核中 */
  AUDIT: 1,
  /** 已通过 */
  APPROVED: 2,
  /** 未通过 */
  UNAPPROVED: 3,
  get options() {
    return [
      {
        label: '未审核',
        value: this.UNAUDITED
      },
      {
        label: '审核中',
        value: this.AUDIT
      },
      {
        label: '已通过',
        value: this.APPROVED
      },
      {
        label: '未通过',
        value: this.UNAPPROVED
      }
    ];
  }
};

/**
 * 发布状态
 * @readonly
 * @enum {number}
 */
export const PublishState = {
  /** 待发布 */
  UNPUBLISHED: 1,
  /** 已发布 */
  PUBLISHED: 2,
  /** 已下线 */
  REVOKED: 3
};
