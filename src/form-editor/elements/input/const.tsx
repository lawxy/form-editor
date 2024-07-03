import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';

export const ELEMENT_INPUT = 'input';
export const INPUT_TEXT = '输入框';
export const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
  EEventAction.ON_FOCUS,
  EEventAction.ON_BLUR,
];
export const initialData: Partial<IBaseElement> = {
  elementName: '输入框',
  textType: 'single',
  gridSpan: 4,
  autoSize: true,
  placeholder: '请输入',
};
