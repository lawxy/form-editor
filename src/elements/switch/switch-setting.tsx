import React from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from 'antd';
import store from '@/store';
import { SettingItem, SettingWrap } from '@/components';

export const SettingSwitch = () => {
  return (
    <SettingWrap title="元素设置">
      <SettingItem
        tips="按照基本数据类型填写, 比如 true 或 1 或 '1'"
        label="开启值"
      >
        <Input
          value={store.selectedElement?.checkedValue}
          onChange={(e) => {
            store.setSelectedProp('checkedValue', e.target.value);
          }}
        />
      </SettingItem>
    </SettingWrap>
  );
};
