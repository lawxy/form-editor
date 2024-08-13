import React from 'react';
import { Switch } from 'antd';

import { SettingItem, SettingWrap } from '@/components';
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
      {!element.readonly && (
        <SettingItem label="是否可行新增">
          <Switch
            size="small"
            checked={element.lineAdd}
            onChange={(checked) => setElementProp('lineAdd', checked)}
          />
        </SettingItem>
      )}
      <ColumnsSetting />
    </SettingWrap>
  );
};
