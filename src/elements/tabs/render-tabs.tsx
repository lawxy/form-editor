import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tabs } from 'antd';

import store from '@/store';
import { ElementLayout } from '@/components';
import type { IBaseElement } from '@/types';
import { idCreator } from '@/utils';
// import { createPanel } from './const';
import { initialData, ELEMENT_CONTAINER } from '../container';

import { RenderContainer } from '../container';

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

const RenderTabsContent: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  const { children } = element;

  const items = children?.map((child) => {
    store.flatElement(child);
    return {
      label: child.elementName!,
      key: child.id!,
      children: <RenderContainer element={child} />,
    };
  });

  useEffect(() => {
    if (!children?.length) {
      createPanel({ parentId: element.id });
      store.setSelectedElement(element);
    }
  }, [children?.length]);

  return (
    <ElementLayout element={element}>
      <Tabs items={items} type={element.tabType} />
    </ElementLayout>
  );
};

export const RenderTabs = observer(RenderTabsContent);
