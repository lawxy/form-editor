export type CustomEvent = {
  // 触发事件的动作
  eventAction: EEventAction;
  // 事件的类型
  eventType: EEventType;
  // 事件的目标
  eventTargets: IEventTarget;
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
   * 触发组件服务
   */
  REFRESH_ELEMENT = 'refreshElement',
}

export const eventTypeChinese = {
  [EEventType.REFRESH_ELEMENT]: '触发组件服务',
};

export interface IEventTarget {
  /**
   * 目标组件id
   */
  targetComponentId: string;
}