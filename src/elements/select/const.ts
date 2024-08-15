import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_SELECT = 'fe-select';
export const SELECT_TEXT = '下拉框';
export const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
];
export const initialData: Partial<IBaseElement> = {
  elementName: SELECT_TEXT,
  gridSpan: 4,
  gridLayout: true,
  placeholder: '请选择',
  valueOptions: [
    { label: '选项1', value: '1', id: '1' },
    { label: '选项2', value: '2', id: '2' },
  ],
};
