import type {
  IBaseElement,
  IFormAttributesProps,
  TFormSerive,
  TFormSerives,
} from '../types';

export interface IElementStore {
  formElements: IBaseElement[];

  setFormElements: (els: IBaseElement[]) => void;

  clearAllElements: () => void;

  getElement: (id: string) => IBaseElement;

  appendEl: (el: IBaseElement) => void;

  insertEl: (el: IBaseElement, idx: number) => void;

  moveEl: (fromIndex: number, toIndex: number) => void;

  deleteEl: (el: IBaseElement) => void;

  copyEl: (el: IBaseElement) => void;

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
  servicesMap: Map<string, TFormSerive>;
  setFormServices: (services: TFormSerives) => void;
  getFormServices: () => TFormSerives;
  addService: (serv: TFormSerive) => void;
  deleteService: (id: string) => void;
  copyService: (serv: TFormSerive) => void;
  setService: (id: string, servAttr: Partial<TFormSerive>) => void;
  hasService: (id: string) => boolean;
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
  getFormJson: () => {
    formElements: IBaseElement[];
    fieldValues: Record<string, any>;
    formAttrs: IFormAttributesProps;
    formServices: TFormSerives;
  };
}
