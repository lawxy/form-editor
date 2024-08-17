import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_TABLE = 'fe-table';
export const TABLE_TEXT = '表格';
export const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
  EEventAction.PAGINATION_CHANGE,
];
export const initialData: Partial<IBaseElement> = {
  elementName: TABLE_TEXT,
  gridSpan: 24,
  gridLayout: true,
  readonly: true,
  lineAdd: true,
  columns: [],
  pagination: false,
  pageSize: 10,
  currentPage: 1,
};

export const valueTypeList = [
  {
    label: '文本框',
    value: 'text',
  },
  {
    label: '下拉框',
    value: 'select',
  },
  {
    label: '单选',
    value: 'radio',
  },
  {
    label: '多选',
    value: 'checkbox',
  },
  {
    label: '数字框',
    value: 'digit',
  },
  {
    label: '日期',
    value: 'date',
  },
  {
    label: '时间',
    value: 'time',
  },
  {
    label: '日期时间',
    value: 'dateTime',
  },
  {
    label: '日期区间',
    value: 'dateRange',
  },
];

export const elementWithOptions = ['select', 'radio', 'checkbox'];
