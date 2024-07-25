import type { ColumnType } from 'antd/es/table';

export interface IColoumnProp extends ColumnType<{[key: string]: any;}> {
  dataIndex?: string; // 列字段
  title?: string; // 列名
}