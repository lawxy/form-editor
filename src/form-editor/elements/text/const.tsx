import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_TEXT = 'text';
export const TEXT_TEXT = '文本框';
export const eventActions = [];
export const initialData: Partial<IBaseElement> = {
  elementName: '文本框',
  gridSpan: 4,
  placeholder: '请选择时间',
};
