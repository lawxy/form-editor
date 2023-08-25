interface ITreeExtendProp {
  createBy: string;
  createTime: string;
  del: boolean;
  id: string;
  name: string;
  parentId: string;
  status: boolean;
  updateBy: string;
  updateTime: string;
  chidlren?: ITreeExtendProp[];
  organizationType: string;
  address?: string;
  members?: any[];
}

export interface ITreeItemProp extends ITreeExtendProp {
  [key: string]: any;
}

export interface IOrganizationSelectProp {
  treeData?: ITreeItemProp[];
  value?: ITreeItemProp[];
  onChange?: (v: ITreeItemProp[]) => void;
  type?: 'staff' | 'dept' | 'all'; // 员工/部门/所有都可选择
  mode?: 'single' | 'multiple'; // 单选多选
  style?: React.CSSProperties;
}
