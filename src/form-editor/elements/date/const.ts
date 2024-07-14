import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_DATE = 'date';

export const DATE_TEXT = '日期';

export const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
  EEventAction.ON_FOCUS,
  EEventAction.ON_BLUR,
];

export const initialData: Partial<IBaseElement> = {
  elementName: '日期',
  dateFormat: 'YYYY-MM-DD',
  gridSpan: 4,
  placeholder: '请选择日期',
};
