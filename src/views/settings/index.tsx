import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';

import ElementSetting from './element-setting';
import FormSetting from './form-setting';

import { FormService } from '@/components';
import { prefixCls } from '@/const';
import { tabStore } from '@/store';
import './style.less';

// console.log('prefixCls', prefixCls);
// debugger;

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
  },
];

const Settings = () => {
  return (
    <div className={prefixCls('setting')}>
      <Tabs
        activeKey={tabStore.formTab}
        type="editable-card"
        hideAdd
        items={items}
        className={`${prefixCls('form-setting-tab')}`}
        onChange={(tab: any) => {
          tabStore.setFormTab(tab);
        }}
      />
    </div>
  );
};
export default observer(Settings);
