import { arrayMoveImmutable } from 'array-move';
import { idCreator } from '@/utils';
import { tabStore } from './tabStore';
import type { IBaseElement } from '../types';
import { IBaseStore, IElementStore } from './types';

export default {
  /**
   * 表单元素集合
   */
  formElements: [],

  setFormElements(els: IBaseElement[]) {
    this.formElements = els;
  },

  clearAllElements() {
    this.formElements = [];
  },

  /**
   * 通过id获取元素
   */
  getElement(id: string) {
    return this.formElements.find(el => el.id === id);
  },

  /**
   * 新增元素
   */
  appendEl(el: IBaseElement) {
    this.formElements.push(el);
    this.setSelectedElement(el);
  },

  /**
   * 插入元素
   */
  insertEl(el: IBaseElement, idx: number) {
    this.formElements.splice(idx, 0, el);
    this.setSelectedElement(el);
  },

  /**
   * 移动元素
   */
  moveEl(fromIndex: number, toIndex: number) {
    this.formElements = arrayMoveImmutable(
      this.formElements,
      fromIndex,
      toIndex,
    );
  },

  /**
   * 删除元素
   */
  deleteEl(el: IBaseElement) {
    const idx = this.formElements.findIndex((item) => item.id === el.id);
    this.formElements.splice(idx, 1);
  },

  /**
   * 复制元素
   */
  copyEl(el: IBaseElement) {
    const idx = this.formElements.findIndex((item) => item.id === el.id);
    const newEl: IBaseElement = { ...el, id: idCreator() };
    this.formElements.splice(idx + 1, 0, newEl);
    return newEl;
  },

  /**
   * 当前选中的元素
   */
  selectedElement: {},

  setSelectedElement(el: IBaseElement) {
    this.selectedElement = el;
    tabStore.init()
  },

  setElementProp<T extends keyof IBaseElement>(
    id: string,
    field: T,
    value: IBaseElement[T],
  ) {
    const element = this.getElement(id);
    element![field] = value;
  },

  /**
   * 设置当前选中元素属性
   */
  setSelectedProp<T extends keyof IBaseElement>(
    field: T,
    value: IBaseElement[T],
  ) {
    this.setElementProp(this.selectedElement.id!, field, value)
    this.selectedElement[field] = value;
  },
} as Pick<IBaseStore, keyof IElementStore>;
