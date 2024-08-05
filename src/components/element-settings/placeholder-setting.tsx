import React from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from 'antd';
import { SettingItem } from '../setting-common';
import store from '../../store';

export const PlaceholderSetting = observer(() => {
  return (
    <SettingItem label="暗文本提示">
      <Input
        value={store.selectedElement.placeholder}
        onChange={(e) => {
          store.setSelectedProp('placeholder', e.target.value);
        }}
      />
    </SettingItem>
  );
});
