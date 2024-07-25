import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export enum EValueType {
  INT = 'int',
  ONE_DECIMAL = 'one_decimal',
  TWO_DECIMAL = 'two_decimal',
}

export const valueTypeOptions = [
  {
    label: '整数',
    value: EValueType.INT,
  },
  {
    label: '保留一位小数',
    value: EValueType.ONE_DECIMAL,
  },
  {
    label: '保留两位小数',
    value: EValueType.TWO_DECIMAL,
  },
];

export const ELEMENT_NUMBER = 'number';
export const NUMBER_TEXT = '数字框';
export const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
  EEventAction.ON_FOCUS,
  EEventAction.ON_BLUR,
];
export const initialData: Partial<IBaseElement> = {
  elementName: '数字框',
  gridSpan: 4,
  valueType: 'int',
};
