import { Tabs } from 'antd'
import type { TabsProps } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react'

import ElementSetting from './element-setting';
import FormSetting from './form-setting';

import FormService from '@/components/form-service';
import { prefixCls } from '@/const';
import store from '@/store';
import './style.less'

const items: TabsProps['items'] = [
  {
    key: 'element',
    label: `组件属性`,
    closable: false,
    children: <ElementSetting />,
  },
  {
    key: 'form',
    label: `表单属性`,
    closable: false,
    children: <FormSetting />,
  },
  {
    key: 'service',
    label: `表单服务`,
    closable: false,
    children: <FormService />,
  }
];

const Right = () => {
  return (
    <div className={prefixCls('setting')}>
      <Tabs 
        // activeKey={store.formSettingTab}
        defaultActiveKey='element' 
        type="editable-card"
        hideAdd
        items={items}
        className={`${prefixCls('form-setting-tab')}`}
        onChange={(tab: any) => {
          store.setFormSettingTab(tab)
        }}
      />
    </div>
  )
}
export default observer(Right)
