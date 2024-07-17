import { ElementsList } from '@/elements';
import { IBaseElement } from '@/types';
import store from '@/store';
import { idCreator } from './id-creator';

export const handelSort = (
  item: HTMLElement,
  parentId: string,
): { add: boolean; newEl?: IBaseElement } => {
  const newly =
    !item?.dataset?.parentId ||
    (parentId && item?.dataset?.parentId !== parentId);

  if (!newly) {
    return {
      add: false,
    };
  }
  console.log(item);

  if (item.parentNode) item.parentNode.removeChild(item);
  // 1. 新增 (容器内部的元素移动也是新增)
  // 2. 原先的容器需要将元素删除
  // debugger;
  if (item?.dataset?.parentId) {
    const parent = store.getElement(item.dataset.parentId);
    const current = store.getElement(item.dataset.id);
    console.log('?', parent);
    console.log('current', current, { ...current });
    if (!parent) {
      // store.deleteEl(current, true);
    } else {
      // const idx = parent.children?.findIndex((item) => item.id === current.id);
      // const { children } = parent;
      // children?.splice(idx!, 1);
      // store.setElementProp(parent.id!, 'children', children);
    }

    item.setAttribute('data-parent-id', parentId);

    const newEl = {
      ...current,
      parentId,
    };

    store.formElementMap.set(item.dataset.id!, newEl);

    return {
      add: true,
      newEl: newEl,
    };
  }

  const element = ElementsList[item.dataset.type as string];
  const { initialData } = element;
  const newEl = {
    type: item.dataset.type,
    ...initialData,
    id: idCreator(),
    parentId,
  };
  return {
    add: true,
    newEl,
  };
};
