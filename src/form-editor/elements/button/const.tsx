import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';

export const ELEMENT_BUTTON = 'button';
export const BUTTON_TEXT = '按钮';
export const eventActions = [EEventAction.ON_CLICK];
export const initialData: Partial<IBaseElement> = {
  gridSpan: 2,
};
