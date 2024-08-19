export interface ITableEdit {
  type?: 'edit' | 'delete';
  editData?: Record<string, any>;
  editId?: string;
  deleteData?: Record<string, any>;
  deleteId?: string;
  page?: number;
  pageSize?: number;
}
