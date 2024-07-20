import { arrayMoveImmutable } from 'array-move';
import { runInAction } from 'mobx';
import { cloneDeep } from 'lodash-es';
import { idCreator, bindFromCopiedElement, unBindFromElement } from '@/utils';
import { tabStore } from './tabStore';
import eventStore from './eventStore';
import type { IBaseElement } from '../types';
import { IBaseStore, IElementStore } from './types';

export default {
  /**
   * 表单元素集合
   */
  formElements: [],

  formElementMap: new Map(),

  flatElement(el: IBaseElement) {
    // if (this.formElementMap.has(el.id!)) return;
    this.formElementMap.set(el.id!, el);
  },

  setFormElements(els: IBaseElement[]) {
    this.formElements = els;
  },

  clearAllElements() {
    this.formElements = [];
  },

  /**
   * 通过id获取元素
   */
  getElement(id?: string) {
    if (!id) return;
    // const fromElements = this.formElements.find((el) => el?.id === id);
    // const fromMap = this.formElementMap.get(id);
    // console.log('fromElements', fromElements);
    // console.log('fromMap', fromMap);
    // console.log(fromElements === fromMap);
    // return this.formElements.find((el) => el?.id === id);
    return this.formElementMap.get(id);
  },

  /**
   * 新增元素
   */
  appendEl(el: IBaseElement) {
    this.formElements.push(el);
    this.formElementMap.set(el.id!, el);
    this.setSelectedElement(el);
  },

  /**
   * 插入元素
   */
  insertEl(el: IBaseElement, idx: number) {
    this.formElements.splice(idx, 0, el);
    this.formElementMap.set(el.id!, el);
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
  async deleteEl(el?: IBaseElement, move?: boolean) {
    if (!el) return;
    const idx = this.formElements.findIndex((item) => item.id === el.id);
    // 容器间的移动会删除原有元素 但是绑定的服务和事件不变
    if (!move) {
      const confirmDelete = await eventStore.deleteId(el.id!);
      if (!confirmDelete) return;
      unBindFromElement(el.id as string);
    }
    this.formElementMap.delete(el.id!);
    this.formElements.splice(idx, 1);
  },

  /**
   * 复制元素
   */
  copyEl(el: IBaseElement) {
    const idx = this.formElements.findIndex((item) => item.id === el.id);
    const newId = idCreator();
    const newEl: IBaseElement = { ...cloneDeep(el), id: newId };
    newEl?.events?.forEach((event) => {
      const { eventTargets } = event;
      eventTargets?.forEach((target) => {
        target.sourceId = newId;
      });
    });
    this.formElements.splice(idx + 1, 0, newEl);
    this.formElementMap.set(newId, newEl);
    bindFromCopiedElement(el.id as string, newId);
    return newEl;
  },

  /**
   * 当前选中的元素
   */
  selectedElement: {},

  setSelectedElement(el: IBaseElement) {
    this.selectedElement = el;
    tabStore.init();
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
    this.setElementProp(this.selectedElement.id!, field, value);
    this.selectedElement[field] = value;
  },
} as Pick<IBaseStore, keyof IElementStore>;
