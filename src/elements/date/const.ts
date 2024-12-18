import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_DATE = 'fe-date';

export const DATE_TEXT = '日期';

export const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
];

export const showTimeFormat = (dateFormat: string) => {
  const timeFormat = dateFormat?.split(' ');
  if (!timeFormat) return false;
  const res: Record<string, true> = {};
  if (timeFormat.includes('HH')) res.showHour = true;
  if (timeFormat.includes('mm')) res.showMinute = true;
  if (timeFormat.includes('ss')) res.showSecond = true;
  return res;
};

export const initialData: Partial<IBaseElement> = {
  elementName: '日期',
  dateFormat: 'YYYY-MM-DD',
  gridSpan: 4,
  placeholder: '请选择日期',
  allowClear: true,
};
