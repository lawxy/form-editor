import { makeAutoObservable } from 'mobx';
import type { IOrganizationSelectProp, ITreeItemProp } from './types';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  // 从父组件传递下来的所有参数
  globalProps: IOrganizationSelectProp = {
    mode: 'single',
    type: 'all',
    treeData: [],
  };

  // 选中的人员或部门
  selectedItems: ITreeItemProp[] = [];

  init() {
    // this.selectedItems = []
    // this.globalProps = {}
    if (this.globalProps.value && this.globalProps.value.length) {
      this.selectedItems = this.globalProps.value;
    } else {
      this.selectedItems = [];
    }
  }

  setGlobalProps(props: IOrganizationSelectProp) {
    this.globalProps = props;
    if (props.value && props.value.length) {
      this.selectedItems = props.value;
    }
  }

  setSelectedItems(items: ITreeItemProp[]) {
    this.selectedItems = items;
  }
}

export default new Store();
