import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_RADIO = 'radio';
export const RADIO_TEXT = '单选';
export const eventActions = [EEventAction.ON_LOADED, EEventAction.VALUE_CHANGE];
export const initialData: Partial<IBaseElement> = {
  elementName: '单选',
  gridSpan: 10,
  alignDirection: 'horizontal',
  valueOptions: [
    { label: '选项1', value: '1', id: '1' },
    { label: '选项2', value: '2', id: '2' },
  ],
};
