import React from 'react'
import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite';
import type { TabsProps } from 'antd';
import store from '@/store';
import { prefixCls } from '@/const';
import ElementSetting from './element-setting';
import FormSetting from './form-setting';
import { StyledRightDiv } from './styled'

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
];

const Right = () => {
  return (
    <StyledRightDiv>
      <Tabs 
        activeKey={store.formSettingTab} 
        type="editable-card"
        hideAdd
        items={items}
        className={`${prefixCls('form-setting-tab')}`}
        onChange={(tab: any) => {
          store.setFormSettingTab(tab)
        }}
      />
    </StyledRightDiv>
  )
}
export default observer(Right)