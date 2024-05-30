import React from 'react'
import { observer } from "mobx-react-lite";
import { Table, Button } from 'antd'
import BasicInfo from '@/components/basic-info';
import { SettingItem } from '@/components/setting-item';

import { ColumnsModal } from './columns-modal';

const SettingTableContent = () => {
  return (
    <div>
      <BasicInfo />
      <SettingItem label='列表项配置'>
        <ColumnsModal>
          <Button style={{position: 'absolute', right: 8, top: 3}} size='small'>编辑</Button>
        </ColumnsModal>
      </SettingItem>
      <Table />
    </div>
  )
}
export const SettingTable = observer(SettingTableContent)