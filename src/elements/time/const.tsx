import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_TIME = 'time';
export const TIME_TEXT = '时间';
export const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
  EEventAction.ON_FOCUS,
  EEventAction.ON_BLUR,
];
export const initialData: Partial<IBaseElement> = {
  elementName: '时间',
  dateFormat: 'HH:mm:ss',
  gridSpan: 4,
};