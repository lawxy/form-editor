import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';

export const ELEMENT_SWITCH = 'fe-switch';
export const SWITCH_TEXT = '开关';
export const eventActions = [EEventAction.ON_LOADED, EEventAction.VALUE_CHANGE];
export const initialData: Partial<IBaseElement> = {
  gridSpan: 2,
  elementName: '开关',
  openValue: 'true',
  closeValue: 'false',
};
