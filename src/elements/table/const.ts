import type { IBaseElement } from '@/types';
import { EEventAction } from '@/types';

export const ELEMENT_TABLE = 'fe-table';
export const TABLE_TEXT = '表格';
export const eventActions = [EEventAction.ON_LOADED];
export const initialData: Partial<IBaseElement> = {
  elementName: TABLE_TEXT,
  gridSpan: 24,
  gridLayout: true,
  tableAttributes: '{}',
  readonly: true,
  columns: [],
  tableColumns: `[
  {
    title: '列名', 
    dataIndex: 'title'
  }
]`,
};
