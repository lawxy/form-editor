export * from './event';
export * from './service';
export * from '../store/types';

import type { FC, ReactNode, CSSProperties } from 'react';
import { TCustomEvents } from './event';
import { TFormSerives } from './service';
import { EEventAction } from './event';
import { IBaseStore } from '../store/types';

export interface IDragElementProp {
  type: string;
  render: FC<any>;
  setting: FC<any>;
  text: string;
  eventActions: EEventAction[];
  initialData: Partial<IBaseElement>;
  Icon: ReactNode;
}
export type TDragElementObject = Record<
  IDragElementProp['type'],
  IDragElementProp
>;
export type TDragElement = TDragElementObject | IDragElementProp[];

export type TDirection = 'vertical' | 'horizontal';
export type TMode = 'design' | 'form';
export type TOption = { label: string; value: string | number; id?: string };
export type TColumn = {
  id: string;
  name: string;
  field: string;
  fixed: '' | 'left' | 'right';
  width?: number;
  align: 'left' | 'right' | 'center';
};
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
   * 父节点id
   */
  parentId?: string;
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
  textType?: 'single' | 'multiple' | 'password';
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
   * 开关开启的值
   */
  openValue?: string;
  /**
   * 开关关闭的值
   */
  closeValue?: string;
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
  /**
   * 上传地址
   */
  uploadUrl?: string;
  /**
   * 支持预览
   */
  preview?: boolean;
  /**
   * 预览地址
   */
  previewSrc?: string;
  /**
   * tabs类型
   */
  tabType?: 'line' | 'card';
  /**
   * 是否属于容器组件
   */
  isContainer?: boolean;
  /**
   * 子节点
   */
  children?: Array<IBaseElement>;
  /**
   * 组件关联服务时的loading
   */
  linkLoading?: boolean;
  /**
   * 下拉是否多选
   */
  multiple?: boolean;
  /**
   * 允许清空输入(选择)框
   */
  allowClear?: boolean;
  /**
   * 只读
   */
  readonly?: boolean;
  /**
   *
   */
  columns?: TColumn[];
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

export type TElementProps = {
  element: IBaseElement;
  customStyle: CSSProperties;
  fieldValue: any;
  setFieldValue: (value: any) => void;
};
export type TElementRender = FC<TElementProps>;
export type TElementSetting = FC<{
  element: IBaseElement;
  setElementProp: IBaseStore['setSelectedProp'];
  setFieldValue: (value: any) => void;
}>;
