import React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';

import {
  AttributesSetting,
  SettingItem,
  SettingWrap,
  QuestionPopover,
} from '@/components';
import store from '@/store';

export const SettingTable = () => {
  return (
    <SettingWrap title="元素设置">
      <SettingItem
        tips={
          <a
            target="_blank"
            href="https://ant.design/components/table-cn#table"
            rel="noreferrer"
          >
            antd - table文档
          </a>
        }
        label="表格配置"
      >
        <AttributesSetting
          editorType="json"
          value={store.selectedElement.tableAttributes}
          title="表格配置"
          onChange={(val) => {
            store.setSelectedProp('tableAttributes', val);
          }}
        >
          <Button className="fe-attr-setting-btn" size="small">
            编辑
          </Button>
        </AttributesSetting>
      </SettingItem>
      <SettingItem
        tips={
          <a
            target="_blank"
            href="https://ant.design/components/table-cn#column"
            rel="noreferrer"
          >
            table - column文档
          </a>
        }
        label="列表配置"
      >
        <AttributesSetting
          editorType="javascript"
          value={store.selectedElement.tableColumns}
          title={
            <>
              列表项设置&nbsp;
              <QuestionPopover
                content={
                  <>
                    render函数中可直接使用antd组件及AntdIcons.XXX的方式使用icon图标
                  </>
                }
              />
            </>
          }
          onChange={(val) => {
            store.setSelectedProp('tableColumns', val);
          }}
        >
          <Button className="fe-attr-setting-btn" size="small">
            编辑
          </Button>
        </AttributesSetting>
      </SettingItem>
    </SettingWrap>
  );
};
