export type CustomEvent = {
  // 触发事件的动作
  eventAction?: EEventAction;
  // 事件的类型
  eventType?: EEventType;
  // 事件的目标
  eventTargets?: IEventTarget[];
};

export type CustomEvents = CustomEvent[];

export enum EEventAction {
  // 鼠标点击
  ON_CLICK = 'onClick',
  // 鼠标双击
  ON_DOULE_CLICK = 'onDoubleClick',
  // 值发生变化
  ON_CHANGE = 'onChange',
  // 聚焦
  ON_FOCUS = 'onFocus',
  // 失去焦点
  ON_BLUR = 'onBlur',
  // 组件加载后
  ON_LOADED = 'onLoaded'
}
export const eventActionInChinese = {
  [EEventAction.ON_CLICK]: '鼠标单击',
  [EEventAction.ON_DOULE_CLICK]: '鼠标双击',
  [EEventAction.ON_CHANGE]: '值发生变化',
  [EEventAction.ON_FOCUS]: '获得焦点',
  [EEventAction.ON_BLUR]: '失去焦点',
  [EEventAction.ON_LOADED]: '组件加载后'
}

/**
 * 组件事件操作动作
 */
export enum EEventType {
  /**
   * 刷新服务
   */
  REFRESH_SERVICE = 'refreshService',
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
  [EEventType.REFRESH_SERVICE]: '刷新服务',
  [EEventType.LINK_SERVICE]: '关联服务',
  [EEventType.SETTING_VALUE]: '设置组件值',
};

/**
 * 改变组件状态动作，包括显示隐藏，允许、禁止编辑，
 */
 export enum EChangeStatePayload {
  SHOW = 'show',
  HIDDEN = 'hidden',
  DISABLE = 'disable',
  REFRESH = 'refresh',
  LINK = 'link',
  UPDATE = 'update',
  CLEAR = 'clear'
}

export const changeStatePayloadInChinese = {
  [EChangeStatePayload.UPDATE]: '更新',
  [EChangeStatePayload.CLEAR]: '清空',
}

export interface IEventTarget {
  /**
   * 目标组件id
   */
  targetComponentId: string;
  /**
   * 目标服务id
  */
  targetServiceId: string;
  /**
   * 目标执行动作
   */
  targetPayload?: EChangeStatePayload;
  /**
   * post服务传入参数
   * */ 
  eventParams?: Record<string, any>;
  /**
   * 服务url拼接参数
   * */ 
  appendUrl?: Record<string, any>;
}