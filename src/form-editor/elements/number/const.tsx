import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_NUMBER = 'number';
export const NUMBER_TEXT = '数字框';
export const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
  EEventAction.ON_FOCUS,
  EEventAction.ON_BLUR,
];
export const initialData: Partial<IBaseElement> = {
  elementName: '数字框',
  gridSpan: 4,
};
