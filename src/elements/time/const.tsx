import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_TIME = 'fe-time';
export const TIME_TEXT = '时间';
export const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
];
export const initialData: Partial<IBaseElement> = {
  elementName: '时间',
  dateFormat: 'HH:mm:ss',
  gridSpan: 4,
  allowClear: true,
};
