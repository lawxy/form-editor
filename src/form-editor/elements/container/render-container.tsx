import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import c from 'classnames';
import { useEditorContext } from '@/context';
import { prefixCls } from '@/const';
import { handleSort } from '@/utils';
import store from '@/store';
import { ElementLayout } from '@/components';
import type { IBaseElement } from '@/types';
import { ElementsList } from '@/elements/export';
import { ReactSortable } from '@/components/react-sortable';
import './style.less';

export const RenderContainerContent: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  const { horizontalGap, verticalGap } = store.formAttrs;
  const { mode } = useEditorContext();

  return (
    <ElementLayout element={element}>
      <ReactSortable
        list={element.children}
        animation={150}
        group="nested"
        onSort={(e) => handleSort(e, element.id!)}
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
        }}
        forbidden={mode !== 'design'}
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
