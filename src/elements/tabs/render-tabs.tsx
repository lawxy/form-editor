import React, { useEffect } from 'react';
import { Tabs } from 'antd';

import store from '@/store';
import type { TElementRender } from '@/types';
import { idCreator } from '@/utils';
import { RenderElementWithLayout } from '@/components';
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

export const RenderTabs: TElementRender = ({ element, customStyle }) => {
  const { children } = element;

  const items = children?.map((child) => {
    store.flatElement(child);
    return {
      label: child.elementName!,
      key: child.id!,
      children: <RenderElementWithLayout element={child} />,
    };
  });

  useEffect(() => {
    if (!children?.length) {
      createPanel({ parentId: element.id });
      store.setSelectedElement(element);
    }
  }, [children?.length]);

  return <Tabs items={items} type={element.tabType} style={customStyle} />;
};
