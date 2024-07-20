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
    return this.formElementMap.get(id);
  },

  /**
   * 通过id获取父元素的子元素列表
   */
  getParentChildren(id?: string) {
    const parent = this.getElement(id);
    if (parent) {
      if (!parent.children) parent.children = [];
      return parent.children;
    }
    return this.formElements;
  },

  /**
   * 新增元素
   */
  appendEl(el: IBaseElement) {
    const parentChildren = this.getParentChildren(el.parentId);
    parentChildren.push(el);
    this.formElementMap.set(el.id!, el);
    this.setSelectedElement(el);
  },

  /**
   * 插入元素
   */
  insertEl(el: IBaseElement, idx: number) {
    const parentChildren = this.getParentChildren(el.parentId);

    parentChildren.splice(idx, 0, el);
    this.formElementMap.set(el.id!, el);
    this.setSelectedElement(el);
  },

  /**
   * 移动元素
   */
  moveEl(parentId: string, fromIndex: number, toIndex: number) {
    const el = this.getElement(parentId);
    const parentChildren = this.getParentChildren(parentId);
    const afterSort = arrayMoveImmutable(parentChildren, fromIndex, toIndex);
    if (!el) {
      this.formElements = afterSort;
    } else {
      this.setElementProp(parentId, 'children', afterSort);
    }
  },

  dfsEl(el, callback, containParent) {
    if (containParent) callback(el);
    if (el?.children?.length) {
      el.children.forEach((child) => {
        callback(child);
      });
    }
  },

  /**
   * 删除元素
   */
  async deleteEl(el?: IBaseElement, move?: boolean) {
    if (!el) return;

    const parentChildren = this.getParentChildren(el.parentId);

    const idx = parentChildren.findIndex((item) => item.id === el.id);
    // 容器间的移动会删除原有元素 但是绑定的服务和事件不变
    if (!move) {
      const confirmDelete = await eventStore.deleteId(el.id!);
      if (!confirmDelete) return false;
      this.dfsEl(
        el,
        (child) => {
          unBindFromElement(child.id!);
        },
        true,
      );
    }

    this.dfsEl(el, (child) => {
      this.formElementMap.delete(child.id!);
    });

    this.formElementMap.delete(el.id!);
    parentChildren.splice(idx, 1);
  },

  /**
   * 复制元素
   */
  copyEl(el: IBaseElement): IBaseElement {
    const parentChildren = this.getParentChildren(el.parentId);

    const idx = parentChildren.findIndex((item) => item.id === el.id);

    const newId = idCreator();

    const newEl: IBaseElement = { ...cloneDeep(el), id: newId };

    // 复制的事件源id修改
    newEl?.events?.forEach((event) => {
      event.id = idCreator('event');
      const { eventTargets } = event;
      eventTargets?.forEach((target) => {
        target.sourceId = newId;
        target.id = idCreator('event-target');
      });
    });

    this.formElementMap.set(newId, newEl);
    // 关联服务相关设置
    bindFromCopiedElement(el.id as string, newId);

    // 容器组件中的子组件递归操作
    if (el?.children?.length) {
      const children: IBaseElement[] = [];
      el.children.forEach((child: IBaseElement) => {
        const newChild = { ...cloneDeep(child), parentId: newId };
        children.push(this.copyEl(newChild));
      });
      newEl.children = children;
    }

    parentChildren.splice(idx + 1, 0, newEl);

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
