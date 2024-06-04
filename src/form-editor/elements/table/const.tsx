import type { IBaseElement } from "@/types"

export const ELEMENT_TABLE = 'table'
export const TABLE_TEXT = '表格'
export const initialData: Partial<IBaseElement> = {
  elementName: TABLE_TEXT,
  gridSpan: 24,
  tableAttributes: '{}',
  tableColumns: `[
  {
    title: '列名', 
    dataIndex: 'title'
  }
]`
}