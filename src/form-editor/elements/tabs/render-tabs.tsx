import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tabs } from 'antd';
import c from 'classnames';
import { useEditorContext } from '@/context';
import { prefixCls } from '@/const';
import { handleSort } from '@/utils';
import store from '@/store';
import { ElementLayout } from '@/components';
import type { IBaseElement } from '@/types';

import { RenderContainer } from '../container';

const RenderTabsContent: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  const { children } = element;
  const items = children?.map((child) => {
    child.parentId = element.id;
    store.flatElement(child);
    return {
      label: child.elementName!,
      key: child.id!,
      children: <RenderContainer element={child} />,
    };
  });

  return (
    <ElementLayout element={element}>
      <Tabs items={items} />
    </ElementLayout>
  );
};

export const RenderTabs = observer(RenderTabsContent);
