import React from 'react';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '@/types';
import { RenderContainer, RenderContainerContent } from '../container';

const RenderTabPanelContent: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  return <RenderContainer element={element} />;
};

export const RenderTabPanel = RenderContainer;
