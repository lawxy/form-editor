import type { SortableEvent } from 'sortablejs';
import { idCreator, dynamicGetStore } from '.';
import type { TDragElementObject } from '@/types';

export const handleSort = async (
  ElementsMap: TDragElementObject,
  e: SortableEvent,
  parentId: string,
) => {
  const store = await dynamicGetStore();
  const { from, to, newIndex, item, oldIndex } = e;
  // 目标不在当前组件的不管  否则表单和容器组件间拖拽 会触发两次
  if (to?.dataset?.id !== parentId) return;

  // debugger;
  // 从物料区拖过来的
  if (!item?.dataset?.parentId) {
    const element = ElementsMap[item.dataset.type as string];

    const { initialData } = element;

    const newEl = {
      type: item.dataset.type,
      ...initialData,
      id: idCreator(),
      parentId,
    };

    store.insertEl(newEl, newIndex!);
    return;
  }

  // 同一个容器去间的移动
  if (from?.dataset?.id === to?.dataset?.id) {
    store.moveEl(parentId, oldIndex!, newIndex!);
    return;
  }

  // 不同容器(表单)之间移动
  const current = store.getElement(item.dataset.id);

  store.deleteEl(current, true);

  item.setAttribute('data-parent-id', parentId);

  const newEl = {
    ...current,
    parentId,
  };

  store.formElementMap.set(item.dataset.id!, newEl);

  store.insertEl(newEl, newIndex!);
};
