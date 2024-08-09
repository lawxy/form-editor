import React from 'react';
import { Button, Switch } from 'antd';

import {
  AttributesSetting,
  SettingItem,
  SettingWrap,
  QuestionPopover,
} from '@/components';
import type { TElementSetting } from '@/types';
import { ColumnsSetting } from './columns-setting';

export const SettingTable: TElementSetting = ({ element, setElementProp }) => {
  return (
    <SettingWrap title="元素设置">
      <SettingItem label="是否可编辑">
        <Switch
          size="small"
          checked={!element.readonly}
          onChange={(editable) => setElementProp('readonly', !editable)}
        />
      </SettingItem>
      <ColumnsSetting />
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
          value={element.tableAttributes}
          title="表格配置"
          onChange={(val) => {
            setElementProp('tableAttributes', val);
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
          value={element.tableColumns}
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
            setElementProp('tableColumns', val);
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
