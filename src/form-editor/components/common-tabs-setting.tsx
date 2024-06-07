import React from 'react';
import type { TabsProps } from 'antd';

import BasicInfo from './basic-info';
import CustomCssSetting from './custom-css-setting'
import type { FC, ReactNode } from 'react';

import { Tabs } from 'antd';

export const CommonTabsSetting: FC<{
  attributes?: ReactNode;
  events?: ReactNode;
  hideCss?: boolean;
}> = ({ attributes, events, hideCss }) => {
  const items: TabsProps['items'] = [
    {
      key: 'attribute',
      label: `属性`,
      children: <>
        <BasicInfo />
        {attributes}
      </>
    },
    !hideCss && {
      key: 'form',
      label: `样式`,
      children: <CustomCssSetting />,
    },
    {
      key: 'event',
      label: '事件',
      children: <>{events}</>
    }
  ].filter(Boolean) as TabsProps['items'];

  return (
    <div className="element-props-setting-section">
      <Tabs defaultActiveKey="attribute" items={items}/>
    </div>
  );
};
