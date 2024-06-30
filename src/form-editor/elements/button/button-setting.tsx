import React from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from 'antd';
import store from '@/store';
import { SettingItem } from '@/components';

const SettingButtonContent = () => {
  return (
    <>
      <SettingItem label="按钮文案">
        <Input
          value={store.selectedElement.btnText}
          onChange={(e) => {
            store.setSelectedProp('btnText', e.target.value);
          }}
        />
      </SettingItem>
    </>
  );
};
export const SettingButton = observer(SettingButtonContent);
