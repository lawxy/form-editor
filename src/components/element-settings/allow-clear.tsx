import React from 'react';
import { Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { SettingItem } from '../setting-common';

export const AllowClear = observer(() => {
  return (
    <SettingItem label="支持清空">
      <Switch
        size="small"
        checked={store.selectedElement.allowClear}
        onChange={(checked) => {
          store.setSelectedProp('allowClear', checked);
        }}
      />
    </SettingItem>
  );
});
