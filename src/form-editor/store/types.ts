import type { TFormSerive, IBaseElement, TFormSerives } from '../types';

export interface IElementStore {
  elementsMap: Map<string, IBaseElement>;

  formElements: IBaseElement[];

  setFormElements: (els: IBaseElement[]) => void;

  clearAllElements: () => void;

  getElFromId: (id: string) => void;

  appendEl: (el: IBaseElement) => void;

  insertEl: (el: IBaseElement, idx: number) => void;

  moveEl: (fromIndex: number, toIndex: number) => void;

  deleteEl: (el: IBaseElement) => void;

  copyEl: (el: IBaseElement) => void;

  selectedElement: IBaseElement;

  setSelectedElement: (el: IBaseElement) => void;

  setSelectedProp: <T extends keyof IBaseElement>(
    field: T,
    value: IBaseElement[T],
  ) => void;
}

export interface IServiceStore {
  formServices: TFormSerives,
  setFormServices: (services: TFormSerives) => void;
  getFormServices: () => TFormSerives,
  addService: (serv: TFormSerive) => void;
  deleteService: (id: string) => void;
  copyService: (serv: TFormSerive) => void;
  setService: (id: string, servAttr: Partial<TFormSerive>) => void;
}

export type TFormTabType = 'element' | 'form' | 'service'
export interface IBaseStore extends IServiceStore, IElementStore{
  formSettingTab: TFormTabType;
  setFormSettingTab: (tab: TFormTabType) => void;
}