import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { prefixCls } from '@/const';
import { MenuOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.less';

import store from '@/store';
import {
  AttributesSetting,
  SettingItem,
  SettingWrap,
  QuestionPopover,
} from '@/components';
import type { TColumn } from '@/types';
import { idCreator } from '@/utils';

export const ColumnsSetting = observer(() => {
  const { columns = [] } = store.selectedElement;
  return (
    <SettingItem label="表格列配置" vertical>
      {columns?.map((column: TColumn) => (
        <div key={column.id} className={prefixCls('column-setting')}>
          <span className={prefixCls('column-setting-drag-icon')}>
            <MenuOutlined />
          </span>
          <span>{column.name}</span>
          <EditOutlined />
          <DeleteOutlined />
        </div>
      ))}
      <Button
        size="small"
        type="dashed"
        className={prefixCls('add-button')}
        onClick={() => {
          store.setSelectedProp('columns', [
            ...columns,
            {
              id: idCreator('col'),
              name: '标题',
              field: '',
              fixed: '',
              align: 'left',
            },
          ]);
        }}
        style={{ fontSize: 12 }}
      >
        + 新增一列
      </Button>
    </SettingItem>
  );
});
