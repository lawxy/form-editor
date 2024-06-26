import React from 'react';
import { Switch } from 'antd';
import { SettingItem } from './setting-item';

export const RegPattern = () => {
  return (
    <SettingItem label="校验">
      <Switch />
    </SettingItem>
  );
};
