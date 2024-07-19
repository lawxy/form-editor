import React, { useRef } from 'react';
import type { SortableEvent } from 'sortablejs';
import { observer } from 'mobx-react-lite';
import { arrayMoveImmutable } from 'array-move';
import { prefixCls } from '@/const';
import { handelSort } from '@/utils';
import store from '@/store';
import { ElementLayout } from '@/components';
import type { IBaseElement } from '@/types';
import { ElementsList } from '@/elements/export';
import { ReactSortable } from '@/components/react-sortable';

const RenderContainerContent: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  const elementRef = useRef<IBaseElement>();
  elementRef.current = element;
  const { horizontalGap, verticalGap } = store.formAttrs;

  const handleSort = (e: SortableEvent) => {
    const { newIndex, item, oldIndex } = e;

    const { add, newEl } = handelSort(item, elementRef.current!.id!);

    const { children = [] } = elementRef.current!;
    if (add) {
      children.splice(newIndex!, 0, newEl!);
      store.setElementProp(
        elementRef.current!.id as string,
        'children',
        children,
      );
    } else {
      const newChildren = arrayMoveImmutable(children, oldIndex!, newIndex!);
      store.setElementProp(
        elementRef.current!.id as string,
        'children',
        newChildren,
      );
    }
    console.log(item);
    console.log(item.dataset);
  };

  return (
    <ElementLayout element={element}>
      <ReactSortable
        list={element.children}
        animation={150}
        group="nested"
        onSort={handleSort}
        rowProps={{
          className: prefixCls('row'),
          style: { margin: 0 },
          gutter: [horizontalGap, verticalGap],
          'data-type': 'el',
        }}
      >
        {element.children?.map((item: IBaseElement) => {
          const Component = ElementsList[item.type!]?.render;
          if (!Component) return null;
          store.flatElement(item);
          return (
            <Component
              key={item.id || String(+new Date())}
              fieldValue={store.fieldValues[item.id as string]}
              element={item}
            />
          );
        })}
      </ReactSortable>
    </ElementLayout>
  );
};

export const RenderContainer = observer(RenderContainerContent);
