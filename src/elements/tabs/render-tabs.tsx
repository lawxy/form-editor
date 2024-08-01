import React, { useEffect } from 'react';
import { Tabs } from 'antd';

import { useEditorContext } from '@/context';
import store from '@/store';
import type { IBaseElement } from '@/types';
import { idCreator } from '@/utils';
import { initialData, ELEMENT_CONTAINER } from '../container';

export const createPanel = (props = {}) => {
  const panel = {
    ...initialData,
    elementName: 'tab选项卡',
    type: ELEMENT_CONTAINER,
    id: idCreator('el'),
    ...props,
  };
  store.appendEl(panel, false);
};

export const RenderTabs: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  const { children } = element;
  const { ElementsMap } = useEditorContext();

  const items = children?.map((child) => {
    store.flatElement(child);
    const Container = ElementsMap[ELEMENT_CONTAINER].render;
    return {
      label: child.elementName!,
      key: child.id!,
      children: <Container element={child} />,
    };
  });

  useEffect(() => {
    if (!children?.length) {
      createPanel({ parentId: element.id });
      store.setSelectedElement(element);
    }
  }, [children?.length]);

  return <Tabs items={items} type={element.tabType} />;
};
