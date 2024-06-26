export type TCustomEvent = {
  id: string;
  // 触发事件的动作
  eventAction?: EEventAction;
  // 事件的类型
  eventType?: EEventType;
  // 事件的目标
  eventTargets?: IEventTarget[];
};

export type TCustomEvents = TCustomEvent[];

export enum EEventAction {
  // 鼠标点击
  ON_CLICK = 'onClick',
  // 鼠标双击
  // ON_DOULE_CLICK = 'onDoubleClick',
  // 值发生变化
  VALUE_CHANGE = 'valueChange',
  // 聚焦
  ON_FOCUS = 'onFocus',
  // 失去焦点
  ON_BLUR = 'onBlur',
  // 组件加载后
  ON_LOADED = 'onLoaded',
}
export const eventActionInChinese = {
  [EEventAction.ON_CLICK]: '鼠标单击',
  // [EEventAction.ON_DOULE_CLICK]: '鼠标双击',
  [EEventAction.VALUE_CHANGE]: '值发生变化',
  [EEventAction.ON_FOCUS]: '获得焦点',
  [EEventAction.ON_BLUR]: '失去焦点',
  [EEventAction.ON_LOADED]: '组件加载后',
};

/**
 * 组件事件操作动作
 */
export enum EEventType {
  /**
   * 更新服务
   */
  UPDATE_SERVICE = 'refreshService',
  /**
   * 关联服务
   */
  LINK_SERVICE = 'linkService',
  // 显示/隐藏
  // CHANGE_VISIBILITY = 'changeVisibility',
  /**
   * 设置组件值
   */
  SETTING_VALUE = 'settingValue',
}

export const eventTypeChinese = {
  [EEventType.UPDATE_SERVICE]: '更新服务',
  [EEventType.SETTING_VALUE]: '设置组件值',
  [EEventType.LINK_SERVICE]: '关联服务',
};

/**
 * 改变组件状态动作，包括显示隐藏，允许、禁止编辑，
 */
export enum EChangeStatePayload {
  // SHOW = 'show',
  // HIDDEN = 'hidden',
  // DISABLE = 'disable',
  // REFRESH = 'refresh',
  // LINK = 'link',
  UPDATE = 'update',
  CLEAR = 'clear',
  APPEND = 'append',
  SYNC = 'sync',
  REFRESH = 'refresh',
  NOT_REFRESH = 'not_refresh',
  CUSTOM = 'custom',
}

export const changeStatePayloadInChinese = {
  [EChangeStatePayload.UPDATE]: '更新',
  [EChangeStatePayload.CLEAR]: '清空',
  [EChangeStatePayload.APPEND]: '拼接',
  [EChangeStatePayload.SYNC]: '同步',
  [EChangeStatePayload.CUSTOM]: '自定义',
  [EChangeStatePayload.REFRESH]: '刷新',
  [EChangeStatePayload.NOT_REFRESH]: '不刷新',
};

export const changeStateActions = (fields: Array<EChangeStatePayload>) => {
  return fields.map((field) => ({
    label: changeStatePayloadInChinese[field],
    value: field,
  }));
};

export enum EServiceRefesh {
  REFRESH = 1,
  NOT_REFRESH = 0,
}
export const refreshOptions = [
  { label: '刷新', value: EServiceRefesh.REFRESH },
  { label: '不刷新', value: EServiceRefesh.NOT_REFRESH },
];
export enum ELinkRefreshField {
  FIELDVALUE = 'fieldValue',
  VALUEOPTIONS = 'valueOptions',
}
export const linkRefreshFieldOptions = [
  { label: '元素值', value: ELinkRefreshField.FIELDVALUE },
  { label: '选项', value: ELinkRefreshField.VALUEOPTIONS },
];
export interface IEventTarget {
  id: string;
  /**
   * 目标组件id
   */
  targetElementId?: string;
  /**
   * 事件源组件id
   */
  sourceElementId: string;
  /**
   * 目标服务id
   */
  targetServiceId?: string;
  /**
   * 目标执行动作
   */
  targetPayload?: EChangeStatePayload;
  /**
   * 是否刷新服务
   */
  refreshFlag?: EServiceRefesh;
  /**
   * 服务更新的参数字段
   * */
  updateField?: string;
  /**
   * 服务url拼接参数
   * */
  appendUrl?: Record<string, any>;
  /**
   * 设置组件值
   */
  setValue?: any;
  /**
   * 设置关联服务后，刷新服务需要更新的字段
   */
  linkRefreshField?: ELinkRefreshField;
}
