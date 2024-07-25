import React from 'react';
import type { FC } from 'react';
import { Table, Button, type TableColumnProps } from 'antd';
import { observer } from 'mobx-react-lite';

import { prefixCls } from '@/const';

import OptionModal from './option-modal';

import { SettingItem } from '@/components';
import store from '@/store';
import type { TOption } from '@/types';

const columns: TableColumnProps<TOption>[] = [
  {
    title: '属性',
    dataIndex: 'label',
  },
  {
    title: '值',
    dataIndex: 'value',
  },
];

export const OptionSetting: FC = observer(() => {
  return (
    <>
      <SettingItem label="选项">
        <OptionModal>
          <Button className={`${prefixCls('attr-setting-btn')}`} size="small">
            编辑
          </Button>
        </OptionModal>
      </SettingItem>
      <Table
        columns={columns}
        dataSource={store.selectedElement.valueOptions}
        pagination={false}
        scroll={{ y: 300 }}
        rowKey="id"
      />
    </>
  );
});
