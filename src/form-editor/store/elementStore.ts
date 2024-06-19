import { idCreator } from '@/utils';
import { arrayMoveImmutable } from 'array-move';
import type { IBaseElement } from '../types';
import { IBaseStore, IElementStore } from './types'

export default {
  /**
   * 储存所有元素的map
   */
  elementsMap: new Map(),

  /**
   * 表单元素集合
   */
  formElements: [],

  setFormElements(els: IBaseElement[]) {
    this.formElements = els;
    this.formElements.forEach((el: IBaseElement) => {
      this.elementsMap.set(el.id as string, el)
    })
  },

  clearAllElements() {
    this.formElements = [];
    this.elementsMap.clear()
  },

  /**
   * 通过id获取元素
   */
  getElFromId(id: string) {
    return this.elementsMap.get(id);
  },

  /**
   * 新增元素
   */
  appendEl(el: IBaseElement) {
    this.formElements.push(el);
    this.setSelectedElement(el);
    this.elementsMap.set(el.id!, el);
  },

  /**
   * 插入元素
   */
  insertEl(el: IBaseElement, idx: number) {
    this.formElements.splice(idx, 0, el);
    this.setSelectedElement(el);
    this.elementsMap.set(el.id!, el);
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
    this.elementsMap.delete(el.id!);
  },

  /**
   * 复制元素
   */
  copyEl(el: IBaseElement) {
    const idx = this.formElements.findIndex((item) => item.id === el.id);
    const newEl: IBaseElement = { ...el, id: idCreator() };
    this.formElements.splice(idx + 1, 0, newEl);
    this.elementsMap.set(newEl.id as string, newEl)
    return newEl;
  },

  /**
   * 当前选中的元素
   */
  selectedElement: {},

  setSelectedElement(el: IBaseElement) {
    this.selectedElement = el;
    // @ts-ignore
    this.setFormSettingTab('element')
  },

  /**
   * 设置当前元素属性
   */
  setSelectedProp<T extends keyof IBaseElement>(
    field: T,
    value: IBaseElement[T],
  ) {
    this.selectedElement[field] = value;
    const elInForm = this.formElements.find(
      (item) => item.id === this.selectedElement.id,
    ) as IBaseElement;
    elInForm[field] = value;
    this.elementsMap.set(elInForm.id!, elInForm);
  },
} as Pick<IBaseStore, keyof IElementStore>;
