import React from 'react'
import { observer } from "mobx-react-lite";
import { Button, Popover  } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { SettingItem } from '@/components/setting-item';
import { AttributesSetting } from '@/components/attributes-setting';
import store from '@/store';
import { CommonTabsSetting } from '@/components/common-tabs-setting';

const SettingTableContent = () => {
  return (
    <div>
      <CommonTabsSetting 
        attributes={
          <>
            <SettingItem label={
              <>
                表格配置&nbsp;
                <Popover 
                  content={
                    <a target='_blank' href='https://ant.design/components/table-cn#table'>antd - table文档</a>
                  }
                >
                  <QuestionCircleOutlined style={{cursor: 'pointer'}}/>
                </Popover >
              </>}>
              <AttributesSetting
                editorType='json'
                defaultValue={store.selectedElement.tableAttributes}
                title='表格配置'
                onOk={(val) => {
                  store.setSelectedProp('tableAttributes', val)
                }}
              >
                <Button className='fm-attr-setting-btn' size='small'>编辑</Button>
              </AttributesSetting>
            </SettingItem>
            <SettingItem label={
              <>
                列表配置&nbsp;
                <Popover 
                  content={
                    <a target='_blank' href='https://ant.design/components/table-cn#column'>table - column文档</a>
                  }
                >
                  <QuestionCircleOutlined style={{cursor: 'pointer'}}/>
                </Popover >
              </>}>
              <AttributesSetting
                editorType='javascript'
                defaultValue={store.selectedElement.tableColumns}
                title={
                  <>
                    列表项设置&nbsp;
                    <Popover
                      content={<>
                        在render函数中可直接使用antd组件及AntdIcons.XXX的方式使用icon图标
                      </>}
                    >
                      <QuestionCircleOutlined style={{cursor: 'pointer'}}/>
                    </Popover>
                  </>
                }
                onOk={(val) => {
                  store.setSelectedProp('tableColumns', val)
                }}
              >
                <Button className='fm-attr-setting-btn' size='small'>编辑</Button>
              </AttributesSetting>
            </SettingItem>
          </>
        }
      />
    </div>
  )
}
export const SettingTable = observer(SettingTableContent)