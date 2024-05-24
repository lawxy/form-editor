export interface IDragElementProp {
  type: string;
  render: React.FC<any>;
  setting: React.FC<any>;
  text: string;
  initialData: Record<string, any>;
}

export type TMode = 'design' | 'form';
export interface IEditorCanvasProp {
  /**
   * 表单模式
   */
  mode: TMode;
  /**
   * 表单操作按钮
   */
  actions?: React.ReactNode; // 表单操作按钮组
  /**
   * 虚拟拖拽的组件
   */
  virtualElement?: IBaseElement;
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
   * 元素id
   */
  id?: string;
  /**
   * 元素栅格
   */
  // widthPercent?: number;
  gridSpan?: number;
  /**
   * 日期元素格式
   */
  dateFormat?: string;
  /**
   * 文本类型
   */
  textType?: 'single' | 'multiple';
  /**
   * 最小行数
   */
  minRows?: number;
  /**
   * 最大行数
   */
  maxRows?: number;

  /**
   * 绑定表
   */

  bindTable?: string;
  /**
   * 绑定字段
   */
  bindField?: string;
}

export interface IFormAttributesProps {
  isProcessForm: boolean;
  formName?: string;
  formId?: string;
  status?: boolean;
  horizontalGap: number;
  verticalGap: number;
}
