import React from 'react';
import c from 'classnames';
import { useEditorContext } from '@/context';
import { prefixCls } from '@/const';
import { handleSort } from '@/utils';
import store from '@/store';
import { RenderElementWithLayout } from '@/components';
import type { IBaseElement, TElementRender } from '@/types';
import { ReactSortable } from '@roddan/ui';
import './style.less';

export const RenderContainer: TElementRender = ({ element, customStyle }) => {
  const { horizontalGap, verticalGap, id } = store.formAttrs;
  const { mode, ElementsMap } = useEditorContext();
  const { parentId } = element;

  return (
    <ReactSortable<IBaseElement>
      list={element.children || []}
      animation={150}
      group="nested"
      onSort={(e) => handleSort(ElementsMap, e, element.id!)}
      rowProps={{
        className: c([
          prefixCls('row'),
          prefixCls('row-el'),
          mode === 'design' && !element.children?.length
            ? prefixCls('row-empty')
            : '',
        ]),
        gutter: [horizontalGap, verticalGap],
        'data-id': element.id,
        'data-parent-id': parentId || id,
      }}
      forbidden={mode !== 'design'}
      style={customStyle}
    >
      {element.children?.map((item: IBaseElement) => {
        store.flatElement(item);
        return <RenderElementWithLayout element={item} key={item.id} />;
      })}
    </ReactSortable>
  );
};
