import type { IBaseElement } from '@/types';
import { idCreator } from '@/utils';
import { ELEMENT_CONTAINER } from '../container';
import { initialData as panelInitial } from '../container';

export const ELEMENT_TABS = 'tabs';

export const TABS_TEXT = 'tabs';

export const eventActions = [];

export const createPanel = (props = {}) => {
  return {
    ...panelInitial,
    elementName: 'tab选项卡',
    type: ELEMENT_CONTAINER,
    // subType: ''
    id: idCreator('el'),
    ...props,
  };
};

export const initialData: Partial<IBaseElement> = {
  elementName: 'tabs',
  gridSpan: 24,
  gridLayout: true,
  children: [createPanel()],
};
