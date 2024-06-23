import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_SELECT = 'select';
export const SELECT_TEXT = '下拉选择';
export const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
  EEventAction.ON_FOCUS,
  EEventAction.ON_BLUR,
];
export const initialData: Partial<IBaseElement> = {
  elementName: SELECT_TEXT,
  gridSpan: 4,
};
