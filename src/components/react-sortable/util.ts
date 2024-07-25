import { PropsWithChildren } from 'react';
import Sortable, { Options, SortableEvent } from 'sortablejs';
import type { IBaseElement } from '@/types';
import { AllMethodNames, ReactSortableProps } from './types';

/**
 * Removes the `node` from the DOM
 * @param node
 */
export function removeNode(node: HTMLElement): void {
  if (node.parentElement !== null) node.parentElement.removeChild(node);
}

/**
 * Inserts the `newChild` node at the given index in a parent
 * @param parent The parent HTML Element.
 * @param newChild A HTML eement to add as a child of the parent.
 * @param index index of the parent to place the new child in.
 */
export function insertNodeAt(
  parent: HTMLElement,
  newChild: HTMLElement,
  index: number,
): void {
  const refChild = parent.children[index] || null;
  parent.insertBefore(newChild, refChild);
}

/** removes stuff from the dom in a nice order */
export function handleDOMChanges<T extends IBaseElement>(
  customs: Normalized<T>[],
): void {
  removeNodes(customs);
  insertNodes(customs);
}

export function removeNodes<T extends IBaseElement>(
  customs: Normalized<T>[],
): void {
  customs.forEach((curr) => removeNode(curr.element));
}

export function insertNodes<T extends IBaseElement>(
  customs: Normalized<T>[],
): void {
  customs.forEach((curr) => {
    insertNodeAt(curr.parentElement, curr.element, curr.oldIndex);
  });
}

export function createCustoms<T extends IBaseElement>(
  evt: SortableEvent,
  list: T[],
): Normalized<T>[] {
  const custom = [
    {
      element: evt.item,
      newIndex: evt.newIndex!,
      oldIndex: evt.oldIndex!,
      parentElement: evt.from,
    },
  ];

  /* eslint-enable */

  const customs = createNormalized(custom, list);
  return customs;
}

/** moves items form old index to new index without breaking anything ideally. */
export function handleStateChanges<T extends IBaseElement>(
  normalized: Normalized<T>[],
  list: T[],
): T[] {
  const a = handleStateRemove(normalized, list);
  const b = handleStateAdd(normalized, a);
  return b;
}

export function handleStateRemove<T extends IBaseElement>(
  normalized: Normalized<T>[],
  list: T[],
): T[] {
  const newList = [...list];
  normalized
    .concat()
    .reverse()
    .forEach((curr) => newList.splice(curr.oldIndex, 1));
  return newList;
}

export function handleStateAdd<T extends IBaseElement>(
  normalized: Normalized<T>[],
  list: T[],
  evt?: Sortable.SortableEvent,
  clone?: ((currentItem: T, evt: Sortable.SortableEvent) => T) | undefined,
): T[] {
  const newList = [...list];
  normalized.forEach((curr) => {
    const newItem = clone && evt && clone(curr.item, evt);
    newList.splice(curr.newIndex, 0, newItem || curr.item);
  });
  return newList;
}

export function createNormalized<T extends IBaseElement>(
  inputs: Input[],
  list: T[],
): Normalized<T>[] {
  const normalized = inputs
    .map<Normalized<T>>((curr) => ({ ...curr, item: list[curr.oldIndex] }))
    .sort((a, b) => a.oldIndex - b.oldIndex);
  return normalized;
}

export interface Input {
  parentElement: HTMLElement;
  element: HTMLElement;
  oldIndex: number;
  newIndex: number;
}

export interface Normalized<T> extends Input {
  item: T;
}

/**
 * Removes the following group of properties from `props`,
 * leaving only `Sortable.Options` without any `on` methods.
 * @param props `ReactSortable.Props`
 */
export function destructurePropsForOptions<T>(
  props: PropsWithChildren<ReactSortableProps<T>>,
): Exclude<Options, AllMethodNames> {
  /* eslint-disable */
  const {
    // react sortable props
    list,
    children,
    tag,
    style,
    className,
    clone,
    // sortable options that have methods we want to overwrite
    onAdd,
    onChange,
    onChoose,
    onClone,
    onEnd,
    onFilter,
    onRemove,
    onSort,
    onStart,
    onUnchoose,
    onUpdate,
    onMove,
    onSpill,
    onSelect,
    onDeselect,
    rowProps,
    ...options
  } = props;
  /* eslint-enable */
  return options;
}

/**
 * Construct a type with the properties of T except for those in type K.
 * Including this allows for backwards compatibility with earlier versions of TS.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
