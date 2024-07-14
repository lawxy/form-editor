export * from './event';
export * from './service';
import { TCustomEvents } from './event';
import { TFormSerives } from './service';
import { EEventAction } from './event';
import React from 'react';

export interface IDragElementProp {
  type: string;
  render: React.FC<any>;
  setting: React.FC<any>;
  text: string;
  eventActions: EEventAction[];
  initialData: Record<string, any>;
  Icon: React.ReactNode;
}

export type TDirection = 'vertical' | 'horizontal';
export type TMode = 'design' | 'form';
export enum EChecked {
  CHECKED = '0',
  NOT_CHECKED = '1',
}
export type TOption = { label: string; value: string | number; id?: string };
export enum EChangeType {
  ADD = 'add',
  EDIT = 'edit',
}
export type TPattern = {
  id?: string;
  name: string;
  regexp?: string;
  message: string;
  enable: boolean;
  required?: boolean;
};

export interface IBaseElement {
  /**
   * 链表形式存储父节点, 暂时没用
   */
  parentEelemnt?: IBaseElement;
  /**
   * 元素类型
   */
  type?: string;
  /**
   * 元素名称
   */
  elementName?: string;
  /**
   * 显示元素名称
   */
  showElementName?: boolean;
  /**
   * 元素id
   */
  id?: string;
  /**
   * 采用栅格布局
   */
  gridLayout?: boolean;
  /**
   * 元素栅格
   */
  gridSpan?: number;
  /**
   * 元素偏移
   */
  gridOffset?: number;
  /**
   * 日期元素格式
   */
  dateFormat?: string;
  /**
   * 文本类型
   */
  textType?: 'single' | 'multiple';
  /**
   * placeholder
   */
  placeholder?: string;
  /**
   * 自定义css
   */
  customCss?: string;
  /**
   * 最小行数
   */
  minRows?: number;
  /**
   * 最大行数
   */
  maxRows?: number;
  /**
   * 最小数
   */
  minNum?: number;
  /**
   * 最大数
   */
  maxNum?: number;
  /**
   * 自适应行数
   */
  autoSize?: boolean;
  /**
   * 元素名称（标签名称）对齐方式
   */
  elementNameDisplay?: TDirection;
  /**
   * 数据类型
   */
  valueType?: 'int' | 'one_decimal' | 'two_decimal';
  /**
   * 选项
   */
  valueOptions?: TOption[];
  /**
   * 选项排列方式
   */
  alignDirection?: TDirection;
  /**
   * 表格设置
   */
  tableAttributes?: string;
  /**
   * 表格column
   */
  tableColumns?: string;
  /**
   * 事件
   */
  events?: TCustomEvents;
  /**
   * 按钮文案
   */
  btnText?: string;

  /**
   * 自定义正则
   */
  regExps?: TPattern[];
  /**
   * 关联的服务id
   */
  linkServices?: string[];
}
export interface IFormAttributesProps {
  formName?: string;
  id?: string;
  status?: boolean;
  horizontalGap: number;
  verticalGap: number;
  events?: TCustomEvents;
  customCss?: string;
}

export interface IFormSchema {
  formElements?: IBaseElement[];
  fieldValues?: Record<string, any>;
  formAttrs?: IFormAttributesProps;
  formServices?: TFormSerives;
}
