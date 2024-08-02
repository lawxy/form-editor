import React from 'react';
import { Input } from 'antd';
import { SettingItem } from '@/components';
import type { TElementSetting } from '@/types';

export const SettingButton: TElementSetting = ({ element, setElementProp }) => {
  return (
    <>
      <SettingItem label="按钮文案">
        <Input
          value={element.btnText}
          onChange={(e) => {
            setElementProp('btnText', e.target.value);
          }}
        />
      </SettingItem>
    </>
  );
};
