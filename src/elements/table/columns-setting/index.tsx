import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Typography, Input, Popconfirm, Tooltip } from 'antd';
import { cloneDeep } from 'lodash-es';
import { ReactSortable } from '@roddan/ui';
import { arrayMoveImmutable } from 'array-move';
import { prefixCls } from '@/const';
import { MenuOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { EditModal } from './edit-modal';
import './style.less';

import store from '@/store';
import { SettingItem } from '@/components';
import type { TColumn } from '@/types';
import { idCreator } from '@/utils';

export const ColumnsSetting = observer(() => {
  const { columns = [] } = store.selectedElement;
  return (
    <SettingItem label="表格列配置" vertical>
      <ReactSortable
        list={columns}
        animation={150}
        onSort={({ newIndex, oldIndex }) => {
          const newColumns = cloneDeep(columns);
          store.setSelectedProp(
            'columns',
            arrayMoveImmutable(newColumns, oldIndex!, newIndex!),
          );
        }}
        handle={'.' + prefixCls('column-setting-drag-icon')}
      >
        {columns?.map((column: TColumn, idx: number) => (
          <div key={column.id} className={prefixCls('column-setting')}>
            <span className={prefixCls('column-setting-drag-icon')}>
              <MenuOutlined />
            </span>
            <Typography.Text
              ellipsis={{
                tooltip: true,
              }}
              style={{ width: 200 }}
            >
              <Input value={column.title} readOnly />
            </Typography.Text>
            <EditModal
              onChange={(values) => {
                const newColumns = cloneDeep(columns);
                newColumns[idx] = values;
                store.setSelectedProp('columns', newColumns);
              }}
              initialValues={column}
            >
              <Tooltip title="编辑">
                <EditOutlined />
              </Tooltip>
            </EditModal>
            <Popconfirm
              placement="topLeft"
              title="确认删除"
              onConfirm={() => {
                const newColumns = cloneDeep(columns);
                newColumns.splice(idx, 1);
                store.setSelectedProp('columns', newColumns);
              }}
            >
              <DeleteOutlined style={{ marginLeft: 8 }} />
            </Popconfirm>
          </div>
        ))}
      </ReactSortable>
      <EditModal
        onChange={(values) => {
          values.id = idCreator('col');
          store.setSelectedProp('columns', [...columns, values]);
        }}
      >
        <Button
          size="small"
          type="dashed"
          className={prefixCls('add-button')}
          style={{ fontSize: 12 }}
        >
          + 新增一列
        </Button>
      </EditModal>
    </SettingItem>
  );
});
