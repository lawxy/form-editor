import React from 'react';
import c from 'classnames';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import store from '@/store';
import { prefixCls } from '@/const';

export const SelectedActions = () => {
  return (
    <div className={prefixCls('action-wrap')}>
      <div
        // className="fe-selected-action copy-action"
        className={c([prefixCls('selected-action'), prefixCls('copy-action')])}
        onClick={() => {
          const newEl = store.copyEl(store.selectedElement);
          store.setSelectedElement(newEl!);
        }}
      >
        <CopyOutlined />
      </div>
      <div
        // className="fe-selected-action delete-action"
        className={c([prefixCls('selected-action'), prefixCls('delete-action')])}
        onClick={() => {
          store.deleteEl(store.selectedElement);
          store.setSelectedElement({});
        }}
      >
        <DeleteOutlined />
      </div>
    </div>
  );
};
