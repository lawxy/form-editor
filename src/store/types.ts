import type { FormInstance } from 'antd';
import type {
  IBaseElement,
  IFormAttributesProps,
  TFormSerive,
  TFormSerives,
  IFormSchema,
} from '../types';

export interface IElementStore {
  formElements: IBaseElement[];

  formElementMap: Map<string, IBaseElement>;

  flatElement: (el: IBaseElement) => void;

  setFormElements: (els: IBaseElement[]) => void;

  clearAllElements: () => void;

  getElement: (id?: string) => IBaseElement;

  getParentChildren: (id?: string) => IBaseElement[];

  appendEl: (el: IBaseElement, selectNewElement?: boolean) => void;

  insertEl: (el: IBaseElement, idx: number) => void;

  moveEl: (parentId: string, fromIndex: number, toIndex: number) => void;

  dfsEl: (
    el: IBaseElement,
    callback: (el: IBaseElement) => void,
    containParent?: boolean,
  ) => void;

  deleteEl: (el: IBaseElement, move?: boolean) => Promise<boolean>;

  copyEl: (el: IBaseElement) => IBaseElement;

  selectedElement: IBaseElement;

  setSelectedElement: (el: IBaseElement) => void;

  setElementProp: <T extends keyof IBaseElement>(
    id: string,
    field: T,
    value: IBaseElement[T],
  ) => void;

  setSelectedProp: <T extends keyof IBaseElement>(
    field: T,
    value: IBaseElement[T],
  ) => void;
}
export interface IServiceStore {
  formServices: TFormSerives;
  setFormServices: (services: TFormSerives) => void;
  getFormServices: () => TFormSerives;
  addService: (serv: TFormSerive) => void;
  deleteService: (id: string) => void;
  copyService: (serv: TFormSerive) => void;
  setService: (id: string, servAttr: Partial<TFormSerive>) => void;
  getService: (id: string) => TFormSerive | undefined;
}

export interface IFormAttrStore {
  formAttrs: IFormAttributesProps;

  setFormAttrs: (attrs: IFormAttributesProps) => void;

  setFormAttr: <T extends keyof IFormAttributesProps>(
    key: T,
    value: IFormAttributesProps[T],
  ) => void;
}

export interface IFieldValuesStore {
  formInstance?: FormInstance;

  setForm: (form: FormInstance) => void;

  fieldValues: Record<string, any>;

  setFieldValue: (field: string, value: any) => void;

  setFieldsValues: (values: Record<string, any>) => void;
}

export type TFormTabType = 'element' | 'form' | 'service';
export interface IBaseStore
  extends IServiceStore,
    IElementStore,
    IFormAttrStore,
    IFieldValuesStore {
  getSchema: () => IFormSchema;
}
