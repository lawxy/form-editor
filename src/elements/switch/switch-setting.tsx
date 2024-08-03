import React from 'react';
import { Input } from 'antd';
import { SettingItem, SettingWrap } from '@/components';
import type { TElementSetting } from '@/types';

export const SettingSwitch: TElementSetting = ({ element, setElementProp }) => {
  return (
    <SettingWrap title="元素设置">
      <SettingItem
        tips="按照基本数据类型填写, 比如 true 或 1 或 '1'"
        label="开启值"
      >
        <Input
          value={element?.checkedValue}
          onChange={(e) => {
            setElementProp('checkedValue', e.target.value);
          }}
        />
      </SettingItem>
    </SettingWrap>
  );
};
