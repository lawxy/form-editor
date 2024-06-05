import React from 'react';
import type { TabsProps } from 'antd';

import BasicInfo from './basic-info';
import CustomCssSetting from './custom-css-setting'
import type { FC, ReactNode } from 'react';

import { Tabs } from 'antd';

const { TabPane } = Tabs;



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
      children: <>事件</>
    }
  ].filter(Boolean);

  return (
    <div className="element-props-setting-section">
      <Tabs defaultActiveKey="attribute" items={items}/>
        {/* <TabPane tab="属性" key="1">
          <BasicInfo />
          {attributes}
        </TabPane>
        {
          !hideCss && (
            <TabPane tab="样式" key="2">
              <CustomCssSetting />
            </TabPane>
          )
        }
        {
          events && (
            <TabPane tab="事件" key="3">
              {events}
            </TabPane>
          )
        }
      </Tabs> */}
    </div>
  );
};
