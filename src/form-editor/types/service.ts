import type { ELinkRefreshField } from './event';

export type TLinkElement = {
  id: string;
  field?: ELinkRefreshField;
  /**
   * 设置关联服务后，获取服务返回的字段值 比如data.a.b
   */
  getFieldFromService?: string;
};

export type TFormSerive = {
  id: string;
  name: string;
  url: string; // 真实请求的url，可能因为事件更改
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  previewData?: Record<string, any>;
  data?: Record<string, any>;
  interceptors?: string;
  /**
   * 关联服务的组件id
   */
  linkingElements?: TLinkElement[];
};

export type TFormSerives = TFormSerive[];
