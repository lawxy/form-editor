import React from 'react'
import { observer } from "mobx-react-lite";
import { Button, Popover  } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import BasicInfo from '@/components/basic-info';
import { SettingItem } from '@/components/setting-item';
import { ColumnsModal } from './columns-modal';

const SettingTableContent = () => {
  return (
    <div>
      <BasicInfo />
      <SettingItem label={
        <>
          列表项配置&nbsp;
          <Popover 
            content={
              <a target='_blank' href='https://ant.design/components/table-cn#column'>antd文档</a>
            }
          >
            <QuestionCircleOutlined style={{cursor: 'pointer'}}/>
          </Popover >
        </>}>
        <ColumnsModal>
          <Button style={{position: 'absolute', right: 8, top: 3}} size='small'>编辑</Button>
        </ColumnsModal>
      </SettingItem>
    </div>
  )
}
export const SettingTable = observer(SettingTableContent)