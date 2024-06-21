export * from './event';
export * from './service';
import { TCustomEvents } from './event';
import { TFormSerives } from './service';

export interface IDragElementProp {
  type: string;
  render: React.FC<any>;
  setting: React.FC<any>;
  text: string;
  initialData: Record<string, any>;
}

export type TDirection = 'vertical' | 'horizontal';
export type TMode = 'design' | 'form';
export type TOption = { label: string; value: string | number; id?: string };
export enum EChangeType {
  ADD = 'add',
  EDIT = 'edit',
}

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
  customEvents?: TCustomEvents;
}
export interface IFormAttributesProps {
  formName?: string;
  formId?: string;
  status?: boolean;
  horizontalGap: number;
  verticalGap: number;
}

export interface IFormSchema {
  formElements?: IBaseElement[];
  fieldValues?: Record<string, any>;
  formAttrs?: IFormAttributesProps;
  formServices?: TFormSerives;
}
