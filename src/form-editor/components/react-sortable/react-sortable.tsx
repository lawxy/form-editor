import React from 'react';
import classNames from 'classnames';
import {
  Children,
  cloneElement,
  Component,
  createElement,
  createRef,
  ReactElement,
  RefObject,
} from 'react';
import { Row } from 'antd';
import Sortable, { MoveEvent, Options, SortableEvent } from 'sortablejs';
import type { IBaseElement } from '@/types';
import {
  AllMethodsExceptMove,
  HandledMethodNames,
  ReactSortableProps,
  Store,
  UnHandledMethodNames,
} from './types';
import {
  createCustoms,
  destructurePropsForOptions,
  handleStateChanges,
  handleStateRemove,
  insertNodes,
  removeNode,
  removeNodes,
} from './util';

/** Holds a global reference for which react element is being dragged */
const store: Store = { dragging: null };

export class ReactSortable<T extends IBaseElement> extends Component<
  ReactSortableProps<T>
> {
  static defaultProps: Partial<ReactSortableProps<any>> = {
    clone: (item) => item,
  };

  wrapEl: any;
  private ref: RefObject<HTMLElement>;
  constructor(props: ReactSortableProps<T>) {
    super(props);
    this.ref = createRef<HTMLElement>();
  }

  private isRow(): boolean {
    return !!this.props.rowProps;
  }

  componentDidMount(): void {
    if (this.ref.current === null || this.props.forbidden) return;
    const newOptions = this.makeOptions();

    this.wrapEl = this.isRow()
      ? this.ref.current.querySelector('.ant-row')
      : this.ref.current;
    Sortable.create(this.wrapEl, newOptions);
  }

  componentDidUpdate(prevProps: ReactSortableProps<T>): void {
    if (prevProps.disabled !== this.props.disabled && this.sortable) {
      this.sortable.option('disabled', this.props.disabled);
    }
  }

  render(): JSX.Element {
    const { tag, style, className, id, rowProps } = this.props;
    const classicProps = { style, className, id };

    // if no tag, default to a `div` element.
    const newTag = !tag || tag === null ? 'div' : tag;

    if (!this.isRow()) {
      return createElement(
        newTag,
        {
          ref: this.ref,
          ...classicProps,
        },
        this.getChildren(),
      );
    }
    return createElement(
      newTag,
      {
        ref: this.ref,
        ...classicProps,
      },
      <Row {...rowProps}>{this.getChildren()}</Row>,
    );
  }

  private getChildren() {
    const { children } = this.props;

    // if no children, don't do anything.
    if (!children) return null;
    return Children.map(children as ReactElement<any>[], (child) => {
      if (!child) return undefined;

      const { className: prevClassName = '' } = child?.props || {};

      const className = classNames(prevClassName, {});

      return cloneElement(child, {
        className,
      });
    });
  }

  /** Appends the `sortable` property to this component */
  private get sortable(): Sortable | null {
    const el = this.wrapEl;
    if (!el) return null;
    const key = Object.keys(el).find((k) => k.includes('Sortable'));
    if (!key) return null;
    return el[key] as Sortable;
  }

  /** Converts all the props from `ReactSortable` into the `options` object that `Sortable.create(el, [options])` can use. */
  makeOptions(): Options {
    const DOMHandlers: HandledMethodNames[] = [
      'onAdd',
      'onChoose',
      'onDeselect',
      'onEnd',
      'onRemove',
      'onSelect',
      'onSpill',
      'onStart',
      'onUnchoose',
      'onUpdate',
    ];
    const NonDOMHandlers: UnHandledMethodNames[] = [
      'onChange',
      'onClone',
      'onFilter',
      'onSort',
    ];
    const newOptions: Options = destructurePropsForOptions(this.props);
    DOMHandlers.forEach(
      (name) => (newOptions[name] = this.prepareOnHandlerPropAndDOM(name)),
    );
    NonDOMHandlers.forEach(
      (name) => (newOptions[name] = this.prepareOnHandlerProp(name)),
    );

    /** onMove has 2 arguments and needs to be handled seperately. */
    const onMove = (evt: MoveEvent, originalEvt: Event) => {
      const { onMove } = this.props;
      const defaultValue = evt.willInsertAfter || -1;
      if (!onMove) return defaultValue;
      const result = onMove(evt, originalEvt, this.sortable, store);
      if (typeof result === 'undefined') return false;
      return result;
    };

    return {
      ...newOptions,
      onMove,
    };
  }

  /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop & an `on[Handler]` ReactSortable method.  */
  prepareOnHandlerPropAndDOM(
    evtName: HandledMethodNames,
  ): (evt: SortableEvent) => void {
    return (evt) => {
      // call the component prop
      this.callOnHandlerProp(evt, evtName);
      // calls state change
      this[evtName](evt);
    };
  }

  /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop */
  prepareOnHandlerProp(
    evtName: Exclude<AllMethodsExceptMove, HandledMethodNames>,
  ): (evt: SortableEvent) => void {
    return (evt) => {
      // call the component prop
      this.callOnHandlerProp(evt, evtName);
    };
  }

  /** Calls the `props.on[Handler]` function */
  callOnHandlerProp(evt: SortableEvent, evtName: AllMethodsExceptMove): void {
    const propEvent = this.props[evtName];
    if (propEvent) propEvent(evt, this.sortable, store);
  }

  // SORTABLE DOM HANDLING
  onAdd(evt: SortableEvent): void {
    const otherList = [...store.dragging!.props.list];
    const customs = createCustoms(evt, otherList);
    removeNodes(customs);
  }

  onRemove(evt: SortableEvent): void {
    const { list } = this.props;
    // const mode = getMode(evt);
    const customs = createCustoms(evt, list);
    insertNodes(customs);

    let newList = [...list];
    // remove state if not in clone mode. otherwise, keep.
    if (evt.pullMode !== 'clone') newList = handleStateRemove(customs, newList);
    // if clone, it doesn't really remove. instead it clones in place.
    else {
      removeNodes(customs);
      // replace selected items with cloned items
      customs.forEach((curr) => {
        const index = curr.oldIndex;
        const newItem = this.props.clone!(curr.item, evt);
        newList.splice(index, 1, newItem);
      });
    }

    // remove item.selected from list
    newList = newList.map((item: T) =>
      Object.assign({}, item, {
        selected: false,
      }),
    );
  }

  onUpdate(evt: SortableEvent): void {
    const { list } = this.props;
    const customs = createCustoms(evt, list);
    removeNodes(customs);
    insertNodes(customs);
    handleStateChanges(customs, list);
  }

  onStart(): void {
    store.dragging = this;
  }

  onEnd(): void {
    store.dragging = null;
  }

  onChoose(): void {}

  onUnchoose(): void {}

  onSpill(evt: SortableEvent): void {
    const { removeOnSpill, revertOnSpill } = this.props;
    if (removeOnSpill && !revertOnSpill) removeNode(evt.item);
  }

  onSelect(evt: SortableEvent): void {
    const { list } = this.props;
    const newList = list.map((item) =>
      Object.assign({}, item, {
        selected: false,
      }),
    );

    evt.newIndicies.forEach((curr) => {
      const index = curr.index;
      if (index === -1) {
        console.log(
          `"${evt.type}" had indice of "${curr.index}", which is probably -1 and doesn't usually happen here.`,
        );
        console.log(evt);
        return;
      }
      newList[index].selected = true;
    });
  }

  onDeselect(evt: SortableEvent): void {
    const { list } = this.props;
    const newList = list.map((item) =>
      Object.assign({}, item, {
        selected: false,
      }),
    );
    evt.newIndicies.forEach((curr) => {
      const index = curr.index;
      if (index === -1) return;
      newList[index].selected = true;
    });
  }
}

// interface MultiIndices {
//   multiDragElement: HTMLElement;
//   index: number;
// }

// export interface SortableEvent extends SortableEvent {
//   clones: HTMLElement[];
//   oldIndicies: MultiIndices[];
//   newIndicies: MultiIndices[];
//   swapItem: HTMLElement | null;
// }
