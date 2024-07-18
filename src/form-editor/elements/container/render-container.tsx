import React, { useRef } from 'react';
// import Sortable from 'sortablejs';
import Sortable from 'sortablejs';
import type { SortableEvent } from 'sortablejs';
import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { arrayMoveImmutable } from 'array-move';
import { prefixCls } from '@/const';
import { handelSort } from '@/utils';
import { useDesignEffect } from '@/hooks';
import store from '@/store';
import { ElementLayout } from '@/components';
import type { IBaseElement } from '@/types';
import { ElementsList } from '@/elements/export';
import { ReactSortable } from '@/components/react-sortable';

const RenderContainerContent: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  const wrapEl = useRef<HTMLDivElement>(null);
  const elementRef = useRef<IBaseElement>();
  elementRef.current = element;
  const { horizontalGap, verticalGap } = store.formAttrs;

  // useDesignEffect(() => {
  //   const rowEl = wrapEl?.current?.querySelector('.ant-row') as HTMLElement;
  //   if (!rowEl) return;
  //   // document.addEventListener('mouseup', () => {
  //   //   console.log('123');
  //   //   console.log('mouseup');
  //   // });
  //   // rowEl.addEventListener('drop', (e) => {
  //   //   e.stopPropagation();
  //   //   console.log('drop');
  //   // });
  //   // rowEl.addEventListener('dropend', () => {
  //   //   console.log('dropend');
  //   // });

  //   const sortIns = new Sortable(rowEl, {
  //     animation: 150,
  //     group: 'nested',
  //     fallbackOnBody: true,
  //     onMove(e) {
  //       console.log(e);
  //       // return false;
  //     },
  //     onEnd(e) {
  //       console.log('onend');
  //     },
  //     onSort: function (e: SortableEvent) {
  //       // debugger;
  //       const { newIndex, item, oldIndex } = e;

  //       const { add, newEl } = handelSort(item, elementRef.current!.id!);

  //       // console.log('add', add);
  //       // console.log('newEl', newEl);
  //       // console.log('newIndex', newIndex);
  //       const { children = [] } = elementRef.current!;
  //       if (add) {
  //         children.splice(newIndex!, 0, newEl!);
  //         store.setElementProp(
  //           elementRef.current!.id as string,
  //           'children',
  //           children,
  //         );
  //       } else {
  //         const newChildren = arrayMoveImmutable(
  //           children,
  //           oldIndex!,
  //           newIndex!,
  //         );
  //         store.setElementProp(
  //           elementRef.current!.id as string,
  //           'children',
  //           newChildren,
  //         );
  //       }
  //       console.log(item);
  //       console.log(item.dataset);
  //     },
  //   });

  //   return () => {
  //     sortIns?.destroy?.();
  //   };
  // });
  // console.log('element.children', element.children);

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
        setList={() => {}}
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
      {/* <div ref={wrapEl}>
        <Row
          className={prefixCls('row')}
          style={{ margin: 0 }}
          gutter={[horizontalGap, verticalGap]}
          data-type="el"
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
        </Row>
        ,
      </div> */}
    </ElementLayout>
  );
};

export const RenderContainer = observer(RenderContainerContent);
