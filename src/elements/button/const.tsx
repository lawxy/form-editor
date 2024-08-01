import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';

export const ELEMENT_BUTTON = 'fe-button';
export const BUTTON_TEXT = '按钮';
export const eventActions = [EEventAction.ON_LOADED, EEventAction.ON_CLICK];
export const initialData: Partial<IBaseElement> = {
  btnText: '按钮',
  elementName: '按钮',
  gridSpan: 2,
};
