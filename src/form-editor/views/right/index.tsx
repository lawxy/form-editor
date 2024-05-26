import React from 'react'
import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite';
import type { TabsProps } from 'antd';
import ElementSetting from './element-setting';
import FormSetting from './form-setting';
import { StyledRightDiv } from './styled'
import store from '@/store';

const items: TabsProps['items'] = [
  {
    key: 'element',
    label: `组件属性`,
    children: <ElementSetting />,
  },
  {
    key: 'form',
    label: `表单属性`,
    children: <FormSetting />,
  },
];

const Right = () => {
  return (
    <StyledRightDiv>
      <Tabs 
        activeKey={store.formSettingTab} 
        items={items}
        onChange={(tab: any) => {
          store.setFormSettingTab(tab)
        }}
      />
    </StyledRightDiv>
  )
}
export default observer(Right)
