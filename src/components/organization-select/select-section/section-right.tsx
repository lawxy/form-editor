import { Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import type { ITreeItemProp } from '../types';

import store from '../store';

const SectionRight = () => {
  const handleClose = useCallback((node: ITreeItemProp) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      store.setSelectedItems(
        store.selectedItems.filter((item) => item.id !== node.id),
      );
    };
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 10 }}>已选择组织或人员：</div>
      {store.selectedItems.map((item: ITreeItemProp) => {
        return (
          <Tag closable onClose={handleClose(item)} key={item.id}>
            {item.name || item.userName}
          </Tag>
        );
      })}
    </div>
  );
};

export default observer(SectionRight);
